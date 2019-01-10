import React from 'react';
import Resort from './Resort';
import $ from 'jquery';
import WeatherReport from './WeatherReport';

const API_KEY = '012d71c7f728d35e022660cde356347c';
const proxyUrl = 'https://pacific-cove-84594.herokuapp.com/';  //proxy with added CORS headers, needed to fetch API data

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resorts: [],
            name: '',
            id: null,
            data: [{time: 0}], //initialize time to 0 to avoid initial state being undefined
            isFetching: false //Used to identify when weather data is loading
        }
    }

    componentWillMount() { //Starts fetching data about the ski resorts in Colorado from API, stores their name and id in an object, which gets passed to the resorts array
        const targetUrl = 'https://skimap.org/Regions/view/281.xml';
        this.setState({isFetching: true});
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
            this.setState({isFetching: false});
        })
        .catch(err => console.log(err));
    }

    handleClick = (id) => { //when a resort is selected, its ID value is used to find its lat/long, which is passed to fetchWeatherData
        const targetUrl = `https://skimap.org/SkiAreas/view/${id}.json`;
        return fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({name: data.name}); //state.name is set with the currently selected resort
            this.fetchWeatherData(data.latitude, data.longitude);
            console.log(data);
        })
        .catch(err => console.log(err));
        
    }

    fetchWeatherData(lat, long) { //uses lat/long to fetch weather data from API
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
            <div className="dashboard">
                <div className="titleContainer">
                    <i className="far fa-snowflake app__icon"></i> 
                    <h1 className="app__title">Ski Resort&nbsp;</h1>  
                    <h1 className="app__title">Weather Report</h1>
                </div>
                
                <div className="container">
                    <div className="resortContainer">
                        <a href="#" className="resortContainer__dropButton"><h2 >Pick a Resort <i className="fas fa-arrow-down"></i></h2></a>
                        <div className="resortContainer__menu">
                            <ul className="resortContainer__resortList">
                            { 
                                this.state.isFetching ? null : this.state.resorts.map((resort) => {
                                return <Resort name={resort.name} key={resort.name} type={'ul'} handleClick={(e) => {
                                    e.preventDefault();
                                    this.handleClick(resort.id)}}/>
                                })
                            }
                            </ul>
                            <select 
                                value={this.state.value} 
                                onChange={(e) => {
                                    e.preventDefault();
                                    this.handleClick(e.target.value)}
                                }
                                className="resortContainer__resortDropdown"
                            >
                                <option value='resort'>Pick a Resort</option>
                                {   this.state.isFetching ? <option value="loading">Loading Resorts...</option> : this.state.resorts.map((resort) => {
                                        return <Resort name={resort.name} id={resort.id} type={'select'} key={resort.name} />
                                    })
                                }
                            </select>
                        </div>   
                    </div>
                    <div className="statusContainer">
                        {
                            this.state.isFetching ? <img src="images/loader.gif"></img> : <WeatherReport data={this.state.data} name={this.state.name} elevation={this.state.elevation} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;