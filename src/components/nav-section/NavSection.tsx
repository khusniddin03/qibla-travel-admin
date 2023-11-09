import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
//
import { StyledNavItemIcon } from './styles';
import React, { ReactNode } from 'react';

// ----------------------------------------------------------------------

type TItem = {
  title: string,
  path: string,
  icon: ReactNode | string,
  info?: string
}

interface TypeProps {
  data: TItem[]
}

export default function NavSection({ data = [], ...other }: React.PropsWithChildren<TypeProps>) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item: TItem) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item }: React.PropsWithChildren<{ item: TItem }>) {
  const { title, path, icon, info } = item;

  return (
    <ListItemButton
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}

    </ListItemButton>
  );
}
