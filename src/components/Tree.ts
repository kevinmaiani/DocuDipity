  export class TreeOptions {
      rebind?: RebindTreeRequest;
      dataSource?: any[];
      contextMenu?: boolean;
      fields?: TreeSourceDataField[];
      records?: TreeRecordItem;
      dataSourceFieldId?: string;
      height?: string;
      width?: string;
      onContextMenuClick?(e: ContextMenuClickEvent): void;
    
      constructor(options: TreeOptions) {
        if (options != null) {
          if (options.height != null) this.height = options.height;
          if (options.width != null) this.height = options.width;
          if (options.fields != null) this.fields = options.fields;
          if (options.records != null) this.records = options.records;
          if (options.dataSource != null) this.dataSourceFieldId = options.dataSourceFieldId;
          if (options.dataSource != null) this.dataSource = options.dataSource;
    
          if (options.rebind != null) this.rebind = options.rebind;
    
          if (options.contextMenu != null) this.contextMenu = options.contextMenu;
    
          if (options.onContextMenuClick != null)
            this.onContextMenuClick = options.onContextMenuClick;
        }
      }
    }
    
    export class Tree {
      public _options: TreeOptions;
      private _jqxTree: jqwidgets.jqxTree;
      private _dataSourceAdapter: any;
      private _contextMenu: jqwidgets.jqxMenu;
      private _currentUnchangedItems: any[] = [];
      public element: HTMLElement;
      public elementId: string;
    
      constructor(structure: any) {
        this._options = new TreeOptions(structure.settings);
        this.element = document.getElementById(structure.elementId)!;
        this.elementId = structure.elementId;
    
        if (this._options.fields == null) this._options.fields = [];
        
        if (this._options.dataSourceFieldId == null)
          this._options.dataSourceFieldId = "id";

        if (this._options.contextMenu == null) this._options.contextMenu = false;
    
        let dataSource: any = {}; 
        dataSource.id = this._options.dataSourceFieldId;
        dataSource.datatype = "local";
        dataSource.datafields = this._options.fields;   
        this._dataSourceAdapter = new $.jqx.dataAdapter(dataSource);

        if (this._options.records == null)
          this._options.records = {} as TreeRecordItem;
    
        let treeOptions: jqwidgets.TreeOptions = 
        {
          checkboxes: true,
          height: this._options.height,
          hasThreeStates: true,
          theme: "bootstrap",
          animationShowDuration: 0,
          toggleMode: 'click'        
        };

        this._jqxTree = jqwidgets.createInstance(
          "#" + this.elementId,
          "jqxTree",
          treeOptions
        ) as jqwidgets.jqxTree;

        this.configure();
      }
    
      configure() {
        if (this._options.contextMenu) {
          let contextMenuControl = $("<div id='jqxMenu'></div>").appendTo( this.element);
          let contextMenuBody = $(`
            <ul>
              <li id='currentView'>Add to current view</li>
              <li id='newCollectionView'>Add to new collection view</li>
            </ul>`).appendTo("#jqxMenu")[0] as HTMLDivElement;
    
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

          $("#" + this.elementId).on("mousedown", (e: any) => {
              let target = $(e.target).parents().first()[0];
              let rightClick = isRightClick(e);
              if (rightClick && (target != null && $(target).is("li")) ) 
              {
                this._jqxTree.checkItem(target, true);
                let scrollTop = $(window).scrollTop();
                let scrollLeft = $(window).scrollLeft();
    
                (<any>this._contextMenu).jqxMenu("open",parseInt(e.clientX) + 5 + scrollLeft!,parseInt(e.clientY) + 5 + scrollTop!);
    
                $("#jqxMenu").off().on("itemclick", (e: any) => 
                {
                  if (e.defaultPrevented) 
                    return;
                  
                  if (this._options.onContextMenuClick != null) {
                      let checkedItems = ($("#" + this.elementId) as any).jqxTree("getCheckedItems") as any[];
                      let expressions = checkedItems.filter(k => !k.hasItems && k.level == 2);
                      let dataItems = [];
                    for(let item of expressions){
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
    
          function isRightClick(event: any) {
            let rightclick: boolean = false;
            if (!event) event = window.event;
    
            if (event.which) rightclick = event.which == 3;
            else if (event.button) rightclick = event.button == 2;
    
            return rightclick;
          }
        }
        //#endregion
      }
    
      dataSource(items?: any[]) {
        if (items != null) {
          this._dataSourceAdapter._source.localdata = items;
          this._dataSourceAdapter.dataBind();
    
          let records = this._dataSourceAdapter.getRecordsHierarchy(
            this._options.records!.id,
            this._options.records!.father,
            "items",
            [{ name: this._options.records!.text, map: "label" }]
          );
    
          $("#" + this.elementId).jqxTree({ source: records });
          
          this._jqxTree.getItems().filter(k => k.element as HTMLElement).forEach(k => {
            k.element.setAttribute("title", k.label);
          });
          //#region Create original Datasource
          this._currentUnchangedItems = [];
          for (let item of items) 
          {
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
      public authKey?: string;
      public method?: string;
    }
    export class TreeItem {
      id: string;
      expanded?: boolean;
      label: string;
      father?: string;
      list?: any[];
    }
    
    export class ContextMenuClickEvent {
      sender: jqwidgets.jqxMenu;
      item: any;
      contextMenuId: string;
    }
    
    export interface TreeSourceDataField {
      name: string;
    }
    export interface TreeRecordItem {
      id: string;
      father: string;
      text: string;
    }
    class DocumentSet {
      public _id: string;
      public name: string;
      public desc: string;
      public upload: string;
      public father?: string;
    }
    
    class DocumentExpressions {
      public _id: string;
      public title: string;
      public desc: string;
      public owner: string;
      public author: string;
      public year: number;
      public documentSet: string;
    }
    //#endregion
    