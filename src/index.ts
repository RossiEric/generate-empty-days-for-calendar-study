import {
  IPrevisionAndReceivementCalendarDateDataDTO,
  IPrevisionAndReceivementCalendarDateDTO
} from "./dtos/PrevisionAndReceivementDTO";
import { default as obj } from "./dtos/AgrupadoDataMovimento.json";
import fs from "fs";

const Calendar: IPrevisionAndReceivementCalendarDateDTO[] = [];
obj.data.forEach((elem, index) => {
  const date = <IPrevisionAndReceivementCalendarDateDTO>(<unknown>{
    key: index,
    dates: elem.dataPagamento
  });

  const data = <IPrevisionAndReceivementCalendarDateDataDTO>(<unknown>{
    statusDia: elem.statusDia,
    statusValor: elem.statusValor,
    valor: elem.valor,
    dataEmissao: elem.dataPagamento
  });

  date.customData = data;

  //saida diferente
  Calendar.push(date);
});

// Returns an array of dates between the two dates
function getDates(startDate: Date, endDate: number | Date) {
  const dates = [];
  let currentDate = startDate;
  const addDays = function (this: any, days: number) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}

const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth() - 6, 1);
const lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

const CalendarNovosDias: IPrevisionAndReceivementCalendarDateDTO[] = [];
const allDates: Date[] = [];
// Usage
const dates = getDates(firstDay, lastDay);
dates.forEach(function (date) {
  console.log(date);
  allDates.push(date);

  const index = Calendar.findIndex(
    (day) => new Date(day.dates).getDate() === date.getDate()
  );
  if (index <= -1) {
    console.log(date);
    const date2 = <IPrevisionAndReceivementCalendarDateDTO>(<unknown>{
      key: Calendar.length + CalendarNovosDias.length,
      dates: date,
      customData: <IPrevisionAndReceivementCalendarDateDataDTO>(<unknown>{
        statusDia: "SemDados",
        statusValor: "SemDados",
        valor: 0,
        dataEmissao: date
      })
    });
    CalendarNovosDias.push(date2);
  }
});

const CalendarFinal = [...Calendar, ...CalendarNovosDias];

fs.writeFile(
  "output-datas-corridas.json",
  JSON.stringify(allDates),
  function (err: any) {
    if (err) throw err;
    console.log("complete");
  }
);

fs.writeFile(
  "output-calendario.json",
  JSON.stringify(CalendarFinal),
  function (err: any) {
    if (err) throw err;
    console.log("complete");
  }
);
