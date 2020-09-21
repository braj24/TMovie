import React, {Component} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {API_KEY, BASE_URL, IMAGE_PATH} from '../../constants';
import Styles from './styles';

import ListItem from '../../components/ListItem';

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      movies: null,
      error: null,
    };
    this.searchHolder = [];
  }

  componentDidMount() {
    this.getMovies();
  }

  async getMovies() {
    let url = BASE_URL + 'now_playing' + '?api_key=' + API_KEY;
    this.setState({loading: true});

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          movies: res.results,
          error: res.error || null,
          loading: false,
        });
        this.searchHolder = res.results;
      })
      .catch((error) => {
        this.setState({error, loading: false});
      });
  }

  renderSeparator = () => {
    return <View style={Styles.seperator} />;
  };

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.searchHolder.filter((item) => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      movies: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search"
        lightTheme
        round
        onChangeText={(text) => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      <View style={Styles.indicator}>
        <ActivityIndicator color="red" />
      </View>;
    }
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.movies}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('MoviesDetail', {id: item.id})
              }>
              <ListItem
                imageurl={IMAGE_PATH + item.poster_path}
                title={item.title}
                release_date={item.release_date}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}
export default MoviesList;
