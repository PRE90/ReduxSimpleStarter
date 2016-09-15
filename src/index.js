import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTsearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCXLSs5eGzLb0KbeHSe4Zcz6Itw1EErOsA';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};

		YTsearch({key: API_KEY, term: 'puppy'}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render () {
		return (
			<div>
				<SearchBar />
				<VideoDetail video={ this.state.selectedVideo }/>
				<VideoList 
					onVideoSelect={ selectedVideo => this.setState(
						{ selectedVideo }) }
					videos={ this.state.videos } />
			</div>
		);
	}
}

ReactDom.render(<App />, document.querySelector('.container'));