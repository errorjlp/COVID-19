import pymysql

if __name__ == '__main__':
    db = pymysql.connect(host='localhost', port=3306, db='COVID19', user='root', passwd='mb030127', charset='utf8')
    # 创建游标对象
    cursor = db.cursor()
    #cursor.execute('select * from student')
    #result = cursor.fetchall()
    #print(result)
    #sql语句创建省数据表
    sql = """create table if not exists Pdata
                (name varchar(30) not null,
                confirm int(15) not null,
                exist int(15) not null,
                dead int(15) not null,
                heal int(15) not null
                );"""
    #sql语句创建以往数据表
    sql = """create table if not exists Hdata
                (date char(30) not null,
                confirm int(15) not null,
                exist int(15) not null,
                dead int(15) not null,
                heal int(15) not null
                );"""
    #sql语句创建河南省数据表
    sql = """create table if not exists city
                    (name varchar(30) not null,
                    confirm int(15) not null
                    );"""
    cursor.execute(sql)
    cursor.close()
    db.close()