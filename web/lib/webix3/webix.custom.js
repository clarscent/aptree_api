var telRegExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;
var timeRegExp = /^(0[0-9]|1[0-9]|2[0-3]):?([0-5][0-9])$/;
var positiveIntRegExp = /^0$|^[1-9][0-9]*$/;
var negativeIntRegExp = /^0$|^-[1-9][0-9]*$/;
var intRegExp = /^0$|^-?[1-9][0-9]*$/;
var positivePercentRegExp = /^0( ?%)?$|^[1-9][0-9]*%?$/;
var negativePercentRegExp = /^0( ?%)?$|^-[1-9][0-9]*%?$/;
var percentRegExp = /^0( ?%)?$|^-?[1-9][0-9]*%?$/;
var positiveNumberRegExp = /^0$|^0.[0-9]*[1-9]$|^[1-9][0-9]*(.[0-9]*[1-9])?$/;
var negativeNumberRegExp = /^0$|^-0.[0-9]*[1-9]$|-[1-9][0-9]*(.[0-9]*[1-9])?$/;
var numberRegExp = /^-?[0-9]+(.[0-9]*[1-9])?$/;
var yearMonthRegExp = /^([\d]{4})-?(0[1-9]|1[0-2])$/;
var dateRegExp = /^(19[0-9][0-9]|20\d{2})-?(0[0-9]|1[0-2])-?(0[1-9]|[1-2][0-9]|3[0-1])$/;

var Listener = {
	grid: {
		onCellClick: function (gridID, text, value, rowIndex, dataField, rowData, row, column, columnIndex, instance, event) {
			//console.log("onCellClick", gridID, text, value, rowIndex, dataField, rowData, row, column, columnIndex, instance, event);
		},
		onContentReady: function (gridID, instance) {
			//console.log("onCententReady", gridID, instance);
		},
		onEditingStart: function (gridID, value, rowIndex, dataField, rowData, instance) {
			//console.log("onEditingStart", gridID, value, rowIndex, dataField, rowData, instance)
		},
		onFocusedCellChanging: function (gridID, prevRowIndex, prevDataField, newRowIndex, newDataField, instance, event) {
			//console.log("onFocusedCellChanging", gridID, prevRowIndex, prevDataField, newRowIndex, newDataField, instance, event);
		},
		onFocusedCellChanged: function (gridID, rowIndex, dataField, instance) {
			//console.log("onFocusedCellChanged", gridID, rowIndex, dataField, instance);
		},
		onFocusedRowChanged: function (gridID, rowIndex, rowData) {
			//console.log("onFocusedRowChanged", gridID, rowIndex, rowData);
		},
		onInitialized: function (gridID) {
			console.log("onInitialized", gridID);
		},
		onKeyDown: function (gridID, rowIndex, columnIndex, dataField, value, keyCode, rowData, event) {
			console.log("onKeyDown", gridID, rowIndex, columnIndex, dataField, value, keyCode, rowData, event);
		},
		onRowClick: function (gridID, rowIndex, rowData, rowKey, columns, rowType) {
			//console.log("onRowClick", gridID, rowIndex, rowData, rowKey, columns, rowType)
		},
		onRowDblClick: function (gridID, rowIndex, rowData, columnIndex, dataField) {
			//console.log("onRowDblClick", gridID, rowIndex, rowData, columnIndex, dataField);
		},
		onRowInserted: function (gridID, rowIndex, rowData) {
			//console.log("onRowInserted", gridID, rowIndex, rowData);
		},
		onCellUpdating: function (gridID, value, rowIndex, dataField) {
			console.log("onCellUpdating", gridID, value, rowIndex, dataField);
		},
		onCellUpdated: function (gridID, rowIndex, columnIndex, dataField, columnValue, rowData) {
			console.log("onCellUpdated", gridID, rowIndex, columnIndex, dataField, columnValue, rowData);
		},
		onSelectionChanged: function (gridID, currentSelectedRowKeys, currentDeselectedRowKeys, selectedRowsData) {
			//console.log("onSelectionChanged", gridID, currentSelectedRowKeys, selectedRowsData)
		},
	},
};

var delay = 0;
var timer = null;

//Javascript
window.addEventListener('resize', function(){
	//gridResize();
	/*clearTimeout(timer);
	timer = setTimeout(function(){

	}, delay);*/
});

$(window).resize(function() {
	gridResize();
});

let gridResize = function() {
	let $gridArr = $("div.webix_dtable");

	//console.log($gridArr)

	$gridArr.each((idx, grid) => {
		//console.log(grid);
		let $grid = $(grid);
		let id = $grid.attr("view_id");

		let $$grid = $$(id);

		console.log("id", $("#" + id).height());

		$$grid.config.height = $("#" + id).height();
		$$grid.config.width = $("#" + id).width();
		$$grid.resize();
	});
}


let setGridResize = function() {
	$('.webix_dtable').each(function () {
		var $this = $(this);
		var _dataTable = $$($this.parent().attr("id"));

		if (!_dataTable._viewobj) {
			return false;
		}

		var x = _dataTable._viewobj.parentNode.offsetWidth || 0;
		var y = _dataTable._viewobj.parentNode.offsetHeight || 0;

		var orgX = x;
		var sizes = _dataTable.$getSize(0, 0);

		//minWidth
		if (sizes[0] > x) x = sizes[0];
		//minHeight
		if (sizes[2] > y) y = sizes[2];

		//maxWidth rule
		if (x > sizes[1]) x = sizes[1];
		//maxHeight rule
		if (y > sizes[3]) y = sizes[3];

		var y2 = y - 2;
		var x2 = x - 10;

		if (!isNaN(sizes[0])) {
			x2 = sizes[0];
		}

		_dataTable.$setSize(x2, y2);
	});
}

webix.csv.escape = true;
var delTmpList = []; //grid 삭제된 데이타 temp List

webix.i18n.locales["ko-KR"] = {	 //"es-ES" - the locale name, the same as the file name
	groupDelimiter: ",",				 //a mark that divides numbers with many digits into groups
	groupSize: 3,								//the number of digits in a group
	decimalDelimeter: ".",			 //the decimal delimiter
	decimalSize: 2,							//the number of digits after the decimal mark

	dateFormat: "%Y-%m-%d",			//applied to columns with 'format:webix.i18n.dateFormatStr'
	dateFormatMD: "%m-%d",			//applied to columns with 'format:webix.i18n.dateFormatStr'
	timeFormat: "%H:%i",				 //applied to columns with 'format:webix.i18n.dateFormatStr'
	longDateFormat: "%Y년%F%d일",	//applied to columns with 'format:webix.i18n.longDateFormatStr'
	fullDateFormat: "%Y-%m-%d %H:%i",//applied to cols with 'format:webix.i18n.fullDateFormatStr'

	priceSettings: {
		groupDelimiter: ",",
		groupSize: 3,
		decimalDelimeter: ".",
		decimalSize: 0
	},
	price: "{obj}",//EUR - currency name. Applied to cols with 'format:webix.i18n.priceFormat'
	calendar: {
		monthFull: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		dayFull: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
		dayShort: ["일", "월", "화", "수", "목", "금", "토"]
	}
};

webix.i18n.setLocale("ko-KR");
webix.editors.traditional_text = webix.editors.text;
webix.editors.text = {
	focus: function () {
		this.getInputNode(this.node).focus();
		this.getInputNode(this.node).select();
	},
	getValue: function () {
		return this.getInputNode(this.node).value;
	},
	setValue: function (value) {
		this.getInputNode(this.node).value = value;
	},
	getInputNode: function () {
		return this.node.firstChild;
	},
	render: function () {
		$editor = this;
		var maxLengthStr = '';
		if (this.config.option && this.config.option.maxlength) {
			maxLengthStr = ' maxlength="' + this.config.option.maxlength + '" ';
		}
		var el = webix.html.create("div", {
			"class": "webix_dt_editor"
		}, "<input type='text' " + maxLengthStr + ">");

		if (this.config && this.config.option) {
			if (this.config.option.type === 'code'
				|| this.config.option.type === 'uppercase') {
				$(el).allowOnlyUpperCase();
			}

			if (this.config.option.type === 'positiveNumber'
				|| this.config.option.type === 'negativeNumber'
				|| this.config.option.type === 'number') {
				$(el).allowOnlyNumeric();
			}
		}

		return el;
	}
}

webix.editors.$popup = {
	date: {
		view: "popup",
		body: {
			view: "calendar",
			icons: true
		},
	}
};

webix.protoUI({
	name:"calendar",

	defaults:{
		date: new Date(), //selected date, not selected by default
		select: false,
		navigation: true,
		monthSelect: true,
		weekHeader: true,
		weekNumber: false,
		skipEmptyWeeks: false,

		calendarHeader: "%F %Y",
		calendarWeekHeader: "W#",
		//calendarTime: "%H:%i",
		events:webix.Date.isHoliday,
		minuteStep: 5,
		icons: false,
		timepickerHeight: 30,
		headerHeight: 70,
		dayTemplate: function(d){
			return d.getDate();
		},
		width: 259,
		height: 250
	},

	dayTemplate_setter: webix.template,
	calendarHeader_setter:webix.Date.dateToStr,
	calendarWeekHeader_setter:webix.Date.dateToStr,
	calendarTime_setter:function(format){
		this._calendarTime = format;
		return webix.Date.dateToStr(format);
	},
	date_setter:function(date){
		return this._string_to_date(date);
	},
	maxDate_setter:function(date){
		return this._string_to_date(date);
	},
	minDate_setter:function(date){
		return this._string_to_date(date);
	},

	$init: function() {
		this._viewobj.className += " webix_calendar";

		//special dates
		this._special_dates = {};
		this._selected_date_part = this._selected_date = null;
		this._zoom_level = 0;
	},
	type_setter: function(value){
		if(value === "time"){
			this._zoom_in = true;
			this._zoom_level = -1;
		}
		return value;
	},
	$setSize:function(x,y){

		if(webix.ui.view.prototype.$setSize.call(this,x,y)){
			//repaint calendar when size changed
			this.render();
		}
	},
	$getSize:function(dx, dy){
		if (this._settings.cellHeight){
			var state = this._getDateBoundaries(this._settings.date);
			this._settings.height = this._settings.cellHeight * state._rows + (webix.skin.$active.calendarHeight||70);
		}
		return webix.ui.view.prototype.$getSize.call(this, dx,dy);
	},
	_getDateBoundaries: function(date, reset) {
		// addition information about rendering event:
		// 	how many days from the previous month,
		// 	next,
		// 	number of weeks to display and so on

		if (!this._set_date_bounds || reset){
			var month = date.getMonth();
			var year = date.getFullYear();

			var next = new Date(year, month+1, 1);
			var start = webix.Date.weekStart(new Date(year, month, 1));

			var days = Math.round((next.valueOf() - start.valueOf())/(60*1000*60*24));
			var rows = this._settings.skipEmptyWeeks?Math.ceil(days/7):6;

			this._set_date_bounds = { _month: month, _start:start, _next:next, _rows: rows};
		}

		return this._set_date_bounds;
	},
	$skin:function(){
		if(webix.skin.$active.calendar){
			if( webix.skin.$active.calendar.width)
				this.defaults.width = webix.skin.$active.calendar.width;
			if( webix.skin.$active.calendar.height)
				this.defaults.height = webix.skin.$active.calendar.height;
			if( webix.skin.$active.calendar.headerHeight)
				this.defaults.headerHeight = webix.skin.$active.calendar.headerHeight;
			if( webix.skin.$active.calendar.timepickerHeight)
				this.defaults.timepickerHeight = webix.skin.$active.calendar.timepickerHeight;
		}

	},
	_getColumnConfigSizes: function(date){
		var bounds = this._getDateBoundaries(date);

		var s = this._settings;
		var _columnsHeight = [];
		var _columnsWidth = [];

		var containerWidth = this._content_width - 36;

		var containerHeight = this._content_height - this._settings.headerHeight - 10 - (this._settings.timepicker||this._icons?this._settings.timepickerHeight:0);

		var columnsNumber = (s.weekNumber)?8:7;
		for(var i=0; i<columnsNumber; i++) {
			_columnsWidth[i] = Math.ceil(containerWidth/(columnsNumber-i));
			containerWidth -= _columnsWidth[i];
		}

		var rowsNumber = bounds._rows;
		for (var k = 0; k < rowsNumber; k++) {
			_columnsHeight[k] = Math.ceil(containerHeight/(rowsNumber-k) );
			containerHeight -= _columnsHeight[k];
		}
		return [_columnsWidth, _columnsHeight];
	},
	icons_setter: function(value){
		if(!value)
			this._icons = null;
		else if(typeof value == "object")
			this._icons = value;
		else
			this._icons = this._icons2;
	},
	_icons: [],
	_icons2: [

		{
			template: function(){
				return "<span class='webix_cal_icon_today webix_cal_icon'>"+webix.i18n.calendar.today+"</span>";
			},
			on_click:{
				"webix_cal_icon_today": function(){
					this.setValue(new Date());
					this.callEvent("onTodaySet",[this.getSelectedDate()]);
				}
			}
		},
		{
			template: function(){
				return "<span class='webix_cal_icon_clear webix_cal_icon'>"+webix.i18n.calendar.clear+"</span>";
			},
			on_click:{
				"webix_cal_icon_clear": function(){
					this.setValue("");
					this.callEvent("onDateClear",[this.getSelectedDate()]);
				}
			}
		}
	],
	refresh:function(){ this.render(); },
	render: function() {
		//reset zoom level
		this._zoom_level = 0;
		this._zoom_size = false;

		var s = this._settings;

		if (!this.isVisible(s.id)) return;
		this._current_time = webix.Date.datePart(new Date());

		if (webix.debug_render)
			webix.log("Render: "+this.name+"@"+s.id);
		this.callEvent("onBeforeRender",[]);

		var date = this._settings.date;

		var bounds = this._getDateBoundaries(date, true);
		var sizes = this._getColumnConfigSizes(date);
		var width = sizes[0];
		var height = sizes[1];

		var html = "<div class='webix_cal_month'><span class='webix_cal_month_name"+(!this._settings.monthSelect?" webix_readonly":"")+"'>"+s.calendarHeader(date)+'</span>';
		if (s.navigation)
			html += "<div class='webix_cal_prev_button'></div><div class='webix_cal_next_button'></div>";
		html += "</div>";

		if(s.weekHeader)
			html += "<div class='webix_cal_header'>"+this._week_template(width)+"</div>";

		html += "<div class='webix_cal_body'>"+this._body_template(width, height, bounds)+"</div>";

		if (this._settings.timepicker || this._icons){
			html += "<div class='webix_cal_footer'>";
			if(this._settings.timepicker)
				html += this._timepicker_template(date);

			if(this._icons)
				html += this._icons_template();
			html += "</div>";
		}


		this._contentobj.innerHTML = html;

		if(this._settings.type === "time"){
			var time = this._settings.date;
			if(time){
				if(typeof(time) == "string"){
					date = webix.i18n.parseTimeFormatDate(time);
				}
				else if(webix.isArray(time)){
					date.setHours(time[0]);
					date.setMinutes(time[1]);
				}
			}
			this._changeZoomLevel(-1,date);
		}
		this.callEvent("onAfterRender",[]);
	},
	_icons_template: function(date){
		var html =	"<div class='webix_cal_icons'>";
		var icons = this._icons;

		for(var i=0; i < icons.length; i++){
			if(icons[i].template){
				var template = (typeof(icons[i].template) == "function"?icons[i].template: webix.template(icons[i].template));
				html += template.call(this,date);
			}
			if(icons[i].on_click){
				webix.extend(this.on_click,icons[i].on_click);
			}
		}
		html += "</div>";
		return html;
	},
	_timepicker_template:function(date){
		var timeFormat = this._settings.calendarTime||webix.i18n.timeFormatStr;
		return "<div class='webix_cal_time"+(this._icons?" webix_cal_time_icons":"")+"'><span class='webix_icon fa-clock-o'></span> "+timeFormat(date)+"</div>";
	},
	_week_template: function(widths){
		var s = this._settings;
		var week_template = '';
		var correction = 0;

		if(s.weekNumber) {
			correction = 1;
			week_template += "<div class='webix_cal_week_header' style='width: "+widths[0]+"px;' >"+s.calendarWeekHeader()+"</div>";
		}

		var k = (webix.Date.startOnMonday)?1:0;
		for (var i=0; i < 7; i++){ // 7 days total
			var day_index = (k + i) % 7; // 0 - Sun, 6 - Sat as in Locale.date.day_short
			var day = webix.i18n.calendar.dayShort[day_index]; // 01, 02 .. 31
			week_template += "<div day='"+day_index+"' style='width: "+widths[i+correction]+"px;' >"+day+"</div>";
		}

		return week_template;
	},
    blockDates_setter:function(value){
        return webix.toFunctor(value, this.$scope);
    },
    _day_css:function(day, bounds){
		var css = "webix_cal_day";
		if (webix.Date.equal(day, this._current_time))
			css += " webix_cal_today";
		if (webix.Date.equal(day, this._selected_date_part))
			css += " webix_cal_select";
		if (day.getMonth() !== bounds._month)
			css += " webix_cal_outside";

        if ( (this._settings.blockDates && this._settings.blockDates.call(this,day)) ||
        	 ( day < this._settings.minDate || day > this._settings.maxDate))
        		css+= " webix_cal_day_disabled";

		if (this._settings.events)
			css+=" "+this._settings.events(day);

		return css;
	},
	_body_template: function(widths, heights, bounds){
		var s = this._settings;
		var html = "";
		var day = webix.Date.datePart(webix.Date.copy(bounds._start));
		var start = s.weekNumber?1:0;
		var weekNumber = webix.Date.getISOWeek(webix.Date.add(day,2,"day", true));

		var min = this._settings.minDate || new Date(1,1,1);
        var max = this._settings.maxDate || new Date(9999,1,1);

		for (var y=0; y < heights.length; y++){
			html += "<div class='webix_cal_row' style='height:"+heights[y]+"px;line-height:"+heights[y]+"px'>";
			if (start) {
				// recalculate week number for the first week of a year
				if (!day.getMonth() && day.getDate() < 7)
					weekNumber = webix.Date.getISOWeek(webix.Date.add(day, 2, "day", true));
				html += "<div class='webix_cal_week_num' style='width:" + widths[0] + "px'>" + weekNumber + "</div>";
			}

			for (var x=start; x<widths.length; x++){
				var css = this._day_css(day, bounds);
				var d = this._settings.dayTemplate.call(this,day);
				html += "<div day='"+x+"' class='"+css+"' style='width:"+widths[x]+"px'><span class='webix_cal_day_inner'>"+d+"</span></div>";
				day = webix.Date.add(day, 1, "day");
				if(day.getHours()){
					day = webix.Date.datePart(day);
				}
			}

			html += "</div>";
			weekNumber++;
		}
		return html;
	},
	_changeDate:function(dir, step, notset){
		var now = this._settings.date;
		if(!step) { step = this._zoom_logic[this._zoom_level]._changeStep; }
		if(!this._zoom_level){
			now = webix.Date.copy(now);
			now.setDate(1);
		}
		var next = webix.Date.add(now, dir*step, "month", true);
		this._changeDateInternal(now, next);
	},
	_changeDateInternal:function(now, next){
		if(this.callEvent("onBeforeMonthChange", [now, next])){
			if (this._zoom_level){
				this._update_zoom_level(next);
			}
			else{
				this.showCalendar(next);
			}
			this.callEvent("onAfterMonthChange", [next, now]);
		}
	},
	_zoom_logic:{
		"-2":{
			_setContent:function(next, i){ next.setMinutes(i); }
		},
		"-1":{
			_setContent:function(next, i){ next.setHours(i); }
		},
		"0":{
			_changeStep:1
		},//days
		"1":{	//months
			_getTitle:function(date){ return date.getFullYear(); },
			_getContent:function(i){ return webix.i18n.calendar.monthShort[i]; },
			_setContent:function(next, i){ if(i!=next.getMonth()) next.setDate(1);next.setMonth(i); },
			_changeStep:12
		},
		"2":{	//years
			_getTitle:function(date){
				var start = date.getFullYear();
				this._zoom_start_date = start = start - start%10 - 1;
				return start+" - "+(start+10);
			},
			_getContent:function(i){ return this._zoom_start_date+i; },
			_setContent:function(next, i){ next.setFullYear(this._zoom_start_date+i); },
			_changeStep:12*10
		}
	},
	_update_zoom_level:function(date){
		var css, height, i, selected, width;
		var html = "";
		var index = this._settings.weekHeader?2: 1;
		var zlogic = this._zoom_logic[this._zoom_level];
		var sections  = this._contentobj.childNodes;

		if (date)
			this._settings.date = date;


		//store width and height of draw area
		if (!this._zoom_size){
			/*this._reserve_box_height = sections[index].offsetHeight +(index==2?sections[1].offsetHeight:0);*/

			this._reserve_box_height = this._contentobj.offsetHeight - this._settings.headerHeight - this._settings.timepickerHeight;
			this._reserve_box_width = sections[index].offsetWidth;
			this._zoom_size = 1;
		}

		//main section
		if (this._zoom_in){
			//hours and minutes
			height = this._reserve_box_height/6;
			var timeColNum = 6;
			var timeFormat = this._calendarTime||webix.i18n.timeFormat;
			var enLocale = timeFormat.match(/%([a,A])/);
			if(enLocale)
				timeColNum++;
			width = parseInt((this._reserve_box_width-3)/timeColNum,10);

			html += "<div class='webix_time_header'>"+this._timeHeaderTemplate(width,enLocale)+"</div>";
			html += "<div  class='webix_cal_body' style='height:"+this._reserve_box_height+"px'>";
				html += "<div class='webix_hours'>";
				selected = this._settings.date.getHours();
				for (i=0; i<24; i++){
					css="";
					if(enLocale){
						if((selected>11&&i<=11)||(selected<=11&&i>11))
							css = " webix_cal_blurred_hours";
						if(i%4===0){
							var label = (i==4?"AM":(i==16?"PM":""));
							html += "<div class='webix_cal_block_empty"+css+"' style='"+this._getCalSizesString(width,height)+"clear:both;"+"'>"+label+"</div>";
						}
					}
					css += (selected ==  i? " webix_selected" : "");
					var value = webix.Date.toFixed(enLocale&& i>12?i-12:i);
					html += "<div class='webix_cal_block"+css+"' data-value='"+i+"' style='"+this._getCalSizesString(width,height)+(i%4===0&&!enLocale?"clear:both;":"")+"'>"+value+"</div>";
				}
				html += "</div>";
				html += "<div class='webix_minutes'>";
				selected = this._settings.date.getMinutes();
				for (i=0; i<60; i+=this._settings.minuteStep){
					css = (selected == i ? " webix_selected" : "");
					html += "<div class='webix_cal_block webix_cal_block_min"+css+"' data-value='"+i+"' style='"+this._getCalSizesString(width,height)+(i%2===0?"clear:both;":"")+"'>"+webix.Date.toFixed(i)+"</div>";
				}
				html += "</div>";
			html += "</div>";
			html += "<div  class='webix_time_footer'>"+this._timeButtonsTemplate()+"</div>";
			this._contentobj.innerHTML = html;
		} else {
			//years and months
			//reset header
			sections[0].firstChild.innerHTML = zlogic._getTitle(this._settings.date);
			height = this._reserve_box_height/3;
			width = this._reserve_box_width/4;
			selected = (this._zoom_level==1?this._settings.date.getMonth():this._settings.date.getFullYear());
			for (i=0; i<12; i++){
				css = (selected == (this._zoom_level==1?i:zlogic._getContent(i)) ? " webix_selected" : "");
				html+="<div class='webix_cal_block"+css+"' data-value='"+i+"' style='"+this._getCalSizesString(width,height)+"'>"+zlogic._getContent(i)+"</div>";
			}
			if(index-1){
				sections[index-1].style.display = "none";
			}
			sections[index].innerHTML = html;
			if(!sections[index+1]){
				this._contentobj.innerHTML += "<div  class='webix_time_footer'>"+this._timeButtonsTemplate()+"</div>";
			}
			else
				sections[index+1].innerHTML=this._timeButtonsTemplate();
			sections[index].style.height = this._reserve_box_height+"px";
		}
	},
	_getCalSizesString: function(width,height){
		return "width:"+width+"px; height:"+height+"px; line-height:"+height+"px;";
	},
	_timeButtonsTemplate: function(){
		return "<input type='button' style='width:100%' class='webix_cal_done' value='"+webix.i18n.calendar.done+"'>";
	},
	_timeHeaderTemplate: function(width,enLocale){
		var w1 = width*(enLocale?5:4);
		var w2 = width*2;
		return "<div class='webix_cal_hours' style='width:"+w1+"px'>"+webix.i18n.calendar.hours+"</div><div class='webix_cal_minutes' style='width:"+w2+"px'>"+webix.i18n.calendar.minutes+"</div>";
	},
	_changeZoomLevel: function(zoom,date){
		if(this.callEvent("onBeforeZoom",[zoom])){
			this._zoom_level = zoom;
			if(zoom)
				this._update_zoom_level(date);
			else
				this.showCalendar(date);
			this.callEvent("onAfterZoom",[zoom]);
		}
	},
	_mode_selected:function(value){
		var now = this._settings.date;
		var next = webix.Date.copy(now);
		this._zoom_logic[this._zoom_level]._setContent(next, value);
		var zoom = this._zoom_level-1;
		this._changeZoomLevel(zoom, next);
	},
	// selects date and redraw calendar
	_selectDate: function(date){
		if(this.callEvent("onBeforeDateSelect", [date])){
			this.selectDate(date, true);
			this.callEvent("onDateSelect", [date]);       // should be deleted in a future version
			this.callEvent("onAfterDateSelect", [date]);
		}
	},
	on_click:{
		webix_cal_prev_button: function(e, id, target){
			this._changeDate(-1);
		},
		webix_cal_next_button: function(e, id, target){
			this._changeDate(1);
		},
		webix_cal_day: function(e, id, target){
            if(target.className.indexOf('webix_cal_day_disabled')!==-1)
                return false;
			var cind = webix.html.index(target) - (this._settings.weekNumber?1:0);
			var rind = webix.html.index(target.parentNode);
			var date = webix.Date.add(this._getDateBoundaries()._start, cind + rind*7, "day", true);
			if (this._settings.timepicker){
				date.setHours(this._settings.date.getHours());
				date.setMinutes(this._settings.date.getMinutes());
			}
			this._selectDate(date);

		},
		webix_cal_time:function(e){
			if(this._zoom_logic[this._zoom_level-1]){
				this._zoom_in = true;
				var zoom = this._zoom_level - 1;
				this._changeZoomLevel(zoom);
			}
		},
		webix_cal_done:function(e){
			this._selectDate(this._settings.date);
		},
		webix_cal_month_name:function(e){
			this._zoom_in = false;
			//maximum zoom reached
			if (this._zoom_level == 2 || !this._settings.monthSelect) return;

			var zoom = Math.max(this._zoom_level, 0) + 1;
			this._changeZoomLevel(zoom);
		},
		webix_cal_block:function(e, id, trg){
			if(this._zoom_in){
				var level = (trg.className.indexOf("webix_cal_block_min")!=-1?this._zoom_level-1:this._zoom_level);
				var now = this._settings.date;
				var next = webix.Date.copy(now);
				this._zoom_logic[level]._setContent(next, trg.getAttribute("data-value")*1);
				this._update_zoom_level(next);
			}
			else{
				this._mode_selected(trg.getAttribute("data-value")*1);
			}
		}
	},

	_string_to_date: function(date, format){
		if (!date){
			return webix.Date.datePart(new Date());
		}


		if(typeof date == "string"){
			if (format)
				date = webix.Date.strToDate(format)(date);
			else
				date=webix.i18n.parseFormatDate(date);
		}

		return date;
	},
	showCalendar: function(date) {
		date = this._string_to_date(date);

		//date is already visible, skip update
		this._settings.date = date;
		this.render();
		this.resize();
	},
	getSelectedDate: function() {
        return (this._selected_date)?webix.Date.copy(this._selected_date):this._selected_date;

	},
	getVisibleDate: function() {
		return webix.Date.copy(this._settings.date);
	},
	setValue: function(date, format){
		console.log("setValue", date, format);

		if (date.length === 8) {
			date = dateFormat(date);
		}
        this.selectDate(date, true);
	},
	getValue: function(format){
		var date = this.getSelectedDate();
		if (format)
			date = webix.Date.dateToStr(format)(date);
		return date;
	},
	selectDate: function(date, show){
        if(date){
            date = this._string_to_date(date);
            this._selected_date = date;
            this._selected_date_part = webix.Date.datePart(webix.Date.copy(date));
        }
        else{ //deselect
            this._selected_date = null;
            this._selected_date_part = null;
	        if(this._settings.date){
		        webix.Date.datePart(this._settings.date);
	        }
        }

		if (show)
			this.showCalendar(date);
		else
			this.render();

		this.callEvent("onChange",[date]);
	},
	locate:function(){ return null; }

}, webix.MouseEvents, webix.ui.view, webix.EventSystem);


webix.GroupMethods.median = function (prop, data) {
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
	name: "datagrid",
	delTmpList: [],
	getData: function () {
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
	eachColumn:function(handler, all){
		for (var i in this._columns_pull){
			var column = this._columns_pull[i];
			handler.call(this, column.id, column);
		}
		if (all){
			for (var i in this._hidden_column_hash){
				var column = this._hidden_column_hash[i];
				handler.call(this, column.id, column);
			}
		}
	},
	editNext:function(next, from){
		next = next !== false; //true by default
		if (this._in_edit_mode == 1 || from) {
			//only if one editor is active
			var editor_next = this._find_cell_next((this._last_editor || from), function (id) {
				if (this._get_editor_type(id))
					return true;
				return false;
			}, next);

			if (this.editStop()) {	//if we was able to close previous editor
				if (editor_next) {	//and there is a new target
					this.edit(editor_next);	//init new editor
					this._after_edit_next(editor_next);
				} else {
					var columns = this.config.columns;
					var emptyObj = {};

					columns.forEach(function(col) {
						emptyObj[col.id] = "";
					});

					if (this.config.canAddRow) {
						this.addRow(emptyObj);
					}
				}
				return false;
			}
		}
	},
	getCheckedData: function (checkboxId) {
		var resultList = this.getData();
		var config = this.getColumnConfig(checkboxId);
		var ckVal = checkEmpty(config.checkValue, "");

		resultList = resultList.filter(function (value) {
			if (isEmpty(ckVal) ? (value[checkboxId]) : (ckVal == value[checkboxId]))
				return true;
			else
				return false;
		});
		return resultList;
	},
	getRowStatusModified: function () {
		var returnResult = false;
		var resultList = this.getData();
		var delLen = this.delTmpList.length;
		resultList = resultList.filter(function (value) {
			if (value["rowStatus"] == "C" || value["rowStatus"] == "U") {
				returnResult = true;
			}
		});
		if (delLen > 0) returnResult = true;
		return returnResult;
	},
	updateCell: function (rowIndex, dataField, value) {
		var gridID = this.config.id;
		var rowId = this.getIdByIndex(rowIndex);
		var record = this.getItem(rowId);
		var columnIndex = this.getColumnIndex(dataField);

		var bool = Listener.grid.onCellUpdating(gridID, value, rowIndex, dataField);

		if (bool === false) {
			return;
		}

		record[dataField] = value;
		this.updateItem(rowId, value);
		Listener.grid.onCellUpdated(gridID, rowIndex, columnIndex, dataField, value, record);
	},
	updateRow: function (rowIdx, data) {
		var rowId = this.getIdByIndex(rowIdx);
		this.updateItem(rowId, data);
	},
	getNextEditableColumn: function (rowId, columnId) {
		var nextRowId = rowId;
		var lastColIdx = this.getColumnIndex(columnId);
		if (columnId == null) {
			lastColIdx = -1;
		}
		var cnt = 0;
		var nextColIdx = (lastColIdx + 1) % this.config.columns.length;

		if (nextColIdx < lastColIdx) {
			try {
				nextRowId = this.getNextId(nextRowId);
			} catch (ex) {
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
			rowId: nextRowId,
			colId: nextColId
		};
	},
	checkValidation: function () {
		this.editStop();

		var isValid = true;
		for (var rowId in this.invalidCellMap) {
			for (var columnId in this.invalidCellMap[rowId]) {
				var columnIndex = this.getColumnIndex(columnId);
				var self = this;
				var maxlength = (this.config.columns[columnIndex].option) ? this.config.columns[columnIndex].option.maxlength : null;
				var value = this.getItem(rowId)[columnId];

				// 길이 확인
				if (maxlength && getByteSize(value) > parseInt(maxlength)) {
					var msg = $(this.getHeaderNode(columnId)).text() + '을(를) 확인하세요. 데이터 길이가 ' + maxlength + 'Byte를 초과할 수 없습니다.(현재: ' + getByteSize(value) + 'Byte)';
					popup.alert.show(msg, function () {
						self.select(rowId, columnId);
						if (self.config.editable) {
							self.editCell(rowId, columnId, false, true);
						}
					});
				} else {
					popup.alert.show($(this.getHeaderNode(columnId)).text() + '을(를) 확인하세요.', function () {
						self.select(rowId, columnId);
						if (self.config.editable) {
							self.editCell(rowId, columnId, false, true);
						}
					});
				}
				self.select(rowId);
				self.editCell(rowId);
				self.showCell(rowId);
				isValid = false;
				break;
			}
		}
		return isValid;
	},
	clearData: function () {
		this.invalidCellMap = {};
		this.editStop();
		this.blockEvent();
		this.clearAll();
		this.unblockEvent();
		this.delTmpList = [];
		this._spans_pull = {};
	},
	setData: function (data) {
		this.clearData();
		var cols = this.config.columns;
		var that = this;

		data.forEach(function(item) {
			that.eachColumn(function(col){
				if (item[col] === undefined) {
				 	item[col] = "";
				}
			}, true);
		});

		this.parse(data, 'json');
	},
	showLoadingMsg: function (msg) {
		this.__oldEnabled = this.isEnabled();
		this.disable();
		this.showOverlay(msg);
	},
	hideLoadingMsg: function () {
		this.hideOverlay();
		if (this.__oldEnabled) {
			this.enable();
		}
	},
	addRow: function (rowObj, rowIndex) {
		if (!this.config.canAddRow) {
			return;
		}

		this.editStop();
		var id = this.add(rowObj, rowIndex);

		if (id) {
			this.select(id);
			var editableColNm = "";
			var columnArr = this.config.columns;
			for (var i = 0; i < columnArr.length; i++) {
				var column = columnArr[i];
				if (column.editor) {
					editableColNm = column.id;
					break;
				}
			}
			this.editCell(id, editableColNm);
			this.showCell(id);
		}
	},

	addRows: function (rows) {
		this.editStop();
		var id;

		for (var i = 0; i < rows.length; i++) {
			id = this.add(checkEmpty(rows[i], {}));
		}

		if (id) {
			this.select(id);
			this.editCell(id);
		}
	},

	removeRow: function (row) {
		if (!isNull(row) && !isNull(row["id"])) {
			this.blockEvent();
			this.editStop();

			var focusId = this.getPrevId(row["id"], 1);

			if (isNull(focusId)) {
				focusId = this.getNextId(row["id"], 1);
			}

			if (row["id"]) {
				delete this.invalidCellMap[row["id"]];
				this.remove(row["id"]);
			}

			this.unblockEvent();
		}
	},
	removeRowByIndex: function (row) {
		if (!isNull(row) && !isNull(row["id"])) {
			this.blockEvent();
			this.editStop();

			var focusId = this.getPrevId(row["id"], 1);

			if (isNull(focusId)) {
				focusId = this.getNextId(row["id"], 1);
			}

			if (row["id"]) {
				delete this.invalidCellMap[row["id"]];
				this.remove(row["id"]);
			}

			this.unblockEvent();
		}
	},

	removeRows: function (rows) {
		this.blockEvent();
		this.editStop();

		if (rows && rows[0] && rows[0]["id"]) {
			var focusId = this.getPrevId(rows[0]["id"], 1);

			if (isNull(focusId)) {
				focusId = this.getNextId(rows[rows.length - 1]["id"], 1);
			}

			for (var i = 0; i < rows.length; i++) {
				delete this.invalidCellMap[rows[i]["id"]];
				this.remove(rows[i]["id"]);
			}

			this.unblockEvent();

			if (!isNull(focusId)) {
				this.select(focusId);
			}
		}
	},

	removeSelectedRow: function () {
		var focusId = this.getPrevId(this.getSelectedId(), 1);

		if (isNull(focusId)) {
			focusId = this.getNextId(this.getSelectedId(), 1);
		}

		if (this.getSelectedId()) {
			this.blockEvent();
			this.editStop();
			var selectedId = this.getSelectedId();
			var resultList = this.getData();
			var record = this.getItem(selectedId);

			while (resultList.length != 0) {
				var item = resultList.shift();
				if (item.id == selectedId && record["rowStatus"] != "C") this.delTmpList.push(item);
			}

			delete this.invalidCellMap[this.getSelectedId()];
			this.remove(this.getSelectedId());

			this.unblockEvent();

			if (focusId) {
				this.select(focusId);
			}
		}
	},

	delDataAdd: function (REGUSERID, REGIP, param) {
		while (this.delTmpList.length != 0) {
			var item = this.delTmpList.shift();
			item["REGUSERID"] = REGUSERID;
			item["REGIP"] = REGIP;
			item["rowStatus"] = "D";
			param.push(item);
		}
	},

	defaults: {
		leftSplit: 0,
		rightSplit: 0,
		columnWidth: 100,
		minColumnWidth: 20,
		minColumnHeight: 26,
		prerender: false,
		autoheight: false,
		autowidth: false,
		header: true,
		fixedRowHeight: false,
		scrollAlignY: true,
		datafetch: 50,

		'export': true,
		dragColumn: false,
		resizeColumn: true,
		editable: true,
		checkboxRefresh: true,
		footer: false,
		blockselect: false,
		clipboard: false,
		select: 'row',
		navigation: true,
		tooltip: true,
		autoselect: true,
		enablerowclick: false,
		liveEdit: true,

		on: {
			onStructureLoad: function (a,b,c,d) {
				//console.log("onStructureLoad");
				Listener.grid.onInitialized(this.config.id);
			},
			onStructureUpdate: function(a,b,c,d) {
				//console.log("onStructureUpdate",a,b,c,d, event, window.event);
			},
			onValidationSuccess: function (id, value, columnNames) {
				delete this.invalidCellMap[id];
			},
			onValidationError: function (id, value, columnNames) {
				this.invalidCellMap[id] = columnNames;
			},
			onAfterLoad: function () {
				if (!this.count() && !this.config.editable) {
					//this.showOverlay("표시할 데이터가 없습니다.");
				}

				if (window['onGridDataLoaded']) {
					onGridDataLoaded(this.config.id);
				}

				if (this.config && this.config.view === "datagrid" && !isNull(this.getFirstId()) && this.config.autoselect) {
					this.select(this.getFirstId());
				}

				// webix.delay(function () {
				// 	this.adjustRowHeight("Position", true);
				// 	this.render();
				// }, this);

				var gridID = this.config.id; //gridID
				var instance = this;

				Listener.grid.onContentReady(gridID, instance);
			},
			onColumnResize: function () {
				//this.adjustRowHeight("Position", true);
				//this.render();
			},
			onHeaderClick: function (id, e, target) {
				var state = this.getState().sort;

				if (state !== null && state !== undefined) {
					if (id.column === state.id) {
						if (state.dir === "desc") {
							this.sort("id", "asc");
							this.markSorting();
							return false;
						}
					}
				}
			},
			onBeforeAdd: function () {
				this.hideOverlay();
			},
			onBeforeEditStart: function (target) {
				var evt = event || window.event;

				if (evt.defaultPrevented) {
					return false;
				}

				var grid = this;
				var record = grid.getItem(target.row);
				var curCol = grid.getColumnConfig(target.column);

				var gridID = this.config.id; //gridID
				var value = record[target.column]; // value
				var rowIndex = this.getIndexById(target.row); // rowIndex;
				var dataField = target.column; // dataField;

				Listener.grid.onCellUpdating(gridID, value, rowIndex, dataField);
			},
			onAfterEditStart: function (target) {
				var evt = event || window.event;
				var record = this.getItem(target.row);

				var gridID = this.config.id; //gridID
				var value = record[target.column]; // value
				var rowIndex = this.getIndexById(target.row); // rowIndex;
				var dataField = target.column; // dataField;
				var rowData = record; // rowData;
				var instance = this;
				var value = record[target.column]; // value

				Listener.grid.onEditingStart(gridID, value, rowIndex, dataField, rowData, instance);

				var evt = event || window.event;

				if (evt && evt.type == "click" && evt.srcElement.tagName == "BUTTON" && $(evt.srcElement).hasClass("btnCodeHelpGrid")) {
					this.editStop(null, true, true);
				}
			},
			onBeforeEditStop: function (state, editor, ignore) {
				var grid = this;
				var evt = event || window.event;
				var record = grid.getItem(editor.row);
				var rowIndex = this.getIndexById(editor.row);
				var dataField = editor.column;
				var oldVal = state.old;
				var newVal = state.value;
				var column = grid.getColumnConfig(editor.column);
				var option;

				if (column.option) {
					option = column.option;
				}

				var dataSource = option.dataSource;
				var targetDataField = option.codeNameField;

				if (column.editor === "date") {
					var formatter = webix.Date.dateToStr("%Y%m%d");
					state.value = formatter(state.value);
				}

				if (column.dataType === "codeHelp") {
					var targetValue = "";

					dataSource.forEach(function (obj) {
						if (obj["CODE"] === newVal) {
							record[targetDataField] = obj["NAME"];
						}

						grid.updateItem(editor.row, record);
					})

					if (targetDataField !== undefined && targetDataField !== null && targetDataField !== "" && newVal !== "" && record[targetDataField] === "") {
						evt.stopPropagation();
						evt.preventDefault();
						evt.stopImmediatePropagation();

						alert("값을 확인하세요");
						editor.focus();
						this.select(editor.row, false);
						return false;
					}
				}

				// var gridID = this.config.id; //gridID
				// var value = record[target.column]; // value
				// var rowIndex = this.getIndexById(target.row); // rowIndex;
				// var dataField = target.column; // dataField;
				// var rowData = record; // rowData;
				// var row = record; // row
				// var column;
				// var columnIndex;
				//
				// for (var i = 0; i < this.config.columns.length; i++) {
				// 	if (this.config.columns[i].id === editor.column) {
				// 		columnIndex = i;
				//
				// 		break;
				// 	}
				// }
				//
				// onCellUpdated(gridID, rowIndex, columnIndex, dataField, value, rowData)
			},
			onAfterEditStop: function (state, editor, ignore) {
				var grid = this;
				var evt = event || window.event;
				var record = grid.getItem(editor.row);
				var rowIndex = this.getIndexById(editor.row);
				var dataField = editor.column;
				var oldVal = state.old;
				var newVal = state.value;
				var column = grid.getColumnConfig(editor.column);
				var option;

				if (oldVal == null) {
					oldVal = "";
				}

				if (column.option) {
					option = column.option;
				}

				var dataSource = option.dataSource;
				var targetDataField = option.codeNameField;

				if (evt && evt.type == "click" && evt.srcElement.tagName == "BUTTON" && $(evt.srcElement).hasClass("btnCodeHelpGrid")) {
					if (column.dataType !== "codeHelp") {
						return;
					}

					popup.help.show(dataSource, function (data) {
						record[editor.column] = data["CODE"];
						record[targetDataField] = data["NAME"];
						grid.updateItem(editor.row, record);
					});
				}
			},
			onLiveEdit: function (state, editor, keyCode) {
				var grid = this;
				var evt = event || window.event;
				var column = grid.getColumnConfig(editor.column);

				if (column.option.readonly === true) {
					return false;
				}

				var record = grid.getItem(editor.row);

				var gridID = this.config.id; //gridID
				var value = record[editor.column]; // value
				var rowIndex = this.getIndexById(editor.row); // rowIndex;
				var dataField = editor.column; // dataField;
				var rowData = record; // rowData;
				var columnIndex;

				for (var i = 0; i < this.config.columns.length; i++) {
					if (this.config.columns[i].id === editor.column) {
						columnIndex = i;

						break;
					}
				}

				var check = (editor.getValue() != "");


				var option;

				if (column.option) {
					option = column.option;
				} else {
					Listener.grid.onKeyDown(gridID, rowIndex, columnIndex, dataField, value, keyCode, rowData, evt);
					return;
				}

				if (column.dataType === "codeHelp") {
					var targetFieldName = option.codeNameField;

					if (targetFieldName !== undefined && targetFieldName !== null && targetFieldName !== "") {
						record[targetFieldName] = "";
						grid.updateItem(editor.row, record);
					}
				}

				Listener.grid.onKeyDown(gridID, rowIndex, columnIndex, dataField, value, keyCode, rowData, evt);
			},
			onItemClick: function (target, evt, html) {
				var record = this.getItem(target.row);

				var gridID = this.config.id; //gridID
				var text = this.getText(target.row, target.column); // text
				var value = record[target.column]; // value
				var rowIndex = this.getIndexById(target.row); // rowIndex;
				var dataField = target.column; // dataField;
				var rowData = record; // rowData;
				var row = record; // row
				var column;
				var columnIndex;

				for (var i = 0; i < this.config.columns.length; i++) {
					if (this.config.columns[i].id === target.column) {
						column = this.config.columns[i];
						columnIndex = i;

						break;
					}
				}

				var instance = this;
				var columns = this.config.columns;

				var columnConfig = this.getColumnConfig(target.column);
				var option = {};

				if (columnConfig.dataType === "button") {
					if (columnConfig.option && columnConfig.option.callBackFn) {
						var columnInfo = {};
						columnInfo["column"] = column;
						columnInfo["columnIndex"] = columnIndex;
						columnInfo["rowIndex"] = rowIndex;
						columnInfo["data"] = rowData;
						columnInfo["dataField"] = dataField;
						columnInfo["text"] = text;
						columnInfo["value"] = value;

						columnConfig.option.callBackFn(gridID, columnConfig, columnInfo);
					}
				}


				Listener.grid.onCellClick(gridID, text, value, rowIndex, dataField, rowData, row, column, columnIndex, instance, event);
				Listener.grid.onRowClick(gridID, rowIndex, rowData, target.row, columns, "data");
			},
			onItemDblClick: function (target, evt, html) {
				var record = this.getItem(target.row);
				var gridID = this.config.id; //gridID
				var rowIndex = this.getIndexById(target.row); // rowIndex;
				var dataField = target.column; // dataField;
				var rowData = record; // rowData;
				var column;
				var columnIndex;

				for (var i = 0; i < this.config.columns.length; i++) {
					if (this.config.columns[i].id === target.column) {
						column = this.config.columns[i];
						columnIndex = i;

						break;
					}
				}

				Listener.grid.onRowDblClick(gridID, rowIndex, rowData, columnIndex, dataField)
			},
			onBeforeSelect: function (target, preserve) {
				var evt = event || window.event;
				var record = this.getItem(target.row);
				var prevRecord = null;
				var prevRowIndex = null;
				var prevDataField = null;

				if (this.lastSelectedItem !== null) {
					prevRecord = this.getItem(this.lastSelectedItem);
					prevRowIndex = this.getIndexById(this.lastSelectedItem.row);
					prevDataField = this.lastSelectedItem.column;
				}

				var gridID = this.config.id; //gridID
				var rowIndex = this.getIndexById(target.row); // rowIndex;
				var dataField = target.column; // dataField;
				var instance = this;

				Listener.grid.onFocusedCellChanging(gridID, prevRowIndex, prevDataField, rowIndex, dataField, instance, evt);

				if (this.config.autoselect && this.lastSelectedItemId == target.row) {
					this.callEvent("onAfterSelect", [target, preserve, "onBeforeSelect"]);
				}
			},
			onAfterSelect: function (target, prevent, evttype) {
				try {
					var rowData = this.getItem(target.row);
					var gridID = this.config.id; //gridID
					var rowIndex = this.getIndexById(target.row); // rowIndex;
					var dataField = target.column; // dataField;
					var instance = this;

					if (this.lastSelectedItemId != target.row) {
						this.lastSelectedItem = target;
						this.lastSelectedItemId = target.row;

						Listener.grid.onFocusedRowChanged(gridID, rowIndex, rowData);
					} else if (this.lastSelectedItem !== target) {
						this.lastSelectedItem = target;
						Listener.grid.onFocusedCellChanged(gridID, rowIndex, dataField, instance);
					}
				} catch (ex) {
					console.log(ex);
				}
			},
			onCheck: function (row, column, state) {
				var grid = this;
				var record = this.getItem(row);
				var gridID = this.config.id;
				var rowIndex = this.getIndexById(row);
				var columnIndex;

				for (var i = 0; i < this.config.columns.length; i++) {
					if (this.config.columns[i].id === column) {
						columnIndex = i;

						break;
					}
				}

				//this.select(row);


				Listener.grid.onCellUpdated(gridID, rowIndex, columnIndex, column, state, record);
			},
			onSelectChange: function () {
				var evt = event || window.event;

				if (evt && evt.defaultPrevented) {
					return false;
				}

				var gridID = this.config.id; //gridID
				var selectedId = this.getSelectedId(true);
				var selectedData = this.getSelectedItem(true);

				Listener.grid.onSelectionChanged(gridID, selectedId, selectedData);
			},
			onEditorChange: function(target, value) {
				var record = this.getItem(target.row);
				var gridID = this.config.id;
				var rowIndex = this.getIndexById(target.row);
				var columnIndex;

				for (var i = 0; i < this.config.columns.length; i++) {
					if (this.config.columns[i].id === target.column) {
						columnIndex = i;

						break;
					}
				}

				Listener.grid.onCellUpdated(gridID, rowIndex, columnIndex, target.column, value, record);
			},
		},

		rules: {
			$all: function (value, item, columnId) {
				var result = true;
				var columns = this.config.columns;
				var columnIdx = this.getColumnIndex(columnId);
				if (columnIdx > -1) {
					if (columns[columnIdx].option) {
						if (columns[columnIdx].option.required && (isNull(value) || value == "")) {
							result = false;
						}

						// maxlength 확인 (byte 기준)
						if (columns[columnIdx].option.maxlength && getByteSize(value) > parseInt(columns[columnIdx].option.maxlength)) {
							result = false;
						}

						if (columns[columnIdx].option.type == 'positiveNumber') {
							result = value > 0;
						} else if (columns[columnIdx].option.type == 'negativeNumber') {
							result = value < 0;
						}
					} else {
						if (!isEmpty(columns[columnIdx].editor) && columns[columnIdx].required && (isNull(value) || value == "")) {
							result = false;
						}
					}


					if (columns[columnIdx].format == dateFormat) {
						if (!isEmpty(columns[columnIdx].editor) && value && !dateRegExp.test(value)) {
							result = false;
						}
					} else if (columns[columnIdx].format == dateFormatMD) {
						if (!isEmpty(columns[columnIdx].editor) && value && !dateRegExpMD.test(value)) {
							result = false;
						}
					} else if (columns[columnIdx].format == fullDateFormat) {
						if (!isEmpty(columns[columnIdx].editor) && value && !fullDateRegExp.test(value)) {
							result = false;
						}
					} else if (columns[columnIdx].format == telFormat) {
						if (!isEmpty(columns[columnIdx].editor) && value && !telRegExp.test(value)) {
							result = false;
						}
					} else if (columns[columnIdx].format == timeFormat) {
						if (!isEmpty(columns[columnIdx].editor) && value && !timeRegExp.test(value)) {
							result = false;
						}
					} else if (columns[columnIdx].format == mailFormat) {
						if (!isEmpty(columns[columnIdx].editor) && value && !mailRegExp.test(value)) {
							result = false;
						}
					}
				}
				return result;
			}
		}

	},

	lastSelectedItem: null,
	lastSelectedItemId: null,
	invalidCellMap: {},

}, webix.ui.treetable);

webix.GroupMethods = {
	sum: function (property, data) {
		data = data || this;
		var summ = 0;
		for (var i = 0; i < data.length; i++)
			summ += property(data[i]) * 1;

		return summ;
	},
	avg: function (property, data) {
		data = data || this;
		var summ = 0;
		for (var i = 0; i < data.length; i++)
			summ += property(data[i]) * 1;

		return Math.round(summ / data.length);
	},
	min: function (property, data) {
		data = data || this;
		var min = Infinity;

		for (var i = 0; i < data.length; i++)
			if (property(data[i]) * 1 < min) min = property(data[i]) * 1;

		return min * 1;
	},
	max: function (property, data) {
		data = data || this;
		var max = -Infinity;

		for (var i = 0; i < data.length; i++)
			if (property(data[i]) * 1 > max) max = property(data[i]) * 1;

		return max * 1;
	},
	count: function (property, data) {
		return data.length;
	},
	count2: function (property, data) {
		return data.length;
	},
	any: function (property, data) {
		return property(data[0]);
	},
	string: function (property, data) {
		return property.$name;
	}
};

webix.ui.datafilter.summColumn = webix.extend({
	refresh: function (master, node, value) {
		var result = 0;
		master.mapCells(null, value.columnId, null, 1, function (value) {
			value = value * 1;
			if (!isNaN(value))
				result += value;

			return value;
		});

		if (value.format)
			result = value.format(result);
		if (value.template)
			result = value.template({value: result});

		value.text = result;
		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right;">' + value.desc + result + '</span>';
	},
	trackCells: true,
	render: function (master, config) {
		if (config.template)
			config.template = webix.template(config.template);
		return "";
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.avgColumn = webix.extend({
	refresh: function (master, node, value) {
		var result = 0;
		master.mapCells(null, value.columnId, null, 1, function (value) {
			value = value * 1;
			if (!isNaN(value))
				result += value;

			return value;
		});

		if (isNaN(result / master.count())) {
			result = 0;
		} else {
			result = Math.round(result / master.count());
		}

		if (value.format)
			result = value.format(result);
		if (value.template)
			result = value.template({value: result});

		value.text = result;
		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + value.desc + result + '</span>';
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.maxColumn = webix.extend({
	refresh: function (master, node, value) {
		var result = '';
		master.mapCells(null, value.columnId, null, 1, function (value) {
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
			result = value.template({value: result});

		value.text = result;
		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + value.desc + result + '</span>';
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.minColumn = webix.extend({
	refresh: function (master, node, value) {
		var result = '';
		master.mapCells(null, value.columnId, null, 1, function (value) {
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
			result = value.template({value: result});

		value.text = result;
		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + value.desc + result + '</span>';
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.cntColumn = webix.extend({
	refresh: function (master, node, value) {
		var result = 0;
		master.mapCells(null, value.columnId, null, 1, function (value) {
			//if (value != '') result += 1;
			result++;

			return value;
		});

		result = intFormat(result);

		value.text = result;
		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + value.desc + result + '</span>';
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.cnt2Column = webix.extend({
	refresh: function (master, node, value) {
		var result = 0;
		master.mapCells(null, value.columnId, null, 1, function (value) {
			if (value != '') result += 1;
			return value;
		});

		result = intFormat(result);

		value.text = result + '건';
		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + value.desc + result + '건</span>';
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.timeColumn = webix.extend({
	refresh: function (master, node, value) {
		var result = 0;
		master.mapCells(null, value.columnId, null, 1, function (value) {
			value = value * 1;
			if (!isNaN(value))
				result += value;

			return (value + "").toHHMMSS();
		});

		value.text = (result + "").toHHMMSS();
		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right;">' + value.desc + (result + "").toHHMMSS();
		+'</span>';
	}
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.textColumn = webix.extend({
	refresh: function (master, node, value) {
		node.firstChild.innerHTML = '<span style="width:100%;display:block;text-align:right">' + value.desc + '</span>';
	}
}, webix.ui.datafilter.summColumn);


// grouping method alias
webix.ui.datafilter.count = webix.ui.datafilter.cntColumn;
webix.ui.datafilter.count2 = webix.ui.datafilter.cnt2Column;
webix.ui.datafilter.min = webix.ui.datafilter.minColumn;
webix.ui.datafilter.max = webix.ui.datafilter.maxColumn;
webix.ui.datafilter.avg = webix.ui.datafilter.avgColumn;
webix.ui.datafilter.sum = webix.ui.datafilter.summColumn;
webix.ui.datafilter.time = webix.ui.datafilter.timeColumn;
webix.ui.datafilter.text = webix.ui.datafilter.textColumn;

// format method alias
var intFormat = function (obj) {
	if (isNull(obj)) {
		return '0';
	} else {
		return webix.i18n.intFormat(obj);
	}
};

var intFormat2 = function (obj) {
	if (isNull(obj)) {
		return '';
	} else {
		return obj === 0 ? '' : webix.i18n.intFormat(obj);
	}
};

var numberFormat = function (obj) {
	if (isNull(obj)) {
		return '0';
	} else {
		return webix.i18n.numberFormat(obj);
	}
};

var priceFormat = function (obj) {
	if (isNull(obj)) {
		return webix.i18n.locales["ko-KR"].price.replace(/{obj}/g, '') + '0';
	} else {
		return webix.i18n.priceFormat(obj);
	}
};

var dateFormat = function (dateStr) {
	if (dateStr == null || dateStr === '' || dateStr.length < 8) return dateStr;
	try {
		dateStr = dateStr.replace(/-/g, '');
		dateStr = dateStr.replace(/\\./g, '');
		var yearStr = dateStr.substring(0, 4);
		var monthStr = dateStr.substring(4, 6);
		var dayStr = dateStr.substring(6, 8);
		return webix.i18n.dateFormatStr(webix.i18n.parseFormatDate(yearStr + '.' + monthStr + '.' + dayStr));
	} catch (ex) {
		return dateStr;
	}
}

var dateFormatMD = function (dateStr) {
	if (isNull(dateStr)) {
		return '';
	} else if (dateStr === '') {
		return '';
	} else {
		var res = dateRegExpMD.exec(dateStr);
		if (!isNull(res)) {
			return res[1] + '-' + res[2];
		} else {
			return dateStr;
		}
	}
}

var longDateFormat = function (dateStr) {
	if (dateStr == null || dateStr === '' || dateStr.length < 8) return '';
	dateStr = dateStr.replace(/-/g, '');
	dateStr = dateStr.replace(/\\./g, '');
	var yearStr = dateStr.substring(0, 4);
	var monthStr = dateStr.substring(4, 6);
	var dayStr = dateStr.substring(6, 8);
	return webix.i18n.longDateFormatMDStr(webix.i18n.parseFormatDate(yearStr + '.' + monthStr + '.' + dayStr));
}

var fullDateFormat = function (dateStr) {
	if (dateStr == null || dateStr === '' || dateStr.length < 12) return '';
	dateStr = dateStr.replace(/-/g, '');
	dateStr = dateStr.replace(/\\./g, '');
	var yearStr = dateStr.substring(0, 4);
	var monthStr = dateStr.substring(4, 6);
	var dayStr = dateStr.substring(6, 8);
	var hourStr = dateStr.substring(8, 10);
	var minStr = dateStr.substring(10, 12);
	return webix.i18n.fullDateFormatStr(webix.i18n.parseFormatDate(yearStr + '-' + monthStr + '-' + dayStr + ' ' + hourStr + ':' + minStr));
}

var webixDatagridCheckboxHandler = function (gridId, itemId) {
	var $grid = $('*[view_id=' + gridId + '').parent().webix_datagrid();
	var rowData = $grid.getItem(itemId);
	try {
		if ($grid.config.editable
			&& $grid.config.columns
			&& $grid.config.columns[0].header
			&& $grid.config.columns[0].header[0].content
			&& $grid.config.columns[0].header[0].content === 'masterCheckbox') {
			rowData[$grid.config.columns[0].id] = 1;
			$grid.updateItem(itemId, rowData);
		}
	} catch (ex) {
	}
}

var telFormat = function (telStr) {
	if (isNull(telStr)) {
		return '';
	} else if (telStr === '') {
		return '';
	} else {
		var res = telRegExp.exec(telStr);
		if (!isNull(res)) {
			telStr = res[1];
			telStr += res[2] ? "-" + res[2] : "";
			telStr += res[3] ? "-" + res[3] : "";

			return telStr;
		} else {
			return telStr;
		}
	}
}

var telFormat1 = function (telStr) {
	if (isNull(telStr)) {
		return '';
	} else if (telStr === '') {
		return '';
	} else {
		var res = telRegExp.exec(telStr);
		if (!isNull(res)) {
			telStr = res[1];
			telStr += res[2] ? "-" + "*".repeat(res[2].length) : "";
			telStr += res[3] ? "-" + res[3] : "";

			return telStr;
		} else {
			return telStr;
		}
	}
}

var timeFormat = function (timeStr) {
	if (isNull(timeStr)) {
		return '';
	} else if (timeStr === '') {
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

var mailFormat = function (mailStr) {
	if (isNull(mailStr)) {
		return '';
	} else if (mailStr === '') {
		return '';
	} else {
		var res = mailRegExp.exec(mailStr);
		if (!isNull(res)) {
			return res[1] + ':' + res[2];
		} else {
			return mailStr;
		}
	}
}

var column = {
	codehelp: function (obj, id, target) {
		return checkEmpty(obj[id], "") + "<button class='btnCodeHelpGrid' data-target='" + target + "' style='position:absolute; right:0px; z-index:9; border: 1px solid #c8c8c8; margin-top: 1px;'></button>";
	}
};

webix.ready(function () {
	webix.UIManager.addHotKey("up", function (view, evt) {
		if (!view || !view._custom_tab_handler && !view._custom_tab_handler(true, evt)) {
			return true;
		}

		var editor = view.getEditor();

		if (editor) {
			if (editor.config.editor === "select" || editor.config.editor === "combo") {
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
	webix.UIManager.addHotKey("down", function (view, evt) {
		if (!view || !view._custom_tab_handler && !view._custom_tab_handler(true, evt)) {
			return true;
		}

		var editor = view.getEditor();

		if (editor) {
			if (editor.config.editor === "select" || editor.config.editor === "combo") {
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
	webix.UIManager.addHotKey("enter", function (view, evt) {
		if (!view || !view._custom_tab_handler) {
			return true;
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

		if (option.type == "code" && check) {
			var isPass = false;

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
					var result = view.editNext(true);
					return result;
				}
			}
		}
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
	var headers = [];
	var filterHTML = !!options.filterHTML;
	var htmlFilter = /<[^>]*>/gi;

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

		if (typeof header === "string")
			header = header.replace(htmlFilter, "");

		headers.push(header);
	}

	var data = options.header === false ? [] : [headers];

	view.data.each(function (item) {
		var line = [];
		for (var i = 0; i < scheme.length; i++) {
			var value = item[scheme[i].id];
			var config = view.getColumnConfig(scheme[i].id);

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
		data.push(line);
	}, view);

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
	var name = options.name || "Data";
	wb.SheetNames.push(name);
	wb.Sheets[name] = data;

	var xls = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});
	var filename = (options.filename || name) + ".xlsx";

	var blob = new Blob([str2array(xls)], {type: "application/xlsx"});
	webix.html.download(blob, filename);
};

function getByteSize(str) {
	if (typeof str == "undefined" || str == null || !str) return 0;
	var b, i, c, s = str.toString();
	for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 2 : c >> 7 ? 2 : 1) ; //DB 케릭터셋에 따라 한글 바이트 수 변경(기본 2 byte)
	return b;
}

function isNull(data) {
	if (typeof data !== "undefined" && data !== null) {
		return false;
	} else {
		return true;
	}
}

function checkNull(val, rep) {
	if (isNull(val)) {
		return rep;
	} else {
		return val;
	}
}

function isEmpty(val) {
	if (typeof (val) == "string" || typeof (val) == "number") {
		if (isNull(val) || val == "") {
			return true;
		} else {
			return false;
		}
	} else if (typeof (val) == "array" || typeof (val) == "object") {
		if (val.length == 0) {
			return true;
		}

		return false;
	} else {
		return true;
	}
}

function checkEmpty(val, rep) {
	if (isNull(val) || val == "") {
		return rep;
	} else {
		return val;
	}
}

// webix to dxgrid
function Column(caption, dataField, width, dataType, options) {
	this.id = dataField;
	this.header = caption;
	this.liveEdit = true;

	if (width === "auto") {
		this.fillspace = true;
	} else {
		this.width = Number(width);
	}

	if (options.align) {
		if (dataType === "codeHelp") {
			this.css = {"text-align": options.align, "padding-right": "25px", "box-sizing": "border-box"};
		} else {
			this.css = {"text-align": options.align};
		}
	}

	if (options.cellStyle) {
		var css = options.cellStyle;
		if (css !== "" && css.indexOf(":") > 0) {
			var cssArr = css.split(":");
			var cssObj = {};
			cssObj[cssArr[0]] = cssArr[1];

			this.css = $.extend(this.css, cssObj);
		} else {
			this.css = css;
		}

	}

	this.option = options;

	if (!this.option) {
		this.option = {};
	}

	this.option.maxlength = Number(options.maxLength);

	if (options.visible !== undefined) {
		this.hidden = !options.visible;
	}

	this.dataType = dataType;

	if (dataType === "text") {
		this.editor = "text";
	} else if (dataType === "number") {
		this.editor = "text";
		this.format = intFormat;
	} else if (dataType === "textarea") {
		this.editor = "popup";
	} else if (dataType === "selectBox") {
		this.editor = "select";

		var newArr = [];
		for (var i = 0; i < options.dataSource.length; i++) {
			var obj = options.dataSource[i];
			obj["id"] = obj["CODE"];
			obj["value"] = obj["NAME"];
			newArr.push(obj);
		}

		this.options = new webix.DataCollection({data: webix.toArray(newArr)});
	} else if (dataType === "codeHelp") {
		this.editor = "text";
		this.template = "#" + dataField + "#<button class='btnCodeHelpGrid' style='position:absolute; right:0px; z-index:9; border: 1px solid #c8c8c8;'></button>";
	} else if (dataType === "rowIndex") {
		this.id = "__index";
		this.dataType = "number";
		this.sort = "int";
	} else if (dataType === "button") {
		this.editor = "";
	} else if (dataType === "check") {
		this.checkValue = "Y";
		this.uncheckValue = "N";
		this.template = "{common.checkbox()}";

		if (caption === "") {
			this.header = {content: "masterCheckbox", contentId: "CHK"}
		}

		this.tooltip = false;
	} else if (dataType === "date") {
		this.format = dateFormat;
	} else if (dataType === "calendar") {
		this.format = dateFormat;
		this.editor = "date";
	}

	if (options) {
		if (options.filter === true) {
			this.header = [caption, {content: "multiComboFilter"}];
		}

		if (options.readonly === true) {
			this.editor = "";
			this.liveEdit = false;
		}
	}
}

function Footer(dataField, type, text) {
	this.dataField = dataField;
	this.content = type;
	this.desc = text;
}

var dxGrid = {
	initGrid: function (gridID, width, height, columns, option) {
		var leftFixed = 0;
		var rightFixed = 0;

		var cols = [];

		if (option === undefined || option === null) {
			option = {};
		}

		if (option.checkbox === true) {
			cols.push({
				id: "__CHK",
				header: {content: "masterCheckbox", contentId: "mc1"},
				css: "textCenter",
				width: 40,
				template: "{common.checkbox()}",
				tooltip: false,
				checkValue:"Y",
				uncheckValue:"N"
			});
		}

		if (option.showRowIndex === true) {
			cols.push(new Column("", "", "40", "rowIndex", {align: "center", maxLength: "20"}))
		}

		columns.forEach(function (col) {
			if (col.option && col.option.fixed) {
				if (col.option.fixed === "left") {
					leftFixed++;
				} else if (col.option.fixed === "right") {
					rightFixed++;
				}
			}

			if (option.sortable) {
				col.sort = "string";

				if (col.dataType === "number") {
					col.sort = "int";
				}
			} else {
				col.sort = "";
			}

			if (col.dataType === "button") {
				var $btn = $("<button>").html(col.option.btnTxt);
				col.template = $btn.get(0).outerHTML;
			}

			if (col.option && col.option.minWidth) {
				col.minWidth = col.option.minWidth;
			}

			col.tooltip = false;
			cols.push(col);
		})

		if (leftFixed > 0 && option.showRowIndex === true) {
			leftFixed++;
		}

		if (leftFixed > 0 && option.checkbox === true) {
			leftFixed++;
		}

		//webix.CustomScroll.init();

		var grid = webix.ui({
			id: gridID,
			container: gridID,
			view: "datagrid",
			editable: option.editable,
			width: width,
			height: height,
			leftSplit: leftFixed,
			rightSplit: rightFixed,
			scrollX: "auto",
			columns: cols,
			canAddRow: option.canAddRow,
			scheme: {
				$init: function (obj) {
					obj["__index"] = this.count() + 1;
				}
			},
		});

		$("#" + gridID).on("contextmenu", function (e) {
			// 그리드 마우스 우클릭 막기
			return false;
		});

		grid.attachEvent("onColumnResize", function (id, newWidth, user_action) {
			var config = grid.getColumnConfig(id);
			var $container = $("div.webix_view.webix_window.webix_popup[view_id*=\"$checksuggest\"]:visible");
			var $inner1 = $("div.webix_view.webix_window.webix_popup[view_id*=\"$checksuggest\"]:visible").find("div[view_id*=\"$checksuggest\"]");
			var $inner2 = $("div.webix_view.webix_window.webix_popup[view_id*=\"$checksuggest\"]:visible").find("div[view_id*=\"$list\"]");

			var fitSize = -20;

			if (config.option.filterWidth) {
				fitSize += config.option.filterWidth;
			}

			$container.width(config.width + fitSize);
			$inner1.width(config.width + fitSize - 20);
			$inner2.width(config.width + fitSize - 20);
		});

		return grid;
	},
	setFooter: function (gridID, footers) {
		var grid = $$(gridID);
		var columns = grid.config.columns;

		footers.forEach(function (footer) {
			columns.forEach(function (col) {
				if (col.id === footer.dataField) {
					col.footer = footer;
				}
			});
		})

		grid.editStop();
		grid.config.footer = true;
		grid.refreshColumns();
		//grid.refresh();
	},
	setGridData: function (gridID, data) {
		var grid = $$(gridID);
		grid.setData(data);
	},
	getGridInstance: function (gridID) {
		return $$(gridID);
	},
	getGridData: function (gridID) {
		return $$(gridID).getData();
	},
	getCheckedData: function (gridID, columnName) {
		if (columnName === null || columnName === undefined || columnName === "") {
			columnName = "__CHK";
		}

		return $$(gridID).getCheckedData(columnName);
	},
	getTotalRowCount: function (gridID) {
		return $$(gridID).count();
	},
	addRow: function (gridID, data, rowIndex) {
		var grid = $$(gridID);

		if (data === null || data === undefined) {
			var columns = grid.config.columns;
			var emptyObj = {};

			columns.forEach(function(col) {
				emptyObj[col.id] = "";
			});

			data = emptyObj;
		}

		grid.addRow(data, rowIndex);
	},
	deleteRow: function (gridID, rowIndex) {
		var grid = $$(gridID);

		try {
			if (grid.data.count() === 0) {
				return;
			}

			grid.remove(grid.getIdByIndex(rowIndex));
		} catch(e) {
			console.log(e);
		}
	},
	deleteCheckedRow: function (gridID) {
		var grid = $$(gridID);
		var checkedData = dxGrid.getCheckedData(gridID);
		grid.removeRows(checkedData);
	},
	getCellValue: function (gridID, rowIndex, dataField) {
		var grid = $$(gridID);

		try {
			if (grid.data.count() === 0) {
				return;
			}

			return grid.getItem(grid.getIdByIndex(rowIndex))[dataField];
		} catch (e) {
			console.log(e);
		}
	},
	setCellValue: function (gridID, rowIndex, dataField, value) {
		var grid = $$(gridID);

		try {
			if (grid.data.count() === 0) {
				return;
			}

			grid.updateCell(rowIndex, dataField, value);
		} catch(e) {
			console.log(e);
		}
	},
	getRowData: function (gridID, rowIndex) {
		var grid = $$(gridID);

		try {
			if (grid.data.count() === 0) {
				return;
			}

			return grid.getItem(grid.getIdByIndex(rowIndex));
		} catch (e) {
			console.log(e);
		}
	},
	setRowData: function (gridID, rowIndex, rowData) {
		var grid = $$(gridID);

		try {
			if (grid.data.count() === 0) {
				return;
			}

			grid.updateRow(rowIndex, rowData);
		} catch (e) {
			console.log(e);
		}
	},
	setFocus: function (gridID, rowIndex, dataField) {
		var grid = $$(gridID);

		try {
			if (grid.data.count() === 0) {
				return;
			}

			var rowId = grid.getIdByIndex(rowIndex);
			var columnConfig = grid.getColumnConfig(dataField);

			grid.select(rowId);

			grid.edit({
				row: rowId,
				column: dataField,
			});
			grid.focusEditor({
				row: rowId,
				column: dataField,
			});
		} catch (e) {
			console.log(e);
		}
	},

	/**
	 * 현재 포커스를 가지고 있는 행의 index 반환
	 *
	 * @param gridID
	 */
	getRowIndex: function (gridID) {
		try {
			var grid = $$(gridID);

			if (grid.data.count() === 0) {
				return;
			}

			var selectedId = grid.getSelectedId(false);

			return grid.getIndexById(selectedId);
		} catch (e) {
			console.log(e);
			return -1;
		}
	},
	setEmptyGrid: function (gridID) {
		var grid = $$(gridID);

		var evt = event || window.event;

		try {
			if (grid.data.count() === 0) {
				return;
			}

			grid.editStop();
			grid.clearAll();

			evt.srcElement.focus();
		} catch (e) {
			console.log(e);
		}
	},
	exportToExcel: function (gridID) {
		webix.toExcel($$(gridID));
	},
	setFilter: function (gridID, bool) {
		var grid = $$(gridID);

		grid.config.columns.forEach(function (col) {
			if (bool && col.option && col.option.filter === true) {
				if (col.header.length === 1) {
					if (col.oldFilter) {
						col.header.push(col.oldFilter);
					} else {
						col.header.push({content: "multiComboFilter"});
					}
				} else {
					if (col.oldFilter) {
						col.header[1] =col.oldFilter;
					} else {
						col.header[1] = {content: "multiComboFilter"};
					}
				}
			} else {
				if (col.header.length > 1) {
					var header = col.header[0];
					col.oldFilter = col.header[1];
					col.header = {columnId: header.columnId, text: header.text, content: header.content, contentId: header.contentId};
				}
			}
		});

		grid.refreshColumns();
	}
}