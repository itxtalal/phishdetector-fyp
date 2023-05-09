import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import ChartFour from "../components/ChartFour";
import ChartOne from "../components/ChartOne";
import ChartTwo from "../components/ChartTwo";
import ChartThree from "../components/ChartThree";
import Card from "../components/Card";
import ViewIcon from "/src/images/icon/eye-icon.svg";
import XMark from "/src/images/icon/xmark-solid.svg";
import useFetch from "../hooks/useFetch";
import CheckMarkIcon from "/src/images/icon/check-mark-icon.svg";
import AvgIcon from "/src/images/icon/calculator-icon.svg";
import UserIcon from "/src/images/icon/users-icon.svg";

const Chart = () => {
  const [timeFrame, setTimeFrame] = useState("week");
  //TODO: update the url
  const { error, response, loading } = useFetch(
    "https://api.phishdetector.live/statistics",
    "token"
  );

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <DefaultLayout>
      {/* <Breadcrumb  /> */}

      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card
          config={{
            path: XMark,
            title: "Total Blocked Sites",
            stats: response?.total_blacklisted_sites,
          }}
        />
        <Card
          config={{
            path: ViewIcon,
            title: "Total number of detections",
            stats: response?.detections?.total,
          }}
        />
        {/* TODO: undo this total number of whitelisted sites */}
        {/* <Card
          config={{
            path: CheckMarkIcon,
            title: "Total White Lists",
            stats: response?.detections?.total,
          }}
        /> */}
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne
          detections={response?.detections}
          handleTimeFrameChange={handleTimeFrameChange}
          timeFrame={timeFrame}
        />
        <ChartTwo />
      </div>
    </DefaultLayout>
  );
};

export default Chart;
