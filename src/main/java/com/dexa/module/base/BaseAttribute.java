package com.dexa.module.base;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseAttribute {
	private int formWidth = 300;
	private int areaWidth = 0;
	private int labelWidth = 80;

	public String getAreaWidth() {
		return formWidth - 10 + "px;";
	}

	public String getFormWidth() {
		return this.formWidth + "px";
	}

	public String getLabelWidth() {
		return labelWidth + "px";
	}
}
