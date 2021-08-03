import { DocuControl } from "../docuControls.js";
import { ControlTypeEnum, createButton } from "../utilityManager.js";
export class ButtonBarOptions {
}
export class ButtonBar extends DocuControl {
    constructor(element, options) {
        super(element, ControlTypeEnum.ButtonBar);
        if (options == null)
            options = new ButtonBarOptions();
        this._options = options;
        if (this._options.buttonValue != null)
            options.buttonValue = options.buttonValue;
        super.render(this.template);
        this.createControls();
        this.configure();
    }
    get template() {
        return `
            <div class='docudipity_btnBarArrowDown' id='docudipity_btnBarArrowDown${this._element.id}'></div>
            <div class='docudipity_btnBarDocSelection' id='docudipity_btnBarDocSelection${this._element.id}'>
                <label class='docudipity_lblDocSelection' id='docudipity_lblDocSelection${this._element.id}' title='${this._options.buttonValue}'>${this._options.buttonValue}</label>
            </div>
            <div class='docudipity_btnBarArrowUp' id='docudipity_btnBarArrowUp${this._element.id}'></div>
            `;
    }
    createControls() {
        this._btnArrowDown = createButton("btnArrowDown_" + this._element.id, $("#docudipity_btnBarArrowDown" + this._element.id)[0], {
            width: 30,
            height: 25,
            imgsrc: "src/icons/arrowdown.png",
        });
        this._btnArrowDown.css("border:none; background:transparent;");
        this._btnArrowUp = createButton("btnArrowUp_" + this._element.id, $("#docudipity_btnBarArrowUp" + this._element.id)[0], {
            width: 30,
            height: 25,
            imgsrc: "src/icons/arrowup.png",
        });
        this._btnArrowUp.css("border:none; background:transparent;");
    }
    configure() {
        this._btnArrowUp.element.parentElement.lastElementChild.addEventListener('click', (e) => {
            if (this._options.onArrowUpClick != null) {
                e.stopPropagation();
                let arrowUpClickEvent = new ArrowUpClickEvent();
                arrowUpClickEvent.value = $(".docudipity_lblDocSelection")[0];
                this._options.onArrowUpClick(arrowUpClickEvent);
            }
        });
        this._btnArrowDown.element.parentElement.lastElementChild.addEventListener('click', (e) => {
            if (this._options.onArrowDownClick != null) {
                e.stopPropagation();
                let arrowDownClickEvent = new ArrowDownClickEvent();
                arrowDownClickEvent.value = $(".docudipity_lblDocSelection")[0];
                this._options.onArrowDownClick(arrowDownClickEvent);
            }
        });
        this._element.addEventListener('click', (e) => {
            if (this._options.onClick != null) {
                this._options.onClick(e);
            }
        });
    }
    css(cssString) {
        $(this._element)[0].style.cssText += cssString;
    }
}
//#region Classes 
export class ArrowUpClickEvent {
}
export class ArrowDownClickEvent {
}
//#endregion
