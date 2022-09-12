package com.dexa.module.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Component
public class BaseInterceptor implements HandlerInterceptor {
	//  인증 체크가 필요 없는 URL 리스트
	private Logger logger;
	List<String> urls = new ArrayList<>();

	public void setUrls(List urls) {
		this.urls = urls;
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		logger = LoggerFactory.getLogger(this.getClass());
		logger.info("handler Interceptor!!!");
		System.out.println(handler);

		BaseAttribute baseAttr = new BaseAttribute();

		request.setAttribute("attr", baseAttr);

		// 기능을 수행하고 Controller를 실행 하려면
		// return true;

		// 특정 체크에서 일치하지 않는다면
		// response.sendRedirect("특정 에러 페이지로 보낸다");
		// return false;

		// 인증 체크가 필요 없는 URL 체크
		for (int i = 0; i < urls.size(); i++) {
			if (request.getRequestURI().matches(urls.get(i))) {
				System.out.println("== 인증 체크가 필요 없는 URL ============================");
				System.out.println("== URL : " + urls.get(i) + " ============================");
				System.out.println("== return true ============================");
				System.out.println("== 인터셉터 종료 ============================");
				return true;
			}

			// 첫페이지가 로그인 페이지일 경우
			// 첫페이지 jsession때문에 request.getRequestURI().indexOf("/login/login.do") != -1 사용
			if (request.getRequestURI().indexOf(urls.get(i)) != -1) {
				return true;
			}
		}

		// 세션이 있는지 체크
		// 세션에 로그인한 정보가 있는지 체크
		return true;
	}
}