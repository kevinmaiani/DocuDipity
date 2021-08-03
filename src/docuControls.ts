import { ControlTypeEnum } from "./utilityManager.js";

export class DocuControl {
  protected _element: HTMLElement;
  constructor(element: HTMLElement, type: ControlTypeEnum) {
    this._element = element!;
    $(element).addClass("docudipity" + type);
  }

  render(template: string) {
    this._element.innerHTML = template;
  }
}
