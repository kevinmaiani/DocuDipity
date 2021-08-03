var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createGrid, createjqxTabs, createComboBox, createButton, createDocuRender, createTree } from "./utilityManager.js";
import { ColumnTypeEnum, ToolbarItemType } from "./components/Grid.js";
import { DocumentState } from "./state/documentState.js";
export class AppGui {
    //#endregion
    static initialize() {
        this._divContainer = $("#documentOverview")[0];
        this._dictionaryTabValue = new Map();
        this._dictionaryTabStates = new Map();
        // this.login("admin@example.it", "adminadmin").then(() => { 
        //   this.getViewById(expressions: string[]) => { ... }
        // });
        this.createControls();
    }
    //#region createControls
    static createControls() {
        let that = this;
        let divImportToolbar = $("<div id='sidebar_divImportToolbar'></div>").appendTo($("#sidebar"))[0];
        this._btnImport = createButton("sidebar_btnImport", divImportToolbar, {
            value: "Import",
            width: 82,
            height: 27,
            imgsrc: "src/icons/plus.png",
        });
        this._explorerDocuments = createTree("projectsView_explorerDocuments", {
            contextMenu: true,
            height: "calc(100% - 36px)",
            fields: [
                { name: "id" },
                { name: "authors" },
                { name: "year" },
                { name: "father" },
                { name: "name" },
            ],
            dataSourceFieldId: "id",
            records: {
                id: "id",
                father: "father",
                text: "name",
            },
            onContextMenuClick: (e) => {
                let currentClickedItems = e.item;
                let items = JSON.parse(JSON.stringify(currentClickedItems));
                switch (e.contextMenuId) {
                    case "currentView": {
                        let selectedItem = this._tab._jqxTabs.selectedItem;
                        let selectedGrid = this._dictionaryTabValue.get(selectedItem);
                        selectedGrid.addRows(items);
                        break;
                    }
                    case "newCollectionView": {
                        this._tab.addTab("Tab", (e) => {
                            let container = e.container;
                            let tabValue = e.value;
                            let state = new DocumentState();
                            this._dictionaryTabStates.set(this._tab._jqxTabs.selectedItem, state);
                            this.renderTab(container, items, tabValue);
                        });
                        break;
                    }
                    case "documentview": {
                        let selectedItem = this._tab._jqxTabs.selectedItem;
                        let selectedGrid = this._dictionaryTabValue.get(selectedItem);
                        this._openedExpressionIds = items.map(k => k.id);
                        this.renderDocumentBar(items, selectedGrid);
                        break;
                    }
                }
            }
        }, $("#sidebar")[0]);
        this.getExplorerSource().then((res) => { this._explorerDocuments.dataSource(res); });
        let divTab1 = $("<div id='tab1'></div>")[0];
        this._tab = createjqxTabs("#documentOverview", {
            width: "100%",
            height: "100%",
            items: [
                {
                    text: "Tab 1",
                    value: "prova",
                    container: divTab1
                }
            ],
            onSelected: (e) => {
                let selectedTab = this._tab._jqxTabs.selectedItem;
                this._selectedGrid = this._dictionaryTabValue.get(selectedTab);
            },
        });
        let state = new DocumentState();
        this._dictionaryTabStates.set(this._tab._jqxTabs.selectedItem, state);
        this.renderTab(divTab1, null, this._tab._jqxTabs.selectedItem.toString());
    }
    //#endregion
    static renderTab(container, clickedItem, tabValue) {
        let divToolbar = $("<div id='documentsOverview_divToolbar" + tabValue + "'></div>")[0];
        divToolbar.style.cssText += "height: 2.5rem;display:flex;align-items:center;";
        container.appendChild(divToolbar);
        this._btnSave = createButton("sidebar_btnSave" + tabValue, divToolbar, {
            imgsrc: "src/icons/save.png",
            width: 30,
            onClick: (e) => {
                this.saveViews(this._openedExpressionIds);
            }
        });
        this._btnSave.css("margin-left:6px;");
        let cmbViews = createComboBox("documentsOverview_divComboViews" + tabValue, {
            dataItem: ["Table", "View"],
            width: "180px",
            disable: true,
            change: (e) => {
                if (e.value.index == 0)
                    grid.show();
                else
                    grid.hide();
            },
        }, divToolbar);
        $(cmbViews.element).css({ "margin-left": "auto", "margin-right": "6px" });
        let divGrid = $("<div id='documentsOverview_divGrid" + tabValue + "'></div>")[0];
        container.appendChild(divGrid);
        let grid = createGrid(divGrid.id, {
            width: "100% - 32px",
            height: "calc(50% - 64px)",
            toolbar: [
                {
                    type: ToolbarItemType.Custom,
                    value: "btnOpenSelected" + divGrid.id,
                    text: "Open selected",
                    visible: false,
                    click: () => {
                        let items = grid.getCheckedItems();
                        this._openedExpressionIds = items.map(k => k.id);
                        this.renderDocumentBar(items, grid);
                    }
                },
                {
                    type: ToolbarItemType.Delete,
                    value: "btnDeleteSelected" + divGrid.id,
                    text: "Remove selected",
                    visible: false,
                    delete: (e) => {
                        let deletedItemsId = e.deletedItems;
                        let currentState = this._dictionaryTabStates.get(this._tab._jqxTabs.selectedItem);
                        currentState.notifyDelete(deletedItemsId);
                    }
                }
            ],
            columns: [
                {
                    title: "Title",
                    field: "name",
                    type: ColumnTypeEnum.String,
                    width: "25%",
                },
                {
                    title: "Year",
                    field: "year",
                    type: ColumnTypeEnum.Number,
                    // fitSpace: true, //has to be recalculated each time
                    width: "5%",
                },
                {
                    title: "Authors",
                    field: "authors",
                    type: ColumnTypeEnum.String,
                    width: "67.7%",
                },
            ],
            dataSourceFieldId: "id",
            onSelectRow: () => {
                if (grid.getCheckedItems().length < 1) {
                    $("#btnOpenSelected" + divGrid.id).hide();
                    $("#btnDeleteSelected" + divGrid.id).hide();
                }
                else {
                    $("#btnOpenSelected" + divGrid.id).show();
                    $("#btnDeleteSelected" + divGrid.id).show();
                }
            },
            rowUnselect: () => {
                if (grid.getCheckedItems().length < 1) {
                    $("#btnOpenSelected" + divGrid.id).hide();
                    $("#btnDeleteSelected" + divGrid.id).hide();
                }
                else {
                    $("#btnOpenSelected" + divGrid.id).show();
                    $("#btnDeleteSelected" + divGrid.id).show();
                }
            },
        }, true);
        this._dictionaryTabValue.set(this._tab._jqxTabs.selectedItem, grid);
        if (clickedItem)
            grid.addRows(clickedItem);
        this._selectedGrid = grid;
        $(container).append($(`<div id='documentviewer${tabValue}' class='documentviewer'></div>`)[0]);
    }
    static renderDocumentBar(items, grid) {
        for (let item of items) {
            let docuRender = createDocuRender({
                buttonText: item.name,
                value: item.id,
                rebind: {
                    parameters: {
                        expressionId: item.id,
                        schemaId: "60228f84483b5f04449c4703",
                    }
                },
                onButtonDownClick: (e) => {
                    let selectedItem = grid.getCheckedItems()[0];
                    if (selectedItem) {
                        let displayRows = grid._jqxGrid.getdisplayrows();
                        let currentDisplayRow = displayRows.find((k) => k.id == grid.dataSource().find((k) => k.id == grid.getCheckedItems().map((j) => j.id)[0]).id);
                        let currentIndexRow = grid._jqxGrid.getdisplayrows().indexOf(currentDisplayRow);
                        let nextIndex = currentIndexRow + 1;
                        if (nextIndex < grid._jqxGrid.getdisplayrows().length) {
                            let itemsd = grid._jqxGrid.getdisplayrows()[nextIndex];
                            grid.selectRowByIndex(itemsd.dataindex ? itemsd.dataindex : itemsd.boundindex);
                            grid.deselectRowByIndex(currentDisplayRow.dataindex ? currentDisplayRow.dataindex : currentDisplayRow.boundindex);
                            let documentSelection = e.value;
                            docuRender.setValue(itemsd.id);
                            documentSelection.innerHTML = itemsd.name;
                            documentSelection.setAttribute("title", itemsd.name);
                            docuRender.rebind({ expressionId: itemsd.id, schemaId: "60228f84483b5f04449c4703" });
                        }
                    }
                    else {
                        let currentDisplayRow = grid._jqxGrid.getdisplayrows().find((k) => k.id == docuRender.value());
                        grid.selectRowByIndex(currentDisplayRow.dataindex ? currentDisplayRow.dataindex : currentDisplayRow.boundindex);
                    }
                },
                onButtonUpClick: (e) => {
                    let selectedItem = grid.getCheckedItems()[0];
                    if (selectedItem) {
                        let displayRows = grid._jqxGrid.getdisplayrows();
                        let currentDisplayRow = displayRows.find((k) => k.id == grid.dataSource().find((k) => k.id == grid.getCheckedItems().map((j) => j.id)[0]).id);
                        let currentIndexRow = grid._jqxGrid.getdisplayrows().indexOf(currentDisplayRow);
                        let prevIndex = currentIndexRow - 1;
                        if (prevIndex >= 0) {
                            let itemsd = grid._jqxGrid.getdisplayrows()[prevIndex];
                            grid.selectRowByIndex(itemsd.dataindex ? itemsd.dataindex : itemsd.boundindex);
                            grid.deselectRowByIndex(currentDisplayRow.dataindex ? currentDisplayRow.dataindex : currentDisplayRow.boundindex);
                            let documentSelection = e.value;
                            docuRender.setValue(itemsd.id);
                            documentSelection.innerHTML = itemsd.name;
                            documentSelection.setAttribute("title", itemsd.name);
                            docuRender.rebind({
                                expressionId: itemsd.id,
                                schemaId: "60228f84483b5f04449c4703",
                            });
                        }
                    }
                    else {
                        let currentDisplayRow = grid._jqxGrid.getdisplayrows().find((k) => k.id == docuRender.value());
                        grid.selectRowByIndex(currentDisplayRow.dataindex ? currentDisplayRow.dataindex : currentDisplayRow.boundindex);
                    }
                },
                /*TODO
                onLockedOpen:(e) => {
                    uso il value per trovare quelli duplicati su cui chiamare il sincronize
      
                    if(e.checked)
                      docuRender.sincronize();
                      else
                      {
      
                      }
                } */
                onClick: () => {
                    let currentRow = grid._jqxGrid.getdisplayrows().find((k) => k.id == docuRender.value());
                    grid.selectRowByIndex(currentRow.dataindex ? currentRow.dataindex : currentRow.boundindex);
                },
            }, $("#documentviewer" + this._tab._jqxTabs.selectedItem)[0], "docudipity_docuRender" + item.id + this._docuRenderCounter++);
            let state = this._dictionaryTabStates.get(this._tab._jqxTabs.selectedItem);
            state.attach(docuRender);
        }
    }
    static addDocumentExpression(ids, callBack, destinationGrid) {
        let expressions = [];
        for (let id of ids) {
            this.getDocExpression(id).then((docs) => {
                if (destinationGrid)
                    destinationGrid.addRows(docs.expressions);
                expressions.push(docs.expressions);
            });
            if (callBack != null)
                callBack(expressions);
        }
    }
    static getExplorerSource() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve($.ajax({
                contentType: "application/json",
                method: "GET",
                url: this.HOST + "/documentSets/descendants?type=list",
            }))
                .catch((response) => console.log(response))
                .then((response) => {
                response.map((k) => {
                    k["id"] = k["_id"];
                    delete k["_id"];
                    if (k["documentSet"]) {
                        k["father"] = k["documentSet"];
                        delete k["documentSet"];
                    }
                    if (k["title"]) {
                        k["name"] = k["title"];
                        delete k["title"];
                    }
                });
                return response;
            });
        });
    }
    static getDocSets() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.HOST + "/documentSets?page=0&limit=5");
            const data = yield response.json();
            return data;
        });
    }
    static getDocExpression(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.HOST}/documentSets/${id}/expressions?page=0&limit=5`);
            const data = yield response.json();
            return data;
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve($.ajax({
                contentType: "application/json;charset=utf-8",
                method: "POST",
                url: this.HOST + "/users/login",
                dataType: 'json',
                data: JSON.stringify({ email: email, password: password })
            }))
                .catch((response) => console.log(response))
                .then((response) => {
                localStorage.setItem('token', response.token);
            });
        });
    }
    static saveViews(expressionIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let expressionIdsToSave = expressionIds.join();
            let manifestations = expressionIds.map(k => {
                return `${this.HOST}/expressions/${k}/manifestations/60228f84483b5f04449c4703`;
            });
            let additionalProperties = {};
            for (var i = 0; i < expressionIds.length; i++) {
                additionalProperties["expression" + i] = expressionIds[i];
            }
            return Promise.resolve($.ajax({
                contentType: "application/json;charset=utf-8",
                method: "POST",
                url: this.HOST + "/projects/60719503756c47001331079f/views",
                dataType: 'json',
                headers: {
                    Authorization: 'Bearer ' + this._TOKEN
                },
                data: JSON.stringify({
                    viewTypeRef: "602a95c680184b002095a8dd",
                    title: "prova view",
                    desc: "desc prova view",
                    manifestations: manifestations,
                    additionalProperties
                })
            }))
                .catch((response) => console.log(response))
                .then((response) => {
                if (response != null) {
                    console.log(response);
                    localStorage.setItem("viewId", response.id);
                }
            });
        });
    }
    static updateProjecyById(expressionIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let expressionIdsToSave = expressionIds.join();
            let manifestations = expressionIds.map(k => {
                return `${this.HOST}/expressions/${k}/manifestations/60228f84483b5f04449c4703`;
            });
            return Promise.resolve($.ajax({
                contentType: "application/json;charset=utf-8",
                method: "POST",
                url: this.HOST + "/projects/60719503756c47001331079f/views",
                dataType: 'json',
                headers: {
                    Authorization: 'Bearer ' + this._TOKEN
                },
                data: JSON.stringify({
                    viewTypeRef: "602a95c680184b002095a8dd",
                    title: "prova view",
                    desc: "desc prova view",
                    manifestations: manifestations,
                    additionalProperties: {
                        test: "test1"
                    }
                })
            }))
                .catch((response) => console.log(response))
                .then((response) => {
                if (response != null) {
                    console.log(response);
                    localStorage.setItem("viewId", response.id);
                }
            });
        });
    }
    static getViewById(callBack) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.HOST}/views/${localStorage.getItem("viewId")}`);
            const data = yield response.json();
            let expressions = [data.view.additionalProperties];
            if (callBack != null)
                callBack(expressions);
        });
    }
    static getExpressionById(uri, callBack) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectresponse = yield fetch(`${this.HOST}/expressions/${uri}`);
            const data = yield projectresponse.json();
            if (callBack != null)
                callBack(data);
        });
    }
}
//#region Variables
AppGui.HOST = "https://docupidity.cs.unibo.it/api";
AppGui._docuRenderCounter = 0;
