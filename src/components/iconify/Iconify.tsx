import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

interface TypeProps {
  width?: number | string,
  sx?: object,
  icon: string,
  color?: string,
  height?: number,
}

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: TypeProps, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
));

export default Iconify;
