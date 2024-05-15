import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, href, ...other }, ref) => {
  // const theme = useTheme();

  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src="src/assets/img/logo/elit-logo.png"
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
    <Link component={RouterLink} href={href} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
  href: PropTypes.string,
};

export default Logo;
