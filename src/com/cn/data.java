package com.cn.model;

import com.alibaba.fastjson.annotation.JSONField;

public class data {
	@JSONField(ordinal = 1)
	private String name;
	@JSONField(ordinal = 2)
	private String confirm;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getConfirm() {
		return confirm;
	}
	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}
}
