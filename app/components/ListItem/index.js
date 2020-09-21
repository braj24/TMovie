import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const ListItem = (props) => {
  return (
    <>
      <View style={Styles.movieItem}>
        <View style={Styles.movieItemImage}>
          <Image
            source={{uri: props.imageurl}}
            style={{width: 100, height: 150}}
          />
        </View>
        <View style={{margin: 10}}>
          <Text style={Styles.movieItemTitle}>{props.title}</Text>
          <Text style={Styles.movieItemReleaseDate}>{props.release_date}</Text>
        </View>
      </View>
      <View style={Styles.buttonContainer}>
        <TouchableOpacity
          style={Styles.roundedButton}
          onPress={() => console.log('Book')}>
          <Text style={Styles.buttonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
  },
  movieItemImage: {
    marginRight: 5,
  },
  movieItemTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  movieItemReleaseDate: {
    flexWrap: 'wrap',
    color: 'black',
    fontSize: 12,
    marginTop: 5,
  },
  roundedButton: {
    height: 40,
    width: 150,
    borderColor: 'red',
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {color: '#FFFFFF'},
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

export default ListItem;
