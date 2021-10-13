import React from 'react';
import { IFacility } from '../models/IFacility';
import { makeStyles, Theme } from '@material-ui/core';
import { Property } from 'csstype';

type Props = JSX.IntrinsicElements['div'] & {
  facility: IFacility;
  backgroundColor: Property.BackgroundColor;
};

const useStyles = makeStyles<Theme, { backgroundColor: Property.BackgroundColor }>((theme) => ({
  header: {
    backgroundColor: (p) => p.backgroundColor,
    color: (p) => theme.palette.getContrastText(p.backgroundColor),
  },
}));

const FacilityName: React.FC<Props> = (props) => {
  const { facility, backgroundColor } = props;
  const styles = useStyles({ backgroundColor });
  return (
    <div className={'timeCell'}>
      <div className={`laneHeader timeCell ${styles.header}`}>
        <p>{facility.name}</p>
      </div>
    </div>
  );
};

export default FacilityName;
