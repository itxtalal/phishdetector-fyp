import ReactApexChart from "react-apexcharts";

import React, { useMemo, useState } from "react";
import ChartThree from "./ChartThree";

const timeFrameDays = {
  week: 7,
  month: 30,
  year: 12,
};

const ChartOne = ({ detections }) => {
  const [timeFrame, setTimeFrame] = useState("week");

  const timeFrameDates = Array.from(
    { length: timeFrameDays[timeFrame] },
    (_, i) => {
      const today = new Date();

      if (timeFrame == "year") {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthName = date.toLocaleString("default", { month: "long" });

        return monthName;
      }

      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return `${formattedDate}`;
    }
  ).reverse();

  const data = useMemo(() => {
    if (timeFrame == "month") {
      return {
        name: "Blck. Listed",
        data: detections?.last_month || [],
      };
    } else {
      return {
        name: "Blck. Listed",
        data: detections?.last_week || [],
      };
    }
  }, [detections]);

  const state = {
    series: [
      {
        name: "Blck. Listed",
        data: detections?.last_week || [],
      },
    ],
    options: {
      legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
      },
      colors: ["#3C50E0", "#80CAEE"],
      chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "area",
        dropShadow: {
          enabled: true,
          color: "#623CEA14",
          top: 10,
          blur: 4,
          left: 0,
          opacity: 0.1,
        },

        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              height: 300,
            },
          },
        },
        {
          breakpoint: 1366,
          options: {
            chart: {
              height: 350,
            },
          },
        },
      ],
      stroke: {
        width: [2, 2],
        curve: "straight",
      },
      labels: {
        show: false,
        position: "top",
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#3056D3", "#80CAEE"],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
          size: undefined,
          sizeOffset: 5,
        },
      },
      xaxis: {
        type: "category",
        categories: timeFrameDates,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          style: {
            fontSize: "0px",
          },
        },
        min: 0,
        max: Math.max(...(data.data || [])),
      },
    },
  };

  return (
    <div className="xl:col-span-12/8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="whitespace-nowrap font-semibold text-primary">
                Total Sites
              </p>
              {/* TODO: donot hard code */}
              <p className="text-sm font-medium">{`${timeFrameDates[0]} - ${
                timeFrameDates[timeFrameDates.length - 1]
              }`}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5 mb-3">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <ChartThree
          title="Browser Analytics"
          by_browser={detections?.by_browser}
        />
        <ChartThree title="OS Analytics" by_browser={detections?.by_os} />
      </div>
    </div>
  );
};

export default ChartOne;
