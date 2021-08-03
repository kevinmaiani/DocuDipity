export class ComboBoxOptions {
    width?: string | number;
    dataItem?: any[];
    disable?: boolean;
    change?(e: ComboBoxChangeEvent): void;

    constructor(options: ComboBoxOptions) {
        if(options != null) {
            if (options.width != null) this.width = options.width;
            if (options.dataItem != null) this.dataItem = options.dataItem;
            if (options.disable != null) this.disable = options.disable;
            if (options.change != null) this.change = options.change;
        }
    }
}

export class ComboBox {
    public _options: ComboBoxOptions;
    public _jqxComboBox: jqwidgets.jqxComboBox;
    public element: HTMLElement;
    public elementId: string;
    
    constructor(structure: any) {
        this._options = new ComboBoxOptions(structure.settings);
        this.element = document.getElementById(structure.elementId)!;
        this.elementId = structure.elementId;
        
        if (this._options.dataItem == null) this._options.dataItem = [];
        if (this._options.disable == null) this._options.disable = false;
        this.draw(this._options);
    }

    private draw(options: ComboBoxOptions) {  
        let that = this;
 
        let ComboBoxsOptions : jqwidgets.ComboBoxOptions = 
        {
            width:options.width,
            source: options.dataItem,
            selectedIndex: 0,
            disabled: options.disable,          
        };

        this._jqxComboBox = jqwidgets.createInstance(
            "#" + this.elementId,
            "jqxComboBox",
            ComboBoxsOptions
        ) as jqwidgets.jqxComboBox;

        $(this.element).on('change', function (e : any) {
            var args = e.args;
            if (args) {
                //var index = args.index;
                var item = args.item;
                
                let changeUserEvent = new ComboBoxChangeEvent();
                changeUserEvent.value = item;

                if(that._options.change != null)
                    that._options.change(changeUserEvent)
            }
        });
    }

    css(cssString: string) {
        $(this.element)[0].style.cssText += cssString;
    }
}

class ComboBoxEvent
{
    sender: ComboBox;
    value: any;
    childrenValues: string[];
    // selectedItem?: ComboBoxItem;
    checked: boolean;
    isParent?: boolean;
}

class ComboBoxChangeEvent extends ComboBoxEvent
{

}