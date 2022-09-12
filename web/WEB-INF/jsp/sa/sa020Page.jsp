<%@ page import="java.util.HashMap" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/jsp/common/programHeader.jsp" %>
<%
	HashMap<String, String> programButtonData = new HashMap<>();
	programButtonData.put("NEW", "N");
	programButtonData.put("SEARCH", "Y");
	programButtonData.put("SAVE", "Y");
	programButtonData.put("DEL", "N");
	programButtonData.put("INIT", "N");
%>
<!DOCTYPE html>
<html>
<head>
<title>삼영물류</title>
<%@include file="/jsp/common/programInclude.jsp" %>
<!-- PAGE STYLE -->
<style>
.formRow>label {
	min-width:150px !important;
}
</style>

<!--  PAGE SCRIPT -->
<script>
function initPage() {
	listener.button.search.click();
}

webix.ready(function() {
	webix.ui({
		id : "grid1",
		container : "grid1",
		view : "datagrid",
		liveEdit: true,
		columns : [
			{id:'company_code', header:'업체코드', editor:'', sort:'string', css:'textCenter', width: 120},
			{id:'company_name', header:'업체명', editor:'text', sort:'string', css:'textLeft', fillspace: true,},
			{id:'api_key', header:'API키', editor:'text', sort:'string', css:'textLeft', width: 500},
			{id:'etc_1', header:'기타1', editor:'text', sort:'string', css:'textLeft', width: 100},
			{id:'etc_2', header:'기타2', editor:'text', sort:'string', css:'textLeft', width: 100},
			{id:'etc_3', header:'기타3', editor:'text', sort:'string', css:'textLeft', width: 100},
			{id:'etc_4', header:'기타4', editor:'text', sort:'string', css:'textLeft', width: 100},
			{id:'etc_5', header:'기타5', editor:'text', sort:'string', css:'textLeft', width: 100},
			{id:'org_company_code', hidden: true},
			{id:'row_type', hidden:true},
		],
		footer : false,
	});
});

listener.grid.onDataLoaded = function(gridId) {
	webix.selectRow(gridId, 0);
}

listener.select.change = function($el) {
	if ($el.parents("form").attr("id") == "searchArea") {
		$$("grid1").clearData();
	}
}

listener.editor.keydown = function($el) {
	if ($el.parents("form").attr("id") == "searchArea") {
		$$("grid1").clearData();
	}
}

listener.gridEditor.afterEdit = function(grid, row, column, state) {
	let data = $$(grid).getItem(row);

	if (state.old !== state.value && data.row_type !== "N") {
		data.row_type = "M";
	}
}

listener.gridRow.click = function(record, grid) {
	let gridId = grid.config.id;
}

listener.button.init.click = function () {
	$$("grid1").clearData();
	$("#searchArea").reset();

	initPage();
}


listener.button.search.click = function () {
	let url = "/sa020/select";
	url += "?company=" + $("#P_company").getVal();

	util.getService(url, function(result) {
		console.log(result);

		$$("grid1").setData(result);
	});
}


let transList = [];

listener.button.save.click = function () {
	let grid = $$("grid1");
	let list = grid.getData();

	console.log("list", list);

	let insertList = [];
	let updateList = [];

	for (let i = 0; i < list.length; i++) {
		let data = list[i];

		if (data.row_type === "N" || data.row_type === "M") {
			transList.push(data);
		}
	}

	console.log("transList", transList);

	let url = "/sa020/save";

	util.postService(url, transList, function(result) {
		console.log(result);

		$$("grid1").setData(result);
	});
}

listener.button.addRow.click = function(event) {
	var evt = event || window.event;
	var $el = $(evt.currentTarget);

	var gridId = $el.data("target");

	$$(gridId).add({row_type: "N"});
}

listener.button.removeRow.click = function(event) {
	let evt = event || window.event;
	let $el = $(evt.currentTarget);

	let gridId = $el.data("target");
	let grid = $$(gridId);

	let data = grid.getSelectedItem();

	if (data.row_type !== "N") {
		data.row_type = "D";
		transList.push(data);
	}

	$$(gridId).removeSelectedRow();
}

</script>
</head>
<body>
<%@include file="/jsp/common/title.jsp" %>
<form id="searchArea">
	<div class="searchRow">
		<label for="P_company">업체코드/명</label>
		<input id="P_company" name="P_company" type="text" size="20" maxlength="19"
			data-required="false"
			data-field="company"
		/>
	</div>
</form>

<div class="formTitle" style="top:100px;">업체 목록</div>
<form class="rowButtonArea" style="position:absolute; right:12px; width:calc(100% - 24px); top:100px;">
	<button class="rowButton" name="addRow" data-target="grid1"><img src="/img/ic_pl.png" />행추가</button>
	<button class="rowButton" name="removeRow" data-target="grid1"><img src="/img/ic_mi.png" />행삭제</button>
</form>
<div id="grid1" style="position:absolute; top:120px; left:12px; width:calc(100% - 24px); height:calc(100% - 120px)"></div>
<%@include file="/jsp/main/custom_popup.jsp" %>
</body>
</html>