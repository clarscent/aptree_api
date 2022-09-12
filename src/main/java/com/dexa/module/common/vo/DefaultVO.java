package com.dexa.module.common.vo;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.io.Serializable;

public class DefaultVO implements Serializable {
	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public String RESULT_CODE = "00"; // 00:성공, 99:Expcetion, 01:실패, 02:실패2, 03:실패3, 04:실패4
	public String RESULT_MSG = "OK"; // OK:성고, 기타 메시지
	public String STATE;

	public String getResultCode() {
		return RESULT_CODE;
	}

	public void setResultCode(String RESULT_CODE) {
		this.RESULT_CODE = RESULT_CODE;
	}

	public String getResultMsg() {
		return RESULT_MSG;
	}

	public void setResultMsg(String RESULT_MSG) {
		this.RESULT_MSG = RESULT_MSG;
	}
}
