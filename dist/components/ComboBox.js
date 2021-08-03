export class ComboBoxOptions {
    constructor(options) {
        if (options != null) {
            if (options.width != null)
                this.width = options.width;
            if (options.dataItem != null)
                this.dataItem = options.dataItem;
            if (options.disable != null)
                this.disable = options.disable;
            if (options.change != null)
                this.change = options.change;
        }
    }
}
export class ComboBox {
    constructor(structure) {
        this._options = new ComboBoxOptions(structure.settings);
        this.element = document.getElementById(structure.elementId);
        this.elementId = structure.elementId;
        if (this._options.dataItem == null)
            this._options.dataItem = [];
        if (this._options.disable == null)
            this._options.disable = false;
        this.draw(this._options);
    }
    draw(options) {
        let that = this;
        let ComboBoxsOptions = {
            width: options.width,
            source: options.dataItem,
            selectedIndex: 0,
            disabled: options.disable,
        };
        this._jqxComboBox = jqwidgets.createInstance("#" + this.elementId, "jqxComboBox", ComboBoxsOptions);
        $(this.element).on('change', function (e) {
            var args = e.args;
            if (args) {
                //var index = args.index;
                var item = args.item;
                let changeUserEvent = new ComboBoxChangeEvent();
                changeUserEvent.value = item;
                if (that._options.change != null)
                    that._options.change(changeUserEvent);
            }
        });
    }
    css(cssString) {
        $(this.element)[0].style.cssText += cssString;
    }
}
class ComboBoxEvent {
}
class ComboBoxChangeEvent extends ComboBoxEvent {
}
