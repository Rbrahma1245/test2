import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';

export const TooltipUI = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: (props) => (props.shortenContentWidth ? 150 : 400),
    fontSize: theme.typography.pxToRem(20),
    border: '1px solid #dadde9',
    textAlign: 'center',
  },
}))(Tooltip);