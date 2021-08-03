export class TemplateRenderer extends HTMLElement {
    // private _template:  string;
    constructor() {
        super();
        // this._template = template!;
        this.attachShadow({ mode: "open" });
    }
    render() {
        //this.shadowRoot!.appendChild(this._template.content.cloneNode(true));
        this.shadowRoot.innerHTML = this.template;
    }
}
