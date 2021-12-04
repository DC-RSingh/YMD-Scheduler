import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { primaryGradient } from '../../../assets/themes/ymd-theme';
import { drawerWidth, innerToolbarHeight } from '../drawer-wrapper/DrawerWrapper';
import {
  collapsedNavigationMenuWidth, navigationMenuWidth, resizeHandleContainerHeight, toolbarHeight
} from '../drawer-wrapper/navigation-menu/NavigationMenu.styles';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background: primaryGradient,
    top: toolbarHeight + resizeHandleContainerHeight,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fromLeft: {
    width: `calc(100% - ${navigationMenuWidth}px)`,
    marginLeft: navigationMenuWidth + theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  fromRight: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  baseMargin: {
    marginLeft: theme.spacing(8),
  },
  marginLeft: {
    marginLeft: theme.spacing(1) + collapsedNavigationMenuWidth,
  },
  toolbar: {
    maxHeight: innerToolbarHeight,
    minHeight: innerToolbarHeight,
  },
  hide: {
    display: 'none',
  },
  iconButton: {
    padding: theme.spacing(0.5),
  },
  toolbarGrid: {
    maxHeight: innerToolbarHeight,
    minHeight: innerToolbarHeight,
  },
  miscArea: {
    padding: `0 ${theme.spacing(1)}`,
  },
  addArea: {
    padding: `0 ${theme.spacing(1)}`,
  },
  divider: {
    height: innerToolbarHeight,
    borderLeft: `1px solid ${theme.palette.secondary.light}`,
  },
  badge: {
    backgroundColor: theme.palette.secondary.dark,
  },
  support: {
    fontSize: 18,
  },
}));

export default useStyles;
