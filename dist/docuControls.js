export class DocuControl {
    constructor(element, type) {
        this._element = element;
        $(element).addClass("docudipity" + type);
    }
    render(template) {
        this._element.innerHTML = template;
    }
}
