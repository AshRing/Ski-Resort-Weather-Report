import React from 'react';
import CurrentWeather from './CurrentWeather';

const WeatherReport = (props) => (
            <div>
                <CurrentWeather data={props.data.currently} name={props.name}/>
            </div>
)

export default WeatherReport;