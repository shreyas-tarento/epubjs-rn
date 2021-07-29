/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Epub, Streamer} from './src/epub/epubMain';

const book1 = "https://s3.amazonaws.com/epubjs/books/moby-dick.epub";

const App = () => {
  const [src, setSrc] = useState('');
  const [book, setBook] = useState('');
  const epubRef = React.useRef();
  // const [src, setSrc] = useState('https://s3.amazonaws.com/epubjs/books/moby-dick.epub');

  useEffect(() => {
    Streamer.start()
      .then(newOrigin => {
        return Streamer.get(
          book1,
        );
      })
      .then(newSrc => {
        console.log('myLogs ', newSrc);

        setSrc(newSrc);
      })
      .catch(err => {
        console.log('myLogs error ', err);

        console.warn(err);
      });
    return () => {
      Streamer.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('myrefs ', epubRef);

  const onSelected = (location, rendition) => {
    rendition.highlight(location, {}, () => {}, 'hl', {fill: 'green'});
    console.log('myLocat ', location, rendition);
  };

  return (
    <View style={styles.sectionContainer}>
      <Epub
        ref={epubRef}
        src={src}
        flow={'paginated'}
        onReady={_book => {
          console.log('myBookreader', book);
          setBook(_book);
        }}
        onSelected={onSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
});

export default App;
