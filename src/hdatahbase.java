package com.cn.hbase;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.ConnectionFactory;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.client.Table;
import org.apache.hadoop.hbase.filter.*;
import org.apache.hadoop.hbase.util.Bytes;

import com.alibaba.fastjson.JSON;

public class hdatahbase {
	public static void getconfirm() throws IOException{
		Connection connection=null;
		HashMap<String, Set<String>> map2 = new HashMap<>();
		Set<String> set = new HashSet<>();
		Configuration conf = new Configuration();
        conf.set("hbase.zookeeper.quorum","master1,master2,slave01");
        //建立连接
        Connection conn =ConnectionFactory.createConnection(conf);
        //获取表
        Table table = conn.getTable(TableName.valueOf("hdata"));
        String cf = "data";
        String qualifier1 = "confirm";
        String qualifier2 = "dead";
        Scan scan = new Scan();
        
        ResultScanner a = table.getScanner(scan);
        for(Result result: a){
        	String date = Bytes.toString(result.getRow());
        	String confirm = Bytes.toString(result.getValue(cf.getBytes(), qualifier1.getBytes()));
        	String dead = Bytes.toString(result.getValue(cf.getBytes(), qualifier1.getBytes()));
        	set.add(confirm);
        	set.add(dead);
        	map2.put(date, set);
        	//System.out.println(date+":"+confirm);
        	
        }
        table.close();
        conn.close();
        String json2 = JSON.toJSONString(map2);
        System.out.println(json2);
        //return map2;
	}
}
