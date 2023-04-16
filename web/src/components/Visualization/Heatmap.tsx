import { useState } from "react";

const Heatmap = ({ dates }: { dates: Array<Date> | undefined }) => {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(0);

  const yearCounts: Array<Array<number>> = [];
  // Find the earliest date in the input array
  if (dates) {
    let earliestDate: Date = dates[0];
    for (const date of dates) {
      if (date < earliestDate) {
        earliestDate = date;
      }
    }

    const startYear = earliestDate.getFullYear();
    const endYear = currentDate.getFullYear();

    for (let year = 0; year <= endYear - startYear; year++) {
      yearCounts.push(new Array(365).fill(0));
      for (const date of dates) {
        if (date.getFullYear() === startYear + year) {
          yearCounts[year][getDayOfYear(date)] += 1;
        }
      }
    }

    console.log(yearCounts); // Outputs an array with the counts for each day of the year
  }

  // Helper function to get the day of year for a given date
  function getDayOfYear(date: Date) {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear;
  }

  return (
    <div className="flex flex-col">
      test{" "}
      <div className="flex flex-row break-words ">
        {yearCounts &&
        yearCounts[selectedYear].map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      
    </div>
  );
};

export default Heatmap;
