package com.dexa.frame.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 각종 함수 모듈을 모아놓은 utility class
 */

@Component
public class Global {
	/**
	 * new line 문자
	 */

	public static final String NEW_LINE = new String(new char[]{0x0D, 0x0A});
	private static final String TAG = "GLOBAL";
	private static final String KEY = "SYLOGIS_KEY";
	private static Logger logger;

	public static String toJsonString(HashMap<String, Object> map) {
		String json = "";

		try {
			json = new ObjectMapper().writeValueAsString(map);
			//System.out.println("json: "+ json);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return json;
	}

	/**
	 * 8자리 날짜표현을 지정된 날짜 포맷으로 변환하여 반환한다.
	 *
	 * @param strDate    8자리 날짜표현
	 * @param strPattern 날짜 포맷
	 * @return 지정된 포맷으로 변환된 날짜, 날짜표현이 null이면 빈문자열을 반환한다.
	 * @throws NumberFormatException NumberFormat Exception
	 * @throws NullPointerException  NullPointer Exception
	 */
	public static String dateFormat(String strDate, String strPattern) throws NumberFormatException, NullPointerException {
		String returnValue = "";

		// 변환할 날짜가 NULL이거나 빈문자열일 경우
		if (strDate == null || strDate.length() == 0)
			return "";
		if (strDate.length() < 8)
			return strDate;
		if (strDate.length() > 8)
			strDate = strDate.substring(0, 10);

		boolean bNeedEncode = false;
		char chDelim;

		if (strDate.indexOf('/') != -1) {
			chDelim = '/';
			bNeedEncode = true;
		} else if (strDate.indexOf('.') != -1) {
			chDelim = '.';
			bNeedEncode = true;
		} else if (strDate.indexOf('-') != -1) {
			chDelim = '-';
			bNeedEncode = true;
		} else {
			chDelim = '-';
		}

		// 8자리 날짜로 변환한다.
		if (bNeedEncode) {
			StringBuffer strbufDate = new StringBuffer(strDate);
			int index = 0;

			// 날짜 형식에서 구분기호를 삭제하여 8자리 날짜 문자열로 변환한다.
			do {
				index = strbufDate.toString().indexOf(chDelim);
				if (index != -1)
					strbufDate.deleteCharAt(index);
			} while (index != -1);

			strDate = strbufDate.toString();
		} // if (bNeedEncode)

		// SimpleDateFormat 객체를 반환받아서, 지정된 날짜 포맷으로 설정한다.
		SimpleDateFormat dateFormatter = (SimpleDateFormat) SimpleDateFormat.getInstance();
		dateFormatter.applyPattern(strPattern);

		// 지정된 날짜값을 가지는 Calendar 객체를 생성한다.
		Calendar calendar = Calendar.getInstance();
		int iYear = Integer.parseInt(strDate.substring(0, 4));
		int iMonth = Integer.parseInt(strDate.substring(4, 6));
		int iDay = Integer.parseInt(strDate.substring(6, 8));
		calendar.set(iYear, iMonth - 1, iDay);

		returnValue = dateFormatter.format(calendar.getTime());

		return returnValue;
	}

	/**
	 * 6자리 날짜표현을 지정된 날짜 포맷으로 변환하여 반환한다.
	 *
	 * @param strDate    6자리 날짜표현
	 * @param strPattern 날짜 포맷
	 * @return 지정된 포맷으로 변환된 날짜, 날짜표현이 null이면 빈문자열을 반환한다.
	 * @throws NumberFormatException NumberFormat Exception
	 * @throws NullPointerException  NullPointer Exception
	 */
	public static String monthFormat(String strDate, String strPattern) throws NumberFormatException, NullPointerException {

		// 변환할 날짜가 NULL이거나 빈문자열일 경우
		if (strDate == null || strDate.length() == 0)
			return "";
		if (strDate.length() < 6)
			return strDate;
		if (strDate.length() > 5)
			strDate = strDate.substring(0, 6);

		boolean bNeedEncode = false;
		char chDelim = '-';

		if (strDate.indexOf('/') != -1) {
			chDelim = '/';
			bNeedEncode = true;
		} else if (strDate.indexOf('.') != -1) {
			chDelim = '.';
			bNeedEncode = true;
		} else if (strDate.indexOf('-') != -1) {
			chDelim = '-';
			bNeedEncode = true;
		}

		// 8자리 날짜로 변환한다.
		if (bNeedEncode) {
			StringBuffer strbufDate = new StringBuffer(strDate);
			int index = 0;

			// 날짜 형식에서 구분기호를 삭제하여 8자리 날짜 문자열로 변환한다.
			do {
				index = strbufDate.toString().indexOf(chDelim);
				if (index != -1)
					strbufDate.deleteCharAt(index);
			} while (index != -1);

			strDate = strbufDate.toString();
		} // if (bNeedEncode)

		// SimpleDateFormat 객체를 반환받아서, 지정된 날짜 포맷으로 설정한다.
		SimpleDateFormat dateFormatter = (SimpleDateFormat) SimpleDateFormat.getInstance();
		dateFormatter.applyPattern(strPattern);

		// 지정된 날짜값을 가지는 Calendar 객체를 생성한다.
		Calendar calendar = Calendar.getInstance();
		int iYear = Integer.parseInt(strDate.substring(0, 4));
		int iMonth = Integer.parseInt(strDate.substring(4, 6));
		calendar.set(iYear, iMonth - 1, 1);

		return dateFormatter.format(calendar.getTime());
	}

	/**
	 * 4자리/6자리 시간표현을 지정된 시간 포맷으로 변환하여 반환한다.
	 *
	 * @param strTime    4자리/6자리 시간표현
	 * @param strPattern 시간 포맷
	 * @return 지정된 포맷으로 변환된 시간, 시간표현이 null이면 빈문자열을 반환한다.
	 * @throws NumberFormatException NumberFormat Exception
	 * @throws NullPointerException  NullPointer Exception
	 */
	public static String timeFormat(String strTime, String strPattern) throws NumberFormatException, NullPointerException {
		// 변환할 시간이 NULL이거나 빈문자열일 경우
		if (strTime == null || strTime.length() == 0)
			return "";
		if (strTime.length() < 4)
			return strTime;
		if (strTime.length() > 6)
			strTime = strTime.substring(0, 6);

		// SimpleDateFormat 객체를 반환받아서, 지정된 시간 포맷으로 설정한다.
		SimpleDateFormat timeFormatter = (SimpleDateFormat) SimpleDateFormat.getInstance();
		timeFormatter.applyPattern(strPattern);

		// 지정된 날짜값을 가지는 Calendar 객체를 생성한다.
		Calendar calendar = Calendar.getInstance();
		int iHour = 0;
		int iMinute = 0;
		int iSecond = 0;

		// 4자리 시간값일 경우
		if (strTime.length() == 4) {
			iHour = Integer.parseInt(strTime.substring(0, 2));
			iMinute = Integer.parseInt(strTime.substring(2, 4));
		}
		// 6자리 시간값일 경우
		else if (strTime.length() == 6) {
			iHour = Integer.parseInt(strTime.substring(0, 2));
			iMinute = Integer.parseInt(strTime.substring(2, 4));
			iSecond = Integer.parseInt(strTime.substring(4, 6));
		} // if (strTime.length() == 4)
		calendar.set(Calendar.HOUR_OF_DAY, iHour);
		calendar.set(Calendar.MINUTE, iMinute);
		calendar.set(Calendar.SECOND, iSecond);

		return timeFormatter.format(calendar.getTime());
	}

	/**
	 * 숫자를 지정된 포맷으로 변환하여 반환한다. 변환할 숫자문자열이 NULL이거나 빈문자열일 경우 빈문자열을 반환하거나 ""을 반환한다.
	 * ### : 숫자값이 0일때 "" 리턴 ##0 : 숫자값이 0일때 0 리턴 ###.n# : 숫자값이 0이면 "" 리턴 ###.n0 :
	 * 숫자값이 0 이면 .n0리턴 ##0.n# : 숫자값이 0 이면 0 리턴 ##0.n0 : 숫자값이 0 이면 0.00 리턴
	 *
	 * @param strNumber  문자열 숫자
	 * @param strPattern 날짜 포맷
	 * @return 지정된 포맷으로 변환된 숫자
	 * @throws NumberFormatException NumberFormat Exception
	 * @throws NullPointerException  NullPointer Exception
	 */
	public static String numberFormat(String strNumber, String strPattern) throws NumberFormatException, NullPointerException {

		if ("".equals(checkNullString(strNumber, "")))
			return "";

		return numberFormat(Double.parseDouble(strNumber), strPattern);
	}

	public static String numberFormat(double val, String strPattern) throws NumberFormatException, NullPointerException {
		String rStr = "";
		String format = "#,###";
		DecimalFormat df = null;

		if (!"".equals(checkNullString(strPattern, "")))
			format = strPattern;

		int idx = -1;
		String key1 = ""; // 소수점 앞자리 값
		String key2 = ""; // 마지막 값
		if (format.lastIndexOf(".") > -1) {
			idx = format.lastIndexOf(".");
			key1 = format.substring(idx - 1, idx);
			key2 = format.substring(format.length() - 1, format.length());

			if ("#".equals(key1) && "#".equals(key2) && 0 == val)
				return "";
			else {
				df = new DecimalFormat(format);
				rStr = df.format(val);
			}
		} else {
			key1 = format.substring(format.length() - 1, format.length());

			if ("#".equals(key1) && 0 == val)
				return "";
			else {
				df = new DecimalFormat(format);
				rStr = df.format(val);
			}
		}

		return rStr;
	}

	/**
	 * 숫자를 지정된 포맷으로 변환하여 반환한다. 변환할 숫자문자열이 NULL이거나 빈문자열일 경우 빈문자열을 반환하거나 ""을 반환한다.
	 * ### : 숫자값이 0일때 "" 리턴 ##0 : 숫자값이 0일때 0 리턴
	 *
	 * @param strNumber 문자열 숫자
	 * @return 지정된 포맷으로 변환된 숫자
	 * @throws NumberFormatException NumberFormat Exception
	 * @throws NullPointerException  NullPointer Exception
	 */
	public static String numberFormat(String strNumber) throws NumberFormatException, NullPointerException {
		if ("".equals(checkNullString(strNumber, "")))
			return "";

		return numberFormat(Double.parseDouble(strNumber), null);
	}

	public static String numberFormat(double val) throws NumberFormatException, NullPointerException {

		return numberFormat(val, null);
	}

	/**
	 * 문자와 숫자로 이루어진 코드를 지정된 포맷으로 변환하여 반환한다.(오른쪽정렬) 변환할 문자열이 NULL이거나 빈문자열일 경우 빈문자열을
	 * 반환한다.
	 *
	 * @param strCode    코드 문자열(문자/숫자)
	 * @param strPattern 코드 포맷
	 * @return 지정된 포맷으로 변환된 코드를 반환한다.
	 * @throws NullPointerException NullPointer Exception
	 */
	public static String codeFormat(String strCode, String strPattern) throws NullPointerException {
		return codeFormat(strCode, strPattern, false, false, false);
	}

	/**
	 * 문자와 숫자로 이루어진 코드를 지정된 포맷으로 변환하여 반환한다.(오른쪽정렬) 변환할 문자열이 NULL이거나 빈문자열일 경우 빈문자열을
	 * 반환하거나 패턴문자열을 반환한다.
	 *
	 * @param strCode       코드 문자열(문자/숫자)
	 * @param strPattern    코드 포맷
	 * @param bLeftAlign    왼쪽 정렬 여부
	 * @param bInitPattern  패턴 문자열 초기화 여부
	 * @param bOneByteChars 1바이트 문자 여부
	 * @return 지정된 포맷으로 변환된 코드를 반환한다.
	 * @throws NullPointerException NullPointer Exception
	 * @author 구민서
	 */
	public static String codeFormat(String strCode, String strPattern, boolean bLeftAlign, boolean bInitPattern, boolean bOneByteChars) throws NullPointerException {
		// 변환할 문자열이 NULL이거나 빈문자열일 경우
		if (strCode == null || strCode.length() == 0) {
			if (bInitPattern)
				strCode = "";
			else
				return "";
		}

		StringBuffer strbufCode = new StringBuffer();
		int iPtnLength = bLeftAlign ? strPattern.length() : strPattern.length() - 1;
		int iOrgLength = bLeftAlign ? strCode.length() : strCode.length() - 1;
		int iPtnIndex = 0;
		int iOrgIndex = 0;
		char chLiteral;

		// 왼쪽 정렬로 문자열을 변환할 경우
		if (bLeftAlign) {
			// 패턴 형식에 맞추어서 원본 데이터를 변환한다.
			while (iPtnIndex < iPtnLength) {
				chLiteral = strPattern.charAt(iPtnIndex++);
				if (chLiteral == '#') {
					if (iOrgIndex >= iOrgLength)
						chLiteral = ' ';
					else
						chLiteral = strCode.charAt(iOrgIndex++);
					// 1바이트 캐릭터로 포맷을 변환할 경우
					if (bOneByteChars && (chLiteral < 0x00 || chLiteral > 0xFF))
						iPtnIndex++;
				}
				strbufCode.append(chLiteral);
			} // while (iPtnIndex < iPtnLength)
			// 패턴 형식보다 원본 데이터가 길 경우, 남은 데이터를 그대로 추가한다.
			while (iOrgIndex < iOrgLength) {
				strbufCode.append(strCode.charAt(iOrgIndex++));
			}

			return strbufCode.toString();
		}
		// 오른쪽 정렬로 문자열을 변환할 경우
		else {
			// 패턴 형식에 맞추어서 원본 데이터를 변환한다.
			while (iPtnLength >= 0) {
				chLiteral = strPattern.charAt(iPtnLength--);
				if (chLiteral == '#') {
					if (iOrgLength < 0)
						chLiteral = ' ';
					else
						chLiteral = strCode.charAt(iOrgLength--);
					// 1바이트 캐릭터로 포맷을 변환할 경우
					if (bOneByteChars && (chLiteral < 0x00 || chLiteral > 0xFF))
						iPtnLength--;
				}
				strbufCode.append(chLiteral);
			} // while (iPtnLen >= 0)
			// 패턴 형식보다 원본 데이터가 길 경우, 남은 데이터를 그대로 추가한다.
			while (iOrgLength >= 0) {
				strbufCode.append(strCode.charAt(iOrgLength--));
			}

			return strbufCode.reverse().toString();
		} // if (bLeftAlign)
	}

	/**
	 * 전화번호 문자열을 전화번호형식으로 바꿔준다.
	 *
	 * @param str 전화번호 문자열
	 * @return 전화번호형식의 문자열
	 * @author 박영민
	 */
	public static String telFormat(String str) {
		if (str == null || "".equals(str))
			return "";

		String rtnStr = str.replaceAll("[^0-9]", "");
		String loc = "";
		String num1 = "";
		String num2 = "";

		if (rtnStr.length() < 5) {
			return rtnStr;
		}

		if (rtnStr.substring(0, 2).equals("02")) {

			if (rtnStr.length() == 5) {
				loc = rtnStr.substring(0, 2);
				num1 = rtnStr.substring(2, 5);
			} else if (rtnStr.length() == 6) {
				loc = rtnStr.substring(0, 2);
				num1 = rtnStr.substring(2, 6);
			} else if (rtnStr.length() == 7) {
				loc = rtnStr.substring(0, 2);
				num1 = rtnStr.substring(2, 5);
				num2 = rtnStr.substring(5, 7);
			} else if (rtnStr.length() == 8) {
				loc = rtnStr.substring(0, 2);
				num1 = rtnStr.substring(2, 5);
				num2 = rtnStr.substring(5, 8);
			} else if (rtnStr.length() == 9) {
				loc = rtnStr.substring(0, 2);
				num1 = rtnStr.substring(2, 5);
				num2 = rtnStr.substring(5, 9);
			} else if (rtnStr.length() == 10) {
				loc = rtnStr.substring(0, 2);
				num1 = rtnStr.substring(2, 6);
				num2 = rtnStr.substring(6, 10);
			} else if (rtnStr.length() > 10) {
				int iStrLen = rtnStr.length();
				loc = rtnStr.substring(0, iStrLen - 8);
				num1 = rtnStr.substring(iStrLen - 8, iStrLen - 4);
				num2 = rtnStr.substring(iStrLen - 4, iStrLen);
			} else {
				return rtnStr;
			}
		} else {
			if (rtnStr.length() == 6) {
				loc = rtnStr.substring(0, 3);
				num1 = rtnStr.substring(3, 6);
			} else if (rtnStr.length() == 7) {
				loc = rtnStr.substring(0, 3);
				num1 = rtnStr.substring(3, 7);
			} else if (rtnStr.length() == 8) {
				loc = rtnStr.substring(0, 4);
				num1 = rtnStr.substring(4, 8);
			} else if (rtnStr.length() == 9) {
				loc = rtnStr.substring(0, 2);
				num1 = rtnStr.substring(2, 5);
				num2 = rtnStr.substring(5, 9);
			} else if (rtnStr.length() == 10) {
				loc = rtnStr.substring(0, 3);
				num1 = rtnStr.substring(3, 6);
				num2 = rtnStr.substring(6, 10);
			} else if (rtnStr.length() == 11) {
				loc = rtnStr.substring(0, 3);
				num1 = rtnStr.substring(3, 7);
				num2 = rtnStr.substring(7, 11);
			} else if (rtnStr.length() > 11) {
				int iStrLen = rtnStr.length();
				loc = rtnStr.substring(0, iStrLen - 8);
				num1 = rtnStr.substring(iStrLen - 8, iStrLen - 4);
				num2 = rtnStr.substring(iStrLen - 4, iStrLen);
			} else {
				return rtnStr;
			}
		}

		rtnStr = loc + ((num1.isEmpty() ? "" : "-" + num1)) + ((num2.isEmpty() ? "" : "-" + num2));

		return rtnStr;
	}

	public static String getTime(String format) {
		if (format == null || format.equals("")) {
			format = "yyyyMMddHHmmss";
		}

		TimeZone tz = TimeZone.getDefault();
		tz.setRawOffset((60 * 60 * 1000) * 9);
		TimeZone.setDefault(tz);
		Calendar cal = Calendar.getInstance(tz);
		Date date = cal.getTime();
		SimpleDateFormat formater = new SimpleDateFormat(format);
		String timestamp = formater.format(date);

		return timestamp;
	}

	/*
	 * Null, "" String 값일경우 대치문자열로 return 해준다.
	 * @param String paramstr check할 문자열
	 * @param String repstr 대치할 문자열
	 * @return String
	 */

	public static String checkNullString(String paramstr, String repstr) {
		if (paramstr == null || paramstr.trim().equals("") || paramstr.equals("null")) {
			return repstr;
		} else {
			return paramstr;
		}
	}

	/**
	 * 오늘 날짜에 특정 일을 더하거나 뺀 결과를 지정한 형식으로 반환한다.
	 *
	 * @param days   더하거나 뺄 일 수. 오늘보다 과거로 가려면 음수 값을 넣는다.
	 * @param format 날짜 문자열 형식
	 * @return String
	 */
	public static String getDate(int days, String format) {
		GregorianCalendar gc = new GregorianCalendar();
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		gc.add(Calendar.DATE, days);

		return sdf.format(gc.getTime());
	}

	public static String getDate(String format) {
		return getDate(0, format);
	}

	/**
	 * 문자열 날짜를 실제 Date형식으로 변환하는 함수
	 *
	 * @param sDate 날짜 문자열
	 * @return
	 */
	public static Date getRealDate(String sDate) {
		Calendar cal = Calendar.getInstance();

		if (sDate.length() == 8) {
			cal.set(Integer.parseInt(sDate.substring(0, 4)), Integer.parseInt(sDate.substring(4, 6)) - 1, Integer.parseInt(sDate.substring(6, 8)));
		} else if (sDate.length() == 10) {
			cal.set(Integer.parseInt(sDate.substring(0, 4)), Integer.parseInt(sDate.substring(5, 7)) - 1, Integer.parseInt(sDate.substring(8, 10)));
		}

		return cal.getTime();
	}

	/**
	 * 오늘 날짜에 특정 달을 더하거나 뺀 결과를 지정한 형식으로 반환한다.
	 *
	 * @param val    더하거나 뺄 일 수. 오늘보다 과거로 가려면 음수 값을 넣는다.
	 * @param format 날짜 문자열 형식
	 * @return String
	 */
	public static String getAddMonthDate(int val, String format) {
		GregorianCalendar gc = new GregorianCalendar();
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		gc.add(Calendar.MONTH, val);

		return sdf.format(gc.getTime());
	}

	/**
	 * 2개의 날짜를 비교할 수 있다.
	 *
	 * @return -1 : date1 < date2 0 : date1 = date2 1 : date1 > date2
	 */
	public static int compareDate(Date date1, Date date2) {
		Calendar c1 = Calendar.getInstance();
		c1.setTime(date1);
		Calendar c2 = Calendar.getInstance();
		c2.setTime(date2);

		return compareDate(c1, c2);
	}

	/**
	 * 2개의 날짜를 비교할 수 있다.
	 *
	 * @return -1 : cal1 < cal2 0 : cal1 = cal2 1 : cal1 > cal2
	 */
	public static int compareDate(Calendar cal1, Calendar cal2) {
		int value = 9;

		if (cal1.before(cal2)) {
			value = -1;
		}
		if (cal1.after(cal2)) {
			value = 1;
		}
		if (cal1.equals(cal2)) {
			value = 0;
		}
		return value;
	}

	static public String checkNullNumber(String str) {

		if (str == null || str.trim().equals(""))
			str = "";

		if (str != null && !str.equals("")) {
			if (str.length() == 1 && str.equals("0")) {
				str = "";
			}
		}
		return str;
	}

	/**
	 * LPAD 와 같은 효과
	 *
	 * @param strVal 전체 문자열
	 * @param len    전체 문자길이 strVal 원래 문자
	 * @return LPAD 된 문자
	 */
	public static String lpad(String strVal, int len, String ch) {
		StringBuilder zeroStr = new StringBuilder();

		for (int i = 0; i < (len - strVal.length()); i++) {
			zeroStr.append(ch);
		}

		zeroStr.append(strVal);

		return zeroStr.toString();
	}

	public static String rpad(String strVal, int len, String ch) {
		StringBuilder zeroStr = new StringBuilder();
		zeroStr.append(strVal);

		for (int i = 0; i < (len - strVal.length()); i++) {
			zeroStr.append(ch);
		}

		return zeroStr.toString();
	}

	public static String getParameter(HttpServletRequest request, String parameter) {
		String returnValue = "";

		try {
			returnValue = Global.checkNullString(request.getParameter(parameter), "");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return returnValue;
	}

	public static String getParameter(HttpServletRequest request, String parameter, String repstr) {
		String returnValue = "";

		try {
			returnValue = Global.checkNullString(request.getParameter(parameter), repstr);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return returnValue;
	}

	public static String enc(String str) {
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		encryptor.setAlgorithm("PBEWithMD5AndDES");
		encryptor.setPassword(KEY);
		String encStr = encryptor.encrypt(str);

		return encStr;
	}

	public static String dec(String str) {
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		encryptor.setAlgorithm("PBEWithMD5AndDES");
		encryptor.setPassword(KEY);
		String decStr = encryptor.decrypt(str);

		return decStr;
	}
}
