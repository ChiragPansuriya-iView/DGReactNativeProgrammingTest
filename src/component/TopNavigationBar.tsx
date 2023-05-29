import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

const TopNavigationBar = ({title}: {title: string}) => {
  const handleBackPress = () => {
    // Handle back button press here
    // You can navigate back or perform any other action
  };

  const handleSearchPress = () => {
    // Handle search button press here
    // You can navigate to search screen or show search bar
  };

  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
      source={require('./../assets/Slices/nav_bar.png')} // Replace with your own image path
    >
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            source={require('./../assets/Slices/back.png')}
            resizeMode="contain"
            style={styles.back}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={handleSearchPress}>
        <Image
          source={require('./../assets/Slices/search.png')}
          resizeMode="contain"
          style={styles.search}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 48,
    top: Platform.OS == 'ios' ? 44 : 0,
    left: 0,
    right: 0,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontFamily: 'TitilliumWeb-Light',
  },
  back: {
    height: 18,
    width: 18,
  },
  search: {
    height: 20,
    width: 20,
  },
});

export default TopNavigationBar;
