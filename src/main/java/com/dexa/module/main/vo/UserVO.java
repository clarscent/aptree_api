package com.dexa.module.main.vo;

import com.dexa.module.common.vo.DefaultVO;

public class UserVO extends DefaultVO {
	public String USR_ID;
	public String USR_NM;
	public String USR_PW;
	public String USR_GRP_CD;
	public String USR_GRP_NM;
	public String USR_CNT;
	public String USE_YN;
	public String RMK;
	public String USR_IP;
	public String STATE;
	public String LOGIN_USR_ID;

	public boolean USR_OK;

	public UserVO() {
		super();
	}

	public UserVO(boolean USR_OK) {
		this.USR_OK = USR_OK;
	}
}