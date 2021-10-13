import React, { useCallback, useContext } from 'react';
import { CurrentDateContext } from './ReservationList';
import { Button, makeStyles } from '@material-ui/core';
import { DoubleArrow } from '@material-ui/icons';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startIcon: {
    transform: 'rotate(180deg)',
  },
  date: {
    '& input': { fontSize: '2rem', margin: 0, textAlign: 'center' },
  },
  weekday: {
    margin: 0,
    textAlign: 'center',
  },
  actions: {
    textAlign: 'right',
    position: 'relative',
    top: '-2em',
    marginBottom: '-1.5em',
  },
}));

export const ReservationListHeader: React.FC = () => {
  const styles = useStyles();
  const { currentDate, dispatch } = useContext(CurrentDateContext);
  const changeDate = useCallback(
    (date: MaterialUiPickersDate) => {
      if (!date) return null;
      dispatch({ payload: date, type: 'ChangeDate' });
    },
    [dispatch],
  );
  return (
    <div>
      <div className={styles.header}>
        <div>
          <Button startIcon={<DoubleArrow className={styles.startIcon} />}>１日前</Button>
        </div>
        <div>
          <DateTimePicker
            className={styles.date}
            value={currentDate}
            format="YYYY-MM-DD"
            onChange={changeDate}
          />
          <p className={styles.weekday}>{currentDate.format('dddd')}</p>
        </div>
        <div>
          <Button endIcon={<DoubleArrow />} />
        </div>
      </div>
      <div className={styles.actions}>
        <Button variant="contained" color="primary" component={Link} to="/facility/">
          設備の登録
        </Button>
      </div>
    </div>
  );
};
