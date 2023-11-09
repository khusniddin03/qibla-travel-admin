import { styled } from "@mui/material/styles";
import { OutlinedInput, InputAdornment, Stack } from "@mui/material";
import { lazy } from "react";
const Iconify = lazy(() => import("../iconify"));

const StyledSearch = styled(OutlinedInput)(() => ({
  width: 270,
  height: 44,
  padding: "10px 16px",
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `#E2E8F0 !important`,
    borderRadius: '8px'
  },
  "& input": {
    width: "100%",
    height: "100%",
    padding: 0,
  },
  "& input::placeholder": {
    fontSize: 16,
    fontWeight: 400,
    color: "#475569",
  },
  "& input:focus + fieldset": {
    borderColor: "#2563EB !important",
  },
}));

interface TypeProps {
  numSelected: number;
  filterName: string;
  placeholder?: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PageToolbar({
  filterName,
  onFilterName,
  children,
  placeholder = "Поиск по названию"
}: React.PropsWithChildren<TypeProps>) {
  return (
    <Stack direction="row" p={2.5} justifyContent='space-between'>
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "#475569", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />

      <Stack direction="row" gap='18px'>
        {children}
      </Stack>
    </Stack>
  );
}
