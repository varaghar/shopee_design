import React from 'react';
import Submenu from './Submenu';
import '../css/sidebar.css';

function makeTitle(addr){
  var title = addr.replace(/-/g,' ');
  return title.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

export default React.createClass({
	
	renderSubmenu(){
		var menu = this.props.data;
		var content = [];
		for (var key in menu){
    		var opened = menu[key].indexOf(makeTitle(this.props.compName.slice(0,-3)))=== -1? false:true;
    		content.push(<Submenu root={this.props.root} gdlName={this.props.gdlName} submenu={menu[key]} opened={opened} header={key} key={this.props.gdlName+key} lang={this.props.lang}/>);
		}

		return content;
	},

	render(){
		return(
			<div className="expandable-listview_outerDiv">
			{this.renderSubmenu()}
			</div>
		);
	}
})