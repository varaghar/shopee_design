import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css'; 
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

var DisplayTable = React.createClass({
    render(){
        var rows=[];
        var query = this.props.query
        var items = this.props.data
        for (var key=0; key<items.length;key++){
            var seg=items[key].name.toLowerCase().indexOf(query.toLowerCase());
            var stylename = (key === this.props.selected) ? 'result-item selected' : 'result-item';
            rows.push(
                <Link 
                    className={stylename}
                    to={items[key].route}
                    key={items[key].key} 
                >

                    {items[key].name.slice(0,seg)}
                    <span className="result-query">{items[key].name.substr(seg,query.length)}</span>
                    {items[key].name.substr(seg+query.length)}
                    <span className="result-gdlname">{items[key].menu}</span>
                </Link>
            );
        };   

        return(
             <div className="result" >{rows}</div>
        );
    }
});

var AutoFill = React.createClass({
    render(){
        if (this.props.selected >= 0 && this.props.data[this.props.selected].match === 0) {
            var fillItem = this.props.data[this.props.selected]
            return(
                <div className="result-autofill">
                    {this.props.query+fillItem.name.substr(this.props.query.length)}
                    <span className="result-gdlname">{fillItem.menu}</span>
                </div>
            );
        }else{
            return(
                <div className="result-autofill"></div>
            );
        }
    },
})
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

var Search = React.createClass({
    getInitialState(){
        return{
            query: '',
            filteredData: [],
            selected: -1
        }
    },

    doSearch(e){
        var queryText=ReactDOM.findDOMNode(this.refs.searchInput).value;
        var queryResult=[];
        if (queryText !== ''){
            this.props.data.forEach(function(comp){
                var find = comp.name.toLowerCase().indexOf(queryText.toLowerCase()) 
                if (find !== -1){
                    comp.match = find;
                    queryResult.push(comp);
                }
            });
            
            queryResult.sort(dynamicSort("match"));
            (queryResult.length > 0) ? this.setState({selected:0}) : this.setState({selected:-1});
            this.setState({
                query: queryText,
                filteredData: queryResult
            });

        }else{
            this.setState({
                query: '',
                filteredData: [],
                selected: -1
            })
        }
    },
    
    onSearchSubmit(e) {
        e.preventDefault();
        console.log(this.refs.searchSubmit.value);
        browserHistory.push(this.refs.searchSubmit.value);
    },

    onPressed(e){
        if (e.keyCode === 38 && this.state.selected > 0){
            this.setState({selected:this.state.selected - 1})
        }else if (e.keyCode === 40 && this.state.selected > -1 && this.state.selected < this.state.filteredData.length-1){
            this.setState({selected:this.state.selected + 1})
        }        
    },

    render(){
        return (
           <form onSubmit={this.onSearchSubmit}>
                <input type="text" ref="searchInput" placeholder="eg: office book, skin" onChange={this.doSearch} onKeyDown={this.onPressed}/>
                <button 
                    className='search-submit' 
                    ref="searchSubmit" 
                    type="submit" 
                    value={(this.state.selected > -1) ? this.state.filteredData[this.state.selected].route : ''}
                >
                <img alt="" src='/static/image/search.svg'/>
                </button>
                <AutoFill data={this.state.filteredData} query={this.state.query} selected={this.state.selected}/>
                <DisplayTable data={this.state.filteredData} query={this.state.query} selected={this.state.selected}/>
            </form>

        );
   }
});

export default Search;
