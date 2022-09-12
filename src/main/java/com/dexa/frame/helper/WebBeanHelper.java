package com.dexa.frame.helper;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContext;

public class WebBeanHelper {
	public void WebBeanHeler() {

	}

	public static <T> T getBean(ServletContext ac, String beanName, Class<T> resultType) {
		WebApplicationContext context = WebApplicationContextUtils.getRequiredWebApplicationContext(ac);
		T bean = (T) context.getBean(beanName);

		return bean;
	}
}
