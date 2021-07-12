import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import AntDesignIcon from 'react-native-vector-icons/Ionicons';

const Header = ({onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {/* <AntDesignIcon name="ios-arrow-back-outline" color="#000" size={22} /> */}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '6%',
    backgroundColor: '#ffff',
    justifyContent: 'center',
  },
  backIcon: {
    margin: '1%',
    width: '10%',
    height: '83%',
  },
});

export default Header;
