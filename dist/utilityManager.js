/// <reference path="../node_modules/jqwidgets-scripts/jqwidgets-ts/jqwidgets.d.ts" />
import { DocuCard } from "./components/DocuCard.js";
import { DocuCardList } from "./components/DocuCardList.js";
import { Tab } from "./components/TabStrip.js";
import { Grid } from './components/Grid.js';
import { ComboBox } from "./components/ComboBox.js";
import { Button } from "./components/Button.js";
import { DocuRender } from "./components/DocuRender.js";
import { ButtonBar } from "./components/ButtonBar.js";
import { Tree } from "./components/Tree.js";
export function createDocumentPreview(options, container, elementId) {
    let elementD = new DocuCard(options);
    $(elementD).appendTo(container);
    return elementD;
}
export function createDocumentListPreview(options, container, elementId) {
    let elementD = new DocuCardList(options, container);
    return elementD;
}
export function createGrid(id, options, rebind = false) {
    if (!id.startsWith("#") && !id.startsWith("."))
        id = "#" + id;
    let element = $(id);
    let control = $(element).docuGrid(options);
    if (rebind)
        control.rebind();
    //window.setTimeout(() => control.rebind());
    return control;
}
export function createjqxTabs(id, options) {
    if (!id.startsWith("#") && !id.startsWith("."))
        id = "#" + id;
    let element = $(id);
    let control = $(element).docuTabs(options);
    return control;
}
export function createComboBox(id, options, container) {
    let element = createControls(ControlTypeEnum.ComboBox, container, id);
    let control = $(element).docuComboBox(options);
    return control;
}
export function createButton(id, container, options) {
    let element = createControls(ControlTypeEnum.Button, container, id);
    let control = $(element).docuButton(options);
    return control;
}
export function createDocuRender(options, container, elementId) {
    let element = createControls(ControlTypeEnum.DocuRender, container, elementId);
    let control = $(element).docuRender(options);
    return control;
}
export function createButtonBar(elementId, options, container) {
    let element = createControls(ControlTypeEnum.ButtonBar, container, elementId);
    let control = $(element).docuButtonBar(options);
    return control;
}
export function createTree(elementId, options, container) {
    let element = createControls(ControlTypeEnum.Tree, container, elementId);
    let control = $(element).docuTree(options);
    return control;
}
export function getXML(callback, method) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            callback(xhttp.responseText);
        }
    };
    //console.log("data/xml/"+data);
    xhttp.open("GET", method, true);
    xhttp.send();
}
function createControls(controlTypeEnum, container, elementId, options) {
    // if (!(elementId!).startsWith("#") && !(elementId!).startsWith("."))
    //     elementId = "#" + elementId;
    let element = null;
    let elementTag = "";
    switch (controlTypeEnum) {
        case ControlTypeEnum.DocuRender:
        case ControlTypeEnum.ComboBox:
        case ControlTypeEnum.ButtonBar:
        case ControlTypeEnum.Tree:
            elementTag = "div";
            break;
        case ControlTypeEnum.Button:
            elementTag = "button";
            break;
    }
    element = $("<" + elementTag + " id='" + elementId + "'></" + elementTag + ">")[0];
    if (container != null)
        container.appendChild(element);
    return element;
}
//#region Jquery
jQuery.fn.extend({
    docuComboBox: function (options) {
        let element = $(this)[0];
        let structure = {
            settings: options,
            element: element,
            elementId: element.id
        };
        return new ComboBox(structure);
    },
    docuGrid: function (options) {
        let element = $(this)[0];
        let structure = {
            settings: options,
            element: element,
            elementId: element.id
        };
        return new Grid(structure);
    },
    docuTabs: function (options) {
        let element = $(this)[0];
        let structure = {
            settings: options,
            element: element,
            elementId: element.id
        };
        return new Tab(structure);
    },
    docuButton: function (options) {
        let element = $(this)[0];
        let structure = {
            settings: options,
            element: element,
            elementId: element.id
        };
        return new Button(structure);
    },
    docuRender: function (options) {
        let element = $(this)[0];
        return new DocuRender(element, options);
    },
    docuButtonBar: function (options) {
        let element = $(this)[0];
        return new ButtonBar(element, options);
    },
    docuTree: function (options) {
        let element = $(this)[0];
        let structure = {
            settings: options,
            element: element,
            elementId: element.id
        };
        return new Tree(structure);
    }
});
//#endregion
export var ControlTypeEnum;
(function (ControlTypeEnum) {
    ControlTypeEnum["DocuRender"] = "DocuRender";
    ControlTypeEnum["Button"] = "buttonBaseControl";
    ControlTypeEnum["ComboBox"] = "comboBoxBaseControl";
    ControlTypeEnum["ButtonBar"] = "buttonBarControl";
    ControlTypeEnum["Tree"] = "treeControl";
})(ControlTypeEnum || (ControlTypeEnum = {}));
