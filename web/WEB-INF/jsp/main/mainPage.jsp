<%@ page import="com.dexa.module.main.vo.ProgramVO" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%
	request.setCharacterEncoding("utf-8");
	List<ProgramVO> menuList = (List<ProgramVO>) request.getAttribute("menuList");

	String env = System.getProperty("env");
%>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>삼영물류</title>
<%@include file="/jsp/common/sessionCheck.jsp" %>
<link rel="stylesheet" type="text/css" href="/css/common.css">
<link rel="stylesheet" type="text/css" href="/css/main.css">
<link rel="stylesheet" type="text/css" href="/css/program.css" />

<link rel="stylesheet" type="text/css" href="/lib/webix/webix.css" charset="utf-8">
<!-- <link rel="stylesheet" type="text/css" href="/lib/multiple-select/multiple-select.css" /> -->
<link rel="stylesheet" type="text/css" href="/lib/sumoselect/sumoselect.css" />
<link rel="stylesheet" type="text/css" href="/lib/jquery-ui/jquery-ui.css" />
<link rel="stylesheet" type="text/css" href="/lib/jquery-ui/month/css/MonthPicker.css" />

<link rel="stylesheet" type="text/css" href="/css/webix.custom.css" />

<!-- [2] LIBRARY & COMMON -->
<script type="text/javascript" src="/lib/jquery/jquery-2.1.4.js"></script>
<script type="text/javascript" src="/lib/webix/webix_debug.js"></script>
<!-- <script type="text/javascript" src="/lib/multiple-select/jquery.multiple.select.js"></script> -->
<script type="text/javascript" src="/lib/sumoselect/jquery.sumoselect.js"></script>
<script type="text/javascript" src="/lib/jquery/jquery.maskedinput.js"></script>
<script type="text/javascript" src="/lib/jquery-ui/jquery-ui.js"></script>
<script type="text/javascript" src="/lib/jquery-ui/month/MonthPicker.js"></script>

<script type="text/javascript" src="/js/common.js"></script>
<!-- [3] CUSTOM -->
<script type="text/javascript" src="/js/MonthPicker.custom.js"></script>
<script type="text/javascript" src="/js/webix.custom.js"></script>
<script type="text/javascript" src="/js/dwr.custom.js"></script>
<!-- [5] INIT SCRIPT -->
<script type="text/javascript" src="/js/initialize.js"></script>
<script>
if (!window['console']) {
	window['console'] = {
		log : function() {
		}
	};
}

$(document).ready(function() {
	setMenuHeight();
	setMenuEvent();

	//$(".menuBtn.selected").click();

	//popup.promotion.show();

	$("#btnChangePasswd").on( "click", function(evt) { //비밀번호변경
		customPopup.show("/jsp/main/pwchg_popup.jsp", "비밀번호변경", 400, 229, function(result){}, {});
	});
});

function setMenuHeight() {
	var btns = $("button.menuBtn");
	var totalHeight = $("#menuArea").height() - 130;
	var len = btns.length;

	btns.each(function(idx, obj) {
		var objHeight = totalHeight / len;

		$(obj).width(objHeight);
		$(obj).css("margin-top", objHeight - $(obj).height() / 2);
	});
}

function setMenuEvent() {
	var btns = $("button.menuBtn");

	btns.each(function(idx, obj) {
		$(obj).click(function(evt) {
			$("button.menuBtn").removeClass("selected");
			var menuBtn = $(evt.currentTarget);
			menuBtn.addClass("selected");

			$(".subMenuItemArea").removeClass("selected");
			$(".subMenuItemArea[data-biz-gbcd=" + menuBtn.val() + "]").addClass("selected");

			if (!$("#menuOpen").hasClass("open")) {
				$(".subMenuItemArea").removeClass("opened");
				$(".subMenuItemArea[data-biz-gbcd=" + menuBtn.val() + "]").addClass("opened");
			} else {
				$("#menuOpen").click();
			}

			/*
			$("button.menuBtn").each(function(idx, obj) {
				if (evt.currentTarget != obj) {
					$(obj).removeClass("selected");
				}
			});
			*/
		});
	});

	$("#menuOpen").click(function() {
		var menuOpen = $(this);
		var width = 0;
		var zIndex = 1100;
		var display = "none";

		var isOpen = false;

		if (menuOpen.hasClass("open")) {
			width = 250;
			zIndex = 100;
			display = "block";

			$("#subMenuArea").css("zIndex", zIndex);
			$("#subMenuArea").addClass("opened");
			$(".subMenuItemArea.selected").addClass("opened");

			isOpen = true;
		}


		$("#subMenuArea").animate({
			width : width,
		}, 100, function() {
			$("#subMenuArea").css("zIndex", zIndex);

			if (!isOpen) {
				$(".subMenuItemArea.selected").removeClass("opened");
				$("#subMenuArea").removeClass("opened");
			}

			menuOpen.toggleClass("open");
		});
	});

	$(".btnProgram").click(function() {
		$this = $(this);

		var form = this.form;

		var programObj = new Object();

		programPath = $this.data("program-path");

		$("#programId").val($this.data("program-id"));
		$("#programName").val($this.data("program-name"));
		$("#programPathName").val($this.data("program-path-name"));
		$("#bizGb").val($(".menuBtn.selected").html());

		var queryString = toQueryString(programObj);

		form.action = programPath;
		form.submit();

		$("body").removeClass("mainBg");

		$(".btnProgram").removeClass("selected");

		$("#menuOpen").click();

		$(this).addClass("selected");
	});
}

$( window ).resize(function() {
	setMenuHeight();
});

$(document).ready(function() {
	webix.ready(function() {
		listener.select.change = function($el) {

			var popup_grid = null;

			if ($el.attr("id").indexOf("vinpopup") == 0) {
				popup_grid = $$("vinpopup_grid1");
			} else if ($el.attr("id").indexOf("promotion_") == 0) {
				popup_grid = $$("promotion_popup_grid1");
			} else if ($el.attr("id").indexOf("help_popup") == 0) {
				popup_grid = $$("help_popup_grid1");
			}

			if (popup_grid) {
				popup_grid.clearData();
			}
		}

		listener.editor.keydown = function($el) {

			var popup_grid = null;

			if ($el.attr("id").indexOf("vinpopup") == 0) {
				popup_grid = $$("vinpopup_grid1");
			} else if ($el.attr("id").indexOf("promotion_") == 0) {
				popup_grid = $$("promotion_popup_grid1");
			} else if ($el.attr("id").indexOf("help_popup") == 0) {
				popup_grid = $$("help_popup_grid1");
			}

			if (popup_grid) {
				popup_grid.clearData();
			}
		}

		listener.gridRow.dblclick = function(record, grid) {
			//$("#postForm").setData(record);

			if (grid.config.id == "help_popup_grid1") {
				popup.help.callback(record);
				popup.help.hide();
			} else if (grid.config.id == "promotion_popup_grid1") {
				popup.promotion.callback(record);
				popup.promotion.hide();
			} else if (grid.config.id == "vinpopup_grid1") {
				//popup.vin.callback(record);
				//popup.vin.hide();

				$("#vinpopup_select").trigger("click");
			}
		}
	});
});

function userInfoClick() {
	var customCallback = function(result) {
	}

	var initParam = new Array();
	initParam.push("<%=USR_ID%>");
	initParam.push("<%=USR_NM%>");

	customPopup.show("/jsp/main/main_userInfo.jsp", "사용자 비밀번호 변경", 400, 250, customCallback, initParam);
}

function btnMenu(bObj){
	var param = {"PGM_ID":$("#programId").val(), "ACTION":$(bObj).prop("id"), "USER_ID":USER_INFO.USER_ID, "USER_IP":USER_INFO.USER_IP};
	var callback = new Callback(function(result) {});
	//LoginService.saveMenuLog(param, callback);
}

function btnLogOutClick() {
	document.location = "/logout.do";
}
</script>
</head>
<body class="mainBg">
<div id="topArea">
	<div class="logoText" style="left:10px;">삼영물류</div>
	<div class="loginInfo" style="cursor:pointer;" onclick="userInfoClick();"><b><%=USR_NM%>님.</b> 안녕하세요.</div>
	<button id="btnLogout" onclick="btnLogOutClick();">로그아웃</button>
</div>
<div id="menuArea">
</div>
<form id="subMenuArea" onsubmit="return false;" target="programFrame" method="post">
	<input type="hidden" id="programId" name="programId" />
	<input type="hidden" id="programName" name="programName" />
	<input type="hidden" id="programPathName" name="programPathName" />
	<input type="hidden" id="bizGb" name="bizGb" />

	<button id="menuOpen" class="open"></button>
	<div class="subMenuItemArea selected" data-biz-gbcd="SA">
		<div class="programGroup"></div>
<%

%>
		<button class="btnProgram"
			data-program-id="sa010"
			data-program-name="배송대행정보조회"
			data-program-path="/sa010.do"
		>배송대행정보조회</button>
<%
	if ("dev".equals(env)) {
%>
		<button class="btnProgram"
			data-program-id="sa020"
			data-program-name="업체관리"
			data-program-path="/sa020.do"
		>업체관리</button>
		<button class="btnProgram"
			data-program-id="sy010"
			data-program-name="사용자관리"
			data-program-path="/sy010.do"
		>사용자관리</button>
<%
	}
%>
	</div>
</form>
<div id="programArea" style="position:absolute; left:25px; top:43px; width:calc(100% - 25px); border:0px solid; height:calc(100% - 55px); overflow:hidden;">
	<iframe id="programFrame" name="programFrame" src="/sa010.do" style="width:100%; height:100%; border:0px solid;" frameborder="0" scrolling="no" ></iframe>
</div>
<%@include file="/jsp/main/popup.jsp" %>
</body>
</html>