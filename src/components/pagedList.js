import '../styles/components/pagedList.scss';

class pagedList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentSlide: 0
		};

		this.touchStartX = null;
		this.touchStartY = null;
		this.autoScrollId = null;
		this.activeClass = this.props.crossfade ? 'paged-list__li--active' : 'paged-list__li--active-no-crossfade';

		this.handleNavLinkClick = this.handleNavLinkClick.bind(this);
		this.handleArrowClick = this.handleArrowClick.bind(this);
		this.handleShowInfo = this.handleShowInfo.bind(this);
		this.incrementSlide = this.incrementSlide.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
	}

	componentDidMount() {
		if(this.props.autoScroll) {
			this.autoScrollId = setInterval(() => {
				if(this.props.tracksLoaded) this.incrementSlide(1);
			}, 5000);
		}
	}

	incrementSlide(direction) {
		let
			newSlide = this.state.currentSlide + direction,
			totalSlides = React.Children.count(this.props.children);

		if(newSlide < 0) newSlide = totalSlides - 1;
		else if(newSlide >= totalSlides) newSlide = 0;

		this.setState({ currentSlide: newSlide });
	}

	handleNavLinkClick(e) {
		this.setState({ currentSlide: parseInt(e.target.getAttribute('index')) });
		clearTimeout(this.autoScrollId);
	}

	handleArrowClick(e) {
		this.incrementSlide(parseInt(e.target.getAttribute('data-direction')));
		clearTimeout(this.autoScrollId);
	}

	handleShowInfo(e) {
		e.preventDefault();
		e.target.previousElementSibling.classList.toggle('paged-list__page-list--show-hover');
		clearTimeout(this.autoScrollId);
	}

	handleTouchStart(e) {
		this.touchStartX = e.touches[0].clientX;
		this.touchStartY = e.touches[0].clientY;
	}

	handleTouchMove(e) {
		if(this.touchStartX !== null && this.touchStartY !== null) {
			let
				currentX = e.touches[0].clientX,
				currentY = e.touches[0].clientY,
				deltaX = this.touchStartX - currentX,
				deltaY = this.touchStartY - currentY;

			if(Math.abs(deltaX) > Math.abs(deltaY)) {
				if(deltaX > 0) {
					this.incrementSlide(1);
				}
				else {
					this.incrementSlide(-1);
				}

				clearTimeout(this.autoScrollId);
			}

			this.touchStartX = null;
			this.touchStartY = null;
		}
	}

	render() {
		let
			totalSlides = React.Children.count(this.props.children),
			listControl = [],
			listNav = null,
			classMod = '';
	
		if(this.props.classMod !== 'undefined') classMod += ' ' + this.props.classMod;

		if(totalSlides > 1) {
			listControl.push(<li key={totalSlides} data-direction="-1" onClick={this.handleArrowClick} className="paged-list__control paged-list__control--left"><span className="sr-only">Previous</span></li>);
			listControl.push(<li key={totalSlides + 1} data-direction="1" onClick={this.handleArrowClick} className="paged-list__control paged-list__control--right"><span className="sr-only">Next</span></li>);

			listNav = (
				<ul className="paged-list__nav" style={{ gridTemplateColumns: 'repeat(' + totalSlides + ', 1fr)' }} >
					{ React.Children.map(this.props.children, (child, i) => { return <li className={ 'paged-list__nav-link' + (i == this.state.currentSlide ? ' paged-list__nav-link--active' : '') } key={i} index={i} onClick={this.handleNavLinkClick}></li>; }) }
				</ul>
			);
		}

		return (
			<article className={'paged-list' + classMod}>
				<h2 className="paged-list__header">{this.props.title}</h2>

				<ul onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} className="paged-list__page-list">
					{ React.Children.map(this.props.children, (child, i) => React.cloneElement(child, { classMod: 'paged-list__li', active: i == this.state.currentSlide, activeClass: this.activeClass })) }
					{listControl}
				</ul>

				<a onClick={this.handleShowInfo} className="paged-list__show-info" href="#">...</a>

				{listNav}
			</article>
		);
	}
}

export default pagedList;
