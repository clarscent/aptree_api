package com.dexa.frame.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class DateUtil {
	public static String getDate(int days, String format) {
		GregorianCalendar gc = new GregorianCalendar();
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		gc.add(Calendar.DATE, days);

		return sdf.format(gc.getTime());
	}
}