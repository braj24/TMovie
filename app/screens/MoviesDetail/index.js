import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {BASE_URL, API_KEY, IMAGE_PATH} from '../../constants';
import axios from 'axios';
import Styles from "./styles";

class MoviesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      synopsis: [],
      reviews: [],
      credits: [],
      simillarMovies: [],
    };
  }

  async componentDidMount() {
    const {route} = this.props;
    const {id} = route.params;
    try {
      let [
        synopsisData,
        reviewsData,
        creditsData,
        simillarMoviesData,
      ] = await Promise.all([
        axios.get(BASE_URL + id + '?api_key=' + API_KEY),
        axios.get(BASE_URL + id + 'reviews' + '?api_key=' + API_KEY),
        axios.get(BASE_URL + id + 'credits' + '?api_key=' + API_KEY),
        axios.get(BASE_URL + id + 'similar' + '?api_key=' + API_KEY),
      ]);
      this.setState({
        synopsis: synopsisData.data,
        reviews: reviewsData.data,
        credits: creditsData.data,
        simillarMovies: simillarMoviesData.data,
      });

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <ScrollView removeClippedSubviews={false}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={Styles.image}
                source={{uri: IMAGE_PATH + this.state.synopsis.poster_path}}
              />
              <View style={{flexDirection: 'column' , padding: 5}}>
                <Text style={{color: 'red', fontSize: 16}}>Overview</Text>
                <View>
                <Text>
                  {this.state.synopsis.overview}
                </Text>
                </View>
                
              </View>
            </View>
            <Text style={{color: 'red', fontSize: 16}}>Reviews</Text>
            <View style={{width: Dimensions.get('window').width, height: 100}}>
              <FlatList
                horizontal={true}
                data={this.state.reviews.results}
                renderItem={({item}) => <Text>{item.author}</Text>}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
            <Text style={{color: 'red', fontSize: 16}}>Casts</Text>
            <View style={{width: Dimensions.get('window').width, height: 100}}>
              <FlatList
                horizontal={true}
                data={this.state.credits.cast}
                renderItem={({item}) => <Text>{item.name}</Text>}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
            <Text style={{color: 'red', fontSize: 16}}>Simillar Movies</Text>
            <View style={{width: Dimensions.get('window').width, height: 100}}>
              <FlatList
                horizontal={true}
                data={this.state.simillarMovies.results}
                renderItem={({item}) => (
                  <Text style={{color: 'red', fontSize: 16}}>{item.title}</Text>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MoviesDetail;
