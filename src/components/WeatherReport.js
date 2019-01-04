import React from 'react';
import CurrentWeather from './CurrentWeather';
import MultipleDayWeather from './MultipleDayWeather';

const WeatherReport = (props) => {
    if(props.name !== '') {
        return (
            <div className="weatherContainer">
                <h1>{props.name}</h1>
                <div className="weather">
                    <CurrentWeather data={props.data.currently} />
                    <MultipleDayWeather data={props.data.daily} />
                </div>
            </div>
        );
    }
    return (<h1><i className="fas fa-arrow-left"></i> Pick A Resort</h1>);
}

export default WeatherReport;