package com.dexa.module.api.service;

import com.dexa.frame.database.Trans;
import com.dexa.module.base.BaseService;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedList;

@Service("inboundService")
public class ParkingService extends BaseService {
	public ParkingService() {
		super();

		nameSpace = "InboundMapper";
	}

	public String checkApiKey(HashMap<String, String> param) throws BadSqlGrammarException {
		HashMap<String, String> result = main.selectOne(nameSpace + ".checkApiKey", param);

		return result.get("auth_yn");
	}

	public String getOrderID() throws BadSqlGrammarException {
		HashMap<String, String> result = main.selectOne(nameSpace + ".selectOrderID");

		return result.get("ORDER_ID");
	}

	@Trans
	public void insertOrders(HashMap<String, Object> order, LinkedList<HashMap<String, Object>> packages, LinkedList<HashMap<String, Object>> items) throws BadSqlGrammarException {
		main.insert(nameSpace + ".insertOrder", order);

		for (HashMap<String, Object> pack : packages) {
			main.insert(nameSpace + ".insertPackages", pack);
		}

		for (HashMap<String, Object> item : items) {
			main.insert(nameSpace + ".insertPackageItems", item);
		}
	}
	
	@Trans
	public void updateOrder(HashMap<String, Object> order, LinkedList<HashMap<String, Object>> packages, LinkedList<HashMap<String, Object>> items) throws BadSqlGrammarException {
		main.update(nameSpace + ".updateOrder", order);

		for (HashMap<String, Object> pack : packages) {
			main.update(nameSpace + ".updatePackages", pack);
		}

		for (HashMap<String, Object> item : items) {
			main.update(nameSpace + ".updatePackageItems", item);
		}
	}
	
	@Trans
	public void deleteOrder(HashMap<String, String> param) throws BadSqlGrammarException {
		main.delete(nameSpace + ".deleteOrder", param);
		main.delete(nameSpace + ".deletePackages", param);
		main.delete(nameSpace + ".deletePackageItems", param);
	}
}
