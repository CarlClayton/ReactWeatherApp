import React from "react";

import "./style.scss";
import Forecastday from "./forecastday";

export default class BottomSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { list } = this.props;
    return (
      <div className="bottom-container">
        <div className="inner-container">
          {list &&
            list.map((listItem, idx) => {
              const main = listItem.main;
              const weather = listItem.weather[0];
              const dt = listItem.dt;
              return (
                <Forecastday main={main} weather={weather} dt={dt} key={idx} />
              );
            })}
        </div>
      </div>
    );
  }
}
