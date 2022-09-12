<%@ page import="java.io.File" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="org.apache.poi.xssf.usermodel.XSSFWorkbook" %>
<%@ page import="com.dexa.frame.util.ExcelUtil" %>
<%@ page import="org.apache.poi.xssf.usermodel.XSSFSheet" %>
<%@ page import="org.apache.poi.xssf.usermodel.XSSFRow" %>
<%@ page import="org.mybatis.spring.SqlSessionTemplate" %>
<%@ page import="com.dexa.frame.helper.WebBeanHelper" %>
<%@ page import="org.apache.poi.ss.usermodel.Sheet" %>
<%@ page import="org.apache.poi.ss.usermodel.Row" %>
<%@ page import="org.apache.poi.ss.usermodel.Cell" %>
<%@ page import="java.time.LocalDate" %>
<%@ page import="java.io.FileOutputStream" %>
<%@ page import="java.util.*" %>
<%@ page import="org.apache.poi.ss.util.CellRangeAddress" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%
	SqlSessionTemplate main = WebBeanHelper.getBean(application, "sqlSessionTmplMain", SqlSessionTemplate.class);

	List<LinkedHashMap<String, String>> list = excelList(main);

	System.out.println(list.size());

	XSSFWorkbook workbook = new XSSFWorkbook();
	Sheet sheet = workbook.createSheet("Upload Template");

	Row headerRow = sheet.createRow(0);
	headerRow.createCell(0).setCellValue("Delivery Information");
	headerRow.createCell(15).setCellValue("Order Information");
	headerRow.createCell(33).setCellValue("집하정보");
	headerRow.createCell(37).setCellValue("Package(Box)");
	headerRow.createCell(44).setCellValue("Article (Item, Good)");
	headerRow.createCell(58).setCellValue("Receiver's Information(Optional)");
	headerRow.createCell(72).setCellValue("Seller Information");

	sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 14));
	sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 32));
	sheet.addMergedRegion(new CellRangeAddress(0, 0, 33, 36));
	sheet.addMergedRegion(new CellRangeAddress(0, 0, 37, 43));
	sheet.addMergedRegion(new CellRangeAddress(0, 0, 44, 57));
	sheet.addMergedRegion(new CellRangeAddress(0, 0, 58, 71));
	sheet.addMergedRegion(new CellRangeAddress(0, 0, 72, 81));

	Row headerRow2 = sheet.createRow(1);
	headerRow2.createCell(0).setCellValue("Company Name *(Char 35)");
	headerRow2.createCell(1).setCellValue("Address 1 * (Char 200)");
	headerRow2.createCell(2).setCellValue("Address 2(Char 35)");
	headerRow2.createCell(3).setCellValue("Address 3(Char 35)");
	headerRow2.createCell(4).setCellValue("City(or Town)(Char 30)");
	headerRow2.createCell(5).setCellValue("State(Char 30)");
	headerRow2.createCell(6).setCellValue("Postal code *(Char 9)");
	headerRow2.createCell(7).setCellValue("Country *(Choice)");
	headerRow2.createCell(8).setCellValue("Receiver VAT No.(Char 20)");
	headerRow2.createCell(9).setCellValue("Contact Person *(Char 30)");
	headerRow2.createCell(10).setCellValue("Country Calling Code(Number 7)");
	headerRow2.createCell(11).setCellValue("Phone No *(Number 11)(Except Country Calling Code, Digit Only)");
	headerRow2.createCell(12).setCellValue("Additional Phone No(Number 11)(Except Country Calling Code, Digit Only)");
	headerRow2.createCell(13).setCellValue("Email(Char 50)");
	headerRow2.createCell(14).setCellValue("Company Nickname(Char 50)");
	headerRow2.createCell(15).setCellValue("Service Class(Choice)");
	headerRow2.createCell(16).setCellValue("Inbound/Outbound(Choice)");
	headerRow2.createCell(17).setCellValue("Sales Channel(Char 50)");
	headerRow2.createCell(18).setCellValue("Reference No *(Char 30)");
	headerRow2.createCell(19).setCellValue("Goods Issue No(Char 50)");
	headerRow2.createCell(20).setCellValue("Expected Pickup Date (Char 8)");
	headerRow2.createCell(21).setCellValue("Goods Description *(Char 35)");
	headerRow2.createCell(22).setCellValue("Instruction (Remark)(Char 1000)");
	headerRow2.createCell(23).setCellValue("Sender Name(Char 25)");
	headerRow2.createCell(24).setCellValue("Sender Biz Reg No(Char 20)");
	headerRow2.createCell(25).setCellValue("INCO terms(Choice)");
	headerRow2.createCell(26).setCellValue("Import/Export Declaration Y/N(Choice)");
	headerRow2.createCell(27).setCellValue("Export Commodity Classification(Choice)");
	headerRow2.createCell(28).setCellValue("Weight Unit Code(Choice)");
	headerRow2.createCell(29).setCellValue("Length Unit Code(Choice)");
	headerRow2.createCell(30).setCellValue("Currency Code(Choice)");
	headerRow2.createCell(31).setCellValue("Pickup Address(Char 50)");
	headerRow2.createCell(32).setCellValue(" Square Party ID (Char 85)");
	headerRow2.createCell(33).setCellValue("집하지 이용 여부 *(Choice)");
	headerRow2.createCell(34).setCellValue("입고수단(Choice)");
	headerRow2.createCell(35).setCellValue("입고정보(국내송장/용차시각 등)(char 20)");
	headerRow2.createCell(36).setCellValue("작업요청사항(char 1000)");
	headerRow2.createCell(37).setCellValue("Package Sequence *(Number)");
	headerRow2.createCell(38).setCellValue("Commercial Y/N(Choice)");
	headerRow2.createCell(39).setCellValue("Package Remark(Char 1000)");
	headerRow2.createCell(40).setCellValue("Weight(Number)");
	headerRow2.createCell(41).setCellValue("Width(Number)");
	headerRow2.createCell(42).setCellValue("Depth(Number)");
	headerRow2.createCell(43).setCellValue("Height(Number)");
	headerRow2.createCell(44).setCellValue("Article Category(Char 100)");
	headerRow2.createCell(45).setCellValue("Article Name(Char 35)");
	headerRow2.createCell(46).setCellValue("Article URL(Char 200)");
	headerRow2.createCell(47).setCellValue("Article Description *(Char 100)");
	headerRow2.createCell(48).setCellValue("Article Local Description(Char 1000)");
	headerRow2.createCell(49).setCellValue("Number of Article *(Number)");
	headerRow2.createCell(50).setCellValue("HS Code *(Char 12)");
	headerRow2.createCell(51).setCellValue("SKU No(Char 50)");
	headerRow2.createCell(52).setCellValue("Model Name(Char 20)");
	headerRow2.createCell(53).setCellValue("Options(Char 100)");
	headerRow2.createCell(54).setCellValue("Brand Name(Char 100)");
	headerRow2.createCell(55).setCellValue("Origin Country(Choice)");
	headerRow2.createCell(56).setCellValue("Article Weight (Number)");
	headerRow2.createCell(57).setCellValue("Invoice Value *(Number)");
	headerRow2.createCell(58).setCellValue("Company Name(Char 35)");
	headerRow2.createCell(59).setCellValue("Address 1(Char 30)");
	headerRow2.createCell(60).setCellValue("Address 2(Char 35)");
	headerRow2.createCell(61).setCellValue("Address 3(Char 35)");
	headerRow2.createCell(62).setCellValue("City (or Town) (Char 30)");
	headerRow2.createCell(63).setCellValue("State(Char 30)");
	headerRow2.createCell(64).setCellValue("Postal code(Char 9)");
	headerRow2.createCell(65).setCellValue("Country(Choice)");
	headerRow2.createCell(66).setCellValue("Receiver VAT No.(Char 20)");
	headerRow2.createCell(67).setCellValue("Contact Person(Char 30)");
	headerRow2.createCell(68).setCellValue("Country Calling Code(Number 7)");
	headerRow2.createCell(69).setCellValue("Phone No(Number 11)(Except Country Calling Code, Digit Only)");
	headerRow2.createCell(70).setCellValue("Additional Phone No(Number 11)(Except Country Calling Code, Digit Only)");
	headerRow2.createCell(71).setCellValue("Email(Char 50)");
	headerRow2.createCell(72).setCellValue("Company Name (Char 35)");
	headerRow2.createCell(73).setCellValue("Address (Char 150)");
	headerRow2.createCell(74).setCellValue("City(or Town) (Char 30)");
	headerRow2.createCell(75).setCellValue("State(Char 30)");
	headerRow2.createCell(76).setCellValue("Postal code (Char 9)");
	headerRow2.createCell(77).setCellValue("Country (Choice)");
	headerRow2.createCell(78).setCellValue("Contact Person(Char 30)");
	headerRow2.createCell(79).setCellValue("Country Calling Code(Number 7)");
	headerRow2.createCell(80).setCellValue("Phone No (Number 11)(Except Country Calling Code, Digit Only)");
	headerRow2.createCell(81).setCellValue("Email(Char 50)");

	Row headerRow3 = sheet.createRow(2);
	headerRow3.setHeight((short)0);

	int size = list.size();
	//size = 2;

	for (int i = 0; i < size; i++) {
		HashMap<String, String> data = list.get(i);

		Row row = sheet.createRow(i + 3);

		int cellNum = 0;

		row.createCell(0).setCellValue(String.valueOf(data.get("to_company_name")));
		row.createCell(1).setCellValue(String.valueOf(data.get("to_street1")));
		row.createCell(2).setCellValue(String.valueOf(data.get("to_street2")));
		row.createCell(3).setCellValue(String.valueOf(data.get("to_street3")));
		row.createCell(4).setCellValue(String.valueOf(data.get("to_city")));
		row.createCell(5).setCellValue(String.valueOf(data.get("to_state")));
		row.createCell(6).setCellValue(String.valueOf(data.get("to_postal_code")));
		row.createCell(7).setCellValue(String.valueOf(data.get("to_country")));
		row.createCell(8).setCellValue(String.valueOf(data.get("to_receiver_vat_no")));
		row.createCell(9).setCellValue(String.valueOf(data.get("to_contact_person")));
		row.createCell(10).setCellValue(String.valueOf(data.get("to_country_calling_code")));
		row.createCell(11).setCellValue(String.valueOf(data.get("to_phone")));
		row.createCell(12).setCellValue(String.valueOf(data.get("to_phone2")));
		row.createCell(13).setCellValue(String.valueOf(data.get("to_email")));
		row.createCell(14).setCellValue(String.valueOf(data.get("to_company_nickname")));
		row.createCell(15).setCellValue(String.valueOf(data.get("service_class")));
		row.createCell(16).setCellValue(String.valueOf(data.get("inbound_outbound")));
		row.createCell(17).setCellValue(String.valueOf(data.get("sales_channel")));
		row.createCell(18).setCellValue(String.valueOf(data.get("reference_no")));
		row.createCell(19).setCellValue(String.valueOf(data.get("goods_issue_no")));
		row.createCell(20).setCellValue(String.valueOf(data.get("expected_pickup_date")));
		row.createCell(21).setCellValue(String.valueOf(data.get("goods_description")));
		row.createCell(22).setCellValue(String.valueOf(data.get("instruction")));
		row.createCell(23).setCellValue(String.valueOf(data.get("sender_name")));
		row.createCell(24).setCellValue(String.valueOf(data.get("sender_biz_reg_no")));
		row.createCell(25).setCellValue(String.valueOf(data.get("inco_terms")));
		row.createCell(26).setCellValue(String.valueOf(data.get("declaration_yn")));
		row.createCell(27).setCellValue(String.valueOf(data.get("export_commodity_class")));
		row.createCell(28).setCellValue(String.valueOf(data.get("weight_unit_code")));
		row.createCell(29).setCellValue(String.valueOf(data.get("length_unit_code")));
		row.createCell(30).setCellValue(String.valueOf(data.get("currency_code")));
		row.createCell(31).setCellValue(String.valueOf(data.get("pickup_address")));
		row.createCell(32).setCellValue(String.valueOf(data.get("square_party_id")));
		row.createCell(33).setCellValue(String.valueOf(data.get("collecting_site_usage_yn")));
		row.createCell(34).setCellValue(String.valueOf(data.get("warehousing_method")));
		row.createCell(35).setCellValue(String.valueOf(data.get("warehousing_information")));
		row.createCell(36).setCellValue(String.valueOf(data.get("requested_items")));
		row.createCell(37).setCellValue(String.valueOf(data.get("package_seq")));
		row.createCell(38).setCellValue(String.valueOf(data.get("commercial_yn")));
		row.createCell(39).setCellValue(String.valueOf(data.get("package_remark")));
		row.createCell(40).setCellValue(String.valueOf(data.get("weight")));
		row.createCell(41).setCellValue(String.valueOf(data.get("width")));
		row.createCell(42).setCellValue(String.valueOf(data.get("depth")));
		row.createCell(43).setCellValue(String.valueOf(data.get("height")));
		row.createCell(44).setCellValue(String.valueOf(data.get("article_category")));
		row.createCell(45).setCellValue(String.valueOf(data.get("article_name")));
		row.createCell(46).setCellValue(String.valueOf(data.get("article_url")));
		row.createCell(47).setCellValue(String.valueOf(data.get("article_description")));
		row.createCell(48).setCellValue(String.valueOf(data.get("article_local_description")));
		row.createCell(49).setCellValue(String.valueOf(data.get("number_of_article")));
		row.createCell(50).setCellValue(String.valueOf(data.get("hs_code")));
		row.createCell(51).setCellValue(String.valueOf(data.get("sku_no")));
		row.createCell(52).setCellValue(String.valueOf(data.get("item_model_nm")));
		row.createCell(53).setCellValue(String.valueOf(data.get("options")));
		row.createCell(54).setCellValue(String.valueOf(data.get("item_brand_nm")));
		row.createCell(55).setCellValue(String.valueOf(data.get("item_orgn_nation_cd")));
		row.createCell(56).setCellValue(String.valueOf(data.get("article_weight")));
		row.createCell(57).setCellValue(String.valueOf(data.get("invoice_value")));
		row.createCell(58).setCellValue(String.valueOf(data.get("c_company_name")));
		row.createCell(59).setCellValue(String.valueOf(data.get("c_street1")));
		row.createCell(60).setCellValue(String.valueOf(data.get("c_street2")));
		row.createCell(61).setCellValue(String.valueOf(data.get("c_street3")));
		row.createCell(62).setCellValue(String.valueOf(data.get("c_city")));
		row.createCell(63).setCellValue(String.valueOf(data.get("c_state")));
		row.createCell(64).setCellValue(String.valueOf(data.get("c_postal_code")));
		row.createCell(65).setCellValue(String.valueOf(data.get("c_country")));
		row.createCell(66).setCellValue(String.valueOf(data.get("c_receiver_vat_no")));
		row.createCell(67).setCellValue(String.valueOf(data.get("c_contact_person")));
		row.createCell(68).setCellValue(String.valueOf(data.get("c_country_calling_code")));
		row.createCell(69).setCellValue(String.valueOf(data.get("c_phone")));
		row.createCell(70).setCellValue(String.valueOf(data.get("c_phone2")));
		row.createCell(71).setCellValue(String.valueOf(data.get("c_email")));
		row.createCell(72).setCellValue(String.valueOf(data.get("s_company_name")));
		row.createCell(73).setCellValue(String.valueOf(data.get("s_address")));
		row.createCell(74).setCellValue(String.valueOf(data.get("s_city")));
		row.createCell(75).setCellValue(String.valueOf(data.get("s_state")));
		row.createCell(76).setCellValue(String.valueOf(data.get("s_postal_code")));
		row.createCell(77).setCellValue(String.valueOf(data.get("s_country")));
		row.createCell(78).setCellValue(String.valueOf(data.get("s_contact_person")));
		row.createCell(79).setCellValue(String.valueOf(data.get("s_country_calling_code")));
		row.createCell(80).setCellValue(String.valueOf(data.get("s_phone_no")));
		row.createCell(81).setCellValue(String.valueOf(data.get("s_email")));
	}

	// 컨텐츠 타입과 파일명 지정
	/*
	response.setContentType("application/vnd.ms-excel");
	response.setHeader("Content-Disposition", String.format("attachment;filename=%s.xlsx", String.format("%s-%s", "data", LocalDate.now().toString())));

	workbook.write(response.getOutputStream());
	workbook.close();
	 */

	String uploadpath = request.getSession().getServletContext().getRealPath("/upload");
	String fileName = String.format("%s.xlsx", String.format("%s-%s", "data", LocalDate.now().toString()));

	System.out.println(uploadpath + fileName);

	FileOutputStream fos = new FileOutputStream(new File(uploadpath + "/" + fileName));
	workbook.write(fos);
	workbook.close();
%>
<%!
	static private List<LinkedHashMap<String, String>> excelList(SqlSessionTemplate main) {
		List<LinkedHashMap<String, String>> result = main.selectList("SA010Mapper" + ".excelList");

		return result;
	}
%>