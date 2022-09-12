<%@ page import="java.util.Enumeration" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%
	request.setCharacterEncoding("utf-8");
	String mainPage = "/mainPage.do";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>삼영물류</title>
<link rel="stylesheet" href="/lib/jquery-ui/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="/css/main.css" type="text/css" />
<script type="text/javascript" src="/lib/jquery/jquery-2.1.4.js"></script>
<script type="text/javascript" src="/lib/jquery-ui/jquery-ui.js"></script>
<script type="text/javascript" src="/js/lodash.min.js"></script>
<script type="text/javascript" src="/js/util.js"></script>
<style>
body {
	background-color: #f0f0f0;
	width: 100%;
	height: 100%;
}

#loginContainer {
	position: absolute;
	top: calc(50% - 158px);
	left: calc(50% - 200px);
	width: 400px;
	height: 315px;
	margin: 0 auto;
	text-align: center;
}

#loginTitle {
	text-align: center;
	font-weight: 500;
	font-size: 30px;
	margin-bottom: 43px;
}

#userId, #userPw, #btnLogin {
	font-size: 18px;
	width: 300px;
	height: 30px;
	margin-bottom: 20px;
	padding: 20px;
	border: 1px solid #CCCCCC;
}

input::placeholder {
	font-size: 18px;
	color: #aaaaaa;
}

#btnLogin {
	font-size: 20px;
	color: #fff;
	background-color: #008CE5;
	outline: 0;
	width: 346px;
	height: 60px;
	margin-bottom: 20px;
	padding: 20px;
	border: 1px solid #CCCCCC;
	cursor: pointer;
}
</style>
<script type="text/javascript">
	$(document).ready(function () {
		initPage();

		$("#btnLogin").click(function () {
			onLogin();
		});
	});

	function initPage() {
		$("#userId").focus();

		$("#userId").on("keydown", function(evt){
			if (evt.keyCode == 13) {
				$pw.focus();
			}
		});

		$("#userPw").on("keydown", function(evt){
			if (evt.keyCode == 13) {
				onLogin();
			}
		});

		$("#btnLogin").on("click", function() {
			onLogin();
		});
	}

	function onLogin() {
		if (!checkValidation()) {
			return;
		}

		var param = {
			USR_ID : $("#userId").val(),
			USR_PW : $("#userPw").val()
		};

		util.postService("/loginProcess", param, function(result) {
			console.log("loginProcess", result);

			if (result["USR_OK"]) {
				$(location).attr("href", "<%=mainPage%>");
			} else {
				alert("로그인 정보를 확인하세요");
				$id.focus();
				$id.select();
				$pw.val("");
			}
		}, true);
	}

	function checkValidation() {
		var $id = $("#userId");
		var $pw = $("#userPw");

		if ($id.val() === "") {
			alert("아이디를 입력하세요.");
			$id.focus();
			return false;
		}

		if ($pw.val() === "") {
			alert("비밀번호를 입력하세요.");
			$pw.focus();
			return false;
		}

		return true;
	}
</script>
</head>
<body>
<div id="loginContainer">
	<h1 id="loginTitle">삼영물류</h1>
	<input id="userId" type="text" style="" placeholder="아이디" />
	<input id="userPw" type="password" style="" placeholder="비밀번호" autocomplete="off" />
	<button id="btnLogin">로그인</button>
</div>
</body>
</html>