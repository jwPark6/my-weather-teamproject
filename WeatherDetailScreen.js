import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const API_KEY = '76f15abf62343c88e6399d827054a212';
const queryUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

export default class WeatherDetailScreen extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     isLoading: true,
   };
 }

 componentDidMount() {
    const {
      route: {
        params: { city },
      },
    } = this.props;

    fetch(queryUrl(city))
      .then(response => response.json())
      .then(info => {
        console.log(info);
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    const {
      route: {
        params: { city },
      },
      navigation,
    } = this.props;

    navigation.setOptions({ title: `Weather Information: ${city}` });

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let feelCelsius = this.state.main.feels_like - 273.15;
    let humidity = this.state.main.humidity;
    let weather = this.state.weather.main;

    return (
      <View style={styles.container}>
      <Text style={styles.h}>City Name : {this.state.name}</Text>
      <Text style={styles.a}>현재온도 : {celsius.toFixed(1)}</Text>
      <Text style={styles.b}>체감온도 : {feelCelsius.toFixed(1)}</Text>
      <Text style={styles.c}>습도 : {humidity.toFixed(1)}</Text>
      <Text style={styles.d}>날씨 : {this.state.weather[0].main}</Text>
      <Text style={styles.e}>상세날씨설명 : {this.state.weather[0].description}</Text>
      <Text style={styles.f}>바람 : {this.state.wind.speed}</Text>
      <Text style={styles.g}>나라 : {this.state.sys.country}</Text>
      <Text style={styles.i}>구름 : {this.state.clouds.all}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  a:{
    color: 'skyblue',
    fontSize: 30,
    padding: 20,
  },
  b:{
    color: '#8CD161',
    fontSize: 30,
    padding: 20,
  },
  c:{
    color: '#6AD5E6',
    fontSize: 30,
    padding: 20,
  },
  d:{
    color: '#586CEF',
    fontSize: 30,
    padding: 20,
  },
  e:{
    color: '#FDCA8C',
    fontSize: 30,
    padding: 20,
  },
  f:{
    color: '#E39794',
    fontSize: 30,
    padding: 20,
  },
  g:{
    color: '#72E065',
    fontSize: 30,
    padding: 20,
  },
  h:{
    color: '#F17BE3',
    fontSize: 30,
    padding: 20,
    fontFamily: 'fantasy',
  },
  i:{
    color: '#54545A',
    fontSize: 30,
    padding: 20,
  },
});
