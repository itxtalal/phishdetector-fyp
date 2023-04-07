import ReactApexChart from "react-apexcharts";

import React, { useEffect } from "react";
import { useFetcher } from "react-router-dom";

const ChartThree = ({ by_browser }) => {
  // Object.entries(by_browser)?.forEach(([key, value]) => {
  //   console.log(`${key}: ${value}`);
  // });

  const values = by_browser
    ? Object.keys(by_browser).map((key) => by_browser[key])
    : [];
  const labels = by_browser ? Object.keys(by_browser) : [];

  // const entries = Object.entries(by_browser);

  // const listItems = entries.map(([key, value]) => (
  //   <div className="w-full px-8 sm:w-1/2">
  //     <div className="flex w-full items-center">
  //       <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
  //       <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
  //         <span> 1</span>
  //         <span> 2</span>
  //       </p>
  //     </div>
  //   </div>
  // ));

  // console.log({ listItems });

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

  // useEffect(() => {
  //   const array = [];
  //   array.push(chrome, firefox, safari, others)

  // },
  // ,[ chrome, firefox, safari, others ]);

  // const {loading, response, error} = useFetch("", "token") //TODO: replace url
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Visitors Analytics
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

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {/* {by_browser &&
          Object.entries(by_browser).forEach(([key, value]) => {
            return (
              <div className="w-full px-8 sm:w-1/2">
                <div className="flex w-full items-center">
                  <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
                  <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                    <span> 1</span>
                    <span> 2</span>
                  </p>
                </div>
              </div>
            );
          })} */}
        {/* {by_browser &&
          Object.entries(by_browser)?.forEach(([key, value]) => (
            <div className="w-full px-8 sm:w-1/2">
              <div className="flex w-full items-center">
                <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                  <span> 1</span>
                  <span> 2</span>
                </p>
              </div>
            </div>
          ))} */}

        {/* <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Chrome </span>
              <span> 65% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Safari </span>
              <span> 34% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Firefox </span>
              <span> 45% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0FADCF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Others </span>
              <span> 12% </span>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ChartThree;
