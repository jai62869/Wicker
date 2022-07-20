// after login this page will display
import React from "react";
import * as API from '../api';
export default class PageList extends React.Component{
    state = {
        newPageTitle:''
    }
    render (){
        return<div>
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