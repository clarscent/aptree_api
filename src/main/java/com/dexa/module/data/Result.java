package com.dexa.module.data;

public class Result {
	public String RESULT_CODE = "99";
	public String RESULT_MSG = "";
	public Result() {
		super();
		this.RESULT_CODE = "00";
		this.RESULT_MSG = "성공";
	}

	public Result(String resultCode, String resultMsg) {
		this.RESULT_CODE = resultCode;
		this.RESULT_MSG = resultMsg;
	}
}