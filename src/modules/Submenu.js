import React from 'react';
import { Link } from 'react-router';
import '../css/sidebar.scss';

function makeAddr(title){
  var addr = title.toLowerCase().replace(/ /g,'-');
  return addr;
}

export default React.createClass({

	getInitialState(){
		return {
			visible: this.props.opened
		};
	},
	
	toggleShow(){
		this.setState({visible: !this.state.visible});
	},

	renderListItems(root, gdlName, submenu,lang){
	  var section = [];
	  submenu.forEach(function(item){
	    section.push(
	    <div className="expandable-listview_listItems" key={item}>
	      <Link 
	        className="link" 
	        to={root+gdlName+"/"+makeAddr(item)} 
	        activeClassName="sidebar-item-active"
	      >
	        {item}
	      </Link>
	    </div>
	    );
	  });
	  return section;
	},

	render(){
		var style = { height: this.state.visible ? this.props.submenu.length * 40 : 0 };
		return(
			<div className="expandable-listview_ul">
				<div className="expandable-listview_listHeader" onClick={this.toggleShow}>
					<span>{this.props.header}</span>
					{this.state.visible ?
						<img className="expandable-listview_triangle inverse" src="/static/image/triangle.svg" alt=""/>
						:
						<img className="expandable-listview_triangle" src="/static/image/triangle.svg" alt=""/>
					}
				</div>
				<div className={"collapsible"} style={style}>
				{this.renderListItems(this.props.root, this.props.gdlName, this.props.submenu, this.props.lang)}
			</div>
			</div>
		)
	}
}
)