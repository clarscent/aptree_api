<%@ page import="java.util.HashMap" %>
<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/jsp/common/programHeader.jsp" %>
<%
	HashMap<String, String> programButtonData = new HashMap<>();
	programButtonData.put("SAVE", "Y");
%>
<!DOCTYPE html>
<html>
<head>
<title>삼영물류 파일업로드</title>
<%@include file="/jsp/common/programInclude.jsp" %>
<script src="/js/dropzone.min.js"></script>
<link rel="stylesheet" href="/js/dropzone.min.css" type="text/css" />
<!-- PAGE STYLE -->
<style>
.formRow>label {
	min-width: 115px !important;
}

.dropzone .dz-preview .dz-progress {
	opacity: 1;
	z-index: 1000;
	pointer-events: none;
	position: absolute;
	height: 16px;
	left: 50%;
	top: 70%;
	margin-top: -8px;
	width: 80px;
	margin-left: -40px;
	background: rgba(255, 255, 255, .9);
	border-radius: 8px;
	overflow: hidden;
}

.dropzone {
	height: 235px;
}

.dropzone .dz-preview .dz-remove {
	margin-top: 5px;
    font-size: 12px;
    text-align: center;
    display: block;
    cursor: pointer;
    border: none;
}
</style>

<!--  PAGE SCRIPT -->
<script>
// 초기값 설정용(필수)
function initFrame(P_userId, P_userNm) {
}


var myDropzone;

Dropzone.options.fileDropzone = {
	url: '/sa010/upload', //업로드할 url (ex)컨트롤러)
	init: function() {
		/* 최초 dropzone 설정시 init을 통해 호출 */
		var submitButton = document.querySelector("button#save");
		myDropzone = this; //closure
		/*submitButton.addEventListener("click", function () {
			console.log("업로드"); //tell Dropzone to process all queued files
			myDropzone.processQueue();
		});*/

		this.on("success", function(file, res) {
			console.log("success responseText", res);
			console.log("this.result", this.result);

			if (res.RESULT === "ERROR") {
				this.result = "ERROR";
			} else if (this.result === "ERROR") {
				console.log("이미 오류 발생");
			}

			this.removeFile(file);
		});

		this.on('queuecomplete', function(file, res) {
			console.log("quecomplete", res, this.result);
			if (this.result === "ERROR") {
				alert("파일 업로드 중 오류가 발생했습니다.");
			} else {
				alert("파일 업로드가 완료되었습니다.");
			}

			this.result = "";
			util.hideLoading();

		});

		this.on('error', function(file, res) {
			console.log("error", res);

			util.hideLoading();
		});

		this.on("maxfilesexceeded", function(file) {
			this.removeFile(file);
			alert("동시에 최대 5개 까지만 업로드 가능합니다.");
			return false;
		});
	},
	autoProcessQueue: false, // 자동업로드 여부 (true일 경우, 바로 업로드 되어지며, false일 경우, 서버에는 올라가지 않은 상태임 processQueue() 호출시 올라간다.)
	clickable: true, // 클릭가능여부
	thumbnailHeight: 90, // Upload icon size
	thumbnailWidth: 90, // Upload icon size
	maxFiles: 5, // 업로드 파일수
	maxFilesize: 20, // 최대업로드용량 : 10MB
	parallelUploads: 5, // 동시파일업로드 수(이걸 지정한 수 만큼 여러파일을 한번에 컨트롤러에 넘긴다.)
	addRemoveLinks: true, // 삭제버튼 표시 여부
	dictRemoveFile: '삭제', // 삭제버튼 표시 텍스트
	uploadMultiple: false, // 다중업로드 기능
};

function initPage() {
	//fileDropzone dropzone 설정할 태그의 id로 지정

}

listener.button.save.click = function() {
	console.log("업로드"); //tell Dropzone to process all queued files
	util.showLoading();
	myDropzone.processQueue();

	/*var $form = $("#postForm");

	const fileInput = $("#orderInfo")[0];

	if (fileInput.files.length === 0) {
		alert("업로드할 파일을 선택해주세요");
		return;
	}

	const formData = new FormData();
	formData.append("fileList", fileInput.files[0]);

	util.postFileService("/sa010/uploadTest", formData, function(result) {
		console.log("result", result);

		if (result === "OK") {
			console.log("업로드 성공");
			parent.customPopup.hide();
		} else {
			console.log("업로드 실패!!!!!!!!!");
		}
	});*/

	/*$.ajax({
		type: "POST",
		url: "/sa010/uploadTest",
		processData: false,
		contentType: false,
		data: formData,
		success: function(result) {
			console.log("result", result);

			if (result === "OK") {
				alert("주문정보 업로드를 성공했습니다.");
				parent.customPopup.hide();
			} else {
				alert("주문정보 업로드를 실패했습니다.");
			}
		},
		err: function(err) {
			console.log("err:", err)
		}
	})*/
}
</script>
</head>
<body style="background-color:#fff;" onload="initPage();">
<%@include file="/jsp/common/title.jsp" %>
<form name="fname" style="position:absolute; left:10px; top: 50px; width: calc(100% - 24px); min-height: calc(100% - 72px);">
	<div class="dropzone" id="fileDropzone">
		<div class="dz-message needsclick">
			<span class="note needsclick">여기를 클릭 하거나 드래그&드랍으로 업로드할 수 있습니다.</span>
		</div>
		<div class="fallback">
			<input name="file" type="file" multiple>
		</div>
	</div>
</form>
<%@include file="/jsp/main/popup.jsp" %>
</body>
</html>