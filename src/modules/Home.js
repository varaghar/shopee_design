/*global $*/
import React from 'react';
import Footer from './Footer';
// import P5Wrapper from 'react-p5-wrapper';
import { Link } from 'react-router';
// import sketch from '../sketches/sketch';
import Search from './Search';

var searchList = []
var menuName = ''
var menu = ''
var root = ''

for (var i = 0; i<4; i++){
    if(i === 0) {
            menuName = 'Seller Center Guideline';
            menu = require('../sc-guideline-menu.json');
            root = '/product/sc-guideline/';
    }else if (i === 1){ 
            menuName = 'PC Mall Guideline';
            menu = require('../pcmall-guideline-menu.json');
            root = '/product/pcmall-guideline/';
    }else if (i === 2){
            menuName = 'APP Guideline';
            menu = require('../app-guideline-menu.json');
            root = '/product/app-guideline/';
    }else{
            menuName = 'Branding';
            menu = require('../branding-menu.json');
            root = '/branding/';
    }
    for (var submenu in menu){
        for (var item in menu[submenu]){
            searchList.push({
                name: menu[submenu][item],
                route: root + makeAddr(menu[submenu][item]),
                menu: menuName,
                key: menuName + menu[submenu][item],
                match: -1,
            })
        };        
    }
}

function makeAddr(title){
  var addr = title.toLowerCase().replace(/ /g,'-');
  return addr;
}

export default class Home extends React.Component {
  
  componentDidMount() {
    $(function() {
        var $content = $('#content');
        var data = {
            rss_url: 'https://medium.com/feed/shopee',
            api_key: 'kno0tsodiwcedh5jnzeirsku6lb50c33tw9ylqhe',
            // need to register from https://rss2json.com/me/api_key
            count: 3,
            order_by:'pubDate'
        };
		$.get('https://api.rss2json.com/v1/api.json', data, function(response) {
            console.log(response);
            if (response.status === 'ok') {
                var output = ''; 
				$.each(response.items, function(k, item) {
					
					var tagIndex = item.description.indexOf('<img'); 
					var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; 
					var srcStart = srcIndex + 5; 
					var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart;
					var src = item.description.substring(srcStart, srcEnd); 
					
					output += '<div class="card" ><a href="'+ item.link + '" target="_blank"><div class="card-crop"><img class="card-img" src="' + src + '" /></div></a>';
					output += '<a class="card-title" href="'+ item.link + '" target="_blank">' + item.title + '</a>';

					var yourString = item.description.replace(/<figure[^>]*>/g,"");
					yourString = yourString.replace(/<img[^>]*>/g,"");
				    yourString = yourString.replace(/<hr>/g,"");
					yourString = yourString.replace(/<strong[^>]*>/g,"");
					yourString = yourString.replace(/<a[^>]*>/g,"");
					yourString = yourString.replace(/<strong[^>]*>/g,"");
					yourString = yourString.replace(/<h[^>]*>/g,"");
					yourString = yourString.replace(/<p[^>]*>/g,"");

					var maxLength = 80 
					if (yourString.indexOf('</p>')<maxLength) {
						var trimmedString = yourString.substr(0,yourString.indexOf('</p>'));
					}
					else {
						trimmedString = yourString.substr(0, maxLength) + '...';
					}

					output += '<div class="card-content">' + trimmedString + '</p></div>';
					output += '<div class="card-footer">By ' + item.author + '</div></div>';
                });
				$content.html(output);
			}	
		});
	});
  }

  render() {
    return (
    	<div className='container'>
    		<div className='jumbotron'>
    			<div className='jumbotron-header'>
    				<span className="jumbotron-brandname">Shopee Design</span> exists to enhance<br/> product experience & work efficiency
    			</div>
   				{/* <div className="jumbotron-img">
                    <P5Wrapper sketch={sketch} />
                </div> */}
                <img src="/static/image/web.png" alt="" className="web"/>
    			<div className='jumbotron-search'>
            <Search data={searchList}/>
    			</div>
     		</div>
        <hr/>
        <div className="main-branding clearfix">
     		<Link className="branding-card" to="/branding/logo">
                <img src="/static/image/icon-visual-resource.svg" alt="Visual Resource icon"/>
                <h3>Visual Resource</h3>
                <p>You can find logos, color, pattern collections shopee platform in here, raising brand images of shopee.</p>
     		</Link>
             <Link className="branding-card" to="/branding/banner">
                <img src="/static/image/icon-guideline.svg" alt="Guideline icon"/>
                <h3>Guideline</h3>
                <p>You can find Shopee branding guideline here, please follow the principles to maintain Shopee brand image.</p>
     		</Link>
             <Link className="branding-card" to="/branding/core-value">
                <img src="/static/image/icon-brand-book.svg" alt="Brand Book icon"/>
                <h3>Brand Book</h3>
                <p>The book hightlights key components important to the Shopee brand: our purpose, our positioning and our personality.</p>
     		</Link>
        </div>
        <hr/>
        <div className="title">Articles</div>
        <div id="content">Loading Medium content...</div>
        <hr/>
    	<div className="title">Team</div>
        <img src="/static/image/team_member.png" alt="Shopee Design Team Member" className="team-pic"/>
        <div className="bottom-placeholder"/>

        <Footer/>
    	</div>
    	
    );
  }
}
