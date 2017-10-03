import PagedList from '../components/pagedList.js';
import LargeContentTile from '../components/LargeContentTile.js';
import HeaderFPO from '../components/headerFPO.js';
import FooterFPO from '../components/footerFPO.js';
import ImageLinkListFPO from '../components/ImageLinkListFPO.js';
import ImageLinkFPO from '../components/ImageLinkFPO.js';

class index extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			trackData: [],
			loaded: false
		}

		this.trackDataPromises = [];
		this.proxy = "http://localhost:8080/";

		this.trackDataPromises.push(this.fetchTrack(this.props.featuredTracks[0]));

		this.fetchTrack = this.fetchTrack.bind(this);
	}

	componentDidMount() {
		for(let i = 1, len = this.props.featuredTracks.length; i < len; i++) {
			this.trackDataPromises.push(this.fetchTrack(this.props.featuredTracks[i]));
		}

		Promise.all(this.trackDataPromises).then(values => {
			this.setState({
				loaded: true
			});
		});
	}

	fetchTrack(trackId) {
		return fetch(this.proxy + 'https://www.beatport.com/api/tracks/' + trackId)
			.then(response => response.text())
			.then(contents => {
				var newTrackData = [...this.state.trackData, JSON.parse(contents)];

				newTrackData.sort((a, b) => {
					if(this.props.featuredTracks.indexOf(a.id) < this.props.featuredTracks.indexOf(b.id)) return -1;
					else return 1;
				});

				this.setState({
					trackData: newTrackData
				});
			}
		);
	}

	render () {
		let featuredTiles = []
		
		return [
			<HeaderFPO key="0" />,
			<main key="1" className="main-content-container main-content-container--2-col-focus-left">
				<section>
					<div className="sub-content-container--2-col-focus-left">
						<PagedList title="New On Beatport" tracksLoaded={this.state.loaded} crossfade={true} autoScroll={true}>
							{ this.state.trackData.map((data, index) => {
								let artists = data.artists.map(artist => artist.name);

								return <LargeContentTile trackId={data.id} slug={data.slug} imgUrl={data.images.large.url} release={data.title} artist={artists.join(', ')}  label={data.label.name} price={data.price.display} key={index} />;
							})}
						</PagedList>
						<PagedList classMod="hide-fpo-tablet" title="DJ Charts FPO" tracksLoaded={false} crossfade={false} autoScroll={false}>
							<ImageLinkListFPO>
								<ImageLinkFPO />
								<ImageLinkFPO />
								<ImageLinkFPO />
							</ImageLinkListFPO>
							<ImageLinkListFPO>
								<ImageLinkFPO />
								<ImageLinkFPO />
								<ImageLinkFPO />
							</ImageLinkListFPO>
						</PagedList>
					</div>
				</section>
				<section className="hide-fpo-mobile"><h2 className="fpo-header">Top Ten FPO</h2></section>
			</main>,
			<FooterFPO key="2" />
		];
	}
}

export default index;
