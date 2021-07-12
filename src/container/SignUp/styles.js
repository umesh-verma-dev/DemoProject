import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '82%',
    maxWidth: 400,
    maxHeight: 800,
    padding: '6%',
  },
  buttonContainer: {
    marginTop: 10,
  },
  visibilityBtn: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5,
  },
  loginContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginTxt: {color: 'blue', marginLeft: 5, fontWeight: '600'},
});

export default styles;
