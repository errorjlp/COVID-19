import json			# json数据解析
from sqlalchemy import create_engine
import requests		# 爬虫
import pandas as pd	# 数据处理
import pymysql

if __name__ == '__main__':
    url = 'https://c.m.163.com/ug/api/wuhan/app/data/list-total'
    #伪装
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/102.0.5005.62 Safari/537.36 '
    }
    re = requests.get(url=url, headers=headers)
    # print(re.text)
    re.encoding = re.apparent_encoding
    status = re.status_code
    # 通过json库将json格式的文本转换成python中的字典类型
    data_json = json.loads(re.text)
    # print(status)
    #全国以往数据
    data = data_json['data']['chinaDayList']
    #获取日期
    today_df = pd.DataFrame(data)[['date']]

    # 获取当日的确诊、死亡、治愈
    confirmData = pd.DataFrame([province['total']['confirm'] for province in data])
    deadData = pd.DataFrame([province['total']['dead'] for province in data])
    healData = pd.DataFrame([province['total']['heal'] for province in data])
    storeConfirm = pd.DataFrame([province['total']['storeConfirm'] for province in data])


    # 将三列数据拼接到today_df,并计算现有确诊列
    today_df['confirm'] = confirmData
    today_df['dead'] = deadData
    today_df['heal'] = healData
    today_df['exist'] = storeConfirm

    # 调整列的顺序
    today_df = today_df[['date', 'confirm',  'exist', 'dead', 'heal']]
    print(today_df)
    # 修改列名
    #colNames = ['省份', '确诊', '死亡', '治愈', '更新时间']
    #today_df.columns = colNames

    # 连接数据库，插入数据
    engine = create_engine("mysql+pymysql://root:mb030127@localhost:3306/COVID19?charset=utf8")
    pd.io.sql.to_sql(today_df, 'Hdata', engine, schema='COVID19', if_exists='append', index=False)
    engine.dispose()

