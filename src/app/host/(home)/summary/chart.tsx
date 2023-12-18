import { CurveData } from "@/services/summary";
import * as echarts from "echarts";
import { useEffect, useState } from "react";

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
  const records = Object.entries(dataset);
  const interval =
    records.length > 10 ? Math.floor((records.length - 1) / 10) + 1 : 1;
  return interval === 1
    ? records
    : records.filter((_, index) => {
        const willMerge = index % interval !== 0;
        if (willMerge)
          records[Math.floor(index / interval)][1] += records[index][1];
        return !willMerge;
      });
}

export default function Chart(props: { data: CurveData }) {
  const data = formatData(props.data);
  const sum = (data as [any, number]).reduce((acc, cur) => acc + cur[1], 0);
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
    if (echarts.getInstanceByDom(document.getElementById("summary-chart")!))
      return;
    echarts
      .init(document.getElementById("summary-chart")!)
      .setOption(chartOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="w-full h-full" id="summary-chart" />
      <p className="absolute right-0 bottom-0 text-xs text-[#B6B6B6] leading-[16px] p-1">
        Page Views
        <span className="ml-[8px] text-[#00FFFF] leading-[20px] text-sm text-bold">
          {sum}
        </span>
      </p>
    </>
  );
}
