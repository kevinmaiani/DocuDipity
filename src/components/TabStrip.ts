export class TabOptions {
  name?: string;
  width?: string | number;
  height?: string | number;
  selectIndex?: number;
  align?: string;
  dataSource?: any[];
  reordable?: boolean;
  collapsible?: boolean;
  container?: HTMLElement | JQuery; //string | HTMLElement | JQuery;
  items?: TabItem[];
  onSelected?(e: any): void;

  constructor(options: TabOptions) 
  {
      if(options != null) 
      {
          if (options.width != null) this.width = options.width;
          if (options.height != null) this.height = options.height;
          if (options.selectIndex != null) this.selectIndex = options.selectIndex;
          if (options.reordable != null) this.reordable = options.reordable;
          if (options.collapsible != null) this.collapsible = options.collapsible;
          if (options.items != null) this.items = options.items;
          if (options.selectIndex != null) this.selectIndex = options.selectIndex;
          if (options.onSelected != null) this.onSelected = options.onSelected;
      }
  }
}

class TabItem {
  text!: string;
  value?: string;
  icon?: string;
  imageUrl?: string;
  container?: HTMLElement; // HTMLElement | JQuery | string;
  template?: HTMLElement;
}


export class Tab {
  public _options: TabOptions;
  public _jqxTabs: jqwidgets.jqxTabs;
  public element: HTMLElement;
  public elementId: string;
  public _ulList: HTMLElement;
  private _tabList: TabStripItem[];

  constructor(structure: any) {
      this._options = new TabOptions(structure.settings);
      this.element = document.getElementById(structure.elementId)!;
      this.elementId = structure.elementId;
      
      this._tabList = [];

      if (this._options.reordable == null) this._options.reordable = true;
      if (this._options.collapsible == null) this._options.collapsible = false;
      if (this._options.items == null) this._options.items = [];
      this.draw(this._options);

      if (this._options.selectIndex == null) 
      {
          this._options.selectIndex = 0;
          this._jqxTabs.select(this._options.selectIndex);
      }
  }

  private draw(options: TabOptions) {
      this._ulList = $("<ul></ul>")[0];  
      this.element.append(this._ulList);   
      
      for(let item of options.items!) {
          this.setItems(item);
          this._tabList.push(item);
      }
      
      let tabsOptions : jqwidgets.TabsOptions = 
      {
          width:options.width,
          height: options.height,
          reorder: options.reordable,
          collapsible: options.collapsible,
          //theme: "light",
          scrollable: false,
          showCloseButtons: true
      };

      this._jqxTabs = jqwidgets.createInstance(
          "#" + this.elementId,
          "jqxTabs",
          tabsOptions
      ) as jqwidgets.jqxTabs;
      
      $("#" + this.elementId).on('removed', (e: any) => {
        let itemIndex = e.args.item;
        if(itemIndex == 0)
          return;
      });
  }

  configure() 
  {
      if(this._options.onSelected != null) 
      {
          this.onSelect(this._options.onSelected);
      }

  }
  setItems(item: TabItem) {
      $(`<li><a id='${item.value != null ? item.value : ""}'>${item.text != null ? item.text : ""}</a></li>`).appendTo(this._ulList);                         
      this.element.append(item.container!);
  }

  onSelect(callback: Function) {
      $("#" + this.elementId).on('tabclick', (e) => 
      {
          if(callback != null) {
              let selectedTabEvent = new SelectedTab();
              selectedTabEvent.container = $(e.currentTarget.lastElementChild!.lastChild!)[0] as HTMLElement;
              callback(selectedTabEvent);
          }
      });
  }

  addTab(title: string, callback: Function) 
  {
      $("#" + this.elementId).off().on('add', (e : any) => 
      {
          if(callback != null) 
          {
              let tabItem = new TabItem;
              tabItem.container = $(e.currentTarget.lastElementChild!.lastChild!)[0]! as HTMLElement;
              tabItem.value = e.args.item;
              callback(tabItem);
              this.onSelect(this._options.onSelected!);
          }
      });
    this._jqxTabs.addLast(title,'');
  }
}

//#region Classes
export class SelectedTab 
{
  container?: HTMLElement;
  item?: any;
}
class TabStripItem 
{
  text: string;
  value?: string;
  icon?: string;
  imageUrl?: string;
  container?: HTMLElement | JQuery; // HTMLElement | JQuery | string;
  template?: HTMLElement;
}
//#endregion

