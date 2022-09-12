package com.dexa.module.common.vo;

public class ResultVO extends DefaultVO {
	public ResultVO() {
		super();
	}

	public ResultVO(String cd, String msg) {
		super();

		setResultCode(cd);
		setResultMsg(msg);
	}
}

