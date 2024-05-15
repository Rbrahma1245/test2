import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import Autocomplete from '@mui/material/Autocomplete';

export const icons = [
  { value: 'icon-action', label: 'Action' },
  { value: 'icon-admin', label: 'Admin' },
  { value: 'icon-approval', label: 'Approval' },
  { value: 'icon-approvals', label: 'Approvals' },
  { value: 'icon-assignment', label: 'Assignment' },
  { value: 'icon-attribute-1', label: 'Attribute 1' },
  { value: 'icon-auction', label: 'Auction' },
  // { value: 'icon-award', label: 'Award' },
  { value: 'icon-awarding', label: 'Awarding' },
  { value: 'icon-buyer', label: 'Buyer' },
  { value: 'icon-catalogue', label: 'Catalogue' },
  { value: 'icon-close', label: 'Close' },
  { value: 'icon-closed', label: 'Closed' },
  { value: 'icon-commercial', label: 'Commercial' },
  { value: 'icon-contacts', label: 'Contacts' },
  { value: 'icon-contract-management', label: 'Contract Management' },
  { value: 'icon-contract-management-2', label: 'Contract Management 2' },
  { value: 'icon-dashboard', label: 'Dashboard' },
  // { value: 'icon-extend', label: 'Extend' },
  // { value: 'icon-extend2', label: 'Extend2' },
  { value: 'icon-free-shipping', label: 'Free Shipping' },
  { value: 'icon-inventory', label: 'Inventory' },
  { value: 'icon-invoice', label: 'Invoice' },
  { value: 'icon-logout', label: 'Logout' },
  { value: 'icon-lookups', label: 'Lookups' },
  { value: 'icon-male-user', label: 'Male User' },
  { value: 'icon-menu', label: 'Menu' },
  { value: 'icon-module', label: 'Module' },
  { value: 'icon-notification', label: 'Notification' },
  // { value: 'icon-pages', label: 'Pages' },
  { value: 'icon-publish-publishing', label: 'Publish Publishing' },
  { value: 'icon-purchase_order_2', label: 'Purchase Order 2' },
  { value: 'icon-purchase-order', label: 'Purchase Order' },
  { value: 'icon-requisition', label: 'Requisition' },
  { value: 'icon-rfq', label: 'RFQ' },
  { value: 'icon-rfq-2', label: 'RFQ 2' },
  { value: 'icon-role', label: 'Role' },
  { value: 'icon-shipment', label: 'Shipment' },
  { value: 'icon-supplier', label: 'Supplier' },
  { value: 'icon-team', label: 'Team' },
  { value: 'icon-technology', label: 'Technology' },
  { value: 'icon-user-128', label: 'User' },
];


export default function CustomIconAutocomplete({ name, onChange, params, ...other }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const iconValue = params.row[name];
    const selectedIcon = icons.find(icon => icon.value === iconValue);
    if (selectedIcon) {
      setValue(selectedIcon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.row[name]]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Autocomplete
      fullWidth
      options={icons}
      value={value}
      onChange={handleChange}
      renderOption={(props, option) => (
        <li {...props} style={{ listStyle: "none", fontSize: "14px" }}>
          <span className={`fa ${option.value}`} aria-hidden="true" style={{ marginRight: '5px' }} />
          {option.label}
        </li>
      )}
      renderInput={(inputParams) => (
        <TextField
          {...inputParams}
          name={name}
          fullWidth
          InputProps={{
            ...inputParams.InputProps,
            startAdornment: value ? (
              <span className={`fa ${value.value}`} aria-hidden="true" style={{ marginRight: '5px' }} />
            ) : null,
            disableUnderline: true,
            style: { fontSize: '14px' }
          }}
          {...other}
        />
      )}
    />
  );
}

CustomIconAutocomplete.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  params: PropTypes.object,
};