import React from 'react';
import Resort from './Resort';
import $ from 'jquery';
import WeatherReport from './WeatherReport';

const API_KEY = '012d71c7f728d35e022660cde356347c';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resorts: [],
            name: '',
            elevation: undefined,
            data: [{time: 0}]
        }
    }

    componentWillMount() {
        return fetch('https://skimap.org/Regions/view/281.xml')
        .then(res => res.text())
        .then(xmlString => $.parseXML(xmlString))
        .then(data => {
            let resorts = [];
            
            const x = data.getElementsByTagName("skiArea");
            
            for(let i=0; i<x.length; i++) {
                let resortObj = {id: undefined, name: undefined}
                resortObj.name = x[i].childNodes[0].data;
                resortObj.id = x[i].getAttribute('id');
                resorts.push(resortObj);
            }

            this.setState({resorts});
        });
    }

    handleClick = (id) => {
        return fetch(`https://skimap.org/SkiAreas/view/${id}.json`)
        .then(response => response.json())
        .then(data => {
            this.setState({name: data.name});
            this.fetchWeatherData(data.latitude, data.longitude);
        })
        .catch(err => console.log(err));
        
    }

    fetchWeatherData(lat, long) {
        return fetch(`https://api.darksky.net/forecast/${API_KEY}/${lat},${long}?exclude=[minutely]`)
        .then(response => response.json())
        .then(data => {
            this.setState({data});
            console.log(this.state.data);
            // const d = new Date(this.state.data.data[6].time);
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <div className="titleContainer">
                    <i className="far fa-snowflake app__icon"></i>
                    <h1 className="app__title">Ski Resort Weather Report</h1>
                </div>
                
                <div className="container">
                    <div className="resortContainer">
                        <div className="resortContainer__scroller">
                            <ul>
                            { 
                                this.state.resorts.map((resort) => {
                                return <Resort name={resort.name} key={resort.name} handleClick={(e) => {
                                    e.preventDefault();
                                    this.handleClick(resort.id)}}/>
                                })
                            }
                            </ul>
                        </div>   
                    </div>
                    <div className="statusContainer"><WeatherReport data={this.state.data} name={this.state.name} elevation={this.state.elevation} /></div>
                </div>
            </div>
        );
    }
}

export default Dashboard;