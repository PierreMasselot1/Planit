//check if two dates happened withing 24 hours of each other
export function isWithin24Hours(date1: Date, date2: Date): boolean {
  const millisecondsInDay = 86400000;
  const millisecondsDifference = date1.getTime() - date2.getTime();
  return (
    millisecondsDifference < millisecondsInDay && millisecondsDifference > 0
  );
}
