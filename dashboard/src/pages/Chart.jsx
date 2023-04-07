import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import ChartFour from "../components/ChartFour";
import ChartOne from "../components/ChartOne";
import ChartTwo from "../components/ChartTwo";
import ChartThree from "../components/ChartThree";
import Card from "../components/Card";
import ViewIcon from "/src/images/icon/eye-icon.svg";
import useFetch from "../hooks/useFetch";
import CheckMarkIcon from "/src/images/icon/check-mark-icon.svg";
import AvgIcon from "/src/images/icon/calculator-icon.svg";
import UserIcon from "/src/images/icon/users-icon.svg";

const Chart = () => {
  const { error, response, loading } = useFetch(
    "https://api.phishdetector.live/statistics",
    "token"
  );

  return (
    <DefaultLayout>
      {/* <Breadcrumb  /> */}

      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card
          config={{
            path: ViewIcon,
            title: "Total Blocked Sites",
            stats: response?.total_blacklisted_sites,
          }}
        />
        <Card
          config={{
            path: CheckMarkIcon,
            title: "Total number of detections",
            stats: response?.detections?.total,
          }}
        />
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne lastWeek={response?.detections?.last_week} />
        <ChartTwo lastWeek={response?.detections?.last_week} />
        <ChartThree by_browser={response?.detections.by_browser} />
        <ChartThree by_browser={response?.detections.by_os} />
      </div>
    </DefaultLayout>
  );
};

export default Chart;
