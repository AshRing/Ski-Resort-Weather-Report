import React from 'react';
import moment from 'moment';

const MultipleDayWeather = (props) => {
    if(props.data) {
        const days = props.data.data.splice(1, 3);

        return (
            <div className="forecast">
                <hr></hr>
                <h2>3-Day Forecast</h2>
                <div className="forecast__dayContainer">
                {
                    days.map((day, index) => {
                        return (
                            <div key={index} className="forecast__day">
                                <h2>{convertTime(day.time)}</h2>
                                <div className="forecast__day__body">
                                    <div className="tempContainer">
                                        <div className="tempFlex">
                                            <strong>High</strong> 
                                            {Math.round(day.apparentTemperatureHigh)}&deg;
                                        </div>
                                        <div className="tempFlex">
                                            <strong>Low</strong> 
                                            {Math.round(day.apparentTemperatureLow)}&deg;
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <p>{day.summary}</p>
                                    <hr></hr>
                                    <p><strong>Snowfall:</strong> {day.precipAccumulation === undefined ? 0 : Math.round(day.precipAccumulation*100)/100}in</p>
                                </div>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        );
    }
    return null;
}

const convertTime = (timeInUNIX) => {
    return new moment.unix(timeInUNIX).format('ddd MMM D');
}


export default MultipleDayWeather;