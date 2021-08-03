import { DocuCard } from "./DocuCard.js";
class DocuCardOptions {
}
export class DocuCardList extends HTMLElement {
    constructor(options, container) {
        super();
        this._dataSource = [];
        if (options == null)
            options = new DocuCardOptions();
        this._options = options;
        if (container != null) {
            container.append(this);
        }
        if (options.dataSource != null)
            this.dataSource(options.dataSource);
        if (options.rebind != null) {
            this.doWebApiCall(options.rebind);
        }
        if (options.css != null)
            $(this)[0].style.cssText += options.css;
    }
    dataSource(dataItems) {
        if (dataItems != null)
            this.setDataSource(dataItems);
        return this._dataSource == null ? [] : this._dataSource;
    }
    getCheckedItems() {
        let docucardElements = this.getElementsByTagName("docu-card");
        let checkBoxList = Array.from(docucardElements).map(k => k.shadowRoot.querySelector("input[type=checkbox]"));
        ;
        let checkBoxCheckedList = checkBoxList.filter((k) => k.checked);
        let checkedItems = [];
        for (let checkBoxChecked of checkBoxCheckedList) {
            let docucardElement = checkBoxChecked.closest("docu-card");
            let docuCardElementId = checkBoxChecked.getAttribute("dataItemId");
            let checkedItem = this.dataSource().filter(k => k.id == docuCardElementId)[0];
            checkedItems.push(checkBoxChecked);
        }
        return checkedItems;
    }
    setDataSource(items) {
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
            let checkbox = element.shadowRoot.querySelector(".check-docucard");
            checkbox.id = item.id + "_check-docucard";
            checkbox.setAttribute("dataItemId", item.id);
            this.append(element);
        }
    }
    doWebApiCall(request) {
        let that = this;
        let json = {};
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
            success: function (response) {
                that.dataSource(response);
            },
        });
    }
}
customElements.define("docu-cardlist", DocuCardList);
class RebindDocuCardRequest {
}
class CardTemplateEvent {
}
