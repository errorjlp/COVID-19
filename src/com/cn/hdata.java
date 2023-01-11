package com.cn.model;

import com.alibaba.fastjson.annotation.JSONField;

public class hdata {
	@JSONField(ordinal = 1)
	private String date;
	@JSONField(ordinal = 2)
	private String confirm;
	@JSONField(ordinal = 3)
	private String dead;
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getConfirm() {
		return confirm;
	}
	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}
	public String getDead() {
		return dead;
	}
	public void setDead(String dead) {
		this.dead = dead;
	}
	
}
