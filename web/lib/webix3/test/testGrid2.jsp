<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%
	response.addHeader("X-UA-Compatible", "IE=edge");
%>
<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<link rel="stylesheet" type="text/css" href="../webix.css" charset="utf-8">
<link rel="stylesheet" type="text/css" href="../webix-custom.css" charset="utf-8">
<script type="text/javascript" src="../../jquery/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="../../jquery-ui-1.13.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="../webix_debug.js"></script>
<script type="text/javascript" src="../xlsx.core.min.js"></script>
<script type="text/javascript" src="../webix.custom.js"></script>
<style>
html, body {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}
</style>
<script src="sample2Data.js"></script>
<script type="text/javascript" charset="utf-8">
var selectData = {"1": "11", "2": "22"};
webix.ready(function () {
	var columns = [
		new Column("아이디", "ID", "100", "number", {align: "center", maxLength: "20", fixed:"left"}),
		new Column("셀렉트1", "SelectBox1", "85", "codeHelp", {align: "center", maxLength: "20", dataSource: sb1, codeNameField: "FirstName", fixed:"left"}),
		new Column("셀렉트2", "SelectBox2", "85", "selectBox", {align: "center", maxLength: "20", dataSource: sb2}),
		new Column("이름", "FirstName", "80", "", {align: "left", maxLength: "20", filter:true}),
		new Column("성", "LastName", "100", "text", {align: "center", maxLength: "20", filter:true}),
		new Column("확인", "CHK", "40", "check", {align: "center"}),
		new Column("성별", "Prefix", "100", "", {editable:false, align: "center", maxLength: "20", readonly:true}),
		new Column("직위", "Position", "100", "textarea", {align: "center", maxLength: "50", visible:true, cellStyle:"color:blue"}),
		new Column("일자", "TestDate", "auto", "date", {align: "center", maxLength: "50", visible:true}),
		new Column("상세", "Button", "auto", "button", {align: "center", btnTxt:"상세", callBackFn:function(a,b,c,d){console.log("callback", a,b,c,d)}}),
	]

	var grid = dxGrid.initGrid("grid1", "100%", "100%", columns, {checkbox: true, editable: true, sortable: true, showRowIndex: false, footer: false});

	dxGrid.setGridData("grid1", sample2);

	grid.attachEvent("onHeaderClick", function (id, e, target) {
		if (grid.config.sortable !== true) {
			return;
		}

		var  state = grid.getState().sort;

		if (state !== null && state !== undefined) {
			if (id.column === state.id) {
				console.log("똑같은거 클릭");

				if (state.dir === "desc") {
					grid.sort("id", "asc");
					grid.markSorting();
					return false;
				}
			}
		}
	})
});
</script>
<script>
$(document).ready(function() {
	$("#updateCell").click(function() {
		$$("grid1").updateCell(1, "FirstName", "kjasdfadfadsfasdfasdfadsfh");
	});

	$("#exportToExcel").click(function() {
		dxGrid.exportToExcel("grid1");
	});

	$("#setFocus").click(function () {
		dxGrid.setFocus("grid1", 1, "Prefix");
	});

	$("#getRowIndex").click(function () {
		var rowIndex = dxGrid.getRowIndex("grid1");

		console.log("rowIndex", rowIndex);
	});

	$("#getCellValue").click(function () {
		var value = dxGrid.getCellValue("grid1", 1, "FirstName");

		console.log("cellValue", value);
	});

	$("#addRow").click(function () {
		dxGrid.addRow("grid1");
	});

	$("#checkedData").click(function () {
		var data = dxGrid.getCheckedData("grid1", "CHK");
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
})
</script>
</head>
<body onload="">
<%@include file="./popup.jsp" %>
<button id="updateCell">UPDATE CELL</button>
<button id="exportToExcel">EXCEL</button>
<button id="setFocus">FOCUS</button>
<button id="getRowIndex">getRowIndex</button>
<button id="getCellValue">getCellValue</button>
<button id="addRow">addRow</button>
<button id="checkedData">checkedData</button>
<button id="showFilter">showFilter</button>
<button id="hideFilter">hideFilter</button>
<button id="setEmptyGrid">setEmptyGrid</button>
<button id="setFooter">setFooter</button>
<div class="gridArea" style="display:flex; flex:1; height: 100%; width: 100%;">
	<div id="grid1" style="display:flex; height:100%; width: 100%;"></div>
</div>
</body>
</html>