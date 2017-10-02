import '../styles/components/controls.scss';

var controls = props => {
	return ([
		<a key="0" className="play-btn" href="#"><span className="sr-only">play</span></a>,
		<a key="1" className="playlist-btn" href="#"><span className="sr-only">add to playlist</span></a>,
		<a key="2" className="cart-btn" href="#"><span className="sr-only">add to cart</span>{props.price}</a>,
		<span key="3" className="cart-dropdown"></span>
	]);
}

export default controls;
