import Index from './views/index.js';
import './styles/global.scss';
import './styles/fpo.scss';
import './styles/architecture.scss';

let featuredTracks = [
	9625054,
	9382891,
	9676572,
	9628643,
	9678024,
	9702409,
	9548091,
	9676571,
	9746512,
	9705380
];

ReactDOM.render(
	<Index featuredTracks={featuredTracks} />,
	document.getElementById('root')
);
