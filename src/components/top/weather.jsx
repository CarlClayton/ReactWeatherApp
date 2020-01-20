import React from "react";

export default class Weather extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { location, temp_c, text, iconURL } = this.props;
    const imgSrc = "http://openweathermap.org/img/w/" + iconURL + ".png";
    const currentTemp = Number.parseFloat(temp_c).toFixed(0);
    //console.log(this.props);

    return (
      <div className="weather-container">
        <div className="header">{location}</div>
        <div className="inner-container">
          <div className="image">
            <img src={imgSrc} alt="Sunny" />
          </div>
          <div className="current-weather">{currentTemp}°</div>
        </div>
        <div className="footer">{text}</div>
      </div>
    );
  }
}
