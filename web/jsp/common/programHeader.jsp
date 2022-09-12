<%@page import="org.apache.log4j.LogManager"%>
<%@page import="org.apache.log4j.Logger"%>
<%@ page import="com.dexa.frame.util.Global" %>
<%@page language="java" pageEncoding="utf-8"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	WebApplicationContext context = WebApplicationContextUtils.getRequiredWebApplicationContext(application);

	request.setCharacterEncoding("utf-8");

	Logger logger = LogManager.getLogger("JSP");

	String programId = Global.checkNullString(request.getParameter("programId"), "");
	String programName = Global.checkNullString(request.getParameter("programName"), "");
	String programPathName = Global.checkNullString(request.getParameter("programPathName"), "");

	if (programPathName.length() > 0 && programPathName.lastIndexOf(">") > 0) {
		programPathName = programPathName.substring(0, programPathName.lastIndexOf(">") + 2);
	}
%>