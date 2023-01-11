package com.cn.model;

import com.alibaba.fastjson.annotation.JSONField;

public class city {
	@JSONField(ordinal = 1)
	private String country;
	@JSONField(ordinal = 2)
	private String confirmed;
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getConfirmed() {
		return confirmed;
	}
	public void setConfirmed(String confirmed) {
		this.confirmed = confirmed;
	}
	
	
}
