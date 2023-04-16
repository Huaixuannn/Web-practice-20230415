let topic = [
    "introduction",
    "Lab1",
    "國定假日",
    "Lab2 & Lab3",
    "Lab4"
];

let startDate = new Date();

// function setMonthAndDay(startMonth, startDay){
//     startDate.setMonth(startMonth-1,startDay);
//     startDate.setHours(0);
//     startDate.setMinutes(0);
//     startDate.setSeconds(0);
// }

// setMonthAndDay(2,14);

function setMonthAndDay(startMonth, startDay){
    startDate.setMonth(startMonth,startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

setMonthAndDay(2,14);
