import Controls from './controls.js';
import '../styles/components/largeContentTile.scss';

var largeContentTile = props => {
	var classMod = '';
	
	if(props.classMod !== 'undefined') classMod += ' ' + props.classMod;
	if(props.active) classMod += ' ' + props.activeClass;

	return (
		<li className={ "large-content-tile" + classMod }>
			<a href={'https://www.beatport.com/track/' + props.slug + '/' + props.trackId}><img className="large-content-tile__img" src={props.imgUrl} /></a>
			<div className="large-content-tile__caption paged-list__hover-trigger">
				<h3 className="large-content-tile__header"><a href="#">{props.release}</a></h3>
				<a className="large-content-tile__meta-link" href="#">{props.artist}</a>
				<a className="large-content-tile__meta-link large-content-tile__meta-link--grey-pipe" href="#">{props.label}</a>
				<div className="large-content-tile__actions">
					<Controls price={props.price} />
				</div>
			</div>
		</li>
	);
}

export default largeContentTile;
