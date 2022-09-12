webix.csv.escape = true;

webix.i18n.locales["ko-KR"]={	 //"es-ES" - the locale name, the same as the file name
	groupDelimiter:",",				 //a mark that divides numbers with many digits into groups
	groupSize:3,								//the number of digits in a group
	decimalDelimeter:".",			 //the decimal delimiter
	decimalSize:2,							//the number of digits after the decimal mark

	dateFormat:"%Y-%m-%d",			//applied to columns with 'format:webix.i18n.dateFormatStr'
	timeFormat:"%H:%i",				 //applied to columns with 'format:webix.i18n.dateFormatStr'
	longDateFormat:"%Y년%F%d일",	//applied to columns with 'format:webix.i18n.longDateFormatStr'
	fullDateFormat:"%Y-%m-%d %H:%i",//applied to cols with 'format:webix.i18n.fullDateFormatStr'

	priceSettings: {
		groupDelimiter:",",
		groupSize:3,
		decimalDelimeter:".",
		decimalSize:0
	},
	price:"{obj}",//EUR - currency name. Applied to cols with 'format:webix.i18n.priceFormat'
	calendar:{
		monthFull:["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthShort:["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		dayFull:["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
		dayShort:["일", "월", "화", "수", "목", "금", "토"]
	}
};	

webix.i18n.setLocale("ko-KR");

webix.editors.traditional_text = webix.editors.text;

webix.editors.text = {
	focus : function() {
		this.getInputNode(this.node).focus();
		this.getInputNode(this.node).select();
	},
	getValue : function() {
		return this.getInputNode(this.node).value;
	},
	setValue : function(value) {
		this.getInputNode(this.node).value = value;
	},
	getInputNode : function() {
		return this.node.firstChild;
	},
	render : function() {
		$editor = this;
		var maxLengthStr = '';
		if (this.config.option && this.config.option.maxLength) {
			maxLengthStr = ' maxlength="' + this.config.option.maxLength + '" ';
		}
		var el = webix.html.create("div", {
			"class" : "webix_dt_editor"
		}, "<input type='text' " + maxLengthStr + ">");
		
		if (this.config && this.config.option) {
			if (this.config.option.type == 'code'
				|| this.config.option.type == 'uppercase') {
				$(el).allowOnlyUpperCase();
			}
			
			if (this.config.option.type == 'positiveNumber'
				|| this.config.option.type == 'negativeNumber'
				|| this.config.option.type == 'number') {
				$(el).allowOnlyNumeric();
			}
		}
		
		return el;
	}
}

/*
webix.editors.select = {
	focus:function(){
		this.getInputNode().focus();
	},
	getValue:function(){
		return this.getInputNode().value;
	},
	setValue:function(value){
		this.getInputNode().value = value;
	},
	getInputNode:function(){
		return this.node.firstChild;
	},
	render:function(){
		console.log("select render");
		var html = "";
		var options = this.config.options || this.config.collection;
		//webix.assert(options,"options not defined for select editor");
		
		var option = this.config.option;
		
		console.log("1", options, options.prototype);
		
		//options = null;
		
		var that = this;
		
		if (!options && option && option.code) {
			var param = option.param;
			var callback = new Callback(function(result) {
				console.log("result", result);
				
				if (isEmpty(result)) {
				} else {
					var opts = new Array();
					
					for (var i = 0; i < result.length; i++) {
						var obj = new Object();
						obj["id"] = result[i]["ID"];
						obj["value"] = result[i]["VALUE"];
						
						opts.push(obj);
					}
					opts = new webix.DataCollection({data:webix.toArray(opts)});
					console.log("2", opts);
					console.log("3", that);
					console.log("4", that.config);
					
					that.config.options = opts;
					options = opts;
					
					console.log("5", opts);
					console.log("6", that);
					console.log("7", that.config);
				}
			});
			
			callback.async = false;
			CodeService.getCodeName("HELP", option.code, param, callback);
		}
		
		if (options.data && options.data.each) {
			options.data.each(function(obj){
				html +="<option value='"+obj.id+"'>"+obj.value+"</option>";
			});
		} else {
			if (webix.isArray(options)){
				for (var i=0; i<options.length; i++)
					html +="<option value='"+options[i]+"'>"+options[i]+"</option>";
			} else for (var key in options){
				html +="<option value='"+key+"'>"+options[key]+"</option>";
			}
		}
		
		var el = webix.html.create("div", {
			"class":"webix_dt_editor"
		}, "<select>"+html+"</select>");
		
		$(el).on("change", function(evt) {
			console.log(evt, that, that.config);
		});
		return el;
	},
}
*/

webix.GroupMethods.median = function(prop, data) {
	if (!data.length) {
		return 0;
	}

	var summ = 0;
	
	for (var i = data.length - 1; i >= 0; i--) {
		summ += prop(data[i]) * 1;
	}
	
	return summ / data.length;
};


webix.protoUI({
	name : "datagrid",
	getData : function() {
		this.editStop();
		var tmpList = this.serialize();
		var resultList = [];
		while (tmpList.length != 0) {
			var item = tmpList.shift();
			if (item.data && Array.isArray(item.data) && item.data.length > 0) {
				for (var i = 0; i < item.data.length; i++) {
					tmpList.push(item.data[i]);
				}
			} else {
				resultList.push(item);
			}
		}
		return resultList;
	},
	getCheckedData : function(checkboxId) {
		var resultList = this.getData();
		resultList = resultList.filter(function(value) {
			if (value[checkboxId])
				return true;
			else
				return false;
		});
		return resultList;
	},
	updateCurrentCell: function(columnName, val) {
		let id = this.getSelectedId();
		let item = this.getItem(id.row);
		item[columnName] = val;

		this.updateItem(id.row, item);
	},
	updateCell : function(rowIdx, columnName, data) {
	},
	updateRow : function(rowIdx, data) {
	},
	getNextEditableColumn : function(rowId, columnId) {
		var nextRowId = rowId;
		var lastColIdx = this.getColumnIndex(columnId);
		if (columnId == null) {
			lastColIdx = -1;
		}
		var cnt = 0;
		var nextColIdx = (lastColIdx + 1) % this.config.columns.length;
		
		//console.log("nextColIdx:" + nextColIdx);
		if (nextColIdx < lastColIdx) {
			try {
				nextRowId = this.getNextId(nextRowId);
			} catch (ex) {
				console.log(ex);
				nextRowId = null;
			}
		}

		while (!this.config.columns[nextColIdx].editor || this.config.columns[nextColIdx].hidden) {
			lastColIdx = nextColIdx;
			nextColIdx = (lastColIdx + 1) % this.config.columns.length;
			if (nextColIdx < lastColIdx) {
				cnt++
				try {
					nextRowId = this.getNextId(nextRowId);
				} catch (ex) {
					console.log(ex);
					nextRowId = null;
				}
			}
			if (cnt > this.data.count()) {
				nextColIdx = null;
				nextRowId = null;
				break;
			}
		}
		var nextColId = null;
		if (nextColIdx) {
			nextColId = this.config.columns[nextColIdx].id
		}
		return {
			rowId : nextRowId,
			colId : nextColId
		};
	},
	checkValidation : function() {
		this.editStop();
		return true;
		
		this.invalidCellMap = [];
		var isValid = true;
		for ( var itemId in this.data.pull) {
			if (this.config.editable && this.config.columns && this.config.columns[0].header && this.config.columns[0].header[0].content && this.config.columns[0].header[0].content == 'masterCheckbox') {
				if (this.getItem(itemId)[this.config.columns[0].id] && !this.validate(itemId)) {
					isValid = false;
					break;
				}
			}
		}
		if (!isValid) {
			for ( var rowId in this.invalidCellMap) {
				for ( var columnId in this.invalidCellMap[rowId]) {
					var columnIndex = this.getColumnIndex(columnId);
					var self = this;
					alertModal($(this.getHeaderNode(columnId)).text() + '을(를) 확인하세요.', '경고', function() {
						self.select(rowId, columnId);
						if (self.config.editable) {
							self.editCell(rowId, columnId, false, true);
						}
					});
					return false;
				}
			}
			return false;
		} else {
			return true;
		}
	},
	clearData : function() {
		//console.log(this);
		//self = this;
		this.editStop();
		this.blockEvent();
		this.clearAll();
		this.unblockEvent();
	},
	setData : function(data) {
		this.clearData();
		this.parse(data, 'json');
	},
	showLoadingMsg : function(msg) {
		this.__oldEnabled = this.isEnabled();
		this.disable();
		this.showOverlay(msg);
	},
	hideLoadingMsg : function() {
		this.hideOverlay();
		if (this.__oldEnabled) {
			this.enable();
		}
	},
	
	addRow : function(rowObj) {
		this.blockEvent();
		this.editStop();
		var id = this.add(checkEmpty(rowObj, {}));

		this.unblockEvent();
		if (id) {
			this.select(id);
			this.editCell(id);
			this.showCell(id);
		}
	},
	
	addRows : function(rows) {
		this.blockEvent();
		this.editStop();
		
		var id;
		
		for (var i = 0; i < rows.length; i++) {
			id = this.add(checkEmpty(rows[i], {}));
		}

		this.unblockEvent();
		
		if (id) {
			this.select(id);
			this.editCell(id);
		}
	},
	
	removeRow : function(row) {
		if (!isNull(row) && !isNull(row["id"])) {
			this.blockEvent();
			this.editStop();
			
			var focusId = this.getPrevId(row["id"], 1);
			
			if (isNull(focusId)) {
				focusId = this.getNextId(row["id"], 1);
			}
			
			if (row["id"]) {
				this.remove(row["id"]);
			}
			
			this.unblockEvent();
		}
	},
	
	removeRows : function(rows) {
		this.blockEvent();
		this.editStop();
		
		if (rows && rows[0] && rows[0]["id"]) {
			var focusId = this.getPrevId(rows[0]["id"], 1);
			
			if (isNull(focusId)) {
				focusId = this.getNextId(rows[rows.length - 1]["id"], 1);
			}
			
			for (var i = 0; i < rows.length; i++) {
				this.remove(rows[i]["id"]);
			}

			this.unblockEvent();
			
			if (!isNull(focusId)) {
				this.select(focusId);
			}
		}
	},
	
	removeSelectedRow : function() {
		var focusId = this.getPrevId(this.getSelectedId(), 1);
		
		if (isNull(focusId)) {
			focusId = this.getNextId(this.getSelectedId(), 1);
		}
		
		if (this.getSelectedId()) {
			this.blockEvent();
			this.editStop();
			this.remove(this.getSelectedId());
			
			this.unblockEvent();
			
			if (focusId) {
				this.select(focusId);
			}
		}
	},
	/*
	focusCell : function(rowIdx, columnId, blockEvent) {
		var itemId = rowIdx;
		if (typeof (rowIdx) == "number") {
			itemId = this.getIdByIndex(rowIdx);
		}
		if (!itemId) {
			itemId = rowIdx;
		}
		if (blockEvent) {
			this.blockEvent();
			itemId.column = columnId;
			this.lastSelectedItemId = itemId;
		}
		if (this.config.select == 'row') {
			this.select(itemId);
		} else {
			this.select(itemId, columnId);
		}
		if (blockEvent) {
			this.unblockEvent();
		}
		if (this.config.editable) {
			this.editCell(itemId, columnId, false, true);
		}
		this.showItem(itemId);
	},
	*/
	defaults : {
		leftSplit : 0,
		rightSplit : 0,
		columnWidth : 100,
		minColumnWidth : 20,
		minColumnHeight : 26,
		prerender : false,
		autoheight : false,
		autowidth : false,
		header : true,
		fixedRowHeight : true,
		scrollAlignY : true,
		datafetch : 50,

		'export' : true,
		tooltip : false,
		dragColumn : false,
		resizeColumn : true,
		editable : true,
		checkboxRefresh : true,
		scrollY : true,
		scrollX : true,
		footer : false,
		blockselect : false,
		clipboard : false,
		select : 'row',
		navigation : true,

		on : {
			onValidationSuccess : function(id, value, columnNames) {
				delete this.invalidCellMap[id];
			},
			onValidationError : function(id, value, columnNames) {
				this.invalidCellMap[id] = columnNames;
			},
			onAfterLoad : function() {
				if (!this.count() && !this.config.editable) {
					this.showOverlay("표시할 데이터가 없습니다.");
				}

				try {
					listener.grid.onDataLoaded(this.config.id);
				} catch(e) {}

			},
			onBeforeAdd : function() {
				this.hideOverlay();
			},
			
			onBeforeEditStart : function(obj) {
				//console.log("onBeforeEditStart", obj, window.event, this);
				
				var grid = this;
				var col = grid.getColumnConfig("cat_id");
				var record = grid.getItem(obj.row);
				var curCol = grid.getColumnConfig(obj.column);

				if (curCol.editor == "select") {
					if (curCol.option && curCol.option.parent_id) {
						//console.log("filter start");
						//console.log(curCol.option.parent_id, grid.getColumnConfig(curCol.option.parent_id));
						
						var record = grid.getItem(obj.row);
						var refvalue = record[curCol.option.parent_id]
						
						curCol.collection.filter(function(item) {
							//console.log(item);
							if (item.refcd == '*' || item.refcd == refvalue) {
								return true;
							} else {
								return false;
							}
						});
					}
				}
			},
			
			onAfterEditStart : function(obj) {
				//console.log("onAfterEditStart", obj, window.event);
				
				var evt = event || window.event;
				
				if (evt && evt.type == "click" && evt.srcElement.tagName == "BUTTON" && $(evt.srcElement).hasClass("btnCodeHelpGrid")) {
					this.editStop(null, true, true);
				} else {
					/*
					var editor  = this.getEditor();
					console.log(editor);
					//console.log(editor.getInputNode().blur());
					console.log($(editor.getInputNode()));
					
					//var input = editor.getInputNode();
					//$(input).select();
					
					editor.focus();
					
					*/
				}
			},
			
			onBeforeEditStop : function(state, editor, ignore) {
				var grid = this;
				//console.log("onBeforeEditStop", state, editor, ignore, window.event, grid.getItem(editor.row));
				
				/*
				var record = grid.getItem(editor.row);
				var column = grid.getColumnConfig("cat_id");
				
				if (column) {
					//console.log(column);
					//column.options = {"1" : "T3","2" : "t4","3" : "t5"};
				}
				*/
			},
			
			onAfterEditStop : function(state, editor, ignore) {
				//console.log("onAfterEditStop", editor.row, state, editor, ignore, window.event);
				var grid = this;
				
				var evt = event || window.event;
				
				//console.log(evt, evt.type, evt.srcElement.tagName, $(evt.srcElement).hasClass("btnCodeHelp"));
				
				if (evt && evt.type == "click" && evt.srcElement.tagName == "BUTTON" && $(evt.srcElement).hasClass("btnCodeHelpGrid")) {
					var column = grid.getColumnConfig(editor.column);
					var option;
					
					if (column.option) {
						option = column.option;
					} else {
						return;
					}
					
					var record = grid.getItem(editor.row);
					
					var code = option.code;
					var value = editor.getValue();
					var param = option.param;
					var target = option.target;
					
					if (option.type == "code") {
						var callback = function(result) {
							//console.log("test callback", result);
							editor.setValue(result["CODE"]);
							record[editor.column] = result["CODE"];
							record[target] = result["NAME"];
							grid.updateItem(editor.row, record);
							//console.log("updateb", editor.row);

							listener.gridRow.callback(grid.config.id, editor.row, editor.column);
						}
						//console.log("updatea", editor.row);
						popup.help.show(code, value, param, callback);
					} else if (option.type == "vin") {
						var callback = function(result) {
							editor.setValue(result["VIN_NO"]);
							record[editor.column] = result["VIN_NO"];
							record[target] = result["VIN_NM"];
							
							grid.updateItem(editor.row, record);
							
							listener.gridRow.callback(grid.config.id, editor.row, editor.column);
						}
						
						popup.vin.show(code, param, false, callback);
					}
				}

				listener.gridEditor.afterEdit(grid.config.id, editor.row, editor.column, state);
			},
			
			onLiveEdit : function(state, editor) {
				console.log("liveEdit", this, state, editor);

				var grid = this;
				var evt = window.event;
				
				var check = ( editor.getValue() != "" );
				var column = grid.getColumnConfig(editor.column);
				
				var option;
				
				if (column.option) {
					option = column.option;
				} else {
					listener.gridEditor.keydown(grid, editor, evt);
					return;
				}
				
				if (option.type == "code" || option.type == "vin") {
					var record = grid.getItem(editor.row);
					var param = option.param;
					param["CODE"] = editor.getValue();
					
					record[option.target] = "";
					grid.updateItem(editor.row, record);
				}
				
				listener.gridEditor.keydown(grid, editor, evt);
			},
			
			onItemClick : function(target, evt, html) {
				//console.log("onitemclick", target, evt, html);
				var record = this.getItem(target.row);
				//listener.gridRow.click(record, this);
			},
			
			onItemDblClick : function(target, evt, html) {
				//console.log("onitemdblclick", target, evt, html);
				var record = this.getItem(target.row);
				listener.gridRow.dblclick(record, this);
			},
			
			onAfterSelect: function(target, prevent,c,d) {
				try {
					//console.log("onAfterSelect", target, this.lastSelectedItemId, target.row);
					
					if (this.lastSelectedItemId != target.row) {
						var record = this.getItem(target.row);
						listener.gridRow.click(record, this);
						this.lastSelectedItemId = target.row;
					}
				} catch (ex) { }
			},
		},

		rules : {
			$all : function(value, item, columnId) {
				var result = true;
				var columns = this.config.columns;
				var columnIdx = this.getColumnIndex(columnId);
				if (columnIdx > -1) {
					if (columns[columnIdx].option) {
						if (columns[columnIdx].option.required && (isNull(value) || value == "")) {
							result = false;
						}
						if (columns[columnIdx].option.type == 'codelist') {
							var gridCodeMapping = (columns[columnIdx].option.gridCodeMapping || columns[columnIdx].returnCodeMapping || '').split(',');
							if (isNull(item[gridCodeMapping[0]]) || item[gridCodeMapping[0]] == '') {
								result = false;
							}
						} else if (columns[columnIdx].option.type == 'positiveNumber') {
							result = value > 0;
						} else if (columns[columnIdx].option.type == 'negativeNumber') {
							result = value < 0;
						}
					}
					if (columns[columnIdx].format == dateFormat) {
						if (!dateRegExp.test(value)) {
							result = false;
						}
					} else if (columns[columnIdx].format == telFormat) {
						if (!telRegExp.test(value)) {
							result = false;
						}
					} else if (columns[columnIdx].format == timeFormat) {
						if (!timeRegExp.test(value)) {
							result = false;
						}
					}
				}
				return result;
			}
		}

	},

	/*
	type : {
		checkbox : function(obj, common, value, config) {
			var grid = $(config.node).parents('.webix_dtable').parent().webix_datagrid();
			var checked = (value == config.checkValue) ? 'checked="true"' : '';
			var readOnly = config.readOnly || config.readonly;
			var grid_id = $(config.node).parents('.webix_dtable').attr('view_id');
			var editableStr = "";
			if (!grid.config.editable || readOnly)
				editableStr = "disabled";
			if (config.header && config.header[0].content && config.header[0].content == 'masterCheckbox') {
				return "<input class='webix_table_checkbox' type='checkbox' " + checked + " " + editableStr + " >";
			} else {
				return "<input class='webix_table_checkbox' type='checkbox' " + checked + " " + editableStr + " onclick='webixDatagridCheckboxHandler(\"" + grid_id + "\", \"" + obj.id + "\")'>";
			}
		},
		radio : function(obj, common, value, config) {
			var checked = (value == config.checkValue) ? 'checked="true"' : '';
			return "<input class='webix_table_radio' type='radio' " + checked + ">";
		},
		editIcon : function() {
			return "<span class='webix_icon fa-pencil'></span>";
		},
		trashIcon : function() {
			return "<span class='webix_icon fa-trash'></span>";
		}
	},
	*/

	lastSelectedItemId : null,
	invalidCellMap : {},
	
}, webix.ui.treetable);

webix.GroupMethods = {
	sum:function(property, data){
		data = data || this;
		var summ = 0;
		for (var i = 0; i < data.length; i++)
			summ+=property(data[i])*1;

		return summ;
	},
	avg:function(property, data){
		data = data || this;
		var summ = 0;
		for (var i = 0; i < data.length; i++)
			summ+=property(data[i])*1;

		return Math.round(summ / data.length);
	},
	min:function(property, data){
		data = data || this;
		var min = Infinity;

		for (var i = 0; i < data.length; i++)
			if (property(data[i])*1 < min) min = property(data[i])*1;

		return min*1;
	},
	max:function(property, data){
		data = data || this;
		var max = -Infinity;

		for (var i = 0; i < data.length; i++)
			if (property(data[i])*1 > max) max = property(data[i])*1;

		return max*1;
	},
	count:function(property, data){
		return data.length;
	},
	count2:function(property, data){
		return data.length;
	},
	any:function(property, data){
		return property(data[0]);
	},
	string:function(property, data){
		return property.$name;
	}
};

webix.ui.datafilter.summColumn = webix.extend({
	getValue:function(){},
	setValue: function(){},
	refresh:function(master, node, value){ 
		var result = 0;
		master.mapCells(null, value.columnId, null, 1, function(value){
			value = value*1;
			if (!isNaN(value))
				result+=value;
			return value;
		});

		if (value.format)
			result = value.format(result);
		if (value.template)
			result = value.template({value:result});

		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right;">' + result + '</span>';
	},
	trackCells:true,
	render:function(master, config){ 
		if (config.template)
			config.template = webix.template(config.template);
		return ""; 
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.avgColumn = webix.extend({
	refresh : function(master, node, value) {
		var result = 0;
		master.mapCells(null, value.columnId, null, 1, function(value) {
			value = value * 1;
			if (!isNaN(value))
				result += value;
			return value;
		});
		
		result = Math.round(result / master.count());
		
		if (value.format)
			result = value.format(result);
		if (value.template)
			result = value.template({value:result});

		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + result + '</span>';
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.maxColumn = webix.extend({
	refresh : function(master, node, value) {
		var result = '';
		master.mapCells(null, value.columnId, null, 1, function(value) {
			value = value * 1;
			if (!isNaN(value)) {
				if (result == '' || value > result) {
					result = value;
				}
			}
			return value;
		});
		
		if (value.format)
			result = value.format(result);
		if (value.template)
			result = value.template({value:result});

		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + result + '</span>';
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.minColumn = webix.extend({
	refresh : function(master, node, value) {
		var result = '';
		master.mapCells(null, value.columnId, null, 1, function(value) {
			value = value * 1;
			if (!isNaN(value)) {
				if (result == '' || value < result) {
					result = value;
				}
			}
			return value;
		});
		
		if (value.format)
			result = value.format(result);
		if (value.template)
			result = value.template({value:result});

		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + result + '</span>';
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.cntColumn = webix.extend({
	refresh : function(master, node, value) {
		var result = 0;
		master.mapCells(null, value.columnId, null, 1, function(value) {
			if (value != '') result += 1;
			return value;
		});
		
		result = intFormat(result);
		
		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + result + '</span>';
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.cnt2Column = webix.extend({
	refresh : function(master, node, value) {
		var result = 0;
		master.mapCells(null, value.columnId, null, 1, function(value) {
			if (value != '') result += 1;
			return value;
		});
		
		result = intFormat(result);
		
		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + result + '건</span>';
	}
}, webix.ui.datafilter.summColumn);


// grouping method alias

webix.ui.datafilter.count = webix.ui.datafilter.cntColumn;
webix.ui.datafilter.count2 = webix.ui.datafilter.cnt2Column;
webix.ui.datafilter.min = webix.ui.datafilter.minColumn;
webix.ui.datafilter.max = webix.ui.datafilter.maxColumn;
webix.ui.datafilter.avg = webix.ui.datafilter.avgColumn;
webix.ui.datafilter.sum = webix.ui.datafilter.summColumn;

// format method alias

var intFormat = function(obj) {
	if (isNull(obj)) {
		return '0';
	} else {
		return webix.i18n.intFormat(obj);
	}
};

var numberFormat = function(obj) {
	if (isNull(obj)) {
		return '0';
	} else {
		return webix.i18n.numberFormat(obj);
	}
};

var priceFormat = function(obj) {
	if (isNull(obj)) {
		return webix.i18n.locales["ko-KR"].price.replace(/{obj}/g, '') + '0';
	} else {
		return webix.i18n.priceFormat(obj);
	}
};

var dateFormat = function(dateStr) {
	if (dateStr == null || dateStr == '' || dateStr.length < 8) return dateStr;
	try {
		dateStr = dateStr.replace(/-/g, '');
		dateStr = dateStr.replace(/\\./g, '');
		var yearStr = dateStr.substring(0, 4);
		var monthStr = dateStr.substring(4, 6);
		var dayStr = dateStr.substring(6, 8);
		return webix.i18n.dateFormatStr( webix.i18n.parseFormatDate(yearStr + '.' + monthStr + '.' + dayStr) );
	} catch (ex) {
		return dateStr;
	}
}

var longDateFormat = function(dateStr) {
	if (dateStr == null || dateStr == '' || dateStr.length < 8) return '';
	dateStr = dateStr.replace(/-/g, '');
	dateStr = dateStr.replace(/\\./g, '');
	var yearStr = dateStr.substring(0, 4);
	var monthStr = dateStr.substring(4, 6);
	var dayStr = dateStr.substring(6, 8);
	return webix.i18n.longDateFormatStr( webix.i18n.parseFormatDate(yearStr + '.' + monthStr + '.' + dayStr) );
}

var webixDatagridCheckboxHandler = function(gridId, itemId) {
	var $grid = $('*[view_id=' + gridId + '').parent().webix_datagrid();
	var rowData = $grid.getItem(itemId);
	try {
		if ($grid.config.editable
				&& $grid.config.columns
				&& $grid.config.columns[0].header
				&& $grid.config.columns[0].header[0].content
				&& $grid.config.columns[0].header[0].content == 'masterCheckbox') {
			rowData[$grid.config.columns[0].id] = 1;
			$grid.updateItem(itemId, rowData);
		}
	} catch (ex) {}
}

var telFormat = function(telStr) {
	if (isNull(telStr)) {
		return '';
	} else if (telStr == '') {
		return '';
	} else {
		var res = telRegExp.exec(telStr);
		if (!isNull(res)) {
			return res[1] + '-' + res[2] + '-' + res[3];
		} else {
			return telStr;
		}
	}
}

var timeFormat = function(timeStr) {
	if (isNull(timeStr)) {
		return '';
	} else if (timeStr == '') {
		return '';
	} else {
		var res = timeRegExp.exec(timeStr);
		if (!isNull(res)) {
			return res[1] + ':' + res[2];
		} else {
			return timeStr;
		}
	}
}

var column = {
	codehelp : function(id, target) {
		return "#" + id + "#<button class='btnCodeHelpGrid' data-target='" + target + "' style='position:absolute; right:0px; z-index:9; border: 1px solid #c8c8c8;'></button>";
	}
};

webix.ready(function() {
	/*
	$(webix.editors).on("keydown",  function(evt) {
		console.log("editor keydown");
	});
	*/
	
	//if (!webix.env.touch && webix.ui.scrollSize) {
	//webix.CustomScroll.init();
	//}

	webix.UIManager.addHotKey("up", function(view, evt){
		if (!view || !view._custom_tab_handler && !view._custom_tab_handler(true, evt)) {
			return false;
		}
		
		var editor = view.getEditor();
		
		if (editor) {
			if (editor.config.editor == "select") {
				var select = editor.getInputNode();
				if ($(select).is(":focus")) {
					return;
				}
			}
			
			var prevRowId = view.getPrevId(editor.row);
			if (prevRowId) {
				view.editStop();
				view.select(prevRowId);
				view.editCell(prevRowId, editor.column);
				
				evt.preventDefault();
				evt.stopPropagation()
				evt.stopImmediatePropagation()
				return false;
			}
		}
	});
	
	webix.UIManager.addHotKey("down", function(view, evt){
		if (!view || !view._custom_tab_handler && !view._custom_tab_handler(true, evt)) {
			return false;
		}
		
		var editor = view.getEditor();
		
		if (editor) {
			if (editor.config.editor == "select") {
				var select = editor.getInputNode();
				if ($(select).is(":focus")) {
					return;
				}
			}
			
			var nextRowId = view.getNextId(editor.row);
			if (nextRowId) {
				view.editStop();
				view.select(nextRowId);
				view.editCell(nextRowId, editor.column);
				
				evt.preventDefault();
				evt.stopPropagation()
				evt.stopImmediatePropagation()
				return false;
			}
		}
	});
	
	webix.UIManager.removeHotKey("enter");
	webix.UIManager.addHotKey("enter", function(view, evt){
		if (!view || !view._custom_tab_handler && !view._custom_tab_handler(true, evt)) {
			return false;
		}
		
		var isNext = false;
		var editor = view.getEditor();
		
		if (isNull(editor)) {
			return;
		}
		
		var check = true;
		if (editor.getValue) {
			check = (editor.getValue() != "");
		}
		
		var column = view.getColumnConfig(editor.column);
		
		var option;
		
		if (column && column.option) {
			option = column.option;
		} else {
			option = {};
			isNext = true;
		}
		
		if (option.required) {
			if (!check) {
				return false;
			}
		}
		
		if ((option.type == "code" || option.type == "vin") && check) {
			var record = view.getItem(editor.row);
			var param = option.param;
			param["CODE"] = editor.getValue();
			
			var isPass = false;
			
			var callback = new Callback(function(result) {
				//console.log(result);
				
				if (isEmpty(result)) {
					isPass = false;
				} else {
					record[option.target] = result[0]["NAME"];
					view.updateItem(editor.row, record);
					
					isPass = true;
				}
			});
			
			callback.async = false;
			CodeService.getCodeName("CODE", option.code, param, callback);
			
			if (!isPass) {
				editor.focus();
				editor.getInputNode().select();
				view.select(editor.row, false);
				return false;
			} else {
				isNext = true;
			}
		} else {
			isNext = true;
		}
		
		if (isNext) {
			if (view && view._in_edit_mode) {
				if (view.editNext) {
					return view.editNext(true);
				}
			}
		}
		//*/
		/*
		if (view && view.editStop && view._in_edit_mode){
			view.editStop();
			return true;
		} else if (view && view.touchable){
			var form = view.getFormView();
			if (form && !view._skipSubmit)
				form.callEvent("onSubmit",[view,ev]);
		}
		*/
		/*
		if (view && view._custom_tab_handler && !view._custom_tab_handler(true, evt))
			return false;

		if (view && view._in_edit_mode){
			if (view.editNext) {
				console.log("view1; " + view.isEditing);
				return view.editNext(true);
			} else if (view.editStop) {
				console.log("view2; " + view.isEditing);
				view.editStop();
				return true;
			}
		} else
			webix.delay(function(){
				webix.UIManager.setFocus(webix.$$(document.activeElement), true);
			},1);
		//*/
	});
});

function getExportScheme(view, options) {
	var scheme = [];
	var isTable = view.getColumnConfig;
	var columns = options.columns;
	var raw = !!options.rawValues;

	if (!columns) {
		if (isTable)
			columns = view._columns_pull;
		else {
			columns = webix.copy(view.data.pull[view.data.order[0]]);
			for (let key in columns) columns[key] = true;
			delete columns.id;
		}
	}

	if (options.id)
		scheme.push({
			id: "id", width: 50, header: " ", template: function (obj) {
				return obj.id;
			}
		});

	for (let key in columns) {
		var column = columns[key];
		if (column.noExport) continue;

		if (isTable && view._columns_pull[key])
			column = webix.extend(webix.extend({}, column), view._columns_pull[key]);

		var record = {
			id: column.id,
			template: ((raw ? null : column.template) || function (key) {
				return function (obj) {
					return obj[key];
				};
			}(key)),
			width: ((column.width || 200) * (options._export_mode === "excel" ? 8.43 / 70 : 1)),
			header: (column.header !== false ? (column.header || key) : "")
		};

		if (typeof record.header == "object") {
			record.header = webix.copy(record.header);
			for (var i = 0; i < record.header.length; i++)
				record.header[i] = record.header[i] ? record.header[i].text : "";
		} else
			record.header = [record.header];
		scheme.push(record);
	}
	return scheme;
}

function getExportData(view, options, scheme) {
	console.log("gerExportData");

	var headers = [];
	var filterHTML = !!options.filterHTML;
	var htmlFilter = /<[^>]*>/gi;

	let isChecked = false;

	for (var i = 0; i < scheme.length; i++) {
		var header = "";
		if (typeof scheme[i].header === "object") {
			for (var h = 0; h < scheme[i].header.length; h++)
				if (scheme[i].header[h]) {
					header = scheme[i].header[h];
					break;
				}
		} else
			header = scheme[i].header;

		if (scheme[i].id === "ch1") {
			isChecked = true;
		}

		if (typeof header === "string")
			header = header.replace(htmlFilter, "");

		headers.push(header);
	}

	var data = options.header === false ? [] : [headers];

	console.log("scheme", scheme);

	view.data.each(function (item) {
		var line = [];
		console.log(item);

		for (var i = 0; i < scheme.length; i++) {
			var value = item[scheme[i].id];
			var config = view.getColumnConfig(scheme[i].id);

			//console.log("config", config);

			/*
			var cell = scheme[i].template(item, view.type, value, config);
			if (!cell && cell !== 0) cell = "";
			if (filterHTML && typeof cell === "string")
				cell = cell.replace(htmlFilter, "");
			 */
			// html 로 추출하지 않고 value 만 가져옴
			var cell = value;
			line.push(cell);
		}

		if (isChecked) {
			if (item["ch1"] !== 1) {
				return;
			}
		}

		data.push(line);
	}, view);

	console.log("data", data);

	return data;
}

function getExcelData(data, scheme, spans) {
	var ws = {};
	var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
	for (var R = 0; R !== data.length; ++R) {
		for (var C = 0; C !== data[R].length; ++C) {
			if (range.s.r > R) range.s.r = R;
			if (range.s.c > C) range.s.c = C;
			if (range.e.r < R) range.e.r = R;
			if (range.e.c < C) range.e.c = C;

			var cell = {v: data[R][C]};
			if (cell.v === null) continue;
			var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

			if (typeof cell.v === 'number') cell.t = 'n';
			else if (typeof cell.v === 'boolean') cell.t = 'b';
			else if (cell.v instanceof Date) {
				cell.t = 'n';
				cell.z = XLSX.SSF[table][14];
				cell.v = excelDate(cell.v);
			} else cell.t = 's';

			ws[cell_ref] = cell;
		}
	}
	if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);

	ws['!cols'] = getColumnsWidths(scheme);
	if (spans.length)
		ws["!merges"] = spans;
	return ws;
}

function getColumnsWidths(scheme) {
	var wscols = [];
	for (var i = 0; i < scheme.length; i++)
		wscols.push({wch: scheme[i].width});

	return wscols;
}

function excelDate(date) {
	return Math.round(25569 + date / (24 * 60 * 60 * 1000));
}

function str2array(s) {
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

webix.html = {
	_native_on_selectstart: 0,
	denySelect: function () {
		if (!webix._native_on_selectstart)
			webix._native_on_selectstart = document.onselectstart;
		document.onselectstart = webix.html.stopEvent;
	},
	allowSelect: function () {
		if (webix._native_on_selectstart !== 0) {
			document.onselectstart = webix._native_on_selectstart || null;
		}
		webix._native_on_selectstart = 0;

	},
	index: function (node) {
		var k = 0;
		//must be =, it is not a comparation!
		while ((node = node.previousSibling)) k++;
		return k;
	},
	_style_cache: {},
	createCss: function (rule) {
		var text = "";
		for (var key in rule)
			text += key + ":" + rule[key] + ";";

		var name = this._style_cache[text];
		if (!name) {
			name = "s" + webix.uid();
			this.addStyle("." + name + "{" + text + "}");
			this._style_cache[text] = name;
		}
		return name;
	},
	addStyle: function (rule) {
		var style = this._style_element;
		if (!style) {
			style = this._style_element = document.createElement("style");
			style.setAttribute("type", "text/css");
			style.setAttribute("media", "screen");
			document.getElementsByTagName("head")[0].appendChild(style);
		}
		/*IE8*/
		if (style.styleSheet)
			style.styleSheet.cssText += rule;
		else
			style.appendChild(document.createTextNode(rule));
	},
	create: function (name, attrs, html) {
		attrs = attrs || {};
		var node = document.createElement(name);
		for (var attr_name in attrs)
			node.setAttribute(attr_name, attrs[attr_name]);
		if (attrs.style)
			node.style.cssText = attrs.style;
		if (attrs["class"])
			node.className = attrs["class"];
		if (html)
			node.innerHTML = html;
		return node;
	},
	//return node value, different logic for different html elements
	getValue: function (node) {
		node = webix.toNode(node);
		if (!node) return "";
		return webix.isUndefined(node.value) ? node.innerHTML : node.value;
	},
	//remove html node, can process an array of nodes at once
	remove: function (node) {
		if (node instanceof Array)
			for (var i = 0; i < node.length; i++)
				this.remove(node[i]);
		else if (node && node.parentNode)
			node.parentNode.removeChild(node);
	},
	//insert new node before sibling, or at the end if sibling doesn't exist
	insertBefore: function (node, before, rescue) {
		if (!node) return;
		if (before && before.parentNode)
			before.parentNode.insertBefore(node, before);
		else
			rescue.appendChild(node);
	},
	//return custom ID from html element
	//will check all parents starting from event's target
	locate: function (e, id) {
		var trg;
		if (e.tagName)
			trg = e;
		else {
			e = e || event;
			trg = e.target || e.srcElement;
		}

		while (trg) {
			if (trg.getAttribute) {	//text nodes has not getAttribute
				var test = trg.getAttribute(id);
				if (test) return test;
			}
			trg = trg.parentNode;
		}
		return null;
	},
	//returns position of html element on the page
	offset: function (elem) {
		if (elem.getBoundingClientRect) { //HTML5 method
			var box = elem.getBoundingClientRect();
			var body = document.body;
			var docElem = document.documentElement;
			var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
			var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
			var clientTop = docElem.clientTop || body.clientTop || 0;
			var clientLeft = docElem.clientLeft || body.clientLeft || 0;
			var top = box.top + scrollTop - clientTop;
			var left = box.left + scrollLeft - clientLeft;
			return {y: Math.round(top), x: Math.round(left), width: elem.offsetWidth, height: elem.offsetHeight};
		} else { //fallback to naive approach
			var top = 0, left = 0;
			while (elem) {
				top = top + parseInt(elem.offsetTop, 10);
				left = left + parseInt(elem.offsetLeft, 10);
				elem = elem.offsetParent;
			}
			return {y: top, x: left, width: elem.offsetHeight, height: elem.offsetWidth};
		}
	},
	//returns relative position of event
	posRelative: function (ev) {
		ev = ev || event;
		if (!webix.isUndefined(ev.offsetX))
			return {x: ev.offsetX, y: ev.offsetY};	//ie, webkit
		else
			return {x: ev.layerX, y: ev.layerY};	//firefox
	},
	//returns position of event
	pos: function (ev) {
		ev = ev || event;
		if (ev.touches && ev.touches[0])
			ev = ev.touches[0];

		if (ev.pageX || ev.pageY)	//FF, KHTML
			return {x: ev.pageX, y: ev.pageY};
		//IE
		var d = ((webix.env.isIE) && (document.compatMode != "BackCompat")) ? document.documentElement : document.body;
		return {
			x: ev.clientX + d.scrollLeft - d.clientLeft,
			y: ev.clientY + d.scrollTop - d.clientTop
		};
	},
	//prevent event action
	preventEvent: function (e) {
		if (e && e.preventDefault) e.preventDefault();
		if (e) e.returnValue = false;
		return webix.html.stopEvent(e);
	},
	//stop event bubbling
	stopEvent: function (e) {
		(e || event).cancelBubble = true;
		return false;
	},
	//add css class to the node
	addCss: function (node, name, check) {
		if (!check || node.className.indexOf(name) === -1)
			node.className += " " + name;
	},
	//remove css class from the node
	removeCss: function (node, name) {
		node.className = node.className.replace(RegExp(" " + name, "g"), "");
	},
	getTextSize: function (text, css) {
		var d = webix.html.create("DIV", {"class": "webix_view webix_measure_size " + (css || "")}, "");
		d.style.cssText = "width:1px; height:1px; visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden; white-space:nowrap;";
		document.body.appendChild(d);

		var all = (typeof text !== "object") ? [text] : text;
		var width = 0;
		var height = 0;

		for (var i = 0; i < all.length; i++) {
			d.innerHTML = all[i];
			width = Math.max(width, d.scrollWidth);
			height = Math.max(height, d.scrollHeight);
		}

		webix.html.remove(d);
		return {width: width, height: height};
	},
	download: function (data, filename) {
		var objUrl = false;

		if (typeof data == "object") {//blob
			if (window.navigator.msSaveBlob)
				return window.navigator.msSaveBlob(data, filename);
			else {
				data = window.URL.createObjectURL(data);
				objUrl = true;
			}
		}
		//data url or blob url
		var link = document.createElement("a");
		link.href = data;
		link.download = filename;
		document.body.appendChild(link);
		link.click();

		webix.delay(function () {
			if (objUrl) window.URL.revokeObjectURL(data);
			document.body.removeChild(link);
			link.remove();
		});
	}
};

webix.toExcel = function (id, options) {
	var view = webix.$$(id);
	options = options || {};

	if (view.$exportView)
		view = view.$exportView(options);

	options._export_mode = "excel";

	var scheme = getExportScheme(view, options);
	var result = getExportData(view, options, scheme);

	var spans = options.spans ? getSpans(view, options) : [];
	var data = getExcelData(result, scheme, spans);

	var wb = {SheetNames: [], Sheets: []};
	var name = options.name || "data";
	wb.SheetNames.push(name);
	wb.Sheets[name] = data;

	var xls = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});
	var filename = (options.filename || name) + ".xlsx";

	var blob = new Blob([str2array(xls)], {type: "application/xlsx"});
	webix.html.download(blob, filename);
};

webix.selectRow = function (gridID, rowIndex) {
	let grid = $$(gridID);

	try {
		if (grid.data.count() === 0) {
			return;
		}

		var rowId = grid.getIdByIndex(rowIndex);

		grid.select(rowId);
	} catch (e) {
		console.log(e);
	}
};