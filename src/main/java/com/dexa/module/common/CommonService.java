package com.dexa.module.common;

import com.dexa.module.base.BaseService;
import com.dexa.module.data.ResultList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Slf4j
@Service
public class CommonService extends BaseService {
	public CommonService() {
		this.nameSpace = "CommonMapper";
	}

	public ResultList selectComCode(HashMap<String, Object> param) throws BadSqlGrammarException {
		ResultList list;

		if ("ACNT".equals((String) param.get("GRP_CD"))) {
			list = selectList(main, "selectAccount"); // 거래처
		} else if ("FCTR".equals((String) param.get("GRP_CD"))) {
			list = selectList(main, "selectFactory"); // 공장
		} else if ("WHRS".equals((String) param.get("GRP_CD"))) {
			list = selectList(main, "selectWarehouse"); // 창고
		} else if ("PRDC".equals((String) param.get("GRP_CD"))) {
			list = selectList(main, "selectProduct"); // 제품
		} else if ("USER".equals((String) param.get("GRP_CD"))) {
			list = selectList(main, "selectUser"); // 사용자
		} else if ("FCLT".equals((String) param.get("GRP_CD"))) {
			list = selectList(main, "selectFclt"); // 사용자
		} else if ("MOLD".equals((String) param.get("GRP_CD"))) {
			list = selectList(main, "selectMold", param); // 사용자
		} else {
			list = selectList(main, "selectComCode", param); // 공통코드
		}

		return list;
	}
}
