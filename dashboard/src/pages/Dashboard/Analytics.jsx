import React from "react";

import DefaultLayout from "../../layout/DefaultLayout";
import Card from "../../components/Card";
import TableOne from "../../components/TableOne";
import ChartOne from "../../components/ChartOne";
import ChartTwo from "../../components/ChartTwo";
import ChartThree from "../../components/ChartThree";
import useFetch from "../../hooks/useFetch";
import ViewIcon from "/src/images/icon/eye-icon.svg";
import CheckMarkIcon from "/src/images/icon/check-mark-icon.svg";
import AvgIcon from "/src/images/icon/calculator-icon.svg";
import UserIcon from "/src/images/icon/users-icon.svg";
import { BASE_URL } from "../../config";

const Analytics = () => {
  const [timeFrame, setTimeFrame] = React.useState("week");

  const { error, response, loading } = useFetch(
    `${BASE_URL}/statistics`,
    "token"
  );

  const {
    error: bError,
    response: bResponse,
    loading: bLoading,
  } = useFetch("https://642a2247b11efeb75993bc29.mockapi.io/blacklisted");

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card
          config={{
            path: ViewIcon,
            title: "Total Blocked Sites",
            totalBlockedSites: response?.totalBlockedSites,
          }}
        />
        <Card
          config={{
            path: CheckMarkIcon,
            title: "Total Blocked Sites",
            totalBlockedSites: response?.totalWhiteListedSites,
          }}
        />
        <Card
          config={{
            path: AvgIcon,
            title: "Avg. Blocked Sites Per User",
            totalBlockedSites: response?.avgBlockedSitesPerUser,
          }}
        />
        <Card
          config={{
            path: UserIcon,
            title: "Total Users",
            totalBlockedSites: response?.totalUsers,
          }}
        />
      </div>

      {!bLoading && (
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartOne />
          <ChartTwo />
          <ChartThree />
          <div className="col-span-12">
            <TableOne fetchedRecords={bResponse} />
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Analytics;
