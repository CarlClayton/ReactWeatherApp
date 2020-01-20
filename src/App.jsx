import React, { Component } from "react";
import "./App.css";
import "./sass/app.scss";
import axios from "axios";

import TopSection from "./components/top/index";
import BottomSection from "./components/bottom/index";

//const WEATHER_KEY = "bb832b83f4292f33632f6396bd346716";
const WEATHER_KEY = "e8ad932b2726c631ecacc6d9c23448a0";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Reading",
      numlist: 40,
      isLoading: true
    };
  }

  updateWeather() {
    const { cityName, numlist } = this.state;
    //const URL = `http://api.weatherstack.com/forecast?access_key=${WEATHER_KEY}&query=${cityName}&forecast_ays=${numlist}`;
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${WEATHER_KEY}&cnt=${numlist}`;

    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //console.log(data);
        this.setState({
          isLoading: false,
          temp_c: data.list[0].main.temp,
          text: data.list[0].weather[0].description,
          iconURL: data.list[0].weather[0].icon,
          list: data.list
        });
      })
      .catch(err => {
        if (err) console.error("Cannot fetch weather data from API, ", err);
      });
  }

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", data => {
      this.setState({ cityName: data }, () => this.updateWeather());
    });
  }

  render() {
    const { isLoading, cityName, temp_c, text, iconURL, list } = this.state;

    return (
      <div className="app-container">
        <div className="main-container">
          {isLoading && <h3>Loading Weather...</h3>}
          {!isLoading && (
            <div className="top-section">
              <TopSection
                location={cityName}
                temp_c={temp_c}
                text={text}
                iconURL={iconURL}
                eventEmitter={this.props.eventEmitter}
              />
            </div>
          )}
          <div className="bottom-section">
            <BottomSection list={list} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
