"use client";
import { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import styles from "./chart.module.css";

interface Props<T> {
  id: string;
  data: T[];
}
const XYChart = <T,>({ id, data }: Props<T>) => {
  //타입추론 부모컴포넌트에서 설정할 수 있도록
  const chartRef = useRef<am4charts.XYChart | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; //클라이언트 사이드가 아니라면 return
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create(id, am4charts.XYChart); //xychart 설정
    chart.data = data; //데이터

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";
    series.strokeWidth = 3;
    series.bullets.push(new am4charts.CircleBullet());

    chart.cursor = new am4charts.XYCursor();

    chart.events.on("beforedatavalidated", function (ev) {
      //데이터를 날짜순으로 정렬
      chart.data.sort((a, b) => {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);
        if (isNaN(dateA) || isNaN(dateB)) {
          console.error("Invalid date encountered");
          return 0;
        }
        return dateA - dateB;
      });
    });

    chartRef.current = chart;
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    };
  }, []);
  return <div id={id} className={styles.chart} />;
};

export default XYChart;
