function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrayNest) {
  return arrayNest.map(createEmployeeRecord);
}

function createTimeInEvent(record, time) {
  const timeMod = time.split(" ");
  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(timeMod[1]),
    date: timeMod[0],
  });
  return record;
}

function createTimeOutEvent(record, time) {
  const timeMod = time.split(" ");
  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(timeMod[1]),
    date: timeMod[0],
  });
  return record;
}

function hoursWorkedOnDate(record, date) {
  for (let i of record.timeInEvents) {
    for (let o of record.timeOutEvents) {
      if (i.date === date && o.date === date) {
        return (o.hour - i.hour) / 100;
      }
    }
  }
}

function wagesEarnedOnDate(record, date) {
  for (let i of record.timeInEvents) {
    for (let o of record.timeOutEvents) {
      if (i.date === date && o.date === date) {
        return hoursWorkedOnDate(record, date) * record.payPerHour;
      }
    }
  }
}
function allWagesFor(record) {
  let total = 0;
  for (let i of record.timeInEvents) {
    for (let o of record.timeOutEvents) {
      if (i.date === o.date) {
        let date = i.date;
        let pay = hoursWorkedOnDate(record, date) * record.payPerHour;
        total += pay;
      }
    }
  }
  return total;
}

function calculatePayroll(records) {
    return records.reduce((m, e) => m + allWagesFor(e), 0)
}