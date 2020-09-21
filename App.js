import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import MoviesList from "./app/screens/MoviesList"
import MoviesDetail from "./app/screens/MoviesDetail"

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MoviesList"
          component={MoviesList}
        />
        <Stack.Screen
          name="MoviesDetail"
          component={MoviesDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
