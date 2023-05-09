import ReactApexChart from "react-apexcharts";

import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const timeFrameDays = {
  week: 7,
  month: 30,
  year: 365,
};

const ChartTwo = () => {
  //TODO: update the url
  const { error, response, loading } = useFetch(
    "https://api.phishdetector.live/statistics",
    "token"
  );
  const weekDaysRel = Array.from({ length: 7 }, (_, i) => {
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const day = weekdays[date.getDay()];

    return `${day}`;
  }).reverse();

  const state = {
    series: [
      {
        name: "Blck. Listed",
        data: response?.detections?.last_week || [],
      },
      {
        name: "Wht. Listed",
        data: [44, 55, 41, 67, 22, 43, 65],
      },
    ],
    options: {
      colors: ["#3C50E0", "#80CAEE"],
      chart: {
        fontFamily: "Satoshi, sans-serif",
        type: "bar",
        height: 335,
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },

      responsive: [
        {
          breakpoint: 1536,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 0,
                columnWidth: "25%",
              },
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
          columnWidth: "25%",
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
        },
      },
      dataLabels: {
        enabled: false,
      },

      xaxis: {
        categories: weekDaysRel,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        fontFamily: "Satoshi",
        fontWeight: 500,
        fontSize: "14px",

        markers: {
          radius: 99,
        },
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Detected this week
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
