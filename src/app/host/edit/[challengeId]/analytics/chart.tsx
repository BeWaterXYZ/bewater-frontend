import { CurveData } from "@/services/summary";
import * as echarts from "echarts";
import { useEffect, useState } from "react";
import "./chart.css";
import { format } from "date-fns";

const chartOption: (tooltip: string, font?: string) => echarts.EChartsOption = (
  tooltip,
  font
) => ({
  grid: {
    show: false,
    left: 20,
    top: 10,
    bottom: 20,
  },
  axisPointer: [
    {
      show: "auto",
      z: 0,
      lineStyle: {
        type: "solid",
        color: "white",
      },
    },
  ],
  tooltip: {
    trigger: "axis",
    className: "analytics-chart-tooltip",
    borderColor: "#1E293B",
    backgroundColor: "#141527",
    textStyle: {
      color: "white",
      fontFamily: font,
    },
    padding: [14, 16],
    formatter: ([
      {
        value: [date, num],
      },
    ]: any) => {
      const dateStr = format(new Date(date), "LLL dd, yyyy");
      return `<p>${tooltip}<span>${num}</span></p><p>${dateStr}</p>`;
    },
  },
  xAxis: {
    type: "time",
    show: true,
    axisLabel: {
      show: true,
      fontFamily: font,
      formatter: (date: number) => format(date, "MM-dd"),
    },
    axisTick: {
      show: true,
    },
    splitLine: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "#566278",
        type: "solid",
      },
    },
  },
  yAxis: {
    show: true,
    axisLabel: {
      show: true,
      fontFamily: font,
    },
    position: "right",
    splitLine: {
      lineStyle: {
        color: "#56627833",
        type: "solid",
      },
    },
  },
});

const seriesOption: echarts.LineSeriesOption = {
  type: "line",
  showSymbol: false,
  symbol: "circle",
  symbolSize: 9,
  itemStyle: {
    opacity: 1,
    color: "#00FFFF",
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

export default function Chart(props: {
  data: CurveData;
  title: string;
  font?: string;
}) {
  const hasData = props.data.length > 0;
  const data = formatData(props.data);
  const option = {
    series: [
      {
        data,
        ...seriesOption,
      },
    ],
    ...chartOption(props.title, props.font),
  };
  useEffect(() => {
    const chart = echarts.getInstanceByDom(
      document.getElementById("analytics-chart")!
    );
    if (!chart)
      echarts
        .init(document.getElementById("analytics-chart")!)
        .setOption(option);
    else chart.setOption(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.font, props.title]);
  return (
    <>
      <div
        className="w-full h-full"
        style={{ opacity: hasData ? 1 : 0 }}
        id="analytics-chart"
      />
      {!hasData && (
        <div className="w-full h-full flex items-center justify-center text-[#64748B] absolute left-0 top-0 text-sm leading-[20px] font-secondary">
          No data yet
        </div>
      )}
    </>
  );
}
