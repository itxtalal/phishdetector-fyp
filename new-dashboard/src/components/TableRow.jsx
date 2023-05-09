import React from "react";
import { Link } from "react-router-dom";
import { highlight } from "../utils/helperFunctions";

const TableRow = ({
  record: { lastUpdated, domain, timesBlocked, id },
  searchText = "",
}) => {
  return (
    <tr className="bg-white">
      <td className="whitespace-no-wrap border-gray-100 border-b px-6 py-2">
        <input
          className="form-checkbox text-indigo-600 h-4 w-4 transition duration-150 ease-in-out"
          type="checkbox"
        />
      </td>
      <td className="whitespace-no-wrap border-gray-100 border-b px-6 py-2">
        <div className="text-blue-500 text-sm leading-5">
          {highlight({ search: searchText, children: domain })}
        </div>
      </td>
      <td className="whitespace-no-wrap border-gray-100 border-b px-6 py-2">
        <div className="flex h-10 w-10 flex-shrink-0 items-center gap-1">
          <span className="undeline text-gray-500 center text-sm">none</span>
        </div>
      </td>

      <td className="whitespace-no-wrap border-gray-100 border-b px-6 py-2">
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 `}
        >
          {timesBlocked}
        </span>
      </td>
      <td className="whitespace-no-wrap border-gray-100 text-gray-500 border-b px-6 py-2 text-sm leading-5">
        <span className="bg-gray-700/[0.04] text-gray-500 text-xxs rounded-lg px-1 py-1 italic">
          {new Date(lastUpdated).toDateString()}
        </span>
      </td>
      <td className="whitespace-no-wrap border-gray-100 border-b px-6 py-2 text-right text-sm font-medium leading-5">
        <Link to={id.toString()}>
          <span className="text-blue-500 hover:text-blue-700 underline focus:underline focus:outline-none">
            Show
          </span>
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
