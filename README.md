# COVID-19
本项目为基于HBase和javaweb的全国疫情可视化
首先通过python爬取网络上疫情数据接口并存储为sql文件；
在虚拟机中本地创建csv文件并上传到HDFS，利用Bulk Load方式实现数据的转存；
之后在maven web项目中连接HBase并获取需要的数据；
最后通过Echarts技术实现数据的可视化。
以下为项目最终实现界面
![image](https://user-images.githubusercontent.com/118653137/211796783-175c5df5-3385-4f95-a582-b99a5e9b4e29.png)
