const Heatmap = ({ dates }) => {
  // Define the color scale for the heatmap
  const colorScale = ["#FEE5D9", "#FCAE91", "#FB6A4A", "#DE2D26", "#A50F15"];

  // Calculate the minimum and maximum dates from the array
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);

  // Calculate the number of days between the minimum and maximum dates
  const numDays = Math.round((maxDate - minDate) / (1000 * 60 * 60 * 24));

  // Create an array of date objects for each day in the range
  const days = Array.from({ length: numDays }, (_, i) => {
    const date = new Date(minDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  // Calculate the contribution count for each day
  const counts = days.map((day) => {
    return dates.filter((date) => {
      return new Date(date).toDateString() === day.toDateString();
    }).length;
  });

  // Calculate the maximum count to use for scaling the color
  const maxCount = Math.max(...counts);

  return (
    <div className="flex flex-col">
      {/* Render the day labels */}
      <div className="flex">
        <div className="w-16"></div>
        {days.map((day, i) => (
          <div
            key={i}
            className="w-8 text-xs text-gray-500 font-semibold text-center"
          >
            {day.toLocaleDateString("en-US", { weekday: "short" })}
          </div>
        ))}
      </div>
      {/* Render the heatmap squares */}
      {colorScale.map((color, i) => (
        <div key={i} className="flex">
          <div className="w-16 text-xs text-gray-500 font-semibold text-right">
            {Math.round((i / (colorScale.length - 1)) * maxCount)}
          </div>
          {counts.map((count, j) => (
            <div
              key={j}
              className={`w-8 h-8 m-1 rounded-md bg-teal-${
                (j / counts.length) * maxCount * 100
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Heatmap;
