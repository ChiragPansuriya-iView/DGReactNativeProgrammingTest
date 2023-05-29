/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import TopNavigationBar from './src/component/TopNavigationBar';

const imageMapping = {
  'poster1.jpg': require('./src/assets/Slices/poster1.jpg'),
  'poster2.jpg': require('./src/assets/Slices/poster2.jpg'),
  'poster3.jpg': require('./src/assets/Slices/poster3.jpg'),
  'poster4.jpg': require('./src/assets/Slices/poster4.jpg'),
  'poster5.jpg': require('./src/assets/Slices/poster5.jpg'),
  'poster6.jpg': require('./src/assets/Slices/poster6.jpg'),
  'poster7.jpg': require('./src/assets/Slices/poster7.jpg'),
  'poster8.jpg': require('./src/assets/Slices/poster8.jpg'),
  'poster9.jpg': require('./src/assets/Slices/poster9.jpg'),
  // Add more mappings for each image filename
};

const App = () => {
  const [contentData, setContentData] = useState([]); // Data for the FlatList
  const [contentDataLimit, setContentDataLimit] = useState(0); // Data limit for the FlatList pagination
  const [loading, setLoading] = useState(false); // Loading indicator state for load more data
  const [page, setPage] = useState(1); // Current page number
  const [appTitle, setAppTitle] = useState(''); // Current page title
  const gridSize = 3; // Gride size for the flatlist

  useEffect(() => {
    fetchData(page); // Fetch data when component mounts
  }, [page]);

  const fetchData = async (page: number) => {
    setLoading(true);
    let contentListInPageData = [];
    // Load data based on the page number
    if (page == 1) {
      contentListInPageData = require('./src/assets/API/CONTENTLISTINGPAGE-PAGE1.json');
    } else if (page == 2) {
      contentListInPageData = require('./src/assets/API/CONTENTLISTINGPAGE-PAGE2.json');
    } else if (page == 3) {
      contentListInPageData = require('./src/assets/API/CONTENTLISTINGPAGE-PAGE3.json');
    } else {
      contentListInPageData = [];
    }
    setAppTitle(contentListInPageData.page.title);
    setContentDataLimit(contentListInPageData.page['total-content-items']);
    setContentData(prevData => [
      ...prevData,
      ...contentListInPageData.page['content-items'].content,
    ]);
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (!loading) {
      if (contentDataLimit > contentData.length) {
        setPage(prevPage => prevPage + 1);
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={
            imageMapping[item['poster-image']] ||
            require('./src/assets/Slices/placeholder_for_missing_posters.png')
          }
          style={styles.image}
          resizeMode="contain"
        />
        <Text numberOfLines={1} style={styles.text}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Status bar color for android only*/}
      <StatusBar backgroundColor="black" />
      {/* Main content */}
      <View style={styles.main}>
        <FlatList
          data={contentData}
          numColumns={gridSize}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
      {/* Top navigation bar */}
      <TopNavigationBar title={appTitle}></TopNavigationBar>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  main: {
    marginHorizontal: 7.5,
  },
  contentContainer: {
    paddingVertical: 44,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 7.5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  text: {
    marginTop: 6,
    marginBottom: 22.5,
    fontFamily: 'TitilliumWeb-Light',
    color: '#FFFFFF',
  },
});
export default App;
