import { DocuCard } from "./DocuCard.js";

class DocuCardOptions {
  title?: string;
  author?: string;
  text?: string;
  fontSize?: string;
  align?: string;
  iconUrl?: string;
  rebind?: RebindDocuCardRequest;
  dataSource?: any[];
  css?: string;
  template?: (templateEvent: CardTemplateEvent) => string;

  onClick?: (e: Event) => void;
}
export class DocuCardList extends HTMLElement {
  private _dataSource: any[] | null;
  private _options: DocuCardOptions;

  constructor(
    options?: DocuCardOptions,
    container?: HTMLElement | JQuery | null
  ) {
    super();

    this._dataSource = [];

    if (options == null) options = new DocuCardOptions();

    this._options = options!;

    if (container != null) {
      container!.append(this);
     } 

    if (options.dataSource != null) this.dataSource(options.dataSource);
    if (options.rebind != null) {
      this.doWebApiCall(options.rebind);
    }

    if(options.css != null) 
      $(this)[0].style.cssText += options.css;

  }

  dataSource(dataItems?: any) {
    if (dataItems != null) this.setDataSource(dataItems);

    return this._dataSource == null ? [] : this._dataSource;
  }

  getCheckedItems() {
    let docucardElements = this.getElementsByTagName("docu-card");
    let checkBoxList : HTMLInputElement[] = Array.from<HTMLInputElement>(docucardElements as any).map(k => k.shadowRoot!.querySelector("input[type=checkbox]") as HTMLInputElement);;


    let checkBoxCheckedList = checkBoxList.filter((k) => k.checked);

    let checkedItems: any[] = [];

    for (let checkBoxChecked of checkBoxCheckedList) {
      let docucardElement = checkBoxChecked.closest("docu-card") as DocuCard;
      let docuCardElementId = checkBoxChecked.getAttribute("dataItemId");
      let checkedItem = this.dataSource().filter(k => k.id == docuCardElementId)[0];
      checkedItems.push(checkBoxChecked);
    }

    return checkedItems;
  }

  private setDataSource(items: any[]) {
    this._dataSource = items;

    for (let item of items) {
      let dataItemId = item.id;

      let element = null;
      this._options.title = item.name;
      // if(this._options.rebind != null)
      element = new DocuCard(this._options);
      //  else 
      //   element = item; 

      element.id = "docuCard_" + dataItemId;
      $(element).addClass("docudipity_card");
      let checkbox = element.shadowRoot!.querySelector(".check-docucard")!;
      checkbox!.id = item.id + "_check-docucard";
      checkbox!.setAttribute("dataItemId", item.id);
      this.append(element);
    } 
  }

  private doWebApiCall(request: RebindDocuCardRequest) {
    let that = this;
    let json: any = {};
    json.AuthKey = request.authKey;
    //aggiungere al json da inviare all'api eventuali parametri

    // if(!request.method?.startsWith('/api'))
    //     request.method = '/api' + request.method;

    $.ajax({
      method: "GET",
      url: request.method,
      headers: {
        Accept: "application/vnd.api+json",
      },
      contentType: "application/json",
      success: function (response: any) {
        that.dataSource(response);
      },
    });
  }
}
customElements.define("docu-cardlist", DocuCardList);

class RebindDocuCardRequest {
  public authKey?: string;
  public method?: string;
}

class CardTemplateEvent {
  dataItem: any;
  className?: string;
  element: any;
}
