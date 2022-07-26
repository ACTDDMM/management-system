<template>
  <div class="travel-map">
    <div id="main"></div>
  </div>
</template>

<script>
import geoJson from "@/assets/data.json";
export default {
  mounted() {
    console.log(geoJson);
    let myChart = this.$echarts.init(document.getElementById("main"));
    // 注册可用的地图，必须包括geo组件或者map图标类型 才能使用
    this.$echarts.registerMap("china", geoJson);

    let option = {
      backgroundColor: "#0aa1ed",
      // geo组件
      geo: {
        map: "china",
        aspectScale: 0.75,
        zoom: 1.1,
        label: {
          show: true,
          color: "#eee",
        },
        itemStyle: {
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "#09132c",
              },
              {
                offset: 1,
                color: "#274d68",
              },
            ],
            globalCoord: true,
          },
        },
        emphasis: {
          itemStyle: {
            areaColor: "rgb(46,229,206)",
            borderWidth: 0.1,
          },
          label: {
            color: "rgb(183,155,64)",
          },
        },
        regions: [
          {
            name: "南海诸岛",
          },
        ],
        series: [
          // 配置地图相关参数，绘制地图
          {
            // 关于地图图表的相关设置
            type: "map",
            map: "china",
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            showEffectOn: "render",
            symbolSize: 10, //散点大小
            data: [
              { value: [118.8062, 31.9208], itemStyle: { color: "#fff" } },
            ],
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: "fill",
            },
          },
        ],
      },
    };
    myChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.travel-map {
  width: 100%;
  #main {
    width: 100%;
    height: 600px;
  }
}
</style>  