import React from 'react';
import ReactDOM from 'react-dom';
import jsonp from 'jsonp';
import './styles/app.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ChannelList from './components/ChannelList';
import FilterMenu from './components/FilterMenu';
import FormGroupWrapper from './components/FormGroupWrapper';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			channels: {},
			names: ["ESL_SC2", "OgamingSC2", "cretetion", 
				"freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
				"brunofin", "comster404"],
			submittedTerm: '',
			filter: false,
			channelsToShow: {}
		};
		
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleTermSubmit = this.handleTermSubmit.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
	}
	
	componentWillMount() {	
		var channelData = {};
		var urlForChannelQuery;
		var urlForUserQuery;
			
		for (var i = 0; i < this.state.names.length; i++) {
			var counter =  0;
			(function(name) {
				urlForChannelQuery = `https://api.twitch.tv/kraken/streams/${name}`;
				jsonp(urlForChannelQuery, (err, data) => {
					if (err) {
						console.log(err);
						return "Error";
					}
					data.searchedName = name;
					channelData[name] = data;
					
					urlForUserQuery =`https://api.twitch.tv/kraken/users/${name}`
					jsonp(urlForUserQuery, (err, data) => {
						
						if (!data.error) {
							channelData[name].image = data.logo;
						}
						
						if (counter === this.state.names.length - 1) {
							this.setState({channels: channelData});
							this.setState({channelsToShow: channelData});
						}
						counter += 1;
					});
						
				});
					
			}.bind(this))(this.state.names[i]);
		}			
	}
							
	handleTermSubmit(term) {
		var selectedChannels = {};
		if (term in this.state.channels) {
			selectedChannels[term] = this.state.channels[term];
			this.setState({channelsToShow: selectedChannels});
		}
	}
	
	clearSearch() {
		this.setState({channelsToShow: this.state.channels});
	}
	
	handleFilterChange(choice) {
		var selectedChannels = {};
		if (choice === "Online") {
			for (var chan in this.state.channels) {
				if (this.state.channels[chan].stream) {
					selectedChannels[chan] = this.state.channels[chan];
				}
			}
			this.setState({channelsToShow: selectedChannels});
		}
		
		if (choice === "Offline") {
			for (var chan in this.state.channels) {
				if (!this.state.channels[chan].stream) {
					selectedChannels[chan] = this.state.channels[chan];
				}
			}
			this.setState({channelsToShow: selectedChannels});
		}
		
		if (choice === "All") {
			this.setState({channelsToShow: this.state.channels});
		}
			
	}
	
	
	render() {
		return (
			<div className='container col-lg-6 col-lg-offset-3'>
				<Header />
				<SearchBar onTermSubmit={this.handleTermSubmit}
				onSearchClear={this.clearSearch}
				className='search-form'
				/>
				<FilterMenu onFilterChange={this.handleFilterChange} />
				<ChannelList channels={this.state.channelsToShow}/>
			</div>
		);
	}
}


ReactDOM.render(<App />, document.getElementById('app'));
