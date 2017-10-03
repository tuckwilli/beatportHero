import Controls from './controls.js';
import '../styles/components/largeContentTile.scss';

var largeContentTile = props => {
	let
		classMod = '',
		releaseLink = 'https://www.beatport.com/track/' + props.data.slug + '/' + props.data.id,
		labelLink = 'https://www.beatport.com/label/' + props.data.label.slug + '/' + props.data.label.id;
	
	if(props.classMod !== 'undefined') classMod += ' ' + props.classMod;
	if(props.active) classMod += ' ' + props.activeClass;

	return (
		<li className={ "large-content-tile" + classMod }>
			<a href={releaseLink}><img className="large-content-tile__img" src={props.data.images.large.url} /></a>
			<div className="large-content-tile__caption paged-list__hover-trigger">
				<h3 className="large-content-tile__header"><a href={releaseLink}>{props.data.title}</a></h3>
				{ props.data.artists.map((artist, i, arr) => {
					return <a key={i} className="large-content-tile__meta-link" href={'https://www.beatport.com/artist/' + artist.slug + '/' + artist.id}>{ i === arr.length - 1 ? artist.name : artist.name + ', ' }</a>;
				})}
				<a className="large-content-tile__meta-link large-content-tile__meta-link--grey-pipe" href={labelLink}>{props.data.label.name}</a>
				<div className="large-content-tile__actions">
					<Controls price={props.data.price.display} />
				</div>
			</div>
		</li>
	);
}

export default largeContentTile;
