import React, { useRef, useState } from "react";

const useSearch = (records) => {
  const [filteredRecords, setFilteredRecords] = useState();
  const searchRef = useRef();

  const handleSearch = (e) => {
    searchRef.current = e.target.value;
    setFilteredRecords(
      records.filter((record) =>
        record.domain
          .toLowerCase()
          .includes(e.target.value.toLowerCase().trim())
      )
    );
  };

  return { filteredRecords, handleSearch, searchRef };
};

export default useSearch;
