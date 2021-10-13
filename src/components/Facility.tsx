import React from 'react';
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
} from '@material-ui/core';
import dayjs from 'dayjs';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { IFacility } from '../models/IFacility';
import { useForm, Controller } from 'react-hook-form';

const initFacility: IFacility = {
  id: '',
  name: '初期値',
  note: '初期値',
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

const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    margin: theme.spacing(1),
  },
  rightActions: {
    textAlign: 'right',
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

export const Facility: React.FC = () => {
  const style = useStyle();
  const { system } = initFacility;
  const {
    register,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: initFacility,
    mode: 'onBlur',
  });

  return (
    <Container maxWidth="sm" className={style.root}>
      <input {...register('name', { required: true })} />
      <p>{errors.name ? '必須です' : ''}</p>
      <button onClick={() => console.log(errors)}>button</button>
      <Paper>
        {/* <Controller control={control} name="name" as={<TextField label="設備名" fullWidth />} /> */}
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            // <TextField onChange={onChange} onBlur={onBlur} placeholder="hello" />
            <TextField
              label="設備名"
              fullWidth
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              helperText={errors.name ? '必須です' : ''}
            />
          )}
        />
        <Controller
          control={control}
          name="note"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            // <TextField onChange={onChange} onBlur={onBlur} placeholder="hello" />
            <TextField
              label="設備名"
              fullWidth
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              helperText={errors.note ? '必須です' : ''}
            />
          )}
        />

        {/* <TextField label="詳細" fullWidth multiline value={facility.note} /> */}
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
