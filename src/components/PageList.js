// after login this page will display
import React from "react";
import * as API from '../api';
import {Link} from 'react-router';
export default class PageList extends React.Component{
    state = {
        // when page is loading to display content 
        loaded:false,
        pages:{},
        newPageTitle:''
    }
    componentDidMount() {
        API.pages.on('value' , ss => this.setState({
            pages: ss.exportVal() || {},
            loaded: true
        }));
    }
    render (){
        let items = this.state.loading ? object.keys(this.state.pages).map(id => <li key={id}>
            <Link to='page' params = { {id:id}}>{this.state.pages[id].title}</Link>
        </li>):
            [<li key ='loading'><em> Loading ....</em></li>]
        return<div>
            <ul> {items} </ul>
            {this.props.user ?
                <input type = 'text'
                        className = 'u-full-width'
                        value={this.state.newPageTitle}
                        placeholder = 'New Page Title'
                        onChange={this.update}
                        onKeyPress = {this.createPage}/>:
                        null

            }
        </div>;
    }
    update = evt => this.setState({newPageTitle: evt.target.value });
    createPage = evt =>{
        // Keycode 13 is the enter key.
        if (evt.charcode !== 13) return;
        // Adding element to firebase using push method
        API.pages.push({ title: this.state.newPageTitle});
        this.setState({ newPageTitle: ''});
    }
}