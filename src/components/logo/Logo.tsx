import React, { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';

interface TypeProps {
  sx?: object,
  disabledLink?: boolean,
}
const Logo = forwardRef(({ disabledLink = false, sx, ...other }: React.PropsWithChildren<TypeProps>, ref) => {

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 150,
        height: 80,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img src="/assets/logo.webp" alt="logo" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

export default Logo;
