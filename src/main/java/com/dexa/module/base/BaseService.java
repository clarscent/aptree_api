package com.dexa.module.base;

import com.dexa.module.data.Result;
import com.dexa.module.data.ResultList;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;

@Slf4j
@Service("baseService")
public class BaseService {
	@Autowired
	@Qualifier("sqlSessionTmplMain")
	protected SqlSessionTemplate main;
	protected String nameSpace;

	protected ResultList selectList(SqlSessionTemplate tmpl, String queryId) {
		ResultList resultList = new ResultList();

		tmpl.selectList(nameSpace + "." + queryId).forEach((item) -> {
			HashMap<String, Object> map = (HashMap<String, Object>) item;

			HashMap<String, Object> newMap = new HashMap<>();
			map.forEach((key, value) -> {
				newMap.put(key.toUpperCase(Locale.ROOT), value);
			});

			resultList.add(newMap);
		});

		return resultList;
	}

	protected ResultList selectList(SqlSessionTemplate tmpl, String queryId, HashMap<String, Object> param) {
		ResultList resultList = new ResultList();

		param.put("CMPN_CD", "01");

		tmpl.selectList(nameSpace + "." + queryId, param).forEach((item) -> {
			HashMap<String, Object> map = (HashMap<String, Object>) item;

			HashMap<String, Object> newMap = new HashMap<>();
			map.forEach((key, value) -> {
				newMap.put(key.toUpperCase(Locale.ROOT), value);
			});

			resultList.add(newMap);
		});

		return resultList;
	}

	protected Result insert(SqlSessionTemplate tmpl, String queryId, HashMap<String, Object> param) {
		Result result;

		try {
			param.put("CMPN_CD", "01");

			tmpl.insert(nameSpace + "." + queryId, param);
			result = new Result();
		} catch (Exception e) {
			log.error(e.getMessage());
			result = new Result("99", "에러");
		}

		return result;
	}

	protected Result insert(SqlSessionTemplate tmpl, String queryId, List<HashMap<String, Object>> paramList) {
		Result result;

		try {
			paramList.forEach(param -> {
				param.put("CMPN_CD", "01");

				tmpl.insert(nameSpace + "." + queryId, param);
			});

			result = new Result();
		} catch (Exception e) {
			log.error(e.getMessage());
			result = new Result("99", "에러");
		}

		return result;
	}

	protected Result delete(SqlSessionTemplate tmpl, String queryId, HashMap<String, Object> param) {
		Result result;

		try {
			param.put("CMPN_CD", "01");
			tmpl.delete(nameSpace + "." + queryId, param);
			result = new Result();
		} catch (Exception e) {
			log.error(e.getMessage());
			result = new Result("99", "에러");
		}

		return result;
	}

	protected Result delete(SqlSessionTemplate tmpl, String queryId, List<HashMap<String, Object>> paramList) {
		Result result;

		try {
			paramList.forEach(param -> {
				param.put("CMPN_CD", "01");
				tmpl.delete(nameSpace + "." + queryId, param);
			});

			result = new Result();
		} catch (Exception e) {
			log.error(e.getMessage());
			result = new Result("99", "에러");
		}

		return result;
	}
}
