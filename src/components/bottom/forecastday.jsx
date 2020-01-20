import React from "react";

export default class Forecastday extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { main, weather, dt } = this.props;
    const iconURL = `http://openweathermap.org/img/w/${weather.icon}.png`;
    const formattedTime = new Date(dt * 1000).toLocaleTimeString("en-GB");
    const options = {
      weekday: "long",
      //year: "numeric",
      month: "short",
      day: "numeric"
    };
    const formattedDay = new Date(dt * 1000).toLocaleDateString(
      "en-GB",
      options
    );
    const temp = Number.parseFloat(main.temp).toFixed(0);

    return (
      <div className="forecastday-container">
        <div className="text">{formattedDay}</div>
        <div className="image">
          <img src={iconURL} alt="Sunny" />
        </div>
        <div className="text">{formattedTime}</div>
        <div className="text">{temp}°</div>
        <div className="text">{weather.description}</div>
      </div>
    );
  }
}
