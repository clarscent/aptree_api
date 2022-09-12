package com.dexa.module.common.vo;

import com.dexa.module.main.vo.UserVO;

public class UserLogVO extends DefaultVO {
	public String ORGA_CD;
	public String LOG_DATE;
	public String LOG_TIME;
	public String USR_ID;
	public String USR_NM;
	public String LOG_IP;
	public String LOG_TYPE;
	public String LOG_TYPE_NM;
	public String LOG_CONT;
	public String RMK;
	public String STATE;
	public String USR_IP;
	public String LOGIN_USR_ID;

	public boolean USR_OK;

	public UserLogVO() {
		super();
	}

	public UserLogVO(UserVO loginUserInfo, String LOG_TYPE, String LOG_CONT) {
		/*
		01	로그인
		02	로그아웃
		03	조회
		04	저장
		05	삭제
		06	출력
		07	이미지저장
		08	클립보드복사
		99	기타
		*/

		this.USR_ID = loginUserInfo.USR_ID;
		this.LOG_IP = loginUserInfo.USR_IP;
		this.USR_IP = loginUserInfo.USR_IP;
		this.LOG_TYPE = LOG_TYPE;
		this.LOG_CONT = LOG_CONT;
	}
}