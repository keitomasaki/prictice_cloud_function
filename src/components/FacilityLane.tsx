import React, { useMemo } from 'react';
import { IFacility } from '../models/IFacility';
import { IReservation } from '../models/IReservation';
import { ReservationBar } from './ReservationBar';
import { Property } from 'csstype';
// import { makeStyles, Theme } from '@material-ui/core';
import FacilityName from './FacilityName';

type Props = JSX.IntrinsicElements['div'] & {
  facility: IFacility;
  cellWidth: number;
  backgroundColor: Property.BackgroundColor;
  reservations: IReservation[];
};

// const useStyles = makeStyles<Theme, { backgroundColor: Property.BackgroundColor }>((theme) => ({
//   header: {
//     backgroundColor: (p) => p.backgroundColor,
//     color: (p) => theme.palette.getContrastText(p.backgroundColor),
//   },
// }));

export const FacilityLane: React.FC<Props> = (props) => {
  const { facility, cellWidth, backgroundColor, reservations, ...rootAttr } = props;

  const cells = useMemo(() => {
    const r: JSX.Element[] = [];
    for (let i = 0; i <= 12; i++) {
      r.push(
        i === 0 ? (
          <FacilityName facility={facility} backgroundColor={backgroundColor}></FacilityName>
        ) : (
          <div key={i} className="timeCell"></div>
        ),
      );
      // r.push(<div key={i} className="timeCell"></div>);
    }
    return r;
  }, []);

  const bars = useMemo(() => {
    return reservations.map((r) => {
      return (
        <ReservationBar
          key={r.id}
          backgroundColor={backgroundColor}
          beginHour={8}
          reservation={r}
          hourWidth={cellWidth}
          leftOffset={140}
        />
      );
    });
  }, []);

  return (
    <div {...rootAttr}>
      {bars}
      {cells}
    </div>
  );
};
