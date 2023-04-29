import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Heatmap = ({ dates }: { dates: Array<Date> | undefined }) => {
  const [selectedYear, setSelectedYear] = useState(0);
  const [curYearMaxCount, setcurYearMaxCount] = useState(0);
  const [yearCounts, setYearCounts] = useState<Array<Array<number>>>([]);
  // Find the earliest date in the input array
  useEffect(() => {
    if (dates) {
      const earliestDate: Date = dates[0];
      const startYear = earliestDate.getFullYear();
      const endYear = new Date().getFullYear();
      let yearCountsTemp = new Array<Array<number>>();
      for (let year = 0; year <= endYear - startYear; year++) {
        yearCountsTemp.push(new Array(365).fill(0));
        for (const date of dates) {
          if (date.getFullYear() === startYear + year) {
            yearCountsTemp[year][getDayOfYear(date)] += 1;
          }
        }
      }

      setYearCounts(yearCountsTemp);
    }
  }, [dates]);

  useEffect(() => {
    if (yearCounts.length > 0)
      setcurYearMaxCount(Math.max(...yearCounts[selectedYear]));
  }, [yearCounts, selectedYear]);

  function getDayOfYear(date: Date) {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear;
  }
  return (
    <div className="flex flex-wrap">
      {yearCounts?.length > 0 &&
        yearCounts[selectedYear].map((completionCount, index) => (
          <div key={index}>
            <FontAwesomeIcon
              className={` ${
                (completionCount > 0 &&
                  "text-teal-" +
                    (Math.floor((completionCount / curYearMaxCount) * 5) + 1) *
                      100) ||
                "text-gray-500"
              } align-top block m-px w-2 sm:w-3  h-2 sm:h-3`}
              icon={faSquare}
            />
          </div>
        ))}
    </div>
  );
};

export default Heatmap;
