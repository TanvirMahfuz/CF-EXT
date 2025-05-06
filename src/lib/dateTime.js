
export function convertTime(timestamp){
  const date = new Date(timestamp * 1000); 
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedTime
}