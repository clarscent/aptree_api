package com.dexa.module.main.service;

import com.dexa.module.base.BaseService;
import com.dexa.module.main.vo.ProgramVO;
import com.dexa.module.main.vo.UserVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Slf4j
@Service("mainService")
public class MainService extends BaseService {
	public MainService() {
		super();
		nameSpace = "MainMapper";
	}

	// 사용자정보 조회
	public UserVO selectLoginUser(UserVO user) throws BadSqlGrammarException {
		HashMap<String, String> param = new HashMap<>();
		param.put("USR_ID", user.USR_ID);
		param.put("USR_PW", user.USR_PW);

		user = main.selectOne(nameSpace + ".selecUserInfo", param);

		return user;
	}

	// 사용자 메뉴 목록
	public List<ProgramVO> selectMenuList(String programId) throws BadSqlGrammarException {
		HashMap<String, String> param = new HashMap<>();
		param.put("PGM_ID", programId);

		List<ProgramVO> list = main.selectList(nameSpace + ".selectMenuList", param);

		return list;
	}
}