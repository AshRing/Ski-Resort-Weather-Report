import React from 'react';
import moment from 'moment';

const CurrentWeather = (props) => {
    if(props.data) {
        const time = new moment.unix(props.data.time);
        return (
        <div>
            <h1>{props.name}</h1>
            <h2>Current Weather</h2>
            <strong>{time.format('MMM Do, YYYY')}</strong> 
            <p>Last updated {time.format('h:mma')}</p>
            <div>
                <h2>{Math.round(props.data.temperature)}&deg; {props.data.summary}</h2>
                <p>Humidity: {Math.round(props.data.humidity*100)}%</p>
                {
                    props.data.precipType ? (
                        <div>
                            <p>Precipitation Type: {props.data.precipType}</p>
                            <p>Precipitation Intensity: {props.data.precipIntensity}</p>
                        </div>
                    ) : (
                    <p>Chance of Precipitation: {Math.round(props.data.precipProbability*100)}% </p>
                    )
                }
                <p>Wind Speed: {props.data.windSpeed}mph</p>
                <p>Cloud Cover: {Math.round(props.data.cloudCover*100)}%</p>
            </div>
        </div>
        );
    }
    return (<h1>Pick One</h1>);
}

const convertCtoF = (degrees) => {
    let x = degrees * 9 / 5 + 32;
    return Math.round(x);
}

const convertFtoC = (degrees) => {
    let x = (degrees - 32) * 5 / 9;
    return Math.round(x);
}



export default CurrentWeather;