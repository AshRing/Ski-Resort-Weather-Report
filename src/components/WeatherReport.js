import React from 'react';
import CurrentWeather from './CurrentWeather';
import MultipleDayWeather from './MultipleDayWeather';
import Landing from './Landing';

const WeatherReport = (props) => {
    if(props.name !== '') {
        return (
            <div className="weatherContainer">
                <h1>{props.name}</h1>
                <div className="weather">
                    <CurrentWeather data={props.data.currently} daily={props.data.daily} />
                    <MultipleDayWeather data={props.data.daily} />
                </div>
            </div>
        );
    }
    return <Landing />;
}

export default WeatherReport;