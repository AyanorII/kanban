import { Stack } from '@mui/material';
import React from 'react'
import { Triangle } from 'react-loader-spinner';
import { PRIMARY_COLOR } from '../styles/theme';

const Loading = () => {
  return (
    <Stack justifyContent="center" alignItems="center" minHeight="100vh">
      <Triangle
        height="50vh"
        width="50vw"
        color={PRIMARY_COLOR}
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </Stack>
  );
}

export default Loading
