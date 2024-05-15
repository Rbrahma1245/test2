import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import { useTheme } from '@mui/material/styles';

import { useSelector } from 'react-redux';

import { RouterLink } from 'src/routes/components';

import logoImage from 'src/assets/img/logo/elit-logo.png';
// ----------------------------------------------------------------------

const CustomLogo = forwardRef(({ disabledLink = false, sx, href, ...other }, ref) => {
  // const theme = useTheme();
  const loginUserInfo = useSelector((state) => state.auth?.user);

  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src={logoImage}
      sx={{
        width: { xs: 100, md: 100 },
        height: 40,
        cursor: 'pointer',
        ...sx,
      }}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link
      component={RouterLink}
      href={loginUserInfo?.loginToken ? '/cHJvamVjdHM=' : href}
      sx={{ display: 'contents' }}
    >
      {logo}
    </Link>
  );
});

CustomLogo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
  href: PropTypes.string,
};

export default CustomLogo;
