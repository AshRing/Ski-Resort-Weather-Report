import React from 'react';
import CurrentWeather from './CurrentWeather';

const WeatherReport = (props) => {
    if(props.name !== '') {
        return (
            <div className="weatherContainer">
                <h1>{props.name}</h1>
                <CurrentWeather data={props.data.currently} name={props.name}/>
            </div>
        );
    }
    return (<h1><i className="fas fa-arrow-left"></i> Pick A Resort</h1>);
}

export default WeatherReport;