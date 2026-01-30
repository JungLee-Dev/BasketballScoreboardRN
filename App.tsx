import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

class App extends Component {
  state = {
    count: 0,
  };

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>You clicked {this.state.count} times</Text>
        </View>
        <View>
          <Text>Don't click me</Text>
        </View>
        <View>
          <Text>Don't click me please</Text>
        </View>
        <View>
          <Text>Stop click me please</Text>
        </View>
        <View>
          <Text>Do you want to click?</Text>
        </View>
        <View>
          <Text>I know you want to click this</Text>
        </View>
        <View>
          <Text>But you can't</Text>
        </View>
        <View>
          <Text>Sorry about that</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
