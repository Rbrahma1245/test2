import PropTypes from 'prop-types';
import { useMemo, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function UserTableToolbar({
  filters,
  onFilters,
  //
  roleOptions,
  filteredUserData,
}) {
  const popover = usePopover();
  const { t } = useTranslate();

  const handleFilterRole = useCallback(
    (event) => {
      onFilters(
        'roles',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );
  const activeRoleOptions = useMemo(() => {
    if (filters.status === 'ALL') return roleOptions;

    const statusFilteredRoles = filteredUserData.reduce((acc, user) => {
      if (user.STATUS_CODE === filters.status) {
        user.ROLE_NAME.forEach(roleCode => {
          if (roleCode.includes(roleCode) && !acc.includes(roleCode)) {
            acc.push(roleCode);
          }
        });
      }
      return acc;
    }, []);

    return statusFilteredRoles;
  }, [filters.status, roleOptions, filteredUserData]);
  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        // sx={{
        //   p: 2.5,
        //   pr: { xs: 2.5, md: 1 },
        // }}
        sx={{
          flexShrink: 0,
          width: '100%',
          maxWidth: 200,
          marginBottom: { xs: 2, md: 0 },
        }}
      >
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>{t("Role")}</InputLabel>
          <Select
            multiple
            value={filters.roles}
            onChange={handleFilterRole}
            input={<OutlinedInput label="Role" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {activeRoleOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters?.roles?.includes(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}

UserTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  roleOptions: PropTypes.array,
  filteredUserData: PropTypes.array,
};