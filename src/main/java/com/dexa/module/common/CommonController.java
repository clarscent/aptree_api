package com.dexa.module.common;

import com.dexa.module.base.BaseController;
import com.dexa.module.data.ResultList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@Slf4j
@CrossOrigin
@RestController
//@RequestMapping("/txhash")
public class CommonController extends BaseController {

	@Autowired
	CommonService service;

	@GetMapping("/comCode")
	public ResultList selectComCode(@RequestParam String grpCd) {
		HashMap<String, Object> param = new HashMap<>();
		param.put("GRP_CD", grpCd);

		ResultList list = service.selectComCode(param);

		return list;
	}

	@GetMapping("/mold")
	public ResultList selectMold(@RequestParam String grpCd, @RequestParam String prdcNo) {
		HashMap<String, Object> param = new HashMap<>();
		param.put("GRP_CD", grpCd);
		param.put("PRDC_NO", prdcNo);

		ResultList list = service.selectComCode(param);

		return list;
	}
}
