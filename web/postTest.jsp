<%@ page import="com.dexa.frame.util.Global" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="org.springframework.http.client.HttpComponentsClientHttpRequestFactory" %>
<%@ page import="org.springframework.web.client.RestTemplate" %>
<%@ page import="org.springframework.http.client.ClientHttpResponse" %>
<%@ page import="org.springframework.util.MultiValueMap" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="org.springframework.util.LinkedMultiValueMap" %>
<%@ page import="org.springframework.web.util.UriComponents" %>
<%@ page import="org.springframework.web.util.UriComponentsBuilder" %>
<%@ page import="org.springframework.http.*" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.io.OutputStreamWriter" %>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.InputStreamReader" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	request.setCharacterEncoding("utf-8");

	String url = "http://smbm-web.doosoun-erp.com:8900/SOLUTION/Sm/Tracking.asp";

	List<MultiValueMap<String, String>> body = new ArrayList<>();

	// 1. MultiValueMap 객체 생성
	MultiValueMap<String, String> param = new LinkedMultiValueMap<>();
	param.add("reference_no", "SS10100021220629862061");
	param.add("tracking_no", "111");
	body.add(param);

	postRequest(url, body);
%>
<%!
	public static List<HashMap<String, String>> postRequest(String url, List<MultiValueMap<String, String>> body) {
		// 0. 결과값을 담을 객체를 생성합니다.
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
		factory.setConnectTimeout(5000); // 타임아웃 설정 5초
		factory.setReadTimeout(5000); // 타임아웃 설정 5초

		// 2. RestTemplate 객체를 생성합니다.
		RestTemplate restTemplate = new RestTemplate(factory);
		restTemplate.getInterceptors().add((req, b, execution) -> {
			ClientHttpResponse res = execution.execute(req, b);
			res.getHeaders().setContentType(MediaType.APPLICATION_JSON);
			return res;
		});

		HttpHeaders header = new HttpHeaders();
		HttpEntity<List<MultiValueMap<String, String>>> entity = new HttpEntity<>(body, header);
		UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build(false);

		ResponseEntity<List> res = restTemplate.exchange(uri.toString(), HttpMethod.POST, entity, List.class);
		List<HashMap<String, String>> result = res.getBody();

		return result;
	}
%>