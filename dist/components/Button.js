export class ButtonOptions {
    constructor(options) {
        if (options != null) {
            if (options.width != null)
                this.width = options.width;
            if (options.height != null)
                this.height = options.height;
            if (options.value != null)
                this.value = options.value;
            if (options.imgsrc != null)
                this.imgsrc = options.imgsrc;
            if (options.onClick != null)
                this.onClick = options.onClick;
        }
    }
}
export class Button {
    constructor(structure) {
        this._options = new ButtonOptions(structure.settings);
        this.element = document.getElementById(structure.elementId);
        this.elementId = structure.elementId;
        if (this._options.height == null)
            this._options.height = "27px";
        if (this._options.width == null)
            this._options.width = "65px";
        if (this._options.imgsrc == null)
            this._options.imgsrc = "";
        this.draw(this._options);
    }
    draw(options) {
        let that = this;
        let ButtonsOptions = {
            height: options.height,
            width: options.width,
            value: options.value,
            imgSrc: options.imgsrc,
            imgPosition: (options.value != null) ? "left" : "center",
            textPosition: "center",
            textImageRelation: (options.value != null) ? "imageBeforeText" : "overlay",
            imgWidth: 16,
            imgHeight: 16,
            theme: "bootstrap",
        };
        this._jqxButton = jqwidgets.createInstance("#" + this.elementId, "jqxButton", ButtonsOptions);
        $(this.element.parentElement.children[1]).on('click', (e) => {
            if (that._options.onClick != null)
                that._options.onClick(e);
        });
    }
    css(cssString) {
        var _a;
        let element = (_a = this.element.parentElement) === null || _a === void 0 ? void 0 : _a.lastElementChild;
        element.style.cssText += cssString;
    }
}
