export var SourceTypeEnum;
(function (SourceTypeEnum) {
    SourceTypeEnum["Boolean"] = "bool";
    SourceTypeEnum["Date"] = "date";
    SourceTypeEnum["Number"] = "number";
    SourceTypeEnum["String"] = "string";
    SourceTypeEnum["Array"] = "";
    SourceTypeEnum["Time"] = "date";
})(SourceTypeEnum || (SourceTypeEnum = {}));
export class GridRebindEvent {
}
export class GridOptions {
    constructor(options) {
        if (options != null) {
            if (options.columns != null)
                this.columns = options.columns;
            if (options.toolbar != null)
                this.toolbar = options.toolbar;
            if (options.height != null)
                this.height = options.height;
            if (options.width != null)
                this.width = options.width;
            if (options.checkBoxes != null)
                this.checkBoxes = options.checkBoxes;
            if (options.groupable != null)
                this.groupable = options.groupable;
            if (options.editable != null)
                this.editable = options.editable;
            if (options.contextMenu != null)
                this.contextMenu = options.contextMenu;
            if (options.onContextMenuClick != null)
                this.onContextMenuClick = options.onContextMenuClick;
            if (options.dataSourceFieldId != null)
                this.dataSourceFieldId = options.dataSourceFieldId;
            if (options.setDataSource != null)
                this.setDataSource = options.setDataSource;
            if (options.onSelectRow != null)
                this.onSelectRow = options.onSelectRow;
            if (options.rowUnselect != null)
                this.rowUnselect = options.rowUnselect;
            if (options.resizable != null)
                this.resizable = options.resizable;
            if (options.reorderable != null)
                this.reorderable = options.reorderable;
            if (options.sortable != null)
                this.sortable = options.sortable;
            if (options.rowsHeight != null)
                this.rowsHeight = options.rowsHeight;
            if (options.autoHeight != null)
                this.autoHeight = options.autoHeight;
            if (options.filterable != null)
                this.filterable = options.filterable;
            if (options.pagination != null)
                this.pagination = options.pagination;
            // if (options.multilineRows != null) this.multilineRows = options.multilineRows;
        }
    }
}
export class Column {
}
export var SelectionMode;
(function (SelectionMode) {
    SelectionMode["None"] = "none";
    SelectionMode["SingleRow"] = "singlerow";
    SelectionMode["MultipleRows"] = "multiplerows";
    SelectionMode["SingleCell"] = "singlecell";
    SelectionMode["MultipleCells"] = "multiplecells";
    SelectionMode["CheckBox"] = "checkbox";
    SelectionMode["MultipleCellsAdvanced"] = "multiplecellsadvanced";
})(SelectionMode || (SelectionMode = {}));
export class ColumnType {
    get value() {
        switch (this.type) {
            case ColumnTypeEnum.String:
                return "string";
            case ColumnTypeEnum.Checkbox:
                return "checkbox";
            case ColumnTypeEnum.Date:
                return "datetimeinput";
            case ColumnTypeEnum.Time:
                return "datetimeinput";
            case ColumnTypeEnum.DateTime:
                return "datetimeinput";
            case ColumnTypeEnum.Duration:
                return "numberinput";
            case ColumnTypeEnum.Number:
                return "numberinput";
            case ColumnTypeEnum.Currency:
                return "numberinput";
            case ColumnTypeEnum.Percentage:
                return "numberinput";
            case ColumnTypeEnum.DropDownList:
                return "dropdownlist";
            case ColumnTypeEnum.DropDownListCheckbox:
                return "dropdownlist";
            case ColumnTypeEnum.ComboBox:
                return "combobox";
            case ColumnTypeEnum.ComboBoxCheckbox:
                return "combobox";
            case ColumnTypeEnum.DropDownTree:
                return "custom";
            case ColumnTypeEnum.DropDownTreeCheckbox:
                return "custom";
            case ColumnTypeEnum.Button:
                return "custom";
            case ColumnTypeEnum.Label:
                return "label";
            case ColumnTypeEnum.Custom:
                return "custom";
            case ColumnTypeEnum.TextBox:
                return "textbox";
            case ColumnTypeEnum.EditButton:
                return "custom";
            case ColumnTypeEnum.Image:
                return "custom";
            default:
                return undefined;
        }
    }
}
export var ColumnTypeEnum;
(function (ColumnTypeEnum) {
    ColumnTypeEnum[ColumnTypeEnum["String"] = 0] = "String";
    ColumnTypeEnum[ColumnTypeEnum["Checkbox"] = 1] = "Checkbox";
    ColumnTypeEnum[ColumnTypeEnum["Date"] = 2] = "Date";
    ColumnTypeEnum[ColumnTypeEnum["Time"] = 3] = "Time";
    ColumnTypeEnum[ColumnTypeEnum["DateTime"] = 4] = "DateTime";
    ColumnTypeEnum[ColumnTypeEnum["Duration"] = 5] = "Duration";
    ColumnTypeEnum[ColumnTypeEnum["Number"] = 6] = "Number";
    ColumnTypeEnum[ColumnTypeEnum["Currency"] = 7] = "Currency";
    ColumnTypeEnum[ColumnTypeEnum["Percentage"] = 8] = "Percentage";
    ColumnTypeEnum[ColumnTypeEnum["DropDownList"] = 9] = "DropDownList";
    ColumnTypeEnum[ColumnTypeEnum["DropDownListCheckbox"] = 10] = "DropDownListCheckbox";
    ColumnTypeEnum[ColumnTypeEnum["ComboBox"] = 11] = "ComboBox";
    ColumnTypeEnum[ColumnTypeEnum["ComboBoxCheckbox"] = 12] = "ComboBoxCheckbox";
    ColumnTypeEnum[ColumnTypeEnum["DropDownTree"] = 13] = "DropDownTree";
    ColumnTypeEnum[ColumnTypeEnum["DropDownTreeCheckbox"] = 14] = "DropDownTreeCheckbox";
    ColumnTypeEnum[ColumnTypeEnum["Button"] = 15] = "Button";
    ColumnTypeEnum[ColumnTypeEnum["Label"] = 16] = "Label";
    ColumnTypeEnum[ColumnTypeEnum["Custom"] = 17] = "Custom";
    ColumnTypeEnum[ColumnTypeEnum["TextBox"] = 18] = "TextBox";
    ColumnTypeEnum[ColumnTypeEnum["EditButton"] = 19] = "EditButton";
    ColumnTypeEnum[ColumnTypeEnum["Image"] = 20] = "Image";
})(ColumnTypeEnum || (ColumnTypeEnum = {}));
export class ToolbarItem {
}
export class ToolbarClickEvent {
    preventDefault() {
        this.isDefaultPrevented = true;
    }
}
export var ToolbarItemType;
(function (ToolbarItemType) {
    ToolbarItemType["Add"] = "jqx-add";
    ToolbarItemType["Delete"] = "jqx-delete";
    ToolbarItemType["Separator"] = "jqx-separator";
    ToolbarItemType["Save"] = "jqx-save";
    ToolbarItemType["Cancel"] = "jqx-cancel";
    ToolbarItemType["Excel"] = "jqx-excel";
    ToolbarItemType["Custom"] = "";
    ToolbarItemType["Rebind"] = "jqx-rebind";
    ToolbarItemType["SplitButton"] = "jqx-splitButton";
})(ToolbarItemType || (ToolbarItemType = {}));
export class Grid {
    //#endregion
    constructor(structure) {
        this._currentUnchangedItems = [];
        this._editable = false;
        this._cellClickEditingCount = new Map();
        this._updatedItems = [];
        if (structure != null) {
            this.options = new GridOptions(structure.settings);
            this.element = document.getElementById(structure.elementId);
            this.elementId = structure.elementId;
            this.draw(this.options);
        }
    }
    draw(options) {
        let that = this;
        if (options.width == null)
            options.width = "100%";
        if (options.sortable == null)
            options.sortable = true;
        if (options.editable == null)
            options.editable = false;
        if (options.filterable == null)
            options.filterable = true;
        if (options.pagination == null)
            options.pagination = true;
        if (options.dataSourceFieldId == null)
            options.dataSourceFieldId = "Id";
        if (options.rowsHeight == null)
            options.rowsHeight = 30;
        if (options.checkBoxes == null)
            options.checkBoxes = false;
        if (options.groupable == null)
            options.groupable = false;
        if (options.contextMenu == null)
            options.contextMenu = false;
        // if (options.multilineRows == null) options.multilineRows = (options.rowsHeight > 30) ? true : false;
        if (options.autoHeight == null)
            options.autoHeight = false;
        // $(this.element).width("100%");
        if (options.columns == null)
            options.columns = [];
        let jqColumns = [];
        if (options.columns != null) {
            let columnsOrdered = [];
            for (let column of options.columns.slice(1).reverse()) {
                if (column.hidden)
                    continue;
                if (column.type == ColumnTypeEnum.Checkbox)
                    columnsOrdered.unshift(column);
                else
                    columnsOrdered.push(column);
            }
            //#region Fit space
            let gridWidth = (options.checkBoxes) ? $(this.element).width() - 31 : $(this.element).width();
            gridWidth -= 20;
            //gridWidth = (settings.groupingSettings.default) ? gridWidth - 32 : gridWidth;
            let columnsWidthOccupied = 0;
            let fitSpaceColumnsNumber = 0;
            for (let column of options.columns) {
                if (column.hidden == true)
                    continue;
                if ((column.fitSpace == null || column.fitSpace == false))
                    columnsWidthOccupied += (column.width != null) ? (parseFloat(column.width.toString()) / 100.0) : ((column.type == ColumnTypeEnum.EditButton) ? 40 : 100); //to fix
                else
                    fitSpaceColumnsNumber++;
            }
            let remainingSpace = gridWidth * columnsWidthOccupied;
            let widthForFitSpaceColumns = (remainingSpace - 20) / fitSpaceColumnsNumber;
            //#endregion
            for (let column of options.columns) {
                let columnType = new ColumnType();
                columnType.type = column.type;
                let jqColumn = {
                    columntype: columnType.value,
                    text: column.title == null ? "" : column.title,
                    width: (column.fitSpace == true) ? widthForFitSpaceColumns : ((column.width != null) ? column.width : 100),
                    datafield: column.field,
                    enabletooltips: true,
                    resizable: true,
                    cellbeginedit: (rowId, field, columnType, value) => {
                        that._currentlyEditedRow = that._jqxGrid.getrowdata(rowId);
                        that._currentlyEditedRow["field"] = field;
                        // To prevent single editing click
                        let clickEditingCount = that._cellClickEditingCount.get(field);
                        if (clickEditingCount == 0) {
                            that._cellClickEditingCount.set(field, 1);
                            return false;
                        }
                        else {
                            that._cellClickEditingCount.set(field, 0);
                            return true;
                        }
                    },
                };
                jqColumns.push(jqColumn);
            }
        }
        //#region DataSource
        let dataSource = {};
        dataSource.id = options.dataSourceFieldId;
        dataSource.datatype = "local";
        let dataFields = [];
        if (options.columns != null) {
            for (let column of options.columns) {
                if (column.field == null || column.field.length == 0)
                    continue;
                let dataField = {
                    name: column.field,
                };
                dataField.type = that.getDataSourceType(column.type);
                dataFields.push(dataField);
                if (column.displayField != null) {
                    let dataField = {
                        name: column.displayField,
                    };
                    dataField.type = SourceTypeEnum.String;
                    dataFields.push(dataField);
                }
            }
            let dataFieldId = {
                name: options.dataSourceFieldId,
                type: "string",
            };
            dataFields.push(dataFieldId);
            dataSource.datafields = dataFields;
            this._dataSourceAdapter = new window.jqx.dataAdapter(dataSource);
        }
        //#region Toolbar
        let spanTotalGrid;
        let renderToolbar = undefined;
        if (options.toolbar != null) {
            renderToolbar = (statusBar) => {
                let container = $("<div style='overflow: hidden; position: relative; margin: 4px;'></div>");
                for (let toolbarItem of options.toolbar) {
                    if (options.toolbar == null)
                        toolbarItem.visible = true;
                    let text = "";
                    let iconClass = "";
                    let buttonClass = "";
                    let enabled = true;
                    let elementId = "";
                    switch (toolbarItem.type) {
                        case ToolbarItemType.Add:
                            {
                                text = (toolbarItem.text != null) ? toolbarItem.text : "Add";
                                buttonClass = "jqx-grid-add";
                                elementId = toolbarItem.value != null ? toolbarItem.value : buttonClass + "_" + that.elementId;
                            }
                            break;
                        case ToolbarItemType.Delete: {
                            text = (toolbarItem.text != null) ? toolbarItem.text : "Remove Selected";
                            buttonClass: "jqx-grid-delete";
                            elementId = toolbarItem.value != null ? toolbarItem.value : buttonClass + "_" + that.elementId;
                        }
                        case ToolbarItemType.Custom:
                            {
                                text = (toolbarItem.text != null) ? toolbarItem.text : "";
                                iconClass = (toolbarItem.iconClass != null) ? toolbarItem.iconClass : "";
                                buttonClass = "jqx-grid-" + ((toolbarItem.value != null) ? toolbarItem.value : "custom");
                                elementId = toolbarItem.value != null ? toolbarItem.value : buttonClass + "_" + that.elementId;
                            }
                            break;
                    }
                    let button = $("<button class='jqx-grid-toolbarItems " + buttonClass + "' id='" + elementId + "'>" + text + "</button>").jqxButton({
                        // imgSrc: "https://jqwidgets.com/jquery-widgets-demo/images/andrew.png",
                        imgPosition: "left",
                        textImageRelation: "imageBeforeText",
                        imgWidth: 16,
                        imgHeight: 16,
                        theme: "bootstrap",
                    });
                    if (toolbarItem.visible)
                        $(button).show();
                    else
                        $(button).hide();
                    $(button).on('click', () => {
                        if (toolbarItem.type == ToolbarItemType.Delete) {
                            let checkedItems = this.getCheckedItems();
                            let deletedItemsId = checkedItems.filter(k => k != null).map(k => k.uid);
                            this._jqxGrid.deleterow(deletedItemsId);
                            this._jqxGrid.clearselection();
                            let pagesText = (that._jqxGrid.getselectedrowindexes().length == 1) ? "elemento" : "elementi";
                            $(spanTotalGrid).html(`${that._jqxGrid.getselectedrowindexes().length} ${pagesText} selezionati`);
                            if (toolbarItem.delete != null) {
                                let toolbarClickEvent = new ToolbarClickEvent();
                                toolbarClickEvent.deletedItems = deletedItemsId;
                                toolbarItem.delete(toolbarClickEvent);
                            }
                        }
                        else {
                            if (toolbarItem.click != null) {
                                let toolbarClickEvent = new ToolbarClickEvent();
                                toolbarClickEvent.type = toolbarItem.type;
                                toolbarItem.click(toolbarClickEvent);
                            }
                        }
                    });
                    container.append($(button)[0]);
                    spanTotalGrid = $("<span class='grdTotalItems'></span>")[0];
                    container.append(spanTotalGrid);
                }
                statusBar.append(container);
            };
        }
        //#endregion
        let optionsGrid = {
            width: options.width,
            enabletooltips: true,
            height: options.height,
            source: this._dataSourceAdapter,
            editable: options.editable,
            columns: jqColumns,
            filterable: options.filterable,
            sortable: options.sortable,
            pageable: options.pagination,
            pagerheight: options.pagination != null ? 30 : "",
            autoshowfiltericon: true,
            groupable: options.groupable,
            selectionmode: "checkbox",
            columnsheight: 30,
            showtoolbar: (options.toolbar != null && options.toolbar.length > 0) ? true : false,
            rendertoolbar: renderToolbar,
            // (options.checkBoxes) ? SelectionMode.CheckBox : ((that._editable) ? SelectionMode.MultipleCellsAdvanced : SelectionMode.None),
            theme: "bootstrap",
        };
        this._jqxGrid = jqwidgets.createInstance("#" + this.elementId, "jqxGrid", optionsGrid);
        $("#" + this.elementId).on("cellclick", (e) => {
            //#region Selection on click
            if (e.args.datafield != "_checkboxcolumn") {
                // if (this.options.clearSelectionAtRowClick) 
                //this.clearSelection();
                let checkedItemsIndexes = that.getCheckedItems().map((k) => k.boundindex);
                if (!checkedItemsIndexes.includes(e.args.rowindex))
                    that.selectRowByIndex(e.args.rowindex);
                else
                    that.deselectRowByIndex(e.args.rowindex);
            }
            //#endregion
            //#region Clear focus when edit
            let field = e.args.datafield;
            if (that._cellClickEditingCount.has(field)) {
                let editingFieldCount = that._cellClickEditingCount.get(field);
                editingFieldCount++;
            }
            else {
                that._cellClickEditingCount.clear();
                that._cellClickEditingCount.set(field, 0);
            }
            //#endregion
        });
        $("#" + this.elementId).on("cellendedit", (e) => {
            let args = e.args;
            if (args == null)
                return;
            let dataField = args.datafield;
            let displayField = args.displayfield;
            let value = args.value;
            let oldvalue = args.oldvalue;
            let realRowData = that._jqxGrid.getrowdatabyid(that._currentlyEditedRow.uid);
            realRowData[dataField] = value;
            if (value != null && value.value != null && displayField != null) {
                realRowData[dataField] = value.value;
                realRowData[displayField] = value.label;
            }
            if (!this._updatedItems.map((k) => k[that.options.dataSourceFieldId]).includes(args.row[that.options.dataSourceFieldId]))
                this._updatedItems.push(realRowData);
            that._currentlyEditedRow = null;
            value = value == null || value.value == null ? value : value.value;
            oldvalue = oldvalue == null || oldvalue.value == null ? oldvalue : oldvalue.value;
        });
        $("#" + this.elementId).on("rowselect", (e) => {
            if (options.onSelectRow != null) {
                let pagesText = (that._jqxGrid.getselectedrowindexes().length == 1) ? "elemento" : "elementi";
                $(spanTotalGrid).html(`${that._jqxGrid.getselectedrowindexes().length} ${pagesText} selezionati`);
                let selectRowEvent = new SelectRowEvent();
                selectRowEvent.checked = true;
                selectRowEvent.rowElement = e.args.row;
                options.onSelectRow(selectRowEvent);
            }
        });
        $("#" + this.elementId).on("rowunselect", (e) => {
            let args = e.args;
            if (args.row == null)
                return;
            let rowData = args.row;
            let pagesText = (that._jqxGrid.getselectedrowindexes().length == 1) ? "elemento" : "elementi";
            $(spanTotalGrid).html(`${that._jqxGrid.getselectedrowindexes().length} ${pagesText} selezionati`);
            //#region Row unselect event
            let rowUnselectEvent = new RowUnselectEvent();
            rowUnselectEvent.dataItem = rowData;
            rowUnselectEvent.itemIndex = rowData.boundindex;
            rowUnselectEvent.allRows = false;
            if (options.rowUnselect != null)
                options.rowUnselect(rowUnselectEvent);
            //#endregion
        });
        $("#" + this.elementId).on('sort', (e) => {
            this._jqxGrid.clearselection();
            let pagesText = (that._jqxGrid.getselectedrowindexes().length == 1) ? "elemento" : "elementi";
            $(spanTotalGrid).html(`${that._jqxGrid.getselectedrowindexes().length} ${pagesText} selezionati`);
        });
        $("#" + this.elementId).on('filter', (e) => {
            this._jqxGrid.clearselection();
            let pagesText = (that._jqxGrid.getselectedrowindexes().length == 1) ? "elemento" : "elementi";
            $(spanTotalGrid).html(`${that._jqxGrid.getselectedrowindexes().length} ${pagesText} selezionati`);
        });
        //#region ContextMenu
        if (options.contextMenu) {
            let contextMenuControl = $("<div id='jqxMenu'></div>").appendTo(this.element);
            let contextMenuBody = $(`
      <ul>
        <li id='currentView'>Add to current view</li>
        <li id='newCollectionView'>Add to new collection view</li>
      </ul>`).appendTo("#jqxMenu")[0];
            this._contextMenu = $("#jqxMenu").jqxMenu({ width: '140px', height: '120px', autoOpenPopup: false, mode: 'popup', theme: "bootstrap" });
            $("#" + this.elementId).on('mousedown', (e) => {
                // get the clicked cell
                let cell = $("#" + this.elementId).jqxGrid('getCellAtPosition', e.pageX, e.pageY);
                let item = this._jqxGrid.getrowdata(cell.row);
                //select row.
                if (cell != null && cell.row) {
                    $("#" + this.elementId).jqxGrid('selectrow', cell.row);
                }
                let rightClick = isRightClick(e) || $.jqx.mobile.isTouchDevice();
                if (rightClick) {
                    let scrollTop = $(window).scrollTop();
                    let scrollLeft = $(window).scrollLeft();
                    this._contextMenu.jqxMenu('open', parseInt(e.clientX) + 5 + scrollLeft, parseInt(e.clientY) + 5 + scrollTop);
                    $("#jqxMenu").off().on('itemclick', (e) => {
                        if (options.onContextMenuClick != null) {
                            let menuClickEvent = new ContextMenuClickEvent();
                            menuClickEvent.sender = $(this._contextMenu)[0];
                            menuClickEvent.item = this.dataSource().filter(k => k.id == item.id)[0];
                            menuClickEvent.contextMenuId = e.args.id;
                            options.onContextMenuClick(menuClickEvent);
                        }
                    });
                    return false;
                }
            });
            //disable the default browser's context menu.
            $(document).bind('contextmenu', function (e) {
                return false;
            });
            function isRightClick(event) {
                let rightclick = false;
                if (!event)
                    event = window.event;
                if (event.which)
                    rightclick = (event.which == 3);
                else if (event.button)
                    rightclick = (event.button == 2);
                return rightclick;
            }
        }
        //#endregion
    }
    getDataSourceType(type) {
        switch (type) {
            case ColumnTypeEnum.String:
                return "string";
            case ColumnTypeEnum.Checkbox:
                return "bool";
            case ColumnTypeEnum.Date:
                return "date";
            case ColumnTypeEnum.Time:
                return "date";
            case ColumnTypeEnum.DateTime:
                return "date";
            case ColumnTypeEnum.Duration:
                return "number";
            case ColumnTypeEnum.Number:
                return "number";
            case ColumnTypeEnum.Currency:
                return "number";
            case ColumnTypeEnum.Percentage:
                return "number";
            case ColumnTypeEnum.DropDownList:
                return "string";
            case ColumnTypeEnum.DropDownListCheckbox:
                return "template";
            case ColumnTypeEnum.ComboBox:
                return "string";
            case ColumnTypeEnum.ComboBoxCheckbox:
                return "template";
            case ColumnTypeEnum.DropDownTree:
                return "string";
            case ColumnTypeEnum.DropDownTreeCheckbox:
                return "string";
            case ColumnTypeEnum.Button:
                return "string";
            case ColumnTypeEnum.Label:
                return "string";
            case ColumnTypeEnum.Custom:
                return "string";
            case ColumnTypeEnum.TextBox:
                return "string";
            case ColumnTypeEnum.EditButton:
                return "string";
            case ColumnTypeEnum.Image:
                return "string";
            default:
                return undefined;
        }
    }
    dataSource(items) {
        if (items != null) {
            //#region Fill Datasource
            this._originalGridState = this._jqxGrid.getstate();
            this._actualGridState = this._jqxGrid.getstate();
            this._dataSourceAdapter._source.localdata = items;
            this._dataSourceAdapter._source.datatype = "json";
            this._jqxGrid.source = this._dataSourceAdapter;
            $("#" + this.elementId).jqxGrid({ source: this._dataSourceAdapter });
            //#endregion
            //#region Create original Datasource
            this._currentUnchangedItems = [];
            for (let item of items) {
                let currentItem = jQuery.extend(true, {}, item);
                this._currentUnchangedItems.push(currentItem);
            }
            //#endregion
        }
        return this._currentUnchangedItems;
    }
    rebind(parameters) {
        let setDataSourceSettings = this.options.setDataSource;
        if (setDataSourceSettings != null) {
            let event = new GridRebindEvent();
            event.sender = this;
            event.parameters = parameters;
            setDataSourceSettings(event);
        }
    }
    getCheckedItemsValues(key) {
        return this.getCheckedItems().map((k) => key != null ? k[key] : k[this.options.dataSourceFieldId]);
    }
    getCheckedItems() {
        let dataRows = [];
        for (let rowIndex of this._jqxGrid.getselectedrowindexes()) {
            let dataRow = this._jqxGrid.getrowdata(rowIndex);
            dataRows.push(this.dataSource().filter(k => k.id == dataRow.id)[0]);
        }
        return dataRows;
    }
    clearSelection() {
        this._jqxGrid.clearselection();
    }
    selectRow(rowId) {
        let rows = $("#" + this.elementId).jqxGrid("getdisplayrows");
        let rowToSelect = rows.filter(k => k[this.options.dataSourceFieldId] == rowId)[0];
        if (rowToSelect != null)
            this.selectRowByIndex(rowToSelect.boundindex);
    }
    deselectRow(rowId) {
        let rows = $("#" + this.elementId).jqxGrid("getdisplayrows");
        let rowToDeselect = rows.filter(k => k[this.options.dataSourceFieldId] == rowId)[0];
        if (rowToDeselect != null)
            this.deselectRowByIndex(rowToDeselect.boundindex);
    }
    addRow(datarow) {
        this.addRows([datarow]);
    }
    addRows(dataRows) {
        let rows = $("#" + this.elementId).jqxGrid("getdisplayrows");
        for (let row of dataRows) {
            if (rows.filter(k => k.id == row.id).length == 0) {
                $("#" + this.elementId).jqxGrid("addrow", null, row);
                this._currentUnchangedItems.push(row);
            }
        }
    }
    selectRowByIndex(index) {
        $("#" + this.elementId).jqxGrid("selectrow", index);
    }
    deselectRowByIndex(index) {
        $("#" + this.elementId).jqxGrid("unselectrow", index);
    }
    getSelectedRowIndex() {
        this._jqxGrid.getselectedrowindex();
    }
    show() {
        $("#" + this.elementId).show();
    }
    hide() {
        $("#" + this.elementId).hide();
    }
    clear() {
        $("#" + this.elementId).jqxGrid("clearselection");
    }
}
//#region Classes
export class ContextMenuClickEvent {
}
class SelectRowEvent {
}
class RowUnselectEvent {
}
//#endregion
