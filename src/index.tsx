import React from 'react';
import ReactDom from 'react-dom';
//windows
// import { Facility } from './components/Facility';
// import { Reservation } from './components/Reservation';
import { Routing } from './components/Routing';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Utils from '@date-io/dayjs';
import 'dayjs/locale/ja';
import dayjs, { Dayjs } from 'dayjs';
import { BrowserRouter } from 'react-router-dom';

dayjs.locale('ja');

class ExtendedUtils extends Utils {
  getCalendarHeaderText(date: Dayjs) {
    return date.format('YYYY年 MMM');
  }

  getDatePickerHeaderText(date: Dayjs) {
    return date.format('M/D');
  }
}

ReactDom.render(
  <MuiPickersUtilsProvider utils={ExtendedUtils} locale="ja">
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </MuiPickersUtilsProvider>,
  document.getElementById('container'),
);
