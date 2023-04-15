const Heatmap = ({ dates }: { dates: Array<Date> | undefined }) => {
  // Find the earliest date in the input array
  console.log(dates);
  // Find the earliest date in the input array
  if (dates) {
    let earliestDate: Date = dates[0];
    for (const date of dates) {
      if (date < earliestDate) {
        earliestDate = date;
      }
    }
    console.log(earliestDate);
    // Initialize an array with the number of days between the earliest date and December 31st of that year
    console.log(earliestDate.getFullYear());
    const daysInYear = 365 + Number(earliestDate.getFullYear() % 4 === 0);
    const daysSinceStartOfYear = getDayOfYear(earliestDate) - 1; // Subtract 1 since arrays are 0-indexed
    const counts = Array(daysInYear - daysSinceStartOfYear).fill(0);

    // Loop through each date and increment the corresponding count
    for (const date of dates) {
      const dayOfYear = getDayOfYear(date) - daysSinceStartOfYear;
      counts[dayOfYear]++;
    }
    console.log(counts); // Outputs an array with the counts for each day of the year
  }
  console.log("here");
  // Helper function to get the day of year for a given date
  function getDayOfYear(date: Date) {
    console.log(date);
    console.log("fuck");
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear;
  }

  return <div className="flex flex-col">test</div>;
};

export default Heatmap;
