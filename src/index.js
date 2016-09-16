import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTsearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = '';

class App extends Component {
	// begin constructor
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('puppy');
	} // end constructor

	// Class methods 
	videoSearch(term) {
		YTsearch({ key: API_KEY, term: term }, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render () {
		const videoSearch = _.debounce((term) => { 
			this.videoSearch(term) }, 300);


		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
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