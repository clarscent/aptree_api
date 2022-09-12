package com.dexa.module.api.controller;

import com.dexa.frame.util.Constants;
import com.dexa.module.api.service.ParkingService;
import com.dexa.module.api.vo.*;
import com.dexa.module.base.BaseController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@Slf4j
@CrossOrigin
@RestController
public class ParkingController extends BaseController {
	@Autowired
	private ParkingService parkingService;

	public ParkingController() {
		super();
	}

	// API 보안 키 처리
	private boolean checkApiKey(String CompanyCode, String ApiKey) {
		boolean isAuth = false;

		try {
			HashMap<String, String> param = new HashMap<>();
			param.put("CompanyCode", CompanyCode);
			param.put("ApiKey", ApiKey);

			String result = parkingService.checkApiKey(param);

			if (result.equals("Y")) {
				isAuth = true;
			}
		} catch (Exception e) {
			log.error(Constants.ERROR_CON, e);
		}

		return isAuth;
	}

	// 방문 차량 등록
	@RequestMapping(value = "/parking", method = RequestMethod.POST)
	public HashMap<String, String> regParking(@RequestBody ParkingVO parking, @RequestHeader("CompanyCode") String CompanyCode, @RequestHeader("ApiKey") String ApiKey) {
		log.info("CompanyCode:" + CompanyCode + "!!!!");
		log.info("ApiKey:" + ApiKey + "ApiKey");

		int success_count = 0;
		int fail_count = 0;

		boolean isAuth = checkApiKey(CompanyCode, ApiKey);

		HashMap<String, String> result = new HashMap<>();

		if (!isAuth) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}

		try {
			String url = "http://1.221.230.91:9935/exvs";

			MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

			body.add("carno", parking.carno);
			body.add("usebgndt", parking.usebgndt);
			body.add("useenddt", parking.useenddt);
			body.add("msg", parking.msg);
			body.add("shopid", parking.shopid);

			result = this.postRequest(url, body);

		} catch (Exception e) {
			log.error(Constants.ERROR_CON, e);
			throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED);
		}

		return result;
	}

	// 방문 차량 조회
	@RequestMapping(value = "/parking", method = RequestMethod.POST)
	public HashMap<String, String> findParking(@RequestBody ParkingVO parking, @RequestHeader("CompanyCode") String CompanyCode, @RequestHeader("ApiKey") String ApiKey) {
		log.info("CompanyCode:" + CompanyCode + "!!!!");
		log.info("ApiKey:" + ApiKey + "ApiKey");

		int success_count = 0;
		int fail_count = 0;

		boolean isAuth = checkApiKey(CompanyCode, ApiKey);

		HashMap<String, String> result = new HashMap<>();

		if (!isAuth) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}

		try {
			String url = "http://1.221.230.91:9935/getexvs";

			MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

			body.add("carno", parking.carno);
			body.add("usebgndt", parking.usebgndt);
			body.add("useenddt", parking.useenddt);
			body.add("msg", parking.msg);
			body.add("shopid", parking.shopid);

			result = this.postRequest(url, body);

		} catch (Exception e) {
			log.error(Constants.ERROR_CON, e);
			throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED);
		}

		return result;
	}

	public List<HashMap<String, String>> postRequest(String url, List<MultiValueMap<String, String>> body) {

		// 0. 결과값을 담을 객체를 생성합니다.
		List<HashMap<String, String>> result = new LinkedList<>();

		try {
			HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
			factory.setConnectTimeout(5000); // 타임아웃 설정 5초
			factory.setReadTimeout(5000); // 타임아웃 설정 5초

			// 2. RestTemplate 객체를 생성합니다.
			RestTemplate restTemplate = new RestTemplate(factory);
			restTemplate.getInterceptors().add((req, b, execution) -> {
				ClientHttpResponse res = execution.execute(req, b);
				res.getHeaders().setContentType(MediaType.APPLICATION_JSON);
				return res;
			});

			HttpHeaders header = new HttpHeaders();
			HttpEntity<List<MultiValueMap<String, String>>> entity = new HttpEntity<>(body, header);
			UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build(false);

			ResponseEntity<List> res = restTemplate.exchange(uri.toString(), HttpMethod.POST, entity, List.class);
			result = res.getBody();

			log.info("[POST REQUEST] URL: " + url);
			log.info("[POST REQUEST] RESULT: " + result);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	public HashMap<String, String> postRequest(String url, MultiValueMap<String, String> body) {

		// 0. 결과값을 담을 객체를 생성합니다.
		HashMap<String, String> result = new HashMap<>();

		try {
			HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
			factory.setConnectTimeout(5000); // 타임아웃 설정 5초
			factory.setReadTimeout(5000); // 타임아웃 설정 5초

			// 2. RestTemplate 객체를 생성합니다.
			RestTemplate restTemplate = new RestTemplate(factory);
			restTemplate.getInterceptors().add((req, b, execution) -> {
				ClientHttpResponse res = execution.execute(req, b);
				res.getHeaders().setContentType(MediaType.APPLICATION_JSON);
				return res;
			});

			HttpHeaders header = new HttpHeaders();
			HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, header);
			UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build(false);

			ResponseEntity<HashMap> res = restTemplate.exchange(uri.toString(), HttpMethod.POST, entity, HashMap.class);
			result = res.getBody();

			log.info("[POST REQUEST] URL: " + url);
			log.info("[POST REQUEST] RESULT: " + result);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}
}
