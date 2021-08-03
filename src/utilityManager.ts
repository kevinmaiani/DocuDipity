/// <reference path="../node_modules/jqwidgets-scripts/jqwidgets-ts/jqwidgets.d.ts" />

import { DocuCard, DocuCardOptions } from "./components/DocuCard.js";
import { DocuCardList } from "./components/DocuCardList.js";
import { Tab, TabOptions } from "./components/TabStrip.js";
import { Grid, GridOptions } from './components/Grid.js';
import { ComboBox, ComboBoxOptions } from "./components/ComboBox.js";
import { Button, ButtonOptions } from "./components/Button.js";
import { DocuRender, DocuRenderOptions } from "./components/DocuRender.js";
import { ButtonBar, ButtonBarOptions } from "./components/ButtonBar.js";
import { Tree, TreeOptions } from "./components/Tree.js";

export function createDocumentPreview(options?: DocuCardOptions | null, container?: HTMLElement | JQuery | null, elementId?: string | null) : DocuCard
{
    let elementD = new DocuCard(options!);
    $(elementD).appendTo(container!);

    return elementD;
}
export function createDocumentListPreview(options?: DocuCardOptions | null, container?: HTMLElement | JQuery | null, elementId?: string | null) : DocuCardList
{
    let elementD = new DocuCardList(options!, container);
    return elementD;
}

export function createGrid(id: string, options?: GridOptions | null, rebind: boolean = false) : Grid
{
    if (!id.startsWith("#") && !id.startsWith("."))
            id = "#" + id;
    
    let element = $(id);
    let control = $(element).docuGrid(options);

    if (rebind)
        control.rebind();
            
    //window.setTimeout(() => control.rebind());

    return control;
}

export function createjqxTabs(id: string, options?: TabOptions | null) : Tab
{
    if (!id.startsWith("#") && !id.startsWith("."))
            id = "#" + id;
    
    let element = $(id);
    let control = $(element).docuTabs(options);

    return control;
}

export function createComboBox(id: string, options?: ComboBoxOptions | null, container?: HTMLElement) : ComboBox
{   
    let element = createControls(ControlTypeEnum.ComboBox, container, id);
    let control = $(element).docuComboBox(options);

    return control;
}

export function createButton(id: string, container: HTMLElement, options?: ButtonOptions | null) : Button {
    let element = createControls(ControlTypeEnum.Button, container, id);
    let control = $(element).docuButton(options);

    return control;
}

export function createDocuRender(options?: DocuRenderOptions | null, container?: HTMLElement, elementId?: string | null) : DocuRender
{
    let element = createControls(ControlTypeEnum.DocuRender, container, elementId);
    let control = $(element).docuRender(options);

    return control;
}

export function createButtonBar(elementId?: string | null, options?: ButtonBarOptions | null, container?: HTMLElement) : ButtonBar
{
    let element = createControls(ControlTypeEnum.ButtonBar, container, elementId);
    let control = $(element).docuButtonBar(options);

    return control;
}

export function createTree(elementId?: string | null, options?: TreeOptions | null, container?: HTMLElement) : Tree
{
    let element = createControls(ControlTypeEnum.Tree, container, elementId);
    let control = $(element).docuTree(options);

    return control;
}

export function getXML(callback: Function, method: string){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState === 4 && xhttp.status === 200) {
	       callback(xhttp.responseText);
	    }
	};

	//console.log("data/xml/"+data);
	xhttp.open("GET", method, true);
	xhttp.send();
}


function createControls(controlTypeEnum: ControlTypeEnum, container?: HTMLElement, elementId?: string | null, options?: any[]) {

    // if (!(elementId!).startsWith("#") && !(elementId!).startsWith("."))
    //     elementId = "#" + elementId;

    let element = null;
    let elementTag = "";
    switch(controlTypeEnum) {
        case ControlTypeEnum.DocuRender: case ControlTypeEnum.ComboBox : case ControlTypeEnum.ButtonBar : case ControlTypeEnum.Tree: 
        elementTag = "div";
        break;
        case ControlTypeEnum.Button: 
        elementTag = "button";
        break;
    }

    element = $("<" + elementTag + " id='" + elementId + "'></" + elementTag + ">")[0];

    if(container != null)  
        container.appendChild(element);

    return element;

}

//#region Jquery
jQuery.fn.extend(
	{ 
    docuComboBox: function (options?: ComboBoxOptions | null)
    {
        let element = $(this)[0] as HTMLElement;
        let structure : any = {
            settings: options,
            element: element,
            elementId: element.id
        };
        return new ComboBox(structure);
    },
        docuGrid: function (options?: GridOptions | null)
        {
            let element = $(this)[0] as HTMLElement;
            let structure : any = {
                settings: options,
                element: element,
                elementId: element.id
            };
            return new Grid(structure);
        },
        docuTabs: function (options?: TabOptions | null)
        {
            let element = $(this)[0] as HTMLElement;
            let structure : any = {
                settings: options,
                element: element,
                elementId: element.id
            };
            return new Tab(structure);
        },
 
        docuButton: function (options?: ButtonOptions | null)
        {
            let element = $(this)[0] as HTMLElement;
            let structure : any = {
                settings: options,
                element: element,
                elementId: element.id
            };
            return new Button(structure);
        },
        docuRender: function (options?: DocuRenderOptions | null) {
            let element = $(this)[0] as HTMLElement;
            return new DocuRender(element, options);
        },
        docuButtonBar: function (options?: ButtonBarOptions | null) {
            let element = $(this)[0] as HTMLElement;
            return new ButtonBar(element, options);
        },
        docuTree: function (options?: TreeOptions | null) {
            let element = $(this)[0] as HTMLElement;
            let structure : any = {
                settings: options,
                element: element,
                elementId: element.id
            };
            return new Tree(structure);
        }
    });

    declare global {
        interface JQuery {
            docuGrid(options?: GridOptions | null) : Grid;
            docuTabs(options?: TabOptions | null) : Tab;
            docuComboBox(options?: ComboBoxOptions | null) :ComboBox;
            docuButton(options?: ButtonOptions | null): Button;
            docuRender(options?: DocuRenderOptions | null) : DocuRender;
            docuButtonBar(options?: ButtonBarOptions | null) : ButtonBar;
            docuTree(options?: TreeOptions | null) : Tree;

            jqxGrid(options: jqwidgets.GridOptions) : jqwidgets.jqxGrid;
            jqxTabs(options: jqwidgets.TabsOptions) : jqwidgets.jqxTabs;
            jqxComboBox(options: any) : jqwidgets.jqxComboBox;
            jqxTree(options: any) : jqwidgets.jqxTree;
            jqxButton(options: jqwidgets.ButtonOptions) : jqwidgets.jqxButton;
            jqxMenu(options: jqwidgets.MenuOptions) : jqwidgets.jqxMenu;
        }    
    }
//#endregion

export enum ControlTypeEnum {
    DocuRender = "DocuRender",
    Button = "buttonBaseControl",
    ComboBox = "comboBoxBaseControl",
    ButtonBar = "buttonBarControl",
    Tree = "treeControl"
}

