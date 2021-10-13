import React, {
  createContext,
  Dispatch,
  Reducer,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
// import { Facility } from './Facility';
import { ReservationListHeader } from './ReservationListHeader';
import { IFacility } from '../models/IFacility';
import { IReservation } from '../models/IReservation';
import { FacilityLane } from './FacilityLane';
import { makeStyles } from '@material-ui/core';
import {
  purple,
  red,
  indigo,
  lightBlue,
  teal,
  lightGreen,
  yellow,
  orange,
} from '@material-ui/core/colors';
import dayjs, { Dayjs } from 'dayjs';

const dummyFacilities: IFacility[] = [
  {
    id: '01',
    name: '設備００１',
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: '',
  },
  {
    id: '02',
    name: '設備００２',
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: '',
  },
  {
    id: '03',
    name: '設備００３',
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: '',
  },
];

const dummyReservations: IReservation[] = [
  {
    id: '001',
    facilityId: '01',
    subject: '目的０１',
    description: '説明００１',
    startDate: dayjs('2021-04-05T09:00'),
    endDate: dayjs('2021-04-05T09:00').add(1, 'hour'),
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
  },
  {
    id: '002',
    facilityId: '01',
    subject: '目的０２',
    description: '説明００１',
    startDate: dayjs('2021-04-05T11:00'),
    endDate: dayjs('2021-04-05T11:00').add(0.5, 'hour'),
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
  },
  {
    id: '003',
    facilityId: '02',
    subject: '目的０３',
    description: '説明００１',
    startDate: dayjs('2021-04-05T14:00'),
    endDate: dayjs('2021-04-05T14:00').add(1.5, 'hour'),
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
  },
  {
    id: '004',
    facilityId: '02',
    subject: '目的０４',
    description: '説明００１',
    startDate: dayjs('2021-04-05T16:00'),
    endDate: dayjs('2021-04-05T16:00').add(2, 'hour'),
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
  },
  {
    id: '005',
    facilityId: '03',
    subject: '目的０５',
    description: '説明００１',
    startDate: dayjs('2021-04-05T10:00'),
    endDate: dayjs('2021-04-05T10:00').add(2.5, 'hour'),
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
  },
];

const colors = [
  red[500],
  purple[500],
  indigo[500],
  lightBlue[500],
  teal[500],
  lightGreen[500],
  yellow[500],
  orange[500],
];

const getColor = (n: number) => {
  const index = n % 8;
  return colors[index];
};

type ContextType = {
  currentDate: Dayjs;
  dispatch: Dispatch<Action>;
};

type ActionType = 'ChangeDate' | 'NextDay' | 'PrevDay';

type Action = {
  type: ActionType;
  payload?: Dayjs;
};

type StateType = {
  currentDate: Dayjs;
};

const reducerProcesses: {
  [type in ActionType]: (s: StateType, a: Action) => StateType;
} = {
  ChangeDate: (s, a) => {
    return a.payload ? { ...s, currentDate: a.payload } : s;
  },
  NextDay: (s) => ({ ...s, currentDate: s.currentDate.add(1, 'day') }),
  PrevDay: (s) => ({ ...s, currentDate: s.currentDate.add(-1, 'day') }),
};

const reducer: Reducer<StateType, Action> = (state, action) => {
  return reducerProcesses[action.type](state, action);
};

export const CurrentDateContext = createContext<ContextType>({} as ContextType);

const useStyles = makeStyles((theme) => ({
  lane: {
    border: `1px solid ${theme.palette.divider}`,
    borderBottom: 'none',
    display: 'flex',
    height: '40px',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    '&:last-child': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .laneHeader': {
      borderRight: `1px solid ${theme.palette.divider}`,
      width: '100%',
      boxSizing: 'border-box',
      flexGrow: 0,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      // padding: '0.5rem',
    },
    '& .timeCell': {
      height: '100%',
      borderRight: `1px solid ${theme.palette.divider}`,
      flexGrow: 1,
      flexBasis: 0,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
  box: {
    display: 'flex',
  },
}));

export const ReservationList: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { currentDate: dayjs() });
  const cell = useRef<HTMLDivElement>(null);
  const [cellWidth, setCellWidth] = useState<number>(0);
  const [isDisplay, setIsDisplay] = useState(false);
  const styles = useStyles();

  const onResize = useCallback(() => {
    if (!cell?.current) return null;
    setCellWidth(cell.current.getBoundingClientRect().width);
  }, [cell]);

  const headerCells = useMemo(() => {
    const cells: JSX.Element[] = [];
    // for (let i = 9; i <= 19; i++) {
    //   cells.push(<div className="timeCell">{i}</div>);
    // }
    for (let i = 7; i <= 19; i++) {
      cells.push(i === 7 ? <div className="timeCell"></div> : <div className="timeCell">{i}</div>);
    }
    setIsDisplay(true);
    onResize();
    return cells;
  }, []);

  const lanes = useMemo(() => {
    return dummyFacilities.map((facility, i) => {
      const reservations = dummyReservations.filter((r) => facility.id === r.facilityId);
      return (
        <FacilityLane
          key={facility.id}
          cellWidth={30}
          facility={facility}
          reservations={reservations}
          className={styles.lane}
          backgroundColor={getColor(i)}
        />
      );
    });
  }, [styles.lane, cellWidth]);

  return (
    <div>
      <CurrentDateContext.Provider value={{ currentDate: state.currentDate, dispatch }}>
        <ReservationListHeader />
        <div className={styles.lane}>
          <div className="laneHeader">{headerCells}</div>
        </div>
        {isDisplay && <>{lanes}</>}
      </CurrentDateContext.Provider>
    </div>
  );
};

// import React, { useMemo } from 'react';
// import { IFacility } from '../models/IFacility';
// import { IReservation } from '../models/IReservation';
// // import { Facility } from './Facility';
// import { makeStyles } from '@material-ui/core';
// import {
//   purple,
//   red,
//   indigo,
//   lightBlue,
//   teal,
//   lightGreen,
//   yellow,
//   orange,
// } from '@material-ui/core/colors';
// import dayjs from 'dayjs';
// import { FacilityLane } from './FacilityLane';

// const dummyFacilities: IFacility[] = [
//   {
//     id: '01',
//     name: '設備００１',
//     // ダミーデータのため不必要なデータの定義は省略
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     system: {} as any,
//     note: '',
//   },
//   {
//     id: '02',
//     name: '設備００２',
//     // ダミーデータのため不必要なデータの定義は省略
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     system: {} as any,
//     note: '',
//   },
//   {
//     id: '03',
//     name: '設備００３',
//     // ダミーデータのため不必要なデータの定義は省略
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     system: {} as any,
//     note: '',
//   },
// ];

// const dummyReservations: IReservation[] = [
//   {
//     id: '001',
//     facilityId: '01',
//     subject: '目的０１',
//     description: '説明００１',
//     startDate: dayjs('2021-04-05T09:00'),
//     endDate: dayjs('2021-04-05T09:00').add(1, 'hour'),
//     // ダミーデータのため不必要なデータの定義は省略
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     system: {} as any,
//   },
//   {
//     id: '002',
//     facilityId: '01',
//     subject: '目的０２',
//     description: '説明００１',
//     startDate: dayjs('2021-04-05T11:00'),
//     endDate: dayjs('2021-04-05T11:00').add(0.5, 'hour'),
//     // ダミーデータのため不必要なデータの定義は省略
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     system: {} as any,
//   },
//   {
//     id: '003',
//     facilityId: '02',
//     subject: '目的０３',
//     description: '説明００１',
//     startDate: dayjs('2021-04-05T14:00'),
//     endDate: dayjs('2021-04-05T14:00').add(1.5, 'hour'),
//     // ダミーデータのため不必要なデータの定義は省略
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     system: {} as any,
//   },
//   {
//     id: '004',
//     facilityId: '02',
//     subject: '目的０４',
//     description: '説明００１',
//     startDate: dayjs('2021-04-05T16:00'),
//     endDate: dayjs('2021-04-05T16:00').add(2, 'hour'),
//     // ダミーデータのため不必要なデータの定義は省略
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     system: {} as any,
//   },
//   {
//     id: '005',
//     facilityId: '03',
//     subject: '目的０５',
//     description: '説明００１',
//     startDate: dayjs('2021-04-05T10:00'),
//     endDate: dayjs('2021-04-05T10:00').add(2.5, 'hour'),
//     // ダミーデータのため不必要なデータの定義は省略
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     system: {} as any,
//   },
// ];

// const colors = [
//   red[500],
//   purple[500],
//   indigo[500],
//   lightBlue[500],
//   teal[500],
//   lightGreen[500],
//   yellow[500],
//   orange[500],
// ];

// const getColor = (n: number) => {
//   const index = n % 8;
//   return colors[index];
// };

// const useStyles = makeStyles((theme) => ({
//   lane: {
//     border: `1px solid ${theme.palette.divider}`,
//     borderBottom: 'none',
//     display: 'flex',
//     height: '40px',
//     width: '100%',
//     boxSizing: 'border-box',
//     position: 'relative',
//     '&:last-child': {
//       borderBottom: `1px solid ${theme.palette.divider}`,
//     },
//     '& .laneHeader': {
//       borderRight: `1px solid ${theme.palette.divider}`,
//       width: '100%',
//       boxSizing: 'border-box',
//       flexGrow: 0,
//       flexShrink: 0,
//       display: 'flex',
//       alignItems: 'center',
//       // padding: '0.5rem',
//     },
//     '& .timeCell': {
//       height: '100%',
//       borderRight: `1px solid ${theme.palette.divider}`,
//       flexGrow: 1,
//       flexBasis: 0,
//       boxSizing: 'border-box',
//       display: 'flex',
//       alignItems: 'center',
//       '&:last-child': {
//         borderRight: 'none',
//       },
//     },
//   },
// }));

// export const ReservationList: React.FC = () => {
//   const styles = useStyles();

//   const headerCells = useMemo(() => {
//     const cells: JSX.Element[] = [];
//     for (let i = 7; i <= 19; i++) {
//       cells.push(<div className="timeCell">{i}</div>);
//     }
//     return cells;
//   }, []);

//   const lanes = useMemo(() => {
//     return dummyFacilities.map((facility, i) => {
//       const reservations = dummyReservations.filter((r) => facility.id === r.facilityId);
//       return (
//         <div  key={facility.id}>
//           <FacilityLane

//             cellWidth={30}
//             facility={facility}
//             reservations={reservations}
//             className={styles.lane}
//             backgroundColor={getColor(i)}
//           />
//         </div>
//       );
//     });
//   }, [styles.lane]);

//   return (
//     <div>
//       <div className={styles.lane}>
//         <div className="laneHeader">{headerCells}</div>
//       </div>
//       {lanes}
//     </div>
//   );
// };
