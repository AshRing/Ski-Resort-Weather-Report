import React from 'react';
import moment from 'moment';

const CurrentWeather = (props) => {
    if(props.data) {
        const time = new moment.unix(props.data.time);
        return (
            <div>
                <h2>Current Weather</h2>
                    {/* <strong>{time.format('MMM Do, YYYY')}</strong>  */}
                <p className="weather__lastUpdated">Last updated on {time.format('M/D/YY @ h:mma')}</p>
                <div>
                    <div className="weather__tempContainer">
                        <strong className="weather__temp">{Math.round(props.data.temperature)}&deg;</strong><h2>  {props.data.summary}</h2>
                    </div>
                    <table className="weather__table">
                        <tbody>
                            <tr>
                                <th><strong>Humidity:</strong></th>
                                <td>{Math.round(props.data.humidity*100)}%</td>
                            </tr>
                            {
                                props.data.precipType ? (
                                    <div>
                                        <tr>
                                            <th><strong>Precipitation Type:</strong></th>
                                            <td>{props.data.precipType}</td>
                                        </tr>
                                        <tr>
                                            <th><strong>Precipitation Intensity:</strong></th>
                                            <td>{props.data.precipIntensity}</td>
                                        </tr>
                                    </div>
                                ) : (
                                    <tr>
                                        <th><strong>Chance of Precipitation:</strong></th>
                                        <td>{Math.round(props.data.precipProbability*100)}%</td>
                                    </tr>
                                )
                            }
                            <tr>
                                <th><strong>Wind Speed:</strong></th>
                                <td>{props.data.windSpeed}mph</td>
                            </tr>
                            <tr>
                                <th><strong>Cloud Cover:</strong></th>
                                <td>{Math.round(props.data.cloudCover*100)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    return null;
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