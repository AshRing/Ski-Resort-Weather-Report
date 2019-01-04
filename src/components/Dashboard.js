import React from 'react';
import Resort from './Resort';
import $ from 'jquery';
import WeatherReport from './WeatherReport';

const API_KEY = '012d71c7f728d35e022660cde356347c';
const proxyUrl = 'https://pacific-cove-84594.herokuapp.com/';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resorts: [],
            name: '',

            data: [{time: 0}],
            isFetching: false
        }
    }

    componentWillMount() {
        const targetUrl = 'https://skimap.org/Regions/view/281.xml';

        return fetch(proxyUrl + targetUrl)
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
        })
        .catch(err => console.log(err));
    }

    handleClick = (id) => {
        const targetUrl = `https://skimap.org/SkiAreas/view/${id}.json`;
        return fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({name: data.name});
            this.fetchWeatherData(data.latitude, data.longitude);
            console.log(data);
        })
        .catch(err => console.log(err));
        
    }

    fetchWeatherData(lat, long) {
        const targetUrl = `https://api.darksky.net/forecast/${API_KEY}/${lat},${long}?exclude=[minutely]`;
        this.setState({isFetching: true});
        return fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({isFetching: false, data});
            console.log(data);
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
                    <div className="statusContainer">
                        {
                            this.state.isFetching ? null : <WeatherReport data={this.state.data} name={this.state.name} elevation={this.state.elevation} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;