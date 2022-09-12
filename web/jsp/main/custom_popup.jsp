<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	request.setCharacterEncoding("utf-8");
%>
<style>
.customPopupBackground {
	position: absolute;
	left: 0px;
	top: 0px;
	z-index: 999999;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.1);
	text-align: center;
}

#customPopupWindow {
	display: none;
}

#customPopupContainer {
	position: absolute;
	width: 300px;
	border-radius: 2px;  
	background-color: #f7f7f7;  
	box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
	top: calc(50% - 100px);
	left: calc(50% - 150px);
	padding-bottom: 15px;
}

#customPopupTitle {
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

#customText {
	width: 100%;
	height: 100%;
	color: #666666;
	font-size: 10pt;
	padding: 20px;
}

#customClose {
	position: absolute;
	top:4px;
	right: 5px;
	width: 21px;
	height: 21px;
	background-image: url('/img/btn_x.png');
	border: 0px;
	cursor: pointer;
}

#customClose:active {
	background-image: url('/img/btn_x_ov.png');
}

#confirmYes, #confirmNo {
	width: 130px;
}
</style>
<script>
var customPopup = {
	callback : null,
	show : function(url, title, width, height, callback, params) {
		this.callback = callback;
		
		$(document).off("iframeready");
		$(document).on("iframeready", function(evt, frameId) {
			if (frameId == "customPopupFrame") {
				var frame = $("#customPopupFrame").get(0).contentWindow;
				
				
				var strParam = "";
				
				for (var i = 0; i < params.length; i++) {
					strParam += "params[" + i + "]";
					
					if (i < params.length - 1) {
						strParam += ",";
					}
				}
				
				
				var strInitFrame = "frame.initFrame(" + strParam + ")";
				eval(strInitFrame);
			}
		});

		let left = "calc(50% - " + width / 2 + "px)";
		let top = "calc(50% - " + height / 2 + "px)";

		if (width && String(width).indexOf("%") > -1) {
			let t = String(width).substring(0, 2);
			left = (100 - Number(t)) / 2
		}
		
		$("#customPopupFrame").attr("src", url);
		$("#customPopupTitle").text(title);
		$("#customPopupContainer").css("width", width);
		$("#customPopupContainer").css("height", height);
		$("#customPopupContainer").css("left", "calc(50% - " + width / 2 + "px)");
		$("#customPopupContainer").css("top", "calc(50% - " + height / 2 + "px)");
		$("#customPopupWindow").css("display", "block");
		//$("#customClose").focus();
	},
	
	hide : function() {
		$("#customPopupWindow").css("display", "none");
		$("#customPopupFrame").attr("src", "");
		
		var strParam = "";
		
		for (var i = 0; i < arguments.length; i++) {
			strParam += "arguments[" + i + "]";
			
			if (i < arguments.length - 1) {
				strParam += ",";
			}
		}
		
		var strCallback = "this.callback(" + strParam + ")";
		
		if (this.callback != null) {
			eval(strCallback);
		}
	}
};

$(document).ready(function() {
	$("#customPopupContainer").draggable({
		  containment: "parent",
		  cursor: "move"
	});
});

</script>
<div id="customPopupWindow" class="customPopupBackground">
	<div id="customPopupContainer">
		<div id="customPopupTitle" style="">CODE HELP</div><button id="customClose" onclick="customPopup.hide();" ></button>
		<iframe id="customPopupFrame" style="width:100%; height:calc(100% - 15px);" frameborder="0" />
	</div>
</div>