const Papa = require("papaparse");
const fs = require("fs");
const { start } = require("repl");

const dayjs = require("dayjs");
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

// Pfad zur CSV-Datei
const csvFilePath = "./fish_df.csv";

// Lies den Inhalt der CSV-Datei
const csvData = fs.readFileSync(csvFilePath, "utf8");

// Parse die CSV-Date
const result = Papa.parse(csvData, {
  header: true, // Wenn die CSV eine Kopfzeile hat
  error: function (error) {
    console.error("Parsing error:", error);
  },
});

//Standard forEach
/*
result.data.forEach((row, index, value) => {
  console.log(`Element ${index}: ${row.value}`);
});
*/

// Funktion, um das Datum aus der Startzeit zu extrahieren
function getDateOrTime(row, DateOrTime) {
  let separation = row["start_time"].split(" ");
  switch (DateOrTime) {
    case "date":
      return separation[0];
    case "time":
      return separation[1];
    default:
      return separation[0];
  }
}

// Iteriere über den Datensatz und gib das Datum aus
result.data.forEach((row, index) => {
  // console.log(`Element ${index}: ${getDateOrTime(row, "time")}`);
});

console.log(result.data[0]["start_time"]);
console.log(result.data[0]["duration"]);

a = dayjs(result.data[0]["start_time"]).add(
  dayjs.duration(result.data[0]["duration"])
);
console.log(a);

/*
// find out endTime
result.data.forEach((row, index) => {
  let starttime = row["start_time"];
  starttime = new Date();
  console.log("Index:" + index + " " + starttime);

  let duration = result.data[index]["duration"];
  let endtime = starttime + duration;

});
  */
