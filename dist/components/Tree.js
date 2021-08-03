export class TreeOptions {
    constructor(options) {
        if (options != null) {
            if (options.height != null)
                this.height = options.height;
            if (options.width != null)
                this.height = options.width;
            if (options.fields != null)
                this.fields = options.fields;
            if (options.records != null)
                this.records = options.records;
            if (options.dataSource != null)
                this.dataSourceFieldId = options.dataSourceFieldId;
            if (options.dataSource != null)
                this.dataSource = options.dataSource;
            if (options.rebind != null)
                this.rebind = options.rebind;
            if (options.contextMenu != null)
                this.contextMenu = options.contextMenu;
            if (options.onContextMenuClick != null)
                this.onContextMenuClick = options.onContextMenuClick;
        }
    }
}
export class Tree {
    constructor(structure) {
        this._currentUnchangedItems = [];
        this._options = new TreeOptions(structure.settings);
        this.element = document.getElementById(structure.elementId);
        this.elementId = structure.elementId;
        if (this._options.fields == null)
            this._options.fields = [];
        if (this._options.dataSourceFieldId == null)
            this._options.dataSourceFieldId = "id";
        if (this._options.contextMenu == null)
            this._options.contextMenu = false;
        let dataSource = {};
        dataSource.id = this._options.dataSourceFieldId;
        dataSource.datatype = "local";
        dataSource.datafields = this._options.fields;
        this._dataSourceAdapter = new $.jqx.dataAdapter(dataSource);
        if (this._options.records == null)
            this._options.records = {};
        let treeOptions = {
            checkboxes: true,
            height: this._options.height,
            hasThreeStates: true,
            theme: "bootstrap",
            animationShowDuration: 0,
            toggleMode: 'click'
        };
        this._jqxTree = jqwidgets.createInstance("#" + this.elementId, "jqxTree", treeOptions);
        this.configure();
    }
    configure() {
        if (this._options.contextMenu) {
            let contextMenuControl = $("<div id='jqxMenu'></div>").appendTo(this.element);
            let contextMenuBody = $(`
            <ul>
              <li id='currentView'>Add to current view</li>
              <li id='newCollectionView'>Add to new collection view</li>
            </ul>`).appendTo("#jqxMenu")[0];
            this._contextMenu = $("#jqxMenu").jqxMenu({
                width: "140px",
                height: "77px",
                autoOpenPopup: false,
                mode: "popup",
                theme: "bootstrap",
                animationShowDuration: 0
            });
            //#region events
            // $("#" + this.elementId).on('select', (e: any) => {
            //   let args = e.args;
            //   let item = this._jqxTree.getItem(args.element);
            //   if(this._jqxTree.getItem(args.element).checked) {
            //     this._jqxTree.checkItem(item, false);
            //   }
            //   else
            //     this._jqxTree.checkItem(item, true);
            //  });
            $("#" + this.elementId).on("mousedown", (e) => {
                let target = $(e.target).parents().first()[0];
                let rightClick = isRightClick(e);
                if (rightClick && (target != null && $(target).is("li"))) {
                    this._jqxTree.checkItem(target, true);
                    let scrollTop = $(window).scrollTop();
                    let scrollLeft = $(window).scrollLeft();
                    this._contextMenu.jqxMenu("open", parseInt(e.clientX) + 5 + scrollLeft, parseInt(e.clientY) + 5 + scrollTop);
                    $("#jqxMenu").off().on("itemclick", (e) => {
                        if (e.defaultPrevented)
                            return;
                        if (this._options.onContextMenuClick != null) {
                            let checkedItems = $("#" + this.elementId).jqxTree("getCheckedItems");
                            let expressions = checkedItems.filter(k => !k.hasItems && k.level == 2);
                            let dataItems = [];
                            for (let item of expressions) {
                                dataItems.push(this.dataSource().filter(k => k.id == item.id)[0]);
                            }
                            let menuClickEvent = new ContextMenuClickEvent();
                            menuClickEvent.contextMenuId = e.args.id;
                            menuClickEvent.item = dataItems;
                            this._options.onContextMenuClick(menuClickEvent);
                        }
                    });
                    return false;
                }
            });
            $(document).bind("contextmenu", function (e) {
                if ($(e.target).parents(".jqx-tree").length > 0) {
                    return false;
                }
                return true;
            });
            function isRightClick(event) {
                let rightclick = false;
                if (!event)
                    event = window.event;
                if (event.which)
                    rightclick = event.which == 3;
                else if (event.button)
                    rightclick = event.button == 2;
                return rightclick;
            }
        }
        //#endregion
    }
    dataSource(items) {
        if (items != null) {
            this._dataSourceAdapter._source.localdata = items;
            this._dataSourceAdapter.dataBind();
            let records = this._dataSourceAdapter.getRecordsHierarchy(this._options.records.id, this._options.records.father, "items", [{ name: this._options.records.text, map: "label" }]);
            $("#" + this.elementId).jqxTree({ source: records });
            this._jqxTree.getItems().filter(k => k.element).forEach(k => {
                k.element.setAttribute("title", k.label);
            });
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
    clearSelection() {
        this._jqxTree.clear();
    }
}
//#region Classes
class RebindTreeRequest {
}
export class TreeItem {
}
export class ContextMenuClickEvent {
}
class DocumentSet {
}
class DocumentExpressions {
}
//#endregion
