import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "../Common/Button";

const Heatmap = ({ dates }: { dates: Array<Date> | undefined }) => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [curYearMaxCount, setcurYearMaxCount] = useState(0);
  const [yearCounts, setYearCounts] = useState<{ [year: number]: number[] }>(
    {}
  );

  const YearPicker = ({
    startYear,
    endYear,
    selectedYear,
    onChange,
  }: {
    startYear: number;
    endYear: number;
    selectedYear: number;
    onChange: (year: number) => void;
  }) => {
    const years = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => endYear - i
    );

    return (
      <div className="flex-col flex h-24 overflow-y-scroll overflow-x-hidden scrollbar pr-3">
        {years.map((year) => (
          <Button
            key={year}
            onClick={() => onChange(year)}
            className={`w-fit my-0.5 ${
              year === selectedYear ? "bg-primary-500" : ""
            }`}
          >
            {year}
          </Button>
        ))}
      </div>
    );
  };
  // Find the earliest date in the input array
  useEffect(() => {
    if (dates && dates.length > 0) {
      const earliestDate: Date = dates[0];
      const startYear = earliestDate.getFullYear();
      const endYear = new Date().getFullYear();
      const yearCountsTemp: { [year: number]: number[] } = {};
      for (let year = 0; year <= endYear - startYear; year++) {
        yearCountsTemp[startYear + year] = Array(366).fill(0);
      }
      for (const date of dates) {
        if (date.getFullYear() >= startYear && date.getFullYear() <= endYear) {
          const year = date.getFullYear() - startYear;
          yearCountsTemp[startYear + year][getDayOfYear(date)] += 1;
        }
      }
      setYearCounts(yearCountsTemp);
    }
  }, [dates]);

  useEffect(() => {
    if (Object.keys(yearCounts).length > 0) {
      setcurYearMaxCount(Math.max(...yearCounts[selectedYear]));
    }
  }, [yearCounts, selectedYear]);

  function getDayOfYear(date: Date) {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear;
  }
  return (
    <div className="flex flex-row h-fit my-1">
      <div className="w-fit h-full">
        <div className="flex flex-wrap">
          {Object.keys(yearCounts).length > 0 &&
            yearCounts[selectedYear].map((completionCount, index) => (
              <div
                key={index}
                className={`${
                  completionCount > 0
                    ? `text-primary-${
                        Math.floor((completionCount / curYearMaxCount) * 5) *
                        100
                      }`
                    : "text-gray-500"
                }`}
              >
                <FontAwesomeIcon
                  className={`align-top block m-px w-2 sm:w-3 h-2 sm:h-3 `}
                  icon={faSquare}
                />
              </div>
            ))}
        </div>
      </div>

      <YearPicker
        startYear={dates ? dates[0].getFullYear() : new Date().getFullYear()}
        endYear={new Date().getFullYear()}
        selectedYear={selectedYear}
        onChange={(year) => {
          setSelectedYear(year);
        }}
      />
    </div>
  );
};

export default Heatmap;
