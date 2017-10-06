import React from 'react'
import '../css/index.scss'

export default React.createClass({
	render(){
	  return (
          <div className="footer">
          <hr/>
            &copy; Shopee Design 2017 v0.0.3 <span className="footer-tag"> Designed and built by Shopee Design Team</span>
            <div className="footer-logo">
            <a href="#">
              <img alt="" src="/static/image/logo-fb.svg" />
            </a>
            <a href="#">
              <img alt="" src="/static/image/logo-ins.svg" />
            </a>
            </div>
          </div>
      )
     }
})