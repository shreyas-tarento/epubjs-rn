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

const App = () => {
  const [src, setSrc] = useState('');
  const [book, setBook] = useState('');
  const epubRef = React.useRef();
  // const [src, setSrc] = useState('https://s3.amazonaws.com/epubjs/books/moby-dick.epub');

  useEffect(() => {
    Streamer.start()
      .then(newOrigin => {
        return Streamer.get(
          'https://api-perf-test2.azurewebsites.net/api/azureblob/886RS1CT0stQUJDLW9tLUFCSy0wOS5lcHVi.epub?access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5NUQxNEM5NkQxNTg1OUVCN0Q2NUFFOUM2RjkwMzNGOTcyNzVBNjAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJlVjBVeVcwVmhaNjMxbHJweHZrRFA1Y25XbUEifQ.eyJuYmYiOjE2Mjc0NTAzNjksImV4cCI6MTYyNzQ1Mzk2OSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5ieWdndGphbnN0Lm5ldCIsImF1ZCI6WyJodHRwczovL2xvZ2luLmJ5Z2d0amFuc3QubmV0L3Jlc291cmNlcyIsImFwaTEiLCJTdmVua3NiQVBJIiwic2ItcHVibGljYXBpIl0sImNsaWVudF9pZCI6ImRpZ2l0YWxhYm9raHlsbGFuanMiLCJzdWIiOiJib2toeWxsYW5AYnlnZ3RqYW5zdC5zZSIsImF1dGhfdGltZSI6MTYyNzQ1MDAxNCwiaWRwIjoibG9jYWwiLCJ1c2VyaWQiOiIxNDc5ODkiLCJlbWFpbCI6ImJva2h5bGxhbkBieWdndGphbnN0LnNlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInVzZXJpZCIsImFwaTEiLCJTdmVua3NiQVBJIiwic2ItcHVibGljYXBpIl0sImFtciI6WyJwd2QiXX0.M1FNqO5JQItWP2oo35cdb4962-jthE3eumVPuH7bboRMKCi6nveamGMftdFF3IYuEFNipZRnoo9GawPqBV6DZGZgNfSlURejv0Opv0yXbnY-_DjK3Ow2NupbWmscdBJtQoaiGnM6KX4YniyZZyLy9xcF-_asN1OT1l6wQiW88w8trJxFB8FHqznDzNRl-K61kK7_V-gEPj0hFvEXj0NgnlflfuTkTPfH5yCeSboWUxI1xkDOVHVibjlnY8mym9NEXW6ZBnElkvhNzZFhEhMmwGDzur2UoPRy8zs-TtrPXu4KIdrNUPmmElGMP9X1_UbelAflWCdbdSVEV07jXDP4Vw',
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
