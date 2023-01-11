/**
 * 实现左上
 */
(function () {
    var myChart = echarts.init(document.querySelector('.bar .chart'))
    var option = {
     
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            //指示器
            axisPointer: {
                type: 'shadow',  //默认为直线，可选为： ‘line’ | 'shadow' 阴影
                label: {
                     backgroundColor: '#6a7985'
                    }
            }
        },
        xAxis: {
            tpye: 'category',
            data: [],  //['湖北','广州','北京']
        // x轴线的颜色为   rgba(255,255,255,.2)
            axisLine: {
            lineStyle: {
                color: "rgba(255,255,255,.2)"
              }
            },
            axisLabel: {
            	interval:0,
            	formatter: function(value) {
                    return value.split('').join('\n')
                  },
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },
        },
        grid: {
            left: '1%',
            right: '1%',
            top:'4%',
            bottom: '4%',//离底部
            
            containLabel: true,
            show:'true',
            borderWidth:'0'//边框
       },
        yAxis: {
            type: 'value',
            //y轴字体设置
            // 修改分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            },
            //标注y轴线样式
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            },
            //标注文本
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 8
                }
            },
            axisLable: {
                show: true,
                color: 'white',
                fontSize: 10,
                formatter: function (value) {
                    if (value >= 1000) {
                        value = value / 1000 + 'k';
                    }
                    return value;
                }
            },
        },

        series: [{
            data: [],//[582,300,100],
            type: 'bar',
            barMaxWidth: "70%"
        }]
    };
    myChart.setOption(option);
    var names=[];
    var nums=[];
  
 window.addEventListener('resize', function() {
        myChart.resize()
    })
})();

/**
 * 实现地图模块并实时连接数据
 */
(function () {
    var myChart = echarts.init(document.querySelector('.map .chart'))

    var option = {
        title: {//标题相关
            text: "全国累计确诊人数分布图",
            left: "center",
            textStyle: {
                fontSize: 22,
                color: 'white'
            },
            top: 'top'
        },
        tooltip: {//提示框
            trigger: "item",
            formatter: function (params) {
                var value = params.value + '';
                return params.seriesName + '<br/>' + params.name + ' : ' + value + '人';
            }
        },
        visualMap: {
            min: 0,
            max: 1200,
            text: ['High', 'Low'],
            realtime: false,
            calculable: false,
            textStyle: {
                color: 'white'
            },
            color: ['#481380', '#7f78d2', '#efb1ff', '#ffe2ff']
        },
        series: [
            {
                name: "累计确诊数",
                type: "map",
                mapType: "china",
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#fce8d5',
                        borderColor: 'rgb(0,108,255)',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            color: 'black'
                        },
                        areaColor: '#fce8d5'
                    }
                },
            },
        ],
    };

    //使用指定的配置项和数据显示图表
    myChart.setOption(option);

   


    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();


/**
 * 实现上方确诊人数
 */
function getData() {
	addcon="9506895";
    adddeath="31509";
    document.getElementById("addcon").innerHTML=addcon;
    document.getElementById("adddeath").innerHTML=adddeath;
    }

    getData();


/**
 * 南丁格尔玫瑰图
 */
(function() {
 // 基于准备好的dom，初始化echarts实例
 var myChart = echarts.init(document.querySelector(".bar1 .chart"));
 option = {
     dataset: {
         source: [
             ['Country', 'Confirmed']
         ]
     },
     calculable: true,
     tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{c} ({d}%)'
     },
     series: [{
             name: '确诊人数',
             type: 'pie',
             clockWise: false,
             radius: [30, 390],
             center: ['78%', '80%'],
             roseType: 'area',
             encode: {
                 itemName: 'Country',
                 value: 'Confirmed'
             },
             itemStyle: {
                 normal: {
                     color: function(params) {
                         var colorList = [
                             "#a71a4f", "#c71b1b", "#d93824", "#e7741b", "#dc9e31", "#d2b130", "#8cc13f", "#53b440", "#48af54", "#479c7f", "#48a698", "#57868c"
                         ];
                         return colorList[params.dataIndex]
                     },
                     label: {
                         position: 'inside',
                         textStyle: {
                             fontWeight: 'bold',
                             fontFamily: 'Microsoft YaHei',
                             color: '#FAFAFA',
                             fontSize: 10
                         },
                   
                         //formatter:'{b} \n{@Confirmed}例 \n死亡{@Dead}',//注意这里大小写敏感哦
                         formatter: function(params) {         //大于1000时将省份姓名展示在南丁格尔玫瑰图上
                             // console.log('参数列表', params)
                             if (params.data[1] > 1000) { return params.data[0] } else { return ""; }
                         },

                     },
                 },
             },

         },
         {
             name: '透明圆圈',
             type: 'pie',
             radius: [8, 20],
             center: ['78%', '80%'],
             itemStyle: {
                 color: 'rgba(250, 250, 250, 0.3)',
             },
             data: [
                 { value: 5, name: '' }
             ]
         },
         {
             name: '透明圆圈',
             type: 'pie',
             radius: [8, 28],
             center: ['78%', '80%'],
             itemStyle: {
                 color: 'rgba(250, 250, 250, 0.3)',
             },
             data: [
                 { value: 5, name: '' }
             ]
         }
     ]

 };

 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);
 var virus = [
     ['Country', 'Confirmed']
 ]


 window.addEventListener("resize", function() {
     myChart.resize();
 });
})();

//确诊趋势模块
(function() {
    var myChart = echarts.init(document.querySelector('.line .chart'))
    var option = {
        tooltip: {
            trigger: 'axis',
           
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        //图例
        legend: {
            top: "0%",
            //图例字体样式
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        // 坐标系
        grid: {
        	  left: '1%',
              right: '2%',
              top:'4%',
              bottom: '4%',//离底部
             containLabel: true,
             show:'true',
             borderWidth:'0'//边框
        },
        xAxis: [{
            type: 'category',
            data:[],
            boundaryGap: false,
            // data: ['二月', '三月', '四月', '五月', '六月'],
            // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
            axisLabel: {
           
            	  interval:0,
            	
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 6
                }
            },
            // x轴线的颜色为   rgba(255,255,255,.2)
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.2)"
                }
            },
        }],
        yAxis: [{
            type: 'value',
            //隐藏坐标轴刻度
            axisTick: { show: false },
            //标注y轴线样式
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            },
            //标注文本
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 8
                }
            },
            // 修改分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            }
        }],
        //主题样式设计
        series: [{
                name: '累计确诊',
                type: 'line',
              
                 stack: '总量', //数据堆叠
                 data: [],
                //线圆滑
                smooth: true,
                // 单独修改线的样式
         
                lineStyle: {
                    color: "#0184d5",
                    width: 2
                },
                // 填充区域
                areaStyle: {
                    // 渐变色
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [{
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)" //阴影颜色
                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 拐点大小
                symbolSize: 8,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                //开始不显示坐标圆点
                showSymbol: false,
            },
            {
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                name: "累计死亡",
                type: "line",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: "#00d887",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [{
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(0, 216, 135, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 拐点大小
                symbolSize: 5,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                 data: [],
                 stack: '总量',
            }
        ]
    };
    // 把配置和数据给实例对象
    myChart.setOption(option);
    window.addEventListener('resize', function() {
        myChart.resize()
    })
})();