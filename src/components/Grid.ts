export enum SourceTypeEnum {
  Boolean = "bool",
  Date = "date",
  Number = "number",
  String = "string",
  Array = "",
  Time = "date",
}
export class GridRebindEvent {
  sender: Grid;
  parameters?: any;
}
export class GridOptions {
  columns?: Column[];
  toolbar?: ToolbarItem[];
  height?: number | string;
  width?: number | string;
  altRows?: boolean;
  checkBoxes?: boolean;
  groupable?: boolean;
  editable?: boolean;
  singleCheck?: boolean;
  multilineRows?: boolean;
  rowsHeight?: number;
  clearSelectionAtRowClick?: boolean;
  sortable?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  filterable?: boolean;
  autoFilter?: boolean;
  showFilterIcons?: boolean;
  dataSourceFieldId?: string;
  showTooltips?: boolean;
  autoHeight?: boolean;
  pagination?: boolean;
  contextMenu?: boolean;

  onContextMenuClick?(e : ContextMenuClickEvent) : void;
  onSelectRow?(e: SelectRowEvent) : void;
  setDataSource?(e: GridRebindEvent): void;
  rowUnselect?(e: RowUnselectEvent) : void;

  constructor(options?: GridOptions) {
    if (options != null) {
      if (options.columns != null) this.columns = options.columns;
      if (options.toolbar != null) this.toolbar = options.toolbar;
      if (options.height != null) this.height = options.height;
      if (options.width != null) this.width = options.width;
      if (options.checkBoxes != null) this.checkBoxes = options.checkBoxes;
      if (options.groupable != null) this.groupable = options.groupable;
      if (options.editable != null) this.editable = options.editable;
      if (options.contextMenu != null) this.contextMenu = options.contextMenu;
      if (options.onContextMenuClick != null) 
        this.onContextMenuClick = options.onContextMenuClick;

      if (options.dataSourceFieldId != null) this.dataSourceFieldId = options.dataSourceFieldId;
      if (options.setDataSource != null) 
        this.setDataSource = options.setDataSource;

      if (options.onSelectRow != null)
        this.onSelectRow = options.onSelectRow;

        if (options.rowUnselect != null)
        this.rowUnselect = options.rowUnselect;

      if (options.resizable != null) this.resizable = options.resizable;
      if (options.reorderable != null) this.reorderable = options.reorderable;
      if (options.sortable != null) this.sortable = options.sortable;
      if (options.rowsHeight != null) this.rowsHeight = options.rowsHeight;
      if (options.autoHeight != null) this.autoHeight = options.autoHeight;
      if (options.filterable != null) this.filterable = options.filterable;
      if (options.pagination != null) this.pagination = options.pagination;

      // if (options.multilineRows != null) this.multilineRows = options.multilineRows;
    }
  }
}

export class Column {
  type: ColumnTypeEnum;
  field: string;
  displayField?: string;
  title?: string;
  sortable?: boolean;
  filterable?: boolean;
  hidden?: boolean;
  hideable?: boolean;
  groupable?: boolean;
  exportable?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  editable?: boolean;
  pinned?: boolean;
  tooltip?: boolean;
  decimalDigits?: number;
  ignoreFactor?: boolean;
  width?: number | string; //only number
  minWidth?: number;
  maxWidth?: number;
  filterDelay?: number;
  dataItems?: any[];
  fitSpace?: boolean;
  defaultValue?: any;
  ddlNullable?: boolean;

  validation?: (cell: any, value?: number) => boolean;
  valueChanging?: (
    row: number,
    datafield: string,
    columntype: string,
    oldvalue: any,
    newvalue: any
  ) => string | void;
}

export enum SelectionMode
	{
		None = "none",
		SingleRow = "singlerow",
		MultipleRows = "multiplerows",
		SingleCell = "singlecell",
		MultipleCells = "multiplecells",
		CheckBox = "checkbox",
		MultipleCellsAdvanced = "multiplecellsadvanced"
	}


export class ColumnType {
  type: ColumnTypeEnum;

  get value() {
    switch (this.type) {
      case ColumnTypeEnum.String:
        return "string";
      case ColumnTypeEnum.Checkbox:
        return "checkbox";
      case ColumnTypeEnum.Date:
        return "datetimeinput";
      case ColumnTypeEnum.Time:
        return "datetimeinput";
      case ColumnTypeEnum.DateTime:
        return "datetimeinput";
      case ColumnTypeEnum.Duration:
        return "numberinput";
      case ColumnTypeEnum.Number:
        return "numberinput";
      case ColumnTypeEnum.Currency:
        return "numberinput";
      case ColumnTypeEnum.Percentage:
        return "numberinput";
      case ColumnTypeEnum.DropDownList:
        return "dropdownlist";
      case ColumnTypeEnum.DropDownListCheckbox:
        return "dropdownlist";
      case ColumnTypeEnum.ComboBox:
        return "combobox";
      case ColumnTypeEnum.ComboBoxCheckbox:
        return "combobox";
      case ColumnTypeEnum.DropDownTree:
        return "custom";
      case ColumnTypeEnum.DropDownTreeCheckbox:
        return "custom";
      case ColumnTypeEnum.Button:
        return "custom";
      case ColumnTypeEnum.Label:
        return "label";
      case ColumnTypeEnum.Custom:
        return "custom";
      case ColumnTypeEnum.TextBox:
        return "textbox";
      case ColumnTypeEnum.EditButton:
        return "custom";
      case ColumnTypeEnum.Image:
        return "custom";
      default:
        return undefined;
    }
  }
}

export enum ColumnTypeEnum {
  String,
  Checkbox,
  Date,
  Time,
  DateTime,
  Duration,
  Number,
  Currency,
  Percentage,
  DropDownList,
  DropDownListCheckbox,
  ComboBox,
  ComboBoxCheckbox,
  DropDownTree,
  DropDownTreeCheckbox,
  Button,
  Label,
  Custom,
  TextBox,
  EditButton,
  Image,
}

export class ToolbarItem {
  type: ToolbarItemType;
  text?: string;
  iconClass?: string;
  imageUrl?: string;
  confirmationMessage?: string;
  excelFileName?: string;
  click?: (e: ToolbarClickEvent) => void;
  delete?: (e: ToolbarClickEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  visible?: boolean;
  value?: string;
}

export class ToolbarClickEvent {
  sender: jqwidgets.jqxButton;
  type: ToolbarItemType;
  deletedItems?: any[];
  isDefaultPrevented: boolean;

  preventDefault() {
    this.isDefaultPrevented = true;
  }
}
export enum ToolbarItemType {
  Add = "jqx-add",
  Delete = "jqx-delete",
  Separator = "jqx-separator",
  Save = "jqx-save",
  Cancel = "jqx-cancel",
  Excel = "jqx-excel",
  Custom = "",
  Rebind = "jqx-rebind",
  SplitButton = "jqx-splitButton",
}
export class Grid {
  //#region Variables
  private options: GridOptions;
  public _jqxGrid: jqwidgets.jqxGrid;
  private element: HTMLElement;
  private elementId: string;
  private _contextMenu: jqwidgets.jqxMenu;
  private _dataSourceAdapter: any;
  private _originalGridState: jqwidgets.GridGetState;
  private _actualGridState: jqwidgets.GridGetState | null;
  private _currentUnchangedItems: any[] = [];
  private _editable = false;
  private _currentlyEditedRow: any | null;
  private _cellClickEditingCount: Map<string, number> = new Map<
    string,
    number
  >();
  private _updatedItems: any[] = [];

  //#endregion

  constructor(structure?: any) {
    if (structure != null) {
      this.options = new GridOptions(structure.settings);
      this.element = document.getElementById(structure.elementId)!;
      this.elementId = structure.elementId;

      this.draw(this.options);
    }
  }

  private draw(options: GridOptions) {
    let that = this;
    if (options.width == null) options.width = "100%";
    if (options.sortable == null) options.sortable = true;
    if (options.editable == null) options.editable = false;
    if (options.filterable == null) options.filterable = true;
    if (options.pagination == null) options.pagination = true;
    if (options.dataSourceFieldId == null) options.dataSourceFieldId = "Id";
    if (options.rowsHeight == null) options.rowsHeight = 30;
    if (options.checkBoxes == null) options.checkBoxes = false;
    if (options.groupable == null) options.groupable = false;
    if (options.contextMenu == null) options.contextMenu = false;

    // if (options.multilineRows == null) options.multilineRows = (options.rowsHeight > 30) ? true : false;
    if (options.autoHeight == null) options.autoHeight = false;

    // $(this.element).width("100%");

    if (options.columns == null) options.columns = [];

    let jqColumns: jqwidgets.GridColumn[] = [];
    if (options.columns != null) {
      let columnsOrdered: any[] = [];
      for (let column of options.columns.slice(1).reverse()) {
        if (column.hidden) continue;

        if (column.type == ColumnTypeEnum.Checkbox)
          columnsOrdered.unshift(column);
        else columnsOrdered.push(column);
      }

				//#region Fit space
        let gridWidth = (options.checkBoxes) ? $(this.element).width()! - 31 : $(this.element).width();
        gridWidth! -= 20;
				//gridWidth = (settings.groupingSettings.default) ? gridWidth - 32 : gridWidth;

				let columnsWidthOccupied = 0;
				let fitSpaceColumnsNumber = 0;
				for (let column of options.columns)
				{
					if (column.hidden == true)
						continue;

					if ((column.fitSpace == null || column.fitSpace == false))
						columnsWidthOccupied += (column.width != null) ? (parseFloat(column.width.toString()) / 100.0) : ((column.type == ColumnTypeEnum.EditButton) ? 40 : 100); //to fix
					else
						fitSpaceColumnsNumber++;
				}

				let remainingSpace = gridWidth! * columnsWidthOccupied;
				let widthForFitSpaceColumns = (remainingSpace - 20)/ fitSpaceColumnsNumber;
				//#endregion
        
      for (let column of options.columns) {
        let columnType = new ColumnType();
        columnType.type = column.type;

        let jqColumn: jqwidgets.GridColumn = {
          columntype: columnType.value,
          text: column.title == null ? "" : column.title,
          width: (column.fitSpace == true) ? widthForFitSpaceColumns : ((column.width != null) ? column.width : 100),
          datafield: column.field,
          enabletooltips: true,
          resizable: true,
          cellbeginedit: (
            rowId: number,
            field: string,
            columnType: string,
            value: any
          ) => {
            that._currentlyEditedRow = that._jqxGrid.getrowdata(rowId);
            that._currentlyEditedRow["field"] = field;

            // To prevent single editing click
            let clickEditingCount = that._cellClickEditingCount.get(field);
            if (clickEditingCount! == 0) {
              that._cellClickEditingCount.set(field, 1);
              return false;
            } else {
              that._cellClickEditingCount.set(field, 0);
              return true;
            }
          },
        };

        jqColumns.push(jqColumn);
      }
    }

    //#region DataSource
    let dataSource: jqwidgets.GridSource = {};
    dataSource.id = options.dataSourceFieldId;
    dataSource.datatype = "local";
    let dataFields: jqwidgets.GridSourceDataFields[] = [];
    if (options.columns != null) {
      for (let column of options.columns) {
        if (column.field == null || column.field.length == 0) continue;

        let dataField: jqwidgets.GridSourceDataFields = {
          name: column.field,
        };
        dataField.type = that.getDataSourceType(column.type);
        dataFields.push(dataField);

        if (column.displayField != null) {
          let dataField: jqwidgets.GridSourceDataFields = {
            name: column.displayField,
          };
          dataField.type = SourceTypeEnum.String;
          dataFields.push(dataField);
        }
      }
      let dataFieldId: jqwidgets.GridSourceDataFields = {
        name: options.dataSourceFieldId,
        type: "string",

      };
      dataFields.push(dataFieldId);

      dataSource.datafields = dataFields;
      this._dataSourceAdapter = new window.jqx.dataAdapter(dataSource);
    }

    //#region Toolbar
    let spanTotalGrid : HTMLElement;
    let renderToolbar: ((statusBar?: any) => void) | undefined = undefined;
    if (options.toolbar != null) 
    {
      renderToolbar = (statusBar?: any) => {
        let container = $("<div style='overflow: hidden; position: relative; margin: 4px;'></div>");
        
        for (let toolbarItem of options.toolbar!) 
        {
            if(options.toolbar == null) 
              toolbarItem.visible = true;

            let text = "";
						let iconClass = "";
						let buttonClass = "";
            let enabled = true;
            let elementId = "";
            switch(toolbarItem.type) {
              case ToolbarItemType.Add: {
                text = (toolbarItem.text != null) ? toolbarItem.text : "Add";
                buttonClass = "jqx-grid-add";
                elementId = toolbarItem.value != null ? toolbarItem.value : buttonClass + "_" + that.elementId;
              }
              break;
              case ToolbarItemType.Delete: {
                text = (toolbarItem.text != null) ? toolbarItem.text : "Remove Selected";
                buttonClass: "jqx-grid-delete";
                elementId = toolbarItem.value != null ? toolbarItem.value : buttonClass + "_" + that.elementId;

              }
              case ToolbarItemType.Custom: {
                text = (toolbarItem.text != null) ? toolbarItem.text : "";
								iconClass = (toolbarItem.iconClass != null) ? toolbarItem.iconClass : "";
                buttonClass = "jqx-grid-" + ((toolbarItem.value != null) ? toolbarItem.value : "custom");
                elementId = toolbarItem.value != null ? toolbarItem.value : buttonClass + "_" + that.elementId;
              }
              break;
            }

            let button = $("<button class='jqx-grid-toolbarItems " + buttonClass + "' id='" + elementId + "'>" + text + "</button>").jqxButton({
              // imgSrc: "https://jqwidgets.com/jquery-widgets-demo/images/andrew.png",
              imgPosition: "left",
              textImageRelation: "imageBeforeText",
              imgWidth: 16,
              imgHeight: 16,
              theme: "bootstrap",
            });

            if(toolbarItem.visible)
              $(button).show();
            else
              $(button).hide();
            
            $(button).on('click', () => 
            {
              if(toolbarItem.type == ToolbarItemType.Delete) 
              {
                let checkedItems = this.getCheckedItems<any>();
					  	  let deletedItemsId = checkedItems.filter(k => k != null).map(k => k.uid);
						    this._jqxGrid.deleterow(deletedItemsId);
						    this._jqxGrid.clearselection();

                let pagesText = (that._jqxGrid.getselectedrowindexes().length == 1) ? "elemento" : "elementi";
                $(spanTotalGrid).html(`${that._jqxGrid.getselectedrowindexes().length} ${pagesText} selezionati`);

                if(toolbarItem.delete != null) {
                  let toolbarClickEvent = new ToolbarClickEvent();
                  toolbarClickEvent.deletedItems = deletedItemsId;
                  toolbarItem.delete(toolbarClickEvent);
                }
              }
              else 
              {
                if (toolbarItem.click != null) 
                  {
                    let toolbarClickEvent = new ToolbarClickEvent();
                    toolbarClickEvent.type = toolbarItem.type;
                    toolbarItem.click(toolbarClickEvent);
                }
              }            
            });
            
            container.append($(button)[0] as any);
            spanTotalGrid = $("<span class='grdTotalItems'></span>")[0];
            container.append(spanTotalGrid)
        }
        statusBar.append(container);
      }
    }

    //#endregion

    let optionsGrid: jqwidgets.GridOptions = {
      width: options.width,
      enabletooltips: true,
      height: options.height,
      source: this._dataSourceAdapter,
      editable: options.editable,
      columns: jqColumns,
      filterable: options.filterable,
      sortable: options.sortable,
      pageable: options.pagination,
      pagerheight: options.pagination != null ? 30 : "",
      autoshowfiltericon: true,
      groupable: options.groupable,
      selectionmode: "checkbox",
      columnsheight: 30,
      showtoolbar: (options.toolbar != null && options.toolbar.length > 0) ? true : false,
      rendertoolbar: renderToolbar,
      // (options.checkBoxes) ? SelectionMode.CheckBox : ((that._editable) ? SelectionMode.MultipleCellsAdvanced : SelectionMode.None),
      theme: "bootstrap",
    };

    this._jqxGrid = jqwidgets.createInstance(
      "#" + this.elementId,
      "jqxGrid",
      optionsGrid
    ) as jqwidgets.jqxGrid;

    $("#" + this.elementId).on("cellclick", (e: any) => {
      //#region Selection on click
      if (e.args.datafield != "_checkboxcolumn") {
        // if (this.options.clearSelectionAtRowClick) 
        //this.clearSelection();

        let checkedItemsIndexes = that.getCheckedItems().map((k) => (k as any).boundindex);

        if (!checkedItemsIndexes.includes(e.args.rowindex))
          that.selectRowByIndex(e.args.rowindex);
        else 
          that.deselectRowByIndex(e.args.rowindex);
      }
      //#endregion

      //#region Clear focus when edit
      let field = e.args.datafield;
      if (that._cellClickEditingCount.has(field)) 
      {
        let editingFieldCount = that._cellClickEditingCount.get(field);
        editingFieldCount!++;
      } else 
      {
        that._cellClickEditingCount.clear();
        that._cellClickEditingCount.set(field, 0);
      }
      //#endregion
    });

    $("#" + this.elementId).on("cellendedit", (e: any) => 
    {
      let args = e.args;
      if (args == null) return;

      let dataField = args.datafield;
      let displayField = args.displayfield;
      let value = args.value;
      let oldvalue = args.oldvalue;
      let realRowData = that._jqxGrid.getrowdatabyid(
        that._currentlyEditedRow.uid
      );
      realRowData[dataField] = value;

      if (value != null && value.value != null && displayField != null) {
        realRowData[dataField] = value.value;
        realRowData[displayField] = value.label;
      }

      if (!this._updatedItems.map((k) => k[that.options.dataSourceFieldId!]).includes(args.row[that.options.dataSourceFieldId!]))
        this._updatedItems.push(realRowData);

      that._currentlyEditedRow = null;

      value = value == null || value.value == null ? value : value.value;
      oldvalue = oldvalue == null || oldvalue.value == null ? oldvalue : oldvalue.value;
    });


    $("#" + this.elementId).on("rowselect", (e: any) => 
    {
        if(options.onSelectRow != null) 
        {
          let pagesText = (that._jqxGrid.getselectedrowindexes().length == 1) ? "elemento" : "elementi";
          $(spanTotalGrid).html(`${that._jqxGrid.getselectedrowindexes().length} ${pagesText} selezionati`);
          let selectRowEvent = new SelectRowEvent();
          selectRowEvent.checked = true;
          selectRowEvent.rowElement = e.args.row;
          options.onSelectRow(selectRowEvent);
        }
    });

    $("#" + this.elementId).on("rowunselect", (e: any) =>
			{
				let args = e.args;
				if (args.row == null)
					return;

				let rowData = args.row;

        let pagesText = (that._jqxGrid.getselectedrowindexes().length == 1) ? "elemento" : "elementi";
        $(spanTotalGrid).html(`${that._jqxGrid.getselectedrowindexes().length} ${pagesText} selezionati`);

				//#region Row unselect event
				let rowUnselectEvent = new RowUnselectEvent();
				rowUnselectEvent.dataItem = rowData;
				rowUnselectEvent.itemIndex = rowData.boundindex;
				rowUnselectEvent.allRows = false;

				if (options.rowUnselect != null)
					options.rowUnselect(rowUnselectEvent);
				//#endregion
		});

    $("#" + this.elementId).on('sort', (e) => 
    {
      this._jqxGrid.clearselection();

      let pagesText = (that._jqxGrid.getselectedrowindexes().length == 1) ? "elemento" : "elementi";
      $(spanTotalGrid).html(`${that._jqxGrid.getselectedrowindexes().length} ${pagesText} selezionati`);
    });

    $("#" + this.elementId).on('filter', (e) => 
    {
      this._jqxGrid.clearselection();

      let pagesText = (that._jqxGrid.getselectedrowindexes().length == 1) ? "elemento" : "elementi";
      $(spanTotalGrid).html(`${that._jqxGrid.getselectedrowindexes().length} ${pagesText} selezionati`);
    });

    //#region ContextMenu
    if(options.contextMenu)
    {
      let contextMenuControl= $("<div id='jqxMenu'></div>").appendTo(this.element);
      let contextMenuBody = $(`
      <ul>
        <li id='currentView'>Add to current view</li>
        <li id='newCollectionView'>Add to new collection view</li>
      </ul>`).appendTo("#jqxMenu")[0] as HTMLDivElement;

      this._contextMenu = $("#jqxMenu").jqxMenu({width: '140px', height: '120px', autoOpenPopup: false, mode: 'popup', theme: "bootstrap"});

      $("#" + this.elementId).on('mousedown', (e : any) => {
        // get the clicked cell
        let cell = (<any>$("#" + this.elementId)).jqxGrid('getCellAtPosition', e.pageX, e.pageY);
        let item = this._jqxGrid.getrowdata(cell.row);

         //select row.
         if (cell != null && cell.row) {
          (<any>$("#" + this.elementId)).jqxGrid('selectrow', cell.row);
        }
  
        let rightClick = isRightClick(e) || $.jqx.mobile.isTouchDevice();
  
        if(rightClick) {
          let scrollTop = $(window).scrollTop();
          let scrollLeft = $(window).scrollLeft();
  
          (<any>this._contextMenu).jqxMenu('open', parseInt(e.clientX) + 5 + scrollLeft!, parseInt(e.clientY) + 5 + scrollTop!);                 
          $("#jqxMenu").off().on('itemclick', (e: any) => {
            if(options.onContextMenuClick != null)
              {
                let menuClickEvent = new ContextMenuClickEvent();
                menuClickEvent.sender = $(this._contextMenu)[0];
                menuClickEvent.item = this.dataSource().filter(k => k.id == item.id)[0];
                menuClickEvent.contextMenuId = e.args.id;
                options.onContextMenuClick(menuClickEvent);
              }
          });
          return false;
        }
      });
     
        
      //disable the default browser's context menu.
      $(document).bind('contextmenu', function (e) {
          return false;
      });

      function isRightClick(event: any) 
      {
        let rightclick : boolean = false;
        
        if (!event) 
          event = window.event;
  
        if (event.which) 
          rightclick = (event.which == 3);
  
        else if (event.button) 
          rightclick = (event.button == 2);
  
        return rightclick;
      }     
    }
    //#endregion
  }

  private getDataSourceType(type: ColumnTypeEnum) {
    switch (type) {
      case ColumnTypeEnum.String:
        return "string";
      case ColumnTypeEnum.Checkbox:
        return "bool";
      case ColumnTypeEnum.Date:
        return "date";
      case ColumnTypeEnum.Time:
        return "date";
      case ColumnTypeEnum.DateTime:
        return "date";
      case ColumnTypeEnum.Duration:
        return "number";
      case ColumnTypeEnum.Number:
        return "number";
      case ColumnTypeEnum.Currency:
        return "number";
      case ColumnTypeEnum.Percentage:
        return "number";
      case ColumnTypeEnum.DropDownList:
        return "string";
      case ColumnTypeEnum.DropDownListCheckbox:
        return "template";
      case ColumnTypeEnum.ComboBox:
        return "string";
      case ColumnTypeEnum.ComboBoxCheckbox:
        return "template";
      case ColumnTypeEnum.DropDownTree:
        return "string";
      case ColumnTypeEnum.DropDownTreeCheckbox:
        return "string";
      case ColumnTypeEnum.Button:
        return "string";
      case ColumnTypeEnum.Label:
        return "string";
      case ColumnTypeEnum.Custom:
        return "string";
      case ColumnTypeEnum.TextBox:
        return "string";
      case ColumnTypeEnum.EditButton:
        return "string";
      case ColumnTypeEnum.Image:
        return "string";
      default:
        return undefined;
    }
  }

  dataSource(items?: any[]) {
    if (items != null) {

      //#region Fill Datasource
      this._originalGridState = this._jqxGrid.getstate();
      this._actualGridState = this._jqxGrid.getstate();

      this._dataSourceAdapter._source.localdata = items;
      this._dataSourceAdapter._source.datatype = "json";
      this._jqxGrid.source = this._dataSourceAdapter;
      $("#" + this.elementId).jqxGrid({ source: this._dataSourceAdapter });
      //#endregion

      //#region Create original Datasource
      this._currentUnchangedItems = [];

      for (let item of items) {
        let currentItem = jQuery.extend(true, {}, item);
        this._currentUnchangedItems.push(currentItem);
      }
      //#endregion
    }
    return this._currentUnchangedItems;
  }

  rebind(parameters?: any) {
    let setDataSourceSettings = this.options.setDataSource;
    if (setDataSourceSettings != null) {
      let event = new GridRebindEvent();
      event.sender = this;
      event.parameters = parameters;
      setDataSourceSettings(event);
    }
  }

  public getCheckedItemsValues(key?: string) {
    return this.getCheckedItems<any>().map((k) =>
      key != null ? k[key] : k[this.options.dataSourceFieldId!]
    );
  }

  public getCheckedItems<T>() {
    let dataRows = [];
    for (let rowIndex of this._jqxGrid.getselectedrowindexes()) {
      let dataRow = this._jqxGrid.getrowdata(rowIndex);
      dataRows.push(this.dataSource().filter(k => k.id == dataRow.id)[0]);
    }
    return dataRows as T[];
  }

  clearSelection() {
    this._jqxGrid.clearselection();
  }

  selectRow(rowId: string | number)
  {
    let rows: any[] = (<any>$("#" + this.elementId)).jqxGrid("getdisplayrows");
    let rowToSelect = rows.filter(k => k[this.options.dataSourceFieldId!] == rowId)[0];
    if (rowToSelect != null)
      this.selectRowByIndex(rowToSelect.boundindex);
  }

  deselectRow(rowId: string | number)
  {
    let rows: any[] = (<any>$("#" + this.elementId)).jqxGrid("getdisplayrows");
    let rowToDeselect = rows.filter(k => k[this.options.dataSourceFieldId!] == rowId)[0];
    if (rowToDeselect != null)
      this.deselectRowByIndex(rowToDeselect.boundindex);
  }

  addRow(datarow: any) {
    this.addRows([datarow]);   
  }

  addRows(dataRows: any[]) {
    let rows: any[] = (<any>$("#" + this.elementId)).jqxGrid("getdisplayrows");
    for(let row of dataRows) {
      if(rows.filter(k=> k.id == row.id).length == 0) {
        ($("#" + this.elementId) as any).jqxGrid("addrow", null, row);
        this._currentUnchangedItems.push(row);
      }
    }
  }

  selectRowByIndex(index: number) {
    ($("#" + this.elementId) as any).jqxGrid("selectrow", index);
  }

  deselectRowByIndex(index: number) {
    ($("#" + this.elementId) as any).jqxGrid("unselectrow", index);
  }

  getSelectedRowIndex() {
    this._jqxGrid.getselectedrowindex();
  }

  show() {
    $("#" + this.elementId).show();
  }

  hide() {
    $("#" + this.elementId).hide();
  }

  clear() {
    ($("#" + this.elementId) as any).jqxGrid("clearselection");
  }

}

//#region Classes
export class ContextMenuClickEvent {
  sender: jqwidgets.jqxMenu;
  item: any;
  contextMenuId: string;
}

class SelectRowEvent {
  rowElement: HTMLElement;
  checked: boolean;
}
class RowUnselectEvent {
    allRows: boolean;
		dataItem?: any;
		itemIndex?: number | null;
}
//#endregion