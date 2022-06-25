var date1 = new Date("December 25, 2017 01:30:00");
var date2 = new Date("June 18, 2016 02:30:00");

//best to use .getTime() to compare dates
if (date1.getTime() === date2.getTime()) {
  console.log("equal");
}

if (date1.getTime() > date2.getTime()) {
  console.log(date1.getTime());
  console.log(date2.getTime());
  console.log("greater");
}
