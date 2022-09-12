<%@ page import="com.dexa.module.main.vo.UserVO" %>
<%@page language="java" pageEncoding="utf-8"%>
<%
	String USR_ID = "";
	String USR_NM = "";
	String DEALER_CD = "";
	String AUTH_GRPCD = "";
	String USER_TYPECD = "";
	String USR_IP = "";

	boolean DEBUG_MODE = false;

	/* if (request.getServerName().equals("localhost")) {
		DEBUG_MODE = true;
	} */

	String envSession = System.getProperty("env");

	if ("dev".equals(envSession)) {
		DEBUG_MODE = true;
	}

	UserVO USER_DATA = (UserVO) session.getAttribute("loginInfo");
	String errorPage = "/loginPage.do";
	
	if (USER_DATA == null && DEBUG_MODE) {
		USR_ID = "999999";
		USR_NM = "테스트";
		USR_IP = request.getRemoteAddr();
		
		USER_DATA = new UserVO();
		USER_DATA.USR_ID = USR_ID;
		USER_DATA.USR_NM = USR_NM;
		USER_DATA.USR_IP = USR_IP;
		
		session.setAttribute("loginInfo", USER_DATA);
		session.setMaxInactiveInterval(60 * 60 * 24); // 세션 타임아웃 24시간 */
	} else if (USER_DATA == null) {// 세션이 널일때
%>
<script>
top.document.location = "<%=errorPage%>";
</script>
<%
		return;
	} else {
		USR_ID = USER_DATA.USR_ID;
		USR_NM = USER_DATA.USR_NM;
		USR_IP = request.getRemoteAddr();
	}
%>
<script>
var USER_INFO = {
	USR_ID : "<%=USR_ID%>",
	USR_NM : "<%=USR_NM%>",
	USR_IP : "<%=USR_IP%>"
}
</script>