<%@page import="java.util.Enumeration"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="org.springframework.web.context.WebApplicationContext"%>
<%@page language="java" pageEncoding="utf-8"%>
<%
	request.setCharacterEncoding("utf-8");
%>
<div id="titleArea" style="position:absolute; width:100%; height:38px; background-color:#e6e6e6; border-bottom:1px solid #d8d8d8;">
	<div id="naviArea" style="position:absolute; left:12px; top:12px; color:#333333;"><%=programPathName%><span style="font-weight:bold; color:#3da3ef;"><%=programName%></span></div>
	<div class="buttonArea" style="position:absolute; right:12px; top:7px;">
		<button onclick="top.btnMenu(this);" id="init" style="display:<%="Y".equals(programButtonData.get("INIT")) ? "" : "none"%>" >초기화</button>
		<button onclick="top.btnMenu(this);" id="new" style="display:<%="Y".equals(programButtonData.get("NEW")) ? "" : "none"%>" >신규</button>
		<button onclick="top.btnMenu(this);" id="search" style="display:<%="Y".equals(programButtonData.get("SEARCH")) ? "" : "none"%>" >조회</button>
		<button onclick="top.btnMenu(this);" id="save" style="display:<%="Y".equals(programButtonData.get("SAVE")) ? "" : "none"%>" >저장</button>
		<button onclick="top.btnMenu(this);" id="del" style="display:<%="Y".equals(programButtonData.get("DEL")) ? "" : "none"%>" >삭제</button>
		<button onclick="top.btnMenu(this);" id="calc" style="display:<%="Y".equals(programButtonData.get("CALC")) ? "" : "none"%>" >계산</button>
		<button onclick="top.btnMenu(this);" id="calc_cancel" style="display:<%="Y".equals(programButtonData.get("CALC_CANCEL")) ? "" : "none"%>" >계산취소</button>
		<button onclick="top.btnMenu(this);" id="reCalc" style="display:<%="Y".equals(programButtonData.get("RECALC")) ? "" : "none"%>" >재계산</button>
		<button onclick="top.btnMenu(this);" id="reCalc_cancel" style="display:<%="Y".equals(programButtonData.get("RECALC_CANCEL")) ? "" : "none"%>" >재계산취소</button>
		<button onclick="top.btnMenu(this);" id="copy" style="display:<%="Y".equals(programButtonData.get("COPY")) ? "" : "none"%>" >복사</button>
		<button onclick="top.btnMenu(this);" id="confirm" style="display:<%="Y".equals(programButtonData.get("CONFIRM")) ? "" : "none"%>" >확정</button>
		<button onclick="top.btnMenu(this);" id="confirm_cancel" style="display:<%="Y".equals(programButtonData.get("CONFIRM_CANCEL")) ? "" : "none"%>" >확정취소</button>
		<button onclick="top.btnMenu(this);" id="apply" style="display:<%="Y".equals(programButtonData.get("APPLY")) ? "" : "none"%>" >적용</button>
		<button onclick="top.btnMenu(this);" id="close" style="display:<%="Y".equals(programButtonData.get("CLOSE")) ? "" : "none"%>" >닫기</button>
		<button onclick="top.btnMenu(this);" id="renew" style="display:<%="Y".equals(programButtonData.get("RENEW")) ? "" : "none"%>" >재생성</button>
		<button onclick="top.btnMenu(this);" id="yearMarginRate" style="display:<%="Y".equals(programButtonData.get("YEAR_MARGIN_RATE")) ? "" : "none"%>" >년 Margin Rate</button>
		<button onclick="top.btnMenu(this);" id="fileAttach" style="display:<%="Y".equals(programButtonData.get("FILE_ATTACH")) ? "" : "none"%>" >파일첨부</button>
		<button onclick="top.btnMenu(this);" id="excelUpload" style="display:<%="Y".equals(programButtonData.get("EXCEL_UPLOAD")) ? "" : "none"%>" >엑셀업로드</button>
		<button onclick="top.btnMenu(this);" id="excelDown" style="display:<%="Y".equals(programButtonData.get("EXCEL_DOWN")) ? "" : "none"%>" >엑셀다운로드</button>
		<button onclick="top.btnMenu(this);" id="tracking" style="display:<%="Y".equals(programButtonData.get("TRACKING")) ? "" : "none"%>" >송장업로드</button>
	</div>
</div>