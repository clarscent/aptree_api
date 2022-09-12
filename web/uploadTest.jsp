<%@ page import="java.util.Enumeration" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.LinkedList" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="org.apache.poi.xssf.usermodel.XSSFWorkbook" %>
<%@ page import="com.dexa.frame.util.ExcelUtil" %>
<%@ page import="org.apache.poi.xssf.usermodel.XSSFSheet" %>
<%@ page import="org.apache.poi.xssf.usermodel.XSSFRow" %>
<%@ page import="org.mybatis.spring.SqlSessionTemplate" %>
<%@ page import="com.dexa.frame.helper.WebBeanHelper" %>
<%@ page import="java.util.List" %>
<%@ page import="org.apache.ibatis.session.SqlSession" %>
<%@ page import="org.apache.poi.ss.util.NumberToTextConverter" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%
	SqlSessionTemplate main = WebBeanHelper.getBean(application, "sqlSessionTmplMain", SqlSessionTemplate.class);

	HashMap<String, String> sqlParam = new HashMap<>();
	sqlParam.put("order_id", "20220801-00010");
	List<HashMap> list = main.selectList("SA010Mapper.selectPackages", sqlParam);

	System.out.println("list:" + list);

	String url = null;

	String uploadpath = request.getSession().getServletContext().getRealPath("/upload");;
	LinkedList<HashMap<String, String>> paramList = new LinkedList<>();
	System.out.println("uploadpath: "+ uploadpath);

	File file = new File(uploadpath + "/CelloSqaure_작업중.xlsx");

	//File file = new File(uploadpath + "/CelloSqaure_SM_업로드(EN)_220804.xlsx");

	System.out.println("!!!!!!!!!!!!!!!!!!!!!!!"+ file.exists());

	// xlsx 파일 스트림
	FileInputStream fis = new FileInputStream(file);

	XSSFWorkbook book = ExcelUtil.getWorkbook(fis);
	XSSFSheet sheet = book.getSheet("Upload Template");

	int rowCount = sheet.getPhysicalNumberOfRows();

	System.out.println("rowCount:" + rowCount);

	for (int i = 3; i < rowCount; i++) {
		// 첫번째 행은 헤더
		XSSFRow row = sheet.getRow(i);

		if (ExcelUtil.getCellValue(row, 0).equals("")) {
			continue;
		}

		HashMap<String, String> param = getRowData(row);
		paramList.add(param);

		//System.out.println(param);
	}

	LinkedList<HashMap<String, String>> orderList = new LinkedList<>();
	LinkedList<HashMap<String, String>> orderPackageList = new LinkedList<>();
	LinkedList<HashMap<String, String>> orderPackageItemList = new LinkedList<>();

	String order_id = "";
	String order_dt = "";
	int item_seq = 0;
	String isExist = "N";

	for (int i = 0; i < paramList.size(); i++) {
		HashMap<String, String> param = paramList.get(i);

		if (i > 0) {
			HashMap<String, String> prevParam = paramList.get(i - 1);

			if (prevParam.get("to_company_name").equals(param.get("to_company_name")) && prevParam.get("reference_no").equals(param.get("reference_no"))) {
				param.put("order_id", String.valueOf(order_id));

				if (prevParam.get("package_seq").equals(param.get("package_seq"))) {
					item_seq++;
					param.put("item_seq", String.valueOf(item_seq));
					orderPackageItemList.add(param);
				} else {
					item_seq = 1;
					param.put("item_seq", String.valueOf(item_seq));
					orderPackageList.add(param);
					orderPackageItemList.add(param);
				}
			} else {
				HashMap<String, String> result = checkOrder(main, param);
				isExist = result.get("IS_EXIST");

				if (isExist.equals("Y")) {
					order_id = result.get("ORDER_ID");
					order_dt = result.get("ORDER_DT");
				} else {
					order_id = getOrderId(main);
				}

				param.put("order_id", String.valueOf(order_id));
				param.put("is_exist", isExist);

				item_seq = 1;
				param.put("item_seq", String.valueOf(item_seq));

				orderList.add(param);
				orderPackageList.add(param);
				orderPackageItemList.add(param);
			}
		} else {
			HashMap<String, String> result = checkOrder(main, param);
			isExist = result.get("IS_EXIST");

			if (isExist.equals("Y")) {
				order_id = result.get("ORDER_ID");
				order_dt = result.get("ORDER_DT");
			} else {
				order_id = getOrderId(main);
			}

			param.put("order_id", String.valueOf(order_id));
			param.put("is_exist", isExist);

			item_seq = 1;
			param.put("item_seq", String.valueOf(item_seq));

			orderList.add(param);
			orderPackageList.add(param);
			orderPackageItemList.add(param);
		}
	}

	System.out.println("orderList:" + orderList.size());
	System.out.println("orderPackageList:" + orderPackageList.size());
	System.out.println("orderPackageItemList:" + orderPackageItemList.size());

	System.out.println("orderList:" + orderList);

	saveOrders(main, orderList, orderPackageList, orderPackageItemList);
%>
<%!
	static private HashMap<String, String> getRowData(XSSFRow row) {
		HashMap<String, String> param = new HashMap<>();

		param.put("to_company_name", ExcelUtil.getCellValue(row, 0));
		param.put("to_street1", ExcelUtil.getCellValue(row, 1));
		param.put("to_street2", ExcelUtil.getCellValue(row, 2));
		param.put("to_street3", ExcelUtil.getCellValue(row, 3));
		param.put("to_city", ExcelUtil.getCellValue(row, 4));
		param.put("to_state", ExcelUtil.getCellValue(row, 5));
		param.put("to_postal_code", ExcelUtil.getCellValue(row, 6));
		param.put("to_country", ExcelUtil.getCellValue(row, 7));
		param.put("to_receiver_vat_no", ExcelUtil.getCellValue(row, 8));
		param.put("to_contact_person", ExcelUtil.getCellValue(row, 9));
		param.put("to_country_calling_code", ExcelUtil.getCellValue(row, 10));
		param.put("to_phone", ExcelUtil.getCellValue(row, 11));
		param.put("to_phone2", ExcelUtil.getCellValue(row, 12));
		param.put("to_email", ExcelUtil.getCellValue(row, 13));
		param.put("to_company_nickname", ExcelUtil.getCellValue(row, 14));
		param.put("service_class", ExcelUtil.getCellValue(row, 15));
		param.put("inbound_outbound", ExcelUtil.getCellValue(row, 16));
		param.put("sales_channel", ExcelUtil.getCellValue(row, 17));
		param.put("reference_no", ExcelUtil.getCellValue(row, 18));
		param.put("goods_issue_no", ExcelUtil.getCellValue(row, 19));
		param.put("expected_pickup_date", ExcelUtil.getCellValue(row, 20));
		param.put("goods_description", ExcelUtil.getCellValue(row, 21));
		param.put("instruction", ExcelUtil.getCellValue(row, 22));
		param.put("sender_name", ExcelUtil.getCellValue(row, 23));
		param.put("sender_biz_reg_no", ExcelUtil.getCellValue(row, 24));
		param.put("inco_terms", ExcelUtil.getCellValue(row, 25));
		param.put("declaration_yn", ExcelUtil.getCellValue(row, 26));
		param.put("export_commodity_class", ExcelUtil.getCellValue(row, 27));
		param.put("weight_unit_code", ExcelUtil.getCellValue(row, 28));
		param.put("length_unit_code", ExcelUtil.getCellValue(row, 29));
		param.put("currency_code", ExcelUtil.getCellValue(row, 30));
		param.put("pickup_address", ExcelUtil.getCellValue(row, 31));
		param.put("square_party_id", ExcelUtil.getCellValue(row, 32));
		param.put("collecting_site_usage_yn", ExcelUtil.getCellValue(row, 33));
		param.put("warehousing_method", ExcelUtil.getCellValue(row, 34));
		param.put("warehousing_information", ExcelUtil.getCellValue(row, 35));
		param.put("requested_items", ExcelUtil.getCellValue(row, 36));
		param.put("package_seq", ExcelUtil.getCellValue(row, 37));
		param.put("commercial_yn", ExcelUtil.getCellValue(row, 38));
		param.put("package_remark", ExcelUtil.getCellValue(row, 39));
		param.put("weight", ExcelUtil.getCellValue(row, 40));
		param.put("width", ExcelUtil.getCellValue(row, 41));
		param.put("depth", ExcelUtil.getCellValue(row, 42));
		param.put("height", ExcelUtil.getCellValue(row, 43));
		param.put("article_category", ExcelUtil.getCellValue(row, 44));
		param.put("article_name", ExcelUtil.getCellValue(row, 45));
		param.put("article_url", ExcelUtil.getCellValue(row, 46));
		param.put("article_description", ExcelUtil.getCellValue(row, 47));
		param.put("article_local_description", ExcelUtil.getCellValue(row, 48));
		param.put("number_of_article", ExcelUtil.getCellValue(row, 49));
		param.put("hs_code", ExcelUtil.getCellValue(row, 50));
		param.put("sku_no", ExcelUtil.getCellValue(row, 51));
		param.put("item_model_nm", ExcelUtil.getCellValue(row, 52));
		param.put("options", ExcelUtil.getCellValue(row, 53));
		param.put("item_brand_nm", ExcelUtil.getCellValue(row, 54));
		param.put("item_orgn_nation_cd", ExcelUtil.getCellValue(row, 55));
		param.put("article_weight", ExcelUtil.getCellValue(row, 56).isEmpty() ? "0" : ExcelUtil.getCellValue(row, 56));
		param.put("invoice_value", ExcelUtil.getCellValue(row, 57));
		param.put("c_company_name", ExcelUtil.getCellValue(row, 58));
		param.put("c_street1", ExcelUtil.getCellValue(row, 59));
		param.put("c_street2", ExcelUtil.getCellValue(row, 60));
		param.put("c_street3", ExcelUtil.getCellValue(row, 61));
		param.put("c_city", ExcelUtil.getCellValue(row, 62));
		param.put("c_state", ExcelUtil.getCellValue(row, 63));
		param.put("c_postal_code", ExcelUtil.getCellValue(row, 64));
		param.put("c_country", ExcelUtil.getCellValue(row, 65));
		param.put("c_receiver_vat_no", ExcelUtil.getCellValue(row, 66));
		param.put("c_contact_person", ExcelUtil.getCellValue(row, 67));
		param.put("c_country_calling_code", ExcelUtil.getCellValue(row, 68));
		param.put("c_phone", ExcelUtil.getCellValue(row, 69));
		param.put("c_phone2", ExcelUtil.getCellValue(row, 70));
		param.put("c_email", ExcelUtil.getCellValue(row, 71));
		param.put("s_company_name", ExcelUtil.getCellValue(row, 72));
		param.put("s_address", ExcelUtil.getCellValue(row, 73));
		param.put("s_city", ExcelUtil.getCellValue(row, 74));
		param.put("s_state", ExcelUtil.getCellValue(row, 75));
		param.put("s_postal_code", ExcelUtil.getCellValue(row, 76));
		param.put("s_country", ExcelUtil.getCellValue(row, 77));
		param.put("s_contact_person", ExcelUtil.getCellValue(row, 78));
		param.put("s_country_calling_code", ExcelUtil.getCellValue(row, 79));
		param.put("s_phone_no", ExcelUtil.getCellValue(row, 80));
		param.put("s_email", ExcelUtil.getCellValue(row, 81));

		return param;
	}
%>

<%!
	static private String getOrderId(SqlSessionTemplate main) {
		HashMap<String, String> result = main.selectOne("InboundMapper" + ".selectOrderID");

		return result.get("ORDER_ID");
	}
%>
<%!
	static private HashMap<String, String> checkOrder(SqlSessionTemplate main, HashMap<String, String> param) {
		HashMap<String, String> result = main.selectOne("SA010Mapper" + ".checkOrder", param);

		return result;
	}
%>
<%!
	static private void saveOrders(SqlSessionTemplate main, LinkedList<HashMap<String, String>> orderList, LinkedList<HashMap<String, String>> orderPackageList, LinkedList<HashMap<String, String>> orderPackageItemList) {
		for (int i = 0; i < orderList.size(); i++) {
			HashMap<String, String> orderParam = orderList.get(i);

			if (orderList.get(i).get("is_exist").equals("Y")) {
				main.update("SA010Mapper" + ".updateOrder", orderParam);
				main.delete("SA010Mapper" + ".deletePackages", orderParam);
				main.delete("SA010Mapper" + ".deletePackageItems", orderParam);
			} else {
				main.insert("SA010Mapper" + ".insertOrder", orderParam);
			}

			for (int j = 0; j < orderPackageList.size(); j++) {
				HashMap<String, String> packageParam = orderPackageList.get(j);

				if (packageParam.get("order_id").equals(orderParam.get("order_id"))) {
					main.insert("SA010Mapper" + ".insertPackages", packageParam);
				}
			}

			for (int k = 0; k < orderPackageItemList.size(); k++) {
				HashMap<String, String> itemParam = orderPackageItemList.get(k);

				if (itemParam.get("order_id").equals(orderParam.get("order_id"))) {
					main.insert("SA010Mapper" + ".insertPackageItems", itemParam);
				}
			}
		}
	}
%>