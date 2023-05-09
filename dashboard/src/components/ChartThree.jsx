import ReactApexChart from "react-apexcharts";

import React, { useEffect } from "react";
import { useFetcher } from "react-router-dom";

const ChartThree = ({ by_browser, title }) => {
  // Object.entries(by_browser)?.forEach(([key, value]) => {
  //   console.log(`${key}: ${value}`);
  // });

  const values = by_browser
    ? Object.keys(by_browser).map((key) => by_browser[key])
    : [];
  const labels = by_browser ? Object.keys(by_browser) : [];

  const state = {
    series: values,
    options: {
      chart: {
        fontFamily: "Satoshi, sans-serif",
        type: "donut",
      },
      colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],
      labels: labels,
      legend: {
        show: true,
        position: "bottom",
      },

      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            background: "transparent",
          },
        },
      },

      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2600,
          options: {
            chart: {
              width: 380,
            },
          },
        },
        {
          breakpoint: 640,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    },
  };

  // const {loading, response, error} = useFetch("", "token") //TODO: replace url
  return (
    <div className="col-span-3 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-3">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
