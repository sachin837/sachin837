import { StyleSheet } from 'react-native';
import { WHITE, APP_BG_COLOR, GREEN, TEXT_DESCRIPTION ,GRAY} from './colors';

export const DEFAULT_STYLES = StyleSheet.create({
  headerIconLeft: {
    paddingLeft: 10,
    color: WHITE,
  },
  headerIconRight: {
    paddingRight: 10,
    color: WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: APP_BG_COLOR,
    // backgroundColor:"#efefef"
  },
  verticleContainer: {
    marginBottom: 10,
  },
  horizontalContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  poppinsRegular: {
    fontFamily: 'Roboto',
    color: TEXT_DESCRIPTION,
  },
  poppinsMedium: {
    fontFamily: 'Roboto',
    color: TEXT_DESCRIPTION,
  },
  poppinsSemiBold: {
    fontFamily: 'Roboto',
    color: TEXT_DESCRIPTION,
  },
  poppinsLight: {
    fontFamily: 'Roboto',
    color: TEXT_DESCRIPTION,
  },
  poppinsBlack: {
    fontFamily: 'Roboto',
    color: TEXT_DESCRIPTION,
  },
  drawerItem: {
    height: 50,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY
  }
});
