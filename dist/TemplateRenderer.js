export class TemplateRenderer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    render() {
        this.shadowRoot.innerHTML = this.template;
    }
}
