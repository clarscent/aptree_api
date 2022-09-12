package com.dexa.frame.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;

@Slf4j
public class ExcelUtil {
	public static XSSFWorkbook getWorkbook(FileInputStream file) {
		XSSFWorkbook workbook = null;

		try {
			workbook = new XSSFWorkbook(file);
		} catch (Exception e) {
			log.error("EXCEL", e);
		}

		return workbook;
	}

	public static XSSFSheet getSheet(FileInputStream file, int idx) {
		XSSFWorkbook workbook = getWorkbook(file);
		XSSFSheet sheet = null;

		try {
			sheet = workbook.getSheetAt(idx);
		} catch (Exception e) {
			log.error("EXCEL", e);
		}

		return sheet;
	}

	public static XSSFSheet getSheet(XSSFWorkbook workbook, int idx) {
		XSSFSheet sheet = null;

		try {
			sheet = workbook.getSheetAt(idx);
		} catch (Exception e) {
			log.error("EXCEL", e);
		}

		return sheet;
	}

	public static XSSFRow getSheetRow(FileInputStream file, int sheetIdx, int rowIdx) {
		XSSFSheet sheet = getSheet(file, sheetIdx);
		XSSFRow row = null;

		try {
			row = sheet.getRow(rowIdx);
		} catch (Exception e) {
			log.error("EXCEL", e);
		}

		return row;
	}

	public static XSSFRow getSheetRow(XSSFWorkbook workbook, int sheetIdx, int rowIdx) {
		XSSFSheet sheet = getSheet(workbook, sheetIdx);
		XSSFRow row = null;

		try {
			row = sheet.getRow(rowIdx);
		} catch (Exception e) {
			log.error("EXCEL", e);
		}

		return row;
	}

	public static int getRowCount(FileInputStream file, int sheetIdx) {
		XSSFSheet sheet = getSheet(file, sheetIdx);
		int rows = 0;

		try {
			rows = sheet.getPhysicalNumberOfRows();
		} catch (Exception e) {
			log.error("EXCEL", e);
		}

		return rows;
	}

	public static int getRowCount(XSSFWorkbook workbook, int sheetIdx) {
		XSSFSheet sheet = getSheet(workbook, sheetIdx);
		int rows = 0;

		try {
			rows = sheet.getPhysicalNumberOfRows();
		} catch (Exception e) {
			log.error("EXCEL", e);
		}

		return rows;
	}

	public static int getColCount(FileInputStream file, int sheetIdx) {
		XSSFRow row = getSheetRow(file, 0, 0);
		int cols = 0;

		try {
			cols = row.getPhysicalNumberOfCells();
		} catch (Exception e) {
			log.error("EXCEL", e);
		}

		return cols;
	}

	public static int getColCount(XSSFWorkbook workbook, int sheetIdx) {
		XSSFRow row = getSheetRow(workbook, 0, 0);
		int cols = 0;

		try {
			cols = row.getPhysicalNumberOfCells();
		} catch (Exception e) {
			log.error("EXCEL", e);
		}

		return cols;
	}

	public static String getCellValue(XSSFRow row, int colIdx) {
		String value = "";

		try {
			XSSFCell cell = row.getCell(colIdx);
			value = getCellValueByType(cell);
		} catch (Exception e) {
			log.error("EXCEL", e);
		}

		return value;
	}

	public static String getCellValueByType(XSSFCell cell) {
		String value = "";

		//셀이 빈값일경우를 위한 널체크
		if (cell != null) {
			//타입별로 내용 읽기
			switch (cell.getCellType()) {
				case FORMULA:
					value = cell.getCellFormula();
					break;
				case NUMERIC:
					value = NumberToTextConverter.toText(cell.getNumericCellValue());
					if (value.equals("")) {
						value = "0";
					}
					break;
				case STRING:
					value = cell.getStringCellValue() + "";
					break;
				case BOOLEAN:
					value = cell.getBooleanCellValue() + "";
					break;
				case ERROR:
					value = cell.getErrorCellValue() + "";
					break;
			}
		}

		return value;
	}
}