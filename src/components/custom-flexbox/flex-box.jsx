import React from 'react';
import PropTypes from 'prop-types';

const FlexBox = ({ children, justifyContent, alignItems, width }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: justifyContent || 'flex-start',
      alignItems: alignItems || 'stretch',
      width: width || 'auto',
    }}
  >
    {children}
  </div>
);
FlexBox.propTypes = {
  children: PropTypes.node,
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
    'start',
    'end',
    'left',
    'right',
    'safe',
    'unsafe',
    'inherit',
    'initial',
    'unset'
  ]),
  alignItems: PropTypes.oneOf([
    'stretch',
    'flex-start',
    'flex-end',
    'center',
    'baseline',
    'first baseline',
    'last baseline',
    'start',
    'end',
    'self-start',
    'self-end',
    'safe',
    'unsafe',
    'inherit',
    'initial',
    'unset'
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};
export default FlexBox;
