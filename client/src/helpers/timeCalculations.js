//  Flight Day - flight card
export const flightDayCalculation = (time) => {
  return new Date(time).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",  
  });
};

//Flight hour- flight card
export const flightHourCalculation = (time) => {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};


//Flight hour- flight card
export const fullTimeForScreenCalculation = (time) => {
  return new Date(
    time
  ).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).replace('at ','')
};

 