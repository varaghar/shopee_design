import React from 'react'
import { Link } from 'react-router'
import '../css/index.css'

export default React.createClass({
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillMount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  getInitialState(){
        return{
            pagePosition:0,
            mousePosition:0,
        }
  },


  handleScroll() {
   //var winHeight = window.innerHeight;
   //var body = document.body;
   //var html = document.documentElement;
   //var docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
   //                html.clientHeight, html.scrollHeight, html.offsetHeight );

   var value = document.body.scrollTop;
   this.setState({pagePosition:value});
  },

  onMousemove(e){
    this.setState({mousePosition:e.clientY})
  },

  render() {
    var style='';
    if(this.state.pagePosition > 0 || this.props.params.gdlName) style =' add-shadow';
    if(this.props.params.compName) style = ' navbar-collapse';
    return (
      <div>
        <div className={"navbar"+style}>
        <div className="container">
          <Link to="/"><img src="/static/image/logo.svg" className="nav-logo" alt=""/></Link>
          
          <div className="nav-links">
            <a className="nav-item" href="/" >Home</a>
            {/* <div className="dropdown">
              <Link className="nav-item" to="/product" activeClassName="active">Product</Link>
              {(this.props.params.gdlName) ? 
              <div></div>
              :
              <div className="dropdown-content">
                <Link className="dropdown-item" to="/product/sc-guideline" activeClassName="active">Seller Center Guideline</Link>
                <Link className="dropdown-item" to="/product/pcmall-guideline" activeClassName="active">PC Mall Guideline</Link>
                <Link className="dropdown-item" to="/product/app-guideline" activeClassName="active">Mobile App Guideline</Link>
              </div>
              }
            </div> */}
            <Link className="nav-item" to="/branding" activeClassName="active">Branding</Link>
            {/* <a className="nav-item" href="https://medium.com/shopee" >Articles</a> */}
            <a className="nav-item" href="http://careers.shopee.sg/job?department_id=17" >Join Us</a>
            {/*<Link className="nav-item" to="/join-us" activeClassName="active">Join us</Link>*/}
          </div>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
})
