import { DocuControl } from "../docuControls.js";
import { DocumentState } from "../state/documentState.js";
import {
  ControlTypeEnum,
  createComboBox,
  createButton,
  createButtonBar,
  getXML,
} from "../utilityManager.js";
import { Button } from "./Button.js";
import {
  ButtonBar,
  ButtonBarOptions,
  ArrowUpClickEvent,
  ArrowDownClickEvent,
} from "./ButtonBar.js";
import { ComboBox } from "./ComboBox.js";

export class DocuRenderOptions {
  buttonText?: string;
  value?: string;
  rebind?: RebindDocuRenderRequest;
  onClick?: (e: any) => void;
  onButtonDownClick?: (e: ArrowDownClickEvent) => void;
  onButtonUpClick?: (e: ArrowUpClickEvent) => void;
}

export class DocuRender extends DocuControl implements DocumentObserver {
  private _options: DocuRenderOptions;
  private _cmbViews: ComboBox;

  constructor(element: HTMLElement, options?: DocuRenderOptions | null) {
    super(element, ControlTypeEnum.DocuRender);

    if (options == null) options = new DocuRenderOptions();

    this._options = options;

    if (options.buttonText != null)
      this._options.buttonText = options.buttonText;
    if (options.value != null) this._options.value = options.value;

    if (options.onButtonDownClick != null)
      this._options.onButtonDownClick = options.onButtonDownClick;
    if (options.onButtonUpClick != null)
      this._options.onButtonUpClick = options.onButtonUpClick;

    super.render(this.template);

    this.createControls();

    if(options.rebind != null)
      this.doWebApiCall(options.rebind.parameters);
  }

  get template() {
    return `
            <div class='docu-render_toolbar' id='docu-render_toolbar${this._element.id}'>
                <div class='docu-render_cmbViews' id='docuRender_cmbViews'></div>
            </div>
            <div class='docu-render_view'>
                <div id='document'></div>`;
  }

  createControls() {
    let that = this;
    this._element.setAttribute("value", this._options.value!);

    let buttonBar = createButtonBar("btnBar_" + this._element.id,
      {
        onArrowDownClick: (e) => {
          if (this._options.onButtonDownClick != null) {
            let arrowDownClickEvent = new ArrowDownClickEvent();
            let value = $(this._element).find( "#docudipity_lblDocSelectionbtnBar_" + this._element.id)[0];
            arrowDownClickEvent.value = value;
            this._options.onButtonDownClick(arrowDownClickEvent);
          }
        },
        onArrowUpClick: (e) => {
          if (this._options.onButtonUpClick != null) {
            let arrowUpClickEvent = new ArrowDownClickEvent();
            let value = $(this._element).find("#docudipity_lblDocSelectionbtnBar_" + this._element.id)[0];

            arrowUpClickEvent.value = value;
            this._options.onButtonUpClick(arrowUpClickEvent);
          }
        },
        onClick: (e) => {
          if (this._options.onClick != null) 
            this._options.onClick(e);
          
        },
        buttonValue: this._options.buttonText,
      },
      $("#docu-render_toolbar" + this._element.id)[0]);

    buttonBar.css(
      "margin-left:4px;border:1.2px solid lightgray;border-radius: 6px;"
    );

    let comboView: ComboBox = createComboBox(
      "cmbViews_" + this._element.id,
      {
        dataItem: ["ReadingView"],
        width: "190px",
      },
      $("#docu-render_toolbar" + this._element.id)[0]
    );
    comboView.css("margin-left:10px");

    let button: Button = createButton(
      "btnRemoveDocumentView_" + this._element.id,
      $("#docu-render_toolbar" + this._element.id)[0],
      {
        width: 23,
        height: 27,
        imgsrc: "src/icons/close.png",
      }
    );
    button.css("margin-left:auto;border:none; background:transparent;"); //border none al figlio
    $(button.element.parentElement!.lastElementChild!)[0].addEventListener(
      "click",
      () => {
        this._element.remove();
      }
    );
  }

  deleteElement() {
    this._element.remove();
  }

  value() {
    return this._element.getAttribute("value");
  }

  setValue(itemId: string) {
    this._element.setAttribute("value", itemId);
  }

  private doWebApiCall(params?: ParameterOptions) {
    let that = this;

    let method : string = "";

    if(params != null) {
      method += `https://docupidity.cs.unibo.it/api/expressions/${params.expressionId}/manifestations/${params.schemaId}`;
    }

    getXML((data : any) =>{
      this.render(data);
    }, method);
  }

  rebind(params: ParameterOptions) {
    this.doWebApiCall(params);
  }
  render(data: string) {
      $(this._element).find("#document").html(data);
  }
}

//#region 
class RebindDocuRenderRequest {
  public method?: string;
  public parameters: ParameterOptions;
}

class ParameterOptions {
  expressionId: string;
  schemaId: string;
}
//#endregion