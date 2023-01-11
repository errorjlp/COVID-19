package com.cn.hbase;

import java.io.IOException;
import java.util.HashMap;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.ConnectionFactory;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.client.Table;
import org.apache.hadoop.hbase.util.Bytes;

import com.alibaba.fastjson.JSON;

public class cityhbase {
	public static void getcity() throws IOException{
		Connection connection=null;
		HashMap<String, String> map3 = new HashMap<String, String>();
		Configuration conf = new Configuration();
        conf.set("hbase.zookeeper.quorum","master1,master2,slave01");
        //建立连接
        Connection conn =ConnectionFactory.createConnection(conf);
        //获取表
        Table table = conn.getTable(TableName.valueOf("city"));
        String cf = "ct";
        String qualifier1 = "name";
        String qualifier2 = "confirm";
        Scan scan = new Scan();
        
        //过滤操作
        //Filter filter1 = new QualifierFilter(Bytes.toBytes(confirm));
        //Filter filter2 = new PrefixFilter(Bytes.toBytes(name));
        //QualifierFilter filter1 = new QualifierFilter(CompareFilter.CompareOp.EQUAL, new BinaryComparator(Bytes.toBytes("dead")));
        //QualifierFilter filter2 = new QualifierFilter(CompareFilter.CompareOp.EQUAL, new BinaryComparator(Bytes.toBytes("confirm")));
        //scan.setFilter(filter1);
        //scan.setFilter(filter2);
        
        ResultScanner a = table.getScanner(scan);
        for(Result result: a){
        	String confirm = Bytes.toString(result.getValue(cf.getBytes(), qualifier2.getBytes()));
        	String name = Bytes.toString(result.getValue(cf.getBytes(), qualifier1.getBytes()));
        	
        	map3.put(name, confirm);
        	//System.out.println(name+":"+confirm);
        	//System.out.println(name);
        	//System.out.println(confirm);
        }
        //System.out.print(map1);
        /**
         * for(HashMap.Entry<String, String> entry : map4.entrySet()){
         * 		System.out.println(entry.getKey()+":"+entry.getValue());
         * }
         */
        table.close();
        conn.close();
        String json3 = JSON.toJSONString(map3);
        System.out.println(json3);
        //return map4;
	}
}
