import { CurveData } from "@/services/summary";
import * as echarts from "echarts";
import { useEffect } from "react";

const axisOption: echarts.EChartsOption = {
  grid: {
    show: false,
    left: 0,
    right: 0.5,
    top: 0,
    bottom: 1,
  },
  xAxis: {
    type: "time",
    show: true,
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#56627833",
      },
    },
    axisLine: {
      lineStyle: {
        color: "#566278",
        type: "dashed",
      },
    },
  },
  yAxis: {
    show: true,
    axisLabel: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: "#566278",
        type: "dashed",
      },
    },
  },
};

const seriesOption: echarts.LineSeriesOption = {
  type: "line",
  itemStyle: {
    opacity: 0,
  },
  lineStyle: {
    color: "#00FFFF",
  },
  areaStyle: {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "rgba(0, 255, 255, 1)",
      },
      {
        offset: 0.5,
        color: "rgba(0, 255, 255, 0.29)",
      },
      {
        offset: 1,
        color: "rgba(0, 255, 255, 0)",
      },
    ]),
  },
};

function formatData(
  data: CurveData
): NonNullable<echarts.LineSeriesOption["data"]> {
  const dataset: Record<string, number> = {};
  data.forEach((item) => Object.assign(dataset, item));
  return Object.entries(dataset);
}

export default function Chart(props: { data: CurveData }) {
  const data = formatData(props.data);
  const chartOption = {
    series: [
      {
        data,
        ...seriesOption,
      },
    ],
    ...axisOption,
  };
  useEffect(() => {
    if (echarts.getInstanceByDom(document.getElementById("analytics-chart")!))
      return;
    echarts
      .init(document.getElementById("analytics-chart")!)
      .setOption(chartOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="w-full h-full" id="analytics-chart" />;
}
