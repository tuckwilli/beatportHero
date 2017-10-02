var imageLinkFPO = props => {
	var classMod = '';
	
	if(props.classMod !== 'undefined') classMod += ' ' + props.classMod;
	if(props.active) classMod += ' ' + props.activeClass;

	return <ul className={'image-link-list' + classMod}>{props.children}</ul>;
}

export default imageLinkFPO;
