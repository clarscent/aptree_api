<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%
	response.addHeader("X-UA-Compatible", "IE=edge");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<link rel="stylesheet" type="text/css" href="./lib/webix/webix.css" charset="utf-8">
<link rel="stylesheet" type="text/css" href="./lib/webix/webix-custom.css" charset="utf-8">
<script type="text/javascript" src="./lib/jquery/jquery-3.5.1.js"></script>
<script type="text/javascript" src="./lib/jquery/jquery-ui.min.js"></script>
<script type="text/javascript" src="./lib/webix/webix_debug.js"></script>
<script type="text/javascript" src="./lib/webix/xlsx.core.min.js"></script>
<script type="text/javascript" src="./js/webix.custom.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="sample2Data.js"></script>
<script type="text/javascript" charset="utf-8">
var selectData = {"1": "11", "2": "22"};
webix.ready(function () {
	var columns = [
		new Column("아이디", "ID", "100", "number", {align: "center", maxLength: "20", filter: true, fixed:"left", filterWidth: 50}),
		new Column("셀렉트1", "SelectBox1", "85", "codeHelp", {align: "center", maxLength: "20", dataSource: [], fixed:"left"}),
		new Column("이름", "FirstName", "80", "", {align: "left", maxLength: "20", filter:false}),
		new Column("셀렉트2", "SelectBox2", "85", "selectBox", {align: "center", maxLength: "20", dataSource: sb2}),
		new Column("성", "LastName", "100", "text", {align: "center", maxLength: "20", filter:false, readonly:true}),
		new Column("확인", "CHK", "40", "check", {align: "center"}),
		new Column("성별", "Prefix", "100", "", {editable:false, align: "center", maxLength: "20", readonly:true}),
		new Column("직위", "Position", "100", "textarea", {align: "center", maxLength: "50", visible:true, cellStyle:"color:blue"}),
		new Column("일자", "TestDate", "100", "calendar", {align: "center", maxLength: "50", visible:true}),
		new Column("상세", "Button", "auto", "button", {align: "center", btnTxt:"상세", callBackFn:function(a,b,c,d){console.log("callback", a,b,c,d)}}),
	]

	var grid = dxGrid.initGrid("grid1", 800, 300, columns, {checkbox: true, editable: true, sortable: true, showRowIndex: false, footer: false});

	dxGrid.setGridData("grid1", sample2);

	grid.attachEvent("onHeaderClick", function (id, e, target) {
		if (grid.config.sortable !== true) {
			return;
		}

		var  state = grid.getState().sort;

		if (state !== null && state !== undefined) {
			if (id.column === state.id) {
				if (state.dir === "desc") {
					grid.sort("id", "asc");
					grid.markSorting();
					return false;
				}
			}
		}
	})

	//var popOptions = "dialogWidth: 600px; dialogHeight: 500px; center: yes; resizable: yes; status: no; scroll: no;";
	//var vReturn = window.showModalDialog("./testGrid2.jsp", window,  popOptions );
});
</script>
<script>
$(document).ready(function() {
	$("#setGridData").click(function() {
		console.log(sample3);

		dxGrid.setGridData("grid1", sample3);
	});

	$("#updateCell").click(function() {
		dxGrid.setCellValue("grid1", 1, "SelectBox1", "1");
	});

	$("#exportToExcel").click(function() {
		dxGrid.exportToExcel("grid1");
	});

	$("#setFocus").click(function () {
		dxGrid.setFocus("grid1", 5, "SelectBox1");
	});

	$("#getRowIndex").click(function () {
		var rowIndex = dxGrid.getRowIndex("grid1");
	});

	$("#getCellValue").click(function () {
		var value = dxGrid.getCellValue("grid1", 1, "FirstName");
	});

	$("#addRow").click(function () {
		dxGrid.addRow("grid1");
	});

	$("#checkedData").click(function () {
		var data = dxGrid.getCheckedData("grid1", "CHK");
		console.log(data);
	});

	$("#getGridData").click(function () {
		var data = dxGrid.getGridData("grid1");
		console.log(data);
	});

	$("#showFilter").click(function () {
		dxGrid.setFilter("grid1", true);
	});

	$("#hideFilter").click(function () {
		dxGrid.setFilter("grid1", false);
	});

	$("#setEmptyGrid").click(function () {
		dxGrid.setEmptyGrid("grid1");
	});

	$("#setFooter").click(function () {
		var footer = [
			new Footer("FirstName", "text", "합계"),
			new Footer("ID", "sum", "합계: "),
		];

		dxGrid.setFooter("grid1", footer);
	});

	$("#textChange").on("keydown", function(evt) {
		console.log("keydown", evt.keyCode);

		//dxGrid.setEmptyGrid("grid1");
	})
})
</script>
</head>
<body onload="">
<%@include file="./popup.jsp" %>
<button id="setGridData">setGridData</button>
<button id="updateCell">UPDATE CELL</button>
<button id="exportToExcel">EXCEL</button>
<button id="setFocus">FOCUS</button>
<button id="getRowIndex">getRowIndex</button>
<button id="getCellValue">getCellValue</button>
<button id="addRow">addRow</button>
<button id="checkedData">checkedData</button>
<button id="getGridData">getGridData</button>
<button id="showFilter">showFilter</button>
<button id="hideFilter">hideFilter</button>
<button id="setEmptyGrid">setEmptyGrid</button>
<button id="setFooter">setFooter</button>
<input type="checkbox" />
<div class="gridArea">
	<div id="grid1" style="height:350px"></div>
</div>
<input type="text" id="textChange" />
<textarea></textarea>
</body>
</html>