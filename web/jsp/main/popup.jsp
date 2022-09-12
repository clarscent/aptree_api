<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	request.setCharacterEncoding("utf-8");
%>
<style>
.popupBackground {
	position: absolute;
	left: 0px;
	top: 0px;
	z-index: 999999;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.1);
	text-align: center;
}

#alertPopupWindow, #confirmPopupWindow, #loadingPopupWindow, #helpPopupWindow {
	display: none;
}

#alertContainer, #confirmContainer, #loadingContainer {
	position: absolute;
	width: 300px;
	border-radius: 2px;
	background-color: #f7f7f7;
	box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
	top: calc(50% - 100px);
	left: calc(50% - 150px);
	padding-bottom: 15px;
}

#loadingContainer {
	top: calc(50% - 75px);
	left: calc(50% - 75px);
}

#alertTitle, #confirmTitle {
	width: 100%;
	line-height: 40px;
	height: 40px;
	font-weight: bold;
	color: #333333;
	font-size: 12pt;
}

#alertText, #confirmText {
	width: 100%;
	height: 100%;
	color: #666666;
	font-size: 9pt;
	padding: 20px;
}

#alertClose, #confirmYes, #confirmNo {
	padding-left: 15px;
	padding-right: 15px;
	height: 32px;
	background-image: linear-gradient(#69bbee, #4fa2d5);
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#69bbee', endColorstr='#4fa2d5');
	border-radius: 2px;
	border: 1px solid #439acf;
	font-size: 9pt;
	color: #ffffff;
}

#alertClose:focus, #confirmYes:focus, #confirmNo:focus {
	border: 1px solid #07c;
	box-shadow: 0 0 5px #07c;
}

#alertClose:hover, #confirmYes:hover, #confirmNo:hover {
	background-image: linear-gradient(#89d0fc, #77c2ef);
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#89d0fc', endColorstr='#77c2ef');
	/* 	border: 1px solid #57aadd; */
}

#alertClose:active, #confirmYes:active, #confirmNo:active {
	background-image: linear-gradient(#3788b9, #4796c7);
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#3788b9', endColorstr='#4796c7');
	border: 1px solid #2376a9;
}

#confirmYes, #confirmNo {
	width: 130px;
}
</style>
<script>
var popup_grid;

var popup = {
	alert : {
		callback : null,
		show : function(text, callback) {
			this.callback = callback;
			
			$("#alertText").text(text);
			$("#alertPopupWindow").css("display", "block");
			$("#alertClose").focus();
		},
		
		hide : function() {
			$("#alertPopupWindow").css("display", "none");
			
			if (this.callback != null) {
				this.callback();
			}
		}
	},

	confirm : {
		callback : null,
		
		show : function(text, callback) {
			this.callback = callback;
			
			$("#confirmText").text(text);
			$("#confirmPopupWindow").css("display", "block");
			$("#confirmYes").focus();
		},
		
		hide : function(val) {
			$("#confirmPopupWindow").css("display", "none");
			
			if (this.callback != null) {
				this.callback(val);
			}
		}
	},

	loading : {
		cnt : 0,
		
		show : function() {
			//console.log("show cnt: ", this.cnt, arguments);
			this.cnt++;
			$("#loadingPopupWindow").css("display", "block");
		},
		hide : function() {
			//console.log("hide cnt: ", this.cnt);
			this.cnt--;
			if (this.cnt <= 0) {
				this.cnt = 0;
				$("#loadingPopupWindow").css("display", "none");
			}
		},
	},

	help : {
		callback : null,
		
		show : function(code, value, param, callback, multiple) {
			var that = this;
			that.callback = callback;
			
			multiple = checkEmpty(multiple, false);
			
			$("#helpPopupWindow").css("display", "block");
			
			if (!multiple) {
				$("#help_popup_code").val(value);
				param["CODE"] = $("#help_popup_code").val();
			}
			
			var that = this;
			
			//console.log("grid check", $$("help_popup_grid1"));
			//if (!$$("help_popup_grid1")) {
			if (true) {
				var columns = [];
				
				if (multiple) {
					columns.push({id:"help_popup_check1", header:{ content:"masterCheckbox", contentId:"help_popup_mastercheck1" }, css:"textCenter", template:"{common.checkbox()}", width:30});
				}
				
				columns.push({id:"CODE", header:"코드", editor:"", sort:"string", css:"textCenter", width:150, fillspace:false});
				columns.push({id:"NAME", header:"명", editor:"", sort:"string", css:"textLeft", width:120, fillspace:true});
				
				if (popup_grid) {
					popup_grid.destructor();
				}
				
				webix.ready(function() {
					popup_grid = webix.ui({
						id : "help_popup_grid1",
						container : "help_popup_grid1",
						view : "datagrid",
						columns : columns,
					});
					
					var help_callback = new Callback(function(result) {
						$$("help_popup_grid1").setData(result);
					});
					
					help_callback.setShowLoading(true);
					CodeService.getCodeName("HELP", code, param, help_callback);
					
					$("#help_popup_search").click(function() {
						var callback = new Callback(function(result) {
							$$("help_popup_grid1").setData(result);
						});
						
						param["CODE"] = $("#help_popup_code").val(); 
						
						callback.setShowLoading(true);
						CodeService.getCodeName("HELP", code, param, callback);
					});
					
					$("#help_popup_select").click(function() {
						var grid = $$("help_popup_grid1");
						var record = grid.getItem(grid.getSelectedId());
						
						if (multiple) {
							var checkedData = grid.getCheckedData("help_popup_check1");
							that.callback(checkedData);
						} else {
							that.callback(record);
						}
						
						that.hide();
					});
				});
			} else {
				var help_callback = new Callback(function(result) {
					$$("help_popup_grid1").setData(result);
				});
				
				help_callback.setShowLoading(true);
				CodeService.getCodeName("HELP", code, param, help_callback);
			}
		},
		hide : function() {
			$("#helpPopupWindow").css("display", "none");
			$$("help_popup_grid1").clearData();
		}
	}
};

$(document).ready(function() {
	$("#alertContainer").draggable({
		containment: "parent",
		cursor: "move"
	});
	$("#confirmContainer").draggable({
		containment: "parent",
		cursor: "move"
	});
	$("#helpContainer").draggable({
		containment: "parent",
		cursor: "move"
	});
});
</script>
<div id="alertPopupWindow" class="popupBackground" style="z-index:999999999;">
	<div id="alertContainer">
		<div id="alertTitle">알 림</div>
		<div id="alertText"></div>
		<button id="alertClose" onclick="popup.alert.hide();">확인</button>
	</div>
</div>
<div id="confirmPopupWindow" class="popupBackground" style="z-index:999999999;">
	<div id="confirmContainer">
		<div id="confirmTitle">확 인</div>
		<div id="confirmText"></div>
		<button id="confirmYes" onclick="popup.confirm.hide(true);">예</button>
		<button id="confirmNo" onclick="popup.confirm.hide(false);">아니오</button>
	</div>
</div>

<div id="loadingPopupWindow" class="popupBackground" style="z-index:99999999;">
	<div id="loadingContainer" style="background-image:url('/img/loading.gif'); width:150px; height:150px; background-repeat:no-repeat; background-position:center 15px; background-color:#ffffff;">
		<div style="position:absolute; bottom:15px; text-align:center; width:100%; font-size:9pt;">잠시만 기다려주세요</div>
	</div>
</div>

<style>
#helpContainer {
	position: absolute;
	border: 1px solid #53a6d9;
	background-color: #ffffff;
	box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
	width: 400px;
	height: 500px;
	top: calc(50% - 250px);
	left: calc(50% - 200px);
}

#helpTitle {
	background-color: #53a6d9;
	border-top-radius: 2px;
	color: #ffffff;
	font-weight: bold;
	font-size: 11pt;
	height: 30px;
	padding-top: 8px;
	text-align: left;
	padding-left: 10px;
}

#help_popup_close {
	position: absolute;
	top: 4px;
	right: 5px;
	width: 21px;
	height: 21px;
	background-image: url('/img/btn_x.png');
	border: 0px;
	cursor: pointer;
}

#help_popup_close:active {
	background-image: url('/img/btn_x_ov.png');
}

#helpSearchArea {
	position: absolute;
	width: 100%;
	padding-left: 12px;
	padding-right:12px;
	text-align: left;
	top: 35px;
}

#help_popup_search {
	background-image: linear-gradient(#f9f9f9, #e9e9e9);
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#f9f9f9', endColorstr='#e9e9e9');
	height: 24px;
	padding-left: 10px;
	padding-right: 10px;
	border-radius: 2px;
	border: 1px solid #cdcdcd;
	font-size: 9pt;
	color: #555555
}

#help_popup_search:hover {
	background-image: linear-gradient(#f9f9f9, #f9f9f9);
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#f9f9f9', endColorstr='#f9f9f9');
	border: 1px solid #cdcdcd;
}

#help_popup_search:active {
	background-image: linear-gradient(#c0c0c0, #dfdfdf);
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#c0c0c0', endColorstr='#dfdfdf');
	border: 1px solid #b0b0b0;
}

#help_popup_select {
	position: absolute;
	right: 12px;
	background-image: linear-gradient(#69bbee, #4fa2d5);
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#69bbee', endColorstr='#4fa2d5');
	height: 24px;
	padding-left: 10px;
	padding-right: 10px;
	border: 0px none;
	border-radius: 2px;
	border: 1px solid #439acf;
	font-size: 9pt;
	color: #ffffff;
}

#help_popup_select:hover {
	background-image: linear-gradient(#89d0fc, #77c2ef);
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#89d0fc', endColorstr='#77c2ef');
	border: 1px solid #57aadd;
}

#help_popup_select:active {
	background-image: linear-gradient(#3788b9, #4796c7);
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#3788b9', endColorstr='#4796c7');
	border: 1px solid #2376a9;
}

#help_popup_code {
	height: 24px;
	color: #555555;
	padding-left: 5px;
	padding-right: 5px;
	border: 1px solid #c8c8c8;
	width: 225px;
}
</style>
<div id="helpPopupWindow" class="popupBackground" style="">
	<div id="helpContainer" style="">
		<div id="helpTitle" style="">CODE HELP<button id="help_popup_close" onclick="popup.help.hide();"></button></div>
		<div id="helpSearchArea">
			<label for="help_popup_code" style="font-size:9pt; color:#333333;">코드/명</label>
			<input type="text" id="help_popup_code" name="help_popup_code" />
			<button id="help_popup_search">조회</button>
			<button id="help_popup_select">선택</button>
		</div>
		<div id="help_popup_grid1" style="position:absolute; top:65px; left:12px; width:calc(100% - 24px); height:423px;">
		</div>
	</div>
</div>