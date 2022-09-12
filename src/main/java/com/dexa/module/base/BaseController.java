package com.dexa.module.base;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * 시스템 공통 controller
 */
@Slf4j
@CrossOrigin
public class BaseController {
	//protected UserVO loginUserInfo;

	@Autowired
	protected HttpServletRequest context;

	@Autowired
	@Qualifier("transactionManager")
	PlatformTransactionManager tm;

	private boolean DEBUG_MODE = false;

	public BaseController() {
		super();
	}

	protected void setLoginUserInfo() {
		System.out.println("setLoginUserInfo");
		if (context != null) {
			HttpSession session = context.getSession();

			if (session != null) {
				//loginUserInfo = (UserVO) session.getAttribute("userInfoPlatform");
			}
		}
	}
}