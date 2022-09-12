<%@ page import="java.util.HashMap" %>
<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/jsp/common/programHeader.jsp" %>
<%
	HashMap<String, String> programButtonData = new HashMap<>();
	programButtonData.put("NEW", "N");
	programButtonData.put("SEARCH", "Y");
	programButtonData.put("SAVE", "N");
	programButtonData.put("DEL", "Y");
	programButtonData.put("INIT", "N");
	programButtonData.put("EXCEL_UPLOAD", "Y");
	programButtonData.put("EXCEL_DOWN", "Y");
	programButtonData.put("TRACKING", "Y");

	int height1 = 630;
	int top2 = height1 + 180;
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
	let firstday = moment().add(-10, "day").format("YYYYMMDD");
	let today = moment().format("YYYYMMDD");

	$("#P_start_dt").setVal(firstday);
	$("#P_end_dt").setVal(today);

	$("button[name='exportToExcel']").click(function(evt) {
		let $el = $(evt.currentTarget);

		let gridId = $el.attr("data-target");
		let fileName = $el.attr("data-excel-name") + "_" + (new Date()).format("yyyyMMdd");

		webix.toExcel(gridId, {name: fileName, fileName: fileName});
	});

	$("#btnDetail").click(function() {
		$("#btnTab2").trigger("click");
	});

	$("button.tabButton").click(function(evt) {
		$el = $(evt.currentTarget);

		$("button.tabButton").each(function(idx, btn) {
			let targ = $(btn).attr("data-target");

			console.log("targ", targ);

			if (btn === evt.currentTarget) {
				$(btn).attr("data-active", "Y");
				let targ = $(btn).attr("data-target");

				$("#" + targ).show();

				if (targ === "tabDiv2") {
					$("button#save").show();
				} else {
					$("button#save").hide()
				}
			} else {
				$(btn).attr("data-active", "N");
				$("#" + targ).hide();
			}

			resizeGrid();
		});
	});

	$("#btnResetFilter").click(function(evt) {
		//$$("grid1").getFilter("order_id").setValue("");
		let grid = $$("grid1");
		let columns = grid.config.columns;


		if (columns && columns.length > 0) {
			for (let i = 0; i < columns.length; i++) {
				let filter = grid.getFilter(columns[i]["id"]);

				console.log("filter", columns[i]["id"], filter);

				if (filter) {
					if (filter.setValue) {
						filter.setValue("");
					} else {
						filter.value = "";
					}
				}
			}
		}

		grid.filterByAll();
	})


	listener.button.search.click();

	//console.log($("#btnTab1").attr("data-active", "Y"));
	//let targ = $("#btnTab1").attr("data-target");

	//$("#" + targ).show();

	//$("#btnTab2").trigger("click");
}

webix.ready(function() {
	webix.ui({
		id : "grid1",
		container : "grid1",
		view : "datagrid",
		columns : [
			{id:"ch1", header:{ content:"masterCheckbox", contentId:"mc1" }, css:"textCenter", template:"{common.checkbox()}", width:30},
			{id:'order_id', header:['주문번호', {content: "multiComboFilter"}], editor:'', sort:'string', css:'textCenter', width: 180, option: {fiterWidth: 200}},
			{id:'order_dt', header:['주문일자', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100, format:dateFormat},
			{id:'company_code', header:['업체코드', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:80},
			{id:'company_name', header:['업체명', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:120},
			{id:'reference_no', header:['업체주문번호', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:150},
			{id:'tracking_no', header:['송장번호', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:150},
			{id:'to_company_name', header:['배송지명', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'to_company_nickname', header:['수신자별칭', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'to_street1', header:['배송지주소1', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width: 200},
			{id:'to_street2', header:['배송지주소2', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width: 100},
			{id:'to_street3', header:['배송지주소3', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width: 100},
			{id:'to_city', header:['배송지시/도', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'to_state', header:['배송지State', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'to_postal_code', header:['배송지우편번호', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'to_country', header:['배송지나라코드', {content: "selectFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'to_receiver_vat_no', header:['배송지 VATRN', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'to_contact_person', header:['배송지 담당자명', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'to_country_calling_code', header:['배송지 국가번호', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'to_phone', header:['배송지 전화번호', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'to_phone2', header:['배송지 전화번호2', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'to_email', header:['배송지 이메일', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:150},
			{id:'service_class', header:['서비스 유형', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:80},
			{id:'inbound_outbound', header:['수출입구분', {content: "selectFilter"}], editor:'', sort:'string', css:'textCenter', width:80},
			{id:'expected_pickup_date', header:['픽업예정일자', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100, format:dateFormat},
			{id:'goods_description', header:['물품 명세', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:200},
			{id:'instruction', header:['CI/PL비고', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'sender_name', header:['발송인명', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'sender_biz_reg_no', header:['사업자번호', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'inco_terms', header:['DDP/DAP', {content: "selectFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			/*{id:'invoice_total_value', header:['총금액', {content: "textFilter"}], editor:'', sort:'string', css:'textRight', width:100, format: numberFormat},*/
			{id:'length_unit_code', header:['길이단위', {content: "selectFilter"}], editor:'', sort:'string', css:'textCenter', width:60},
			{id:'weight_unit_code', header:['무게단위', {content: "selectFilter"}], editor:'', sort:'string', css:'textCenter', width:60},
			{id:'currency_code', header:['통화 코드', {content: "selectFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'export_commodity_class', header:['수출상품분류', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:250},
			{id:'pickup_address', header:['픽업주소', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'square_party_id', header:['스퀘어파티ID', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'collecting_site_usage_yn', header:['집결지사용여부', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'warehousing_method', header:['배송업체', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'warehousing_information', header:['배송정보', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'requested_items', header:['요청사항', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:200},
			{id:'sales_channel', header:['판매처', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'goods_issue_no', header:['제품출고번호', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'c_company_name', header:['수화주명', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'c_street1', header:['수화주주소1', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width: 200},
			{id:'c_street2', header:['수화주주소2', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width: 100},
			{id:'c_street3', header:['수화주주소3', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width: 100},
			{id:'c_city', header:['수화주시/도', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'c_state', header:['수화주State', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'c_postal_code', header:['수화주우편번호', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'c_country', header:['수화주나라코드', {content: "selectFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'c_receiver_vat_no', header:['수화주 VATRN', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'c_contact_person', header:['수화주 담당자명', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'c_country_calling_code', header:['수화주 국가번호', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'c_phone', header:['수화주 전화번호', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'c_phone2', header:['수화주 전화번호2', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'c_email', header:['수화주 이메일', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:150},
			{id:'s_company_name', header:['판매자회사명', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:150},
			{id:'s_address', header:['판매자주소', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:150},
			{id:'s_city', header:['판매자City', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'s_state', header:['판매자Sate', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:100},
			{id:'s_postal_code', header:['판매자우편번호', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'s_country', header:['판매자나라코드', {content: "selectFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'s_contact_person', header:['판매자 담당자명', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:150},
			{id:'s_country_calling_code', header:['판매자 국가번호', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:100},
			{id:'s_phone_no', header:['판매자 전화번호', {content: "textFilter"}], editor:'', sort:'string', css:'textCenter', width:150},
			{id:'s_email', header:['판매자 이메일', {content: "textFilter"}], editor:'', sort:'string', css:'textLeft', width:150},
			//{id:"INV_PRICE", header:"Invoice Price", editor:"", sort:"int", css:"textRight", width:100, footer:{ content:"summColumn"}, format:intFormat},
		],
		footer : false,
	});

	webix.ui({
		id : "grid2",
		container : "grid2",
		view : "datagrid",
		columns : [
			{id:'order_id', header:'주문번호', hidden: true},
			{id:'package_seq', header:'패키지순번', editor:'', sort:'string', css:'textRight', width:80},
			{id:'commercial_yn', header:'수출여부', editor:'', sort:'string', css:'textCenter', width:60},
			{id:'package_remark', header:'패키지설명', editor:'', sort:'string', css:'textLeft', fillspace: true},
			{id:'weight', header:'무게', editor:'', sort:'string', css:'textRight', width:60, format: numberFormat},
			{id:'width', header:'가로', editor:'', sort:'string', css:'textRight', width:60, format: numberFormat},
			{id:'depth', header:'세로', editor:'', sort:'string', css:'textRight', width:60, format: numberFormat},
			{id:'height', header:'높이', editor:'', sort:'string', css:'textRight', width:60, format: numberFormat},
		],
		footer : false,
	});

	webix.ui({
		id : "grid3",
		container : "grid3",
		view : "datagrid",
		columns : [
			{id:'order_id', header:'주문번호', hidden: true},
			{id:'package_seq', header:'패키지순번', hidden: true},
			{id:'item_seq', header:'아이템순번', editor:'', sort:'string', css:'textRight', width:80},
			{id:'article_category', header:'아이템분류', editor:'', sort:'string', css:'textLeft', width:100},
			{id:'article_name', header:'아이템명', editor:'', sort:'string', css:'textLeft', width:100},
			{id:'article_url', header:'아이템판매URL', editor:'', sort:'string', css:'textLeft', width:100},
			{id:'article_description', header:'아이템설명', editor:'', sort:'string', css:'textLeft', width:100},
			{id:'article_local_description', header:'아이템한글설명', editor:'', sort:'string', css:'textLeft', width:100},
			{id:'number_of_article', header:'아이템수량', editor:'', sort:'string', css:'textRight', width:100},
			{id:'hs_code', header:'HS코드', editor:'', sort:'string', css:'textLeft', width:100},
			{id:'item_model_nm', header:'아이템모델번호', editor:'', sort:'string', css:'textLeft', width:100},
			{id:'item_brand_nm', header:'아이템브랜드명', editor:'', sort:'string', css:'textLeft', width:100},
			{id:'item_orgn_nation_cd', header:'원산지국가코드', editor:'', sort:'string', css:'textCenter', width:100},
			{id:'article_weight', header:'무게', editor:'', sort:'string', css:'textRight', width:100},
			{id:'invoice_value', header:'단가', editor:'', sort:'string', css:'textRight', width:100},
			{id:'sku_no', header:'SKU', editor:'', sort:'string', css:'textLeft', width:100},
			{id:'options', header:'아이템옵션', editor:'', sort:'string', css:'textLeft', width:100},
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
		$$("grid2").clearData();
		$$("grid3").clearData();
	}
}

listener.editor.keydown = function($el) {
	if ($el.parents("form").attr("id") == "searchArea") {
		$$("grid1").clearData();
		$$("grid2").clearData();
		$$("grid3").clearData();
	}
}

listener.gridRow.click = function(record, grid) {
	let gridId = grid.config.id;

	//console.log("gridId", gridId)

	if (gridId === "grid1") {
		$$("grid2").clearData();
		$$("grid3").clearData();

		let url = "/sa010/select/packages";
		url += "/" + record["order_id"];

		util.getService(url, function(result) {
			$$("grid2").setData(result);
			$$("grid3").clearData();
		});

		$("#postForm").setData(record);
	} else if (gridId === "grid2") {
		$$("grid3").clearData();

		let url = "/sa010/select/package/items";
		url += "/" + record["order_id"];
		url += "/" + record["package_seq"];

		util.getService(url, function(result) {
			$$("grid3").setData(result);
		});
	}
}

listener.gridRow.dblclick = function(record, grid) {
	let gridId = grid.config.id;

	if (gridId === "grid1") {
		$("#postForm").setData(record);

		$("#btnTab2").trigger("click");
	}
}

listener.button.init.click = function () {
	$$("grid1").clearData();
	$$("grid2").clearData();
	$$("grid3").clearData();
	$("#searchArea").reset();

	initPage();
}

listener.button.search.click = function () {
	let url = "/sa010/select";
	url += "?start_dt=" + $("#P_start_dt").getVal();
	url += "&end_dt=" + $("#P_end_dt").getVal();
	url += "&order_id=" + $("#P_order_id").getVal();
	url += "&company=" + $("#P_company").getVal();
	url += "&to_street=" + $("#P_to_street").getVal();

	util.getService(url, function(result) {
		$$("grid1").setData(result);
		$$("grid2").clearData();
		$$("grid3").clearData();
	});
}

listener.button.excelUpload.click = function() {
	let url = "/sa010Popup.do";
	let title = "주문정보 업로드";
	let width = 850;
	let height = 330;
	let callback = function() {
		listener.button.search.click();
	};

	customPopup.show(url, title, width, height, callback, {});
}

listener.button.tracking.click = function() {
	let url = "/sa010Popup2.do";
	let title = "송장번호 업로드";
	let width = 850;
	let height = 330;
	let callback = function() {
		listener.button.search.click();
	};

	customPopup.show(url, title, width, height, callback, {});
}

listener.button.excelDown.click = function() {
	let data = $$("grid1").getCheckedData("ch1");

	if (data === null || data.length === 0) {
		alert("선택된 데이터가 없습니다.")
		return;
	}

	let param = [];


	for (let i = 0; i < data.length; i++) {
		param.push({"order_id": data[i]["order_id"]});
	}

	console.log("data", param);

	let url = "/sa010/download"

	util.postService(url, param, function(result) {
		console.log("result", result);
		if (result !== "ERROR") {
			var downloadLink = document.createElement("a");
			downloadLink.href = "/sa010/downloadFile?fileName=" + result;
			downloadLink.download = "data.xlsx";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		}
	})
}

listener.button.save.click = function() {
	let data = $$("grid1").getCheckedData("ch1");

	let param = {};
	param["order_id"] = $("#order_id").getVal();
	param["reference_no"] = $("#reference_no").getVal();
	param["tracking_no"] = $("#tracking_no").getVal();

	let url = "/sa010/tracking";

	if (!confirm("송장번호를 저장하시겠습니까?")) {
		return;
	}

	util.putService(url, [param], function(result) {
		console.log("result", result);
		if (result === "OK") {
			alert("정상적으로 저장되었습니다.");

			$$("grid1").updateCurrentCell("tracking_no", param["tracking_no"]);

			return;
		} else {
			alert("송장번호를 저장할 수 없습니다.\n" + "[업체주문번호: " + result + "]");
		}
	})
}

listener.button.del.click = function() {
	let data = $$("grid1").getCheckedData("ch1");

	if (data === null || data.length === 0) {
		alert("선택된 데이터가 없습니다.")
		return;
	}

	let param = [];

	for (let i = 0; i < data.length; i++) {
		param.push({"order_id": data[i]["order_id"]});
	}

	let url = "/sa010/delete";

	if (!confirm("삭제하시겠습니까?")) {
		return;
	}

	util.postService(url, param, function(result) {
		console.log("result", result);
		if (result === "OK") {
			alert("정상적으로 삭제되었습니다.");
			listener.button.search.click();
			return;
		}
	})
}
</script>
<style>
.tabContainer {
	position: absolute;
	top: 110px;
	left: 12px;
	display: flex;
	height: 30px;
	border-bottom: 1px solid #c6c6c6;
	width: calc(100% - 30px);
}

.tabButton {
	border: 1px solid #c6c6c6;
	padding-left: 10px;
	padding-right: 10px;
	margin: 0;
	height: 30px;
	background-color: #f4f4f4;
	color: #333;
	width: 100px;
}

.tabButton:last-child {
	/*border-right: 1px solid;*/
}

.tabButton[data-active=Y] {
	font-weight: bold;
	background-image: linear-gradient(#89d0fc, #77c2ef);
	border: 1px solid #57aadd;
	color: #fff;
}
</style>
</head>
<body>
<%@include file="/jsp/common/title.jsp" %>
<form id="searchArea" style="overflow: auto;">
	<div class="searchRow">
		<label for="P_start_dt">주문일자</label>
		<input id="P_start_dt" name="P_start_dt" type="text" size="11" maxlength="10"
			data-format="date"
			data-required="true"
			data-field="start_dt"
		/>
		<label for="P_end_dt">~ </label>
		<input id="P_end_dt" name="P_end_dt" type="text" size="11" maxlength="10"
			data-format="date"
			data-required="true"
			data-field="end_dt"
		/>

		<label for="P_order_id">주문번호</label>
		<input id="P_order_id" name="P_order_id" type="text" size="15" maxlength="14"
			data-required="false"
			data-field="order_id"
		/>

		<label for="P_company">업체코드/명</label>
		<input id="P_company" name="P_company" type="text" size="20" maxlength="19"
			data-required="false"
			data-field="company"
		/>

		<label for="P_to_street">배송지주소</label>
		<input id="P_to_street" name="P_to_street" type="text" size="50" maxlength="49"
			data-required="false"
			data-field="to_street"
		/>
	</div>
</form>

<div class="tabContainer">
	<button id="btnTab1" class="tabButton" data-active="Y" data-target="tabDiv1">주문 목록</button>
	<button id="btnTab2" class="tabButton" data-active="N" data-target="tabDiv2">주문 상세</button>
</div>
<div id="tabDiv1">
	<div class="formTitle" style="top:150px;">주문 목록</div>
	<form class="rowButtonArea" style="position:absolute; right:12px; width:calc(100% - 24px); top:150px;">
		<button class="normalButtonSmall" id="btnResetFilter" data-target="grid1">필터초기화</button>
		<button class="normalButtonSmall" id="btnDetail" data-target="grid1">상세보기</button>
		<button class="normalButtonSmall" name="exportToExcel" data-target="grid1" data-excel-name="주문목록">EXCEL</button>
	</form>
	<div id="grid1" style="position:absolute; top:170px; left:12px; width:calc(100% - 24px); height: <%=height1%>px"></div>
</div>
<div id="tabDiv2" style="display: none;">
	<div class="formTitle" style="top:150px;">주문 상세</div>
	<form id="postForm" name="postForm" class="formArea" style="left:12px; top:170px; width: calc(100% - 24px);" onsubmit="return false;">
		<div class="formRow c4"><label for="order_id">주문번호</label><input id="order_id" name="order_id" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="order_id" /></div>
		<div class="formRow c4"><label for="order_dt">주문일자</label><input id="order_dt" name="order_dt" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="order_dt" data-format="date" /></div>
		<div class="formRow c4"><label for="company_code">업체코드</label><input id="company_code" name="company_code" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="company_code" /></div>
		<div class="formRow c4"><label for="company_name">업체명</label><input id="company_name" name="company_name" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="company_name" /></div>
		<div class="formRow c4"><label for="reference_no">업체주문번호</label><input id="reference_no" name="reference_no" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="reference_no" /></div>
		<div class="formRow c4"><label for="tracking_no" style="font-weight: bold; color:#d71b44">송장번호</label><input id="tracking_no" name="tracking_no" type="text" maxlength="100" style="width:calc(100% - 160px)" data-field="tracking_no" /></div>
		<div class="formRow c4"><label for="to_company_name">배송지명</label><input id="to_company_name" name="to_company_name" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_company_name" /></div>
		<div class="formRow c4"><label for="to_company_nickname">수신자별칭</label><input id="to_company_nickname" name="to_company_nickname" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_company_nickname" /></div>
		<div class="formRow c4"><label for="to_street1">배송지주소1</label><input id="to_street1" name="to_street1" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_street1" /></div>
		<div class="formRow c4"><label for="to_street2">배송지주소2</label><input id="to_street2" name="to_street2" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_street2" /></div>
		<div class="formRow c4"><label for="to_street3">배송지주소3</label><input id="to_street3" name="to_street3" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_street3" /></div>
		<div class="formRow c4"><label for="to_city">배송지시/도</label><input id="to_city" name="to_city" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_city" /></div>
		<div class="formRow c4"><label for="to_state">배송지State</label><input id="to_state" name="to_state" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_state" /></div>
		<div class="formRow c4"><label for="to_postal_code">배송지우편번호</label><input id="to_postal_code" name="to_postal_code" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_postal_code" /></div>
		<div class="formRow c4"><label for="to_country">배송지나라코드</label><input id="to_country" name="to_country" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_country" /></div>
		<div class="formRow c4"><label for="to_receiver_vat_no">배송지 VATRN</label><input id="to_receiver_vat_no" name="to_receiver_vat_no" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_receiver_vat_no" /></div>
		<div class="formRow c4"><label for="to_contact_person">배송지 담당자명</label><input id="to_contact_person" name="to_contact_person" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_contact_person" /></div>
		<div class="formRow c4"><label for="to_country_calling_code">배송지 국가번호</label><input id="to_country_calling_code" name="to_country_calling_code" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_country_calling_code" /></div>
		<div class="formRow c4"><label for="to_phone">배송지 전화번호</label><input id="to_phone" name="to_phone" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_phone" /></div>
		<div class="formRow c4"><label for="to_phone2">배송지 전화번호2</label><input id="to_phone2" name="to_phone2" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_phone2" /></div>
		<div class="formRow c4"><label for="to_email">배송지 이메일</label><input id="to_email" name="to_email" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="to_email" /></div>
		<div class="formRow c4"><label for="service_class">서비스 유형</label><input id="service_class" name="service_class" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="service_class" /></div>
		<div class="formRow c4"><label for="inbound_outbound">수출입구분</label><input id="inbound_outbound" name="inbound_outbound" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="inbound_outbound" /></div>
		<div class="formRow c4"><label for="expected_pickup_date">픽업예정일자</label><input id="expected_pickup_date" name="expected_pickup_date" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="expected_pickup_date" data-format="date" /></div>
		<div class="formRow c4"><label for="goods_description">물품 명세</label><input id="goods_description" name="goods_description" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="goods_description" /></div>
		<div class="formRow c4"><label for="instruction">CI/PL비고</label><input id="instruction" name="instruction" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="instruction" /></div>
		<div class="formRow c4"><label for="sender_name">발송인명</label><input id="sender_name" name="sender_name" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="sender_name" /></div>
		<div class="formRow c4"><label for="sender_biz_reg_no">사업자번호</label><input id="sender_biz_reg_no" name="sender_biz_reg_no" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="sender_biz_reg_no" /></div>
		<div class="formRow c4"><label for="inco_terms">DDP/DAP</label><input id="inco_terms" name="inco_terms" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="inco_terms" /></div>
		<%--<div class="formRow c4"><label for="invoice_total_value">총금액</label><input id="invoice_total_value" name="invoice_total_value" type="text" maxlength="100" style="width:calc(100% - 160px); text-align:right;" readonly data-field="invoice_total_value" data-format="number" /></div>--%>
		<div class="formRow c4"><label for="length_unit_code">길이단위</label><input id="length_unit_code" name="length_unit_code" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="length_unit_code" /></div>
		<div class="formRow c4"><label for="weight_unit_code">무게단위</label><input id="weight_unit_code" name="weight_unit_code" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="weight_unit_code" /></div>
		<div class="formRow c4"><label for="currency_code">통화 코드</label><input id="currency_code" name="currency_code" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="currency_code" /></div>

		<div class="formRow c4"><label for="export_commodity_class">수출상품분류</label><input id="export_commodity_class" name="export_commodity_class" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="export_commodity_class" /></div>
		<div class="formRow c4"><label for="pickup_address">픽업주소</label><input id="pickup_address" name="sales_channel" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="pickup_address" /></div>
		<div class="formRow c4"><label for="square_party_id">스퀘어파티ID</label><input id="square_party_id" name="sales_channel" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="square_party_id" /></div>
		<div class="formRow c4"><label for="collecting_site_usage_yn">집결지사용여부</label><input id="collecting_site_usage_yn" name="sales_channel" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="collecting_site_usage_yn" /></div>
		<div class="formRow c4"><label for="warehousing_method">배송업체</label><input id="warehousing_method" name="sales_channel" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="warehousing_method" /></div>
		<div class="formRow c4"><label for="warehousing_information">배송정보</label><input id="warehousing_information" name="sales_channel" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="warehousing_information" /></div>
		<div class="formRow c4"><label for="requested_items">요청사항</label><input id="requested_items" name="sales_channel" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="requested_items" /></div>

		<div class="formRow c4"><label for="sales_channel">판매처</label><input id="sales_channel" name="sales_channel" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="sales_channel" /></div>
		<div class="formRow c4"><label for="goods_issue_no">제품출고번호</label><input id="goods_issue_no" name="goods_issue_no" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="goods_issue_no" /></div>
		<div class="formRow c4"><label for="c_company_name">수화주명</label><input id="c_company_name" name="c_company_name" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_company_name" /></div>
		<div class="formRow c4"><label for="c_street1">수화주주소1</label><input id="c_street1" name="c_street1" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_street1" /></div>
		<div class="formRow c4"><label for="c_street2">수화주주소2</label><input id="c_street2" name="c_street2" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_street2" /></div>
		<div class="formRow c4"><label for="c_street3">수화주주소3</label><input id="c_street3" name="c_street3" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_street3" /></div>
		<div class="formRow c4"><label for="c_city">수화주시/도</label><input id="c_city" name="c_city" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_city" /></div>
		<div class="formRow c4"><label for="c_state">수화주State</label><input id="c_state" name="c_state" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_state" /></div>
		<div class="formRow c4"><label for="c_postal_code">수화주우편번호</label><input id="c_postal_code" name="c_postal_code" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_postal_code" /></div>
		<div class="formRow c4"><label for="c_country">수화주나라코드</label><input id="c_country" name="c_country" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_country" /></div>
		<div class="formRow c4"><label for="c_receiver_vat_no">수화주 VATRN</label><input id="c_receiver_vat_no" name="c_receiver_vat_no" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_receiver_vat_no" /></div>
		<div class="formRow c4"><label for="c_contact_person">수화주 담당자명</label><input id="c_contact_person" name="c_contact_person" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_contact_person" /></div>
		<div class="formRow c4"><label for="c_country_calling_code">수화주 국가번호</label><input id="c_country_calling_code" name="c_country_calling_code" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_country_calling_code" /></div>
		<div class="formRow c4"><label for="c_phone">수화주 전화번호</label><input id="c_phone" name="c_phone" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_phone" /></div>
		<div class="formRow c4"><label for="c_phone2">수화주 전화번호2</label><input id="c_phone2" name="c_phone2" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_phone2" /></div>
		<div class="formRow c4"><label for="c_email">수화주 이메일</label><input id="c_email" name="c_email" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="c_email" /></div>

		<div class="formRow c4"><label for="s_company_name">판매자회사명</label><input id="s_company_name" name="s_company_name" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="s_company_name" /></div>
		<div class="formRow c4"><label for="s_address">판매자주소</label><input id="s_address" name="s_address" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="s_address" /></div>
		<div class="formRow c4"><label for="s_city">판매자City</label><input id="s_city" name="s_city" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="s_city" /></div>
		<div class="formRow c4"><label for="s_state">판매자State</label><input id="s_state" name="s_state" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="s_state" /></div>
		<div class="formRow c4"><label for="s_postal_code">판매자우편번호</label><input id="s_postal_code" name="s_postal_code" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="s_postal_code" /></div>
		<div class="formRow c4"><label for="s_country">판매자나라코드</label><input id="s_country" name="s_country" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="s_country" /></div>
		<div class="formRow c4"><label for="s_contact_person">판매자 담당자명</label><input id="s_contact_person" name="s_contact_person" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="s_contact_person" /></div>
		<div class="formRow c4"><label for="s_country_calling_code">판매자 국가번호</label><input id="s_country_calling_code" name="s_country_calling_code" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="s_country_calling_code" /></div>
		<div class="formRow c4"><label for="s_phone_no">판매자 전화번호</label><input id="s_phone_no" name="s_phone_no" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="s_phone_no" /></div>
		<div class="formRow c4"><label for="s_email">판매자 이메일</label><input id="s_email" name="s_email" type="text" maxlength="100" style="width:calc(100% - 160px)" readonly data-field="s_email" /></div>
	</form>
</div>
<div class="formTitle" style="top: <%=top2%>px;">패키지 목록</div>
<form class="rowButtonArea" style="position:absolute; left:12px; width:500px; top: <%=top2%>px;">
	<button class="normalButtonSmall" name="exportToExcel" data-target="grid2" data-excel-name="패키지목록">EXCEL</button>
</form>
<div id="grid2" style="position:absolute; top: <%=top2 + 20%>px; left:12px; width: 500px; height: calc(100% - <%=top2 + 20%>px);"></div>

<div class="formTitle" style="top: <%=top2%>px; left:522px;">아이템 목록</div>
<form class="rowButtonArea" style="position:absolute; right:12px; width:calc(100% - 534px); top: <%=top2%>px;">
	<button class="normalButtonSmall" name="exportToExcel" data-target="grid3" data-excel-name="아이템목록">EXCEL</button>
</form>
<div id="grid3" style="position:absolute; top: <%=top2 + 20%>px; right:12px; width: calc(100% - 534px); height: calc(100% - <%=top2 + 20%>px);"></div>
<%@include file="/jsp/main/custom_popup.jsp" %>
</body>
</html>
