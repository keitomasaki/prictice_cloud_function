import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { IReservation } from '../models/IReservation';
import { IFacility } from '../models/IFacility';
import {
  Container,
  Paper,
  TextField,
  makeStyles,
  InputLabel,
  Chip,
  Avatar,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { Controller, useForm } from 'react-hook-form';
// import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const initReservation: IReservation = {
  id: '001',
  facilityId: '001',
  subject: '目的01',
  description: '説明001',
  startDate: dayjs(),
  endDate: dayjs().add(1, 'hour'),
  system: {
    createDate: new Date(),
    createUser: {
      displayName: 'ebihara kenji',
      email: '',
      // face: 'https://bit.ly/3pM3urc',
      face: '',
    },
    lastUpdateUser: {
      displayName: 'ebihara kenji',
      email: '',
      // face: 'https://bit.ly/3pM3urc',
      face: '',
    },
    lastUpdate: new Date(),
  },
};

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

const useStyle = makeStyles((theme) => ({
  // root: {
  //   '& .MuiTextField-root': {
  //     margin: theme.spacing(1),
  //   },
  // },
  paper: {
    margin: theme.spacing(1),
    '& > div': {
      margin: theme.spacing(2),
    },
  },
  rightActions: {
    textAlign: 'right',
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

export const Reservation: React.FC = () => {
  const style = useStyle();
  const { system } = initReservation;
  const [facilities] = useState<IFacility[]>(dummyFacilities);
  const facilitiesMenuItems = useMemo(() => {
    return facilities.map((f) => (
      <MenuItem key={f.id} value={f.id}>
        {f.name}
      </MenuItem>
    ));
  }, [facilities]);

  const {
    // register,
    formState: { errors },
    control,
  } = useForm<IReservation>({
    defaultValues: initReservation,
    mode: 'onBlur',
  });

  return (
    <Container maxWidth="sm">
      <Paper className={style.paper}>
        <div>
          <FormControl>
            <InputLabel id="facility-label">設備</InputLabel>
            <Controller
              name="facilityId"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select labelId="facility-label" value={value} onChange={onChange}>
                    {facilitiesMenuItems}
                  </Select>
                );
              }}
            />
          </FormControl>
        </div>
        <Controller
          name="startDate"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <DateTimePicker
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label="開始日時"
                format="YYYY/MM/DD HH:mm"
                ampm={false}
                minutesStep={15}
              />
            );
          }}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <DateTimePicker
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                label="開始日時"
                format="YYYY/MM/DD HH:mm"
                ampm={false}
                minutesStep={15}
              />
            );
          }}
        />
        <Controller
          name="subject"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label="設備名"
              fullWidth
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              helperText={errors.subject ? '必須です' : ''}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label="設備名"
              fullWidth
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              helperText={errors.description ? '必須です' : ''}
            />
          )}
        />

        <div className={style.paper}>
          <InputLabel shrink>行進者</InputLabel>
          <Chip
            label={system.createUser.displayName}
            avatar={<Avatar src={system.createUser.face} />}
          />
          {dayjs(system.createDate).format('YYYY-MM-DD HH:mm')}
        </div>
        <div className={style.paper}>
          <InputLabel shrink>更新者</InputLabel>
          <Chip
            label={system.createUser.displayName}
            avatar={<Avatar src={system.lastUpdateUser.face} />}
          />
          {dayjs(system.createDate).format('YYYY-MM-DD HH:mm')}
        </div>

        <Grid container>
          <Grid item xs={6}>
            <Button className={style.cancelButton} startIcon={<DeleteIcon />}>
              削除
            </Button>
          </Grid>
          <Grid item xs={6} className={style.rightActions}>
            <Button variant="contained" color="primary" startIcon={<DoneIcon />}>
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
