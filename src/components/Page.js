import React from 'react';
import * as API from '../api';

export default class Page extends React.Component {
    state = { page: {} }
    componentDidMount(){
        API.pages.child(this.props.params.id).on('value' , this.updateContent);
    }
    componentWillReceiveProps(nextProps){
        API.pages.child(this.props.params.id).off('value', this.updateContent);
        API.pages.child(nextProps.params.id).on('value', this.updateContent);
    }
    updateContent = (snapshot) => {
        let json = snapshot.exportVal();
        this.setState({
            page: json,
            sections: json.sections
        });
    }
    render() {
        let section = [];
        if(this.state.page.title){ //Data is loaded
            //render sections
            if (this.props.user)
                section.push(<p key = 'addSection'>
                    <button onClick={this.addSection}> Add Section </button>
                </p>);
        }
        return <article>
            <h1> {this.state.page.title || 'Loading...'} </h1>
            {sections}
        </article>
    }
    addSection = evt =>{
        let id; 
        if(!this.state.section){
            id = 1;
            this.state.section ={};
        }else{
            id = Math.max(...Object.keys(this.state.section)) + 1 ;
        }
        this.state.section[id]={
            editor: this.props.user.username;
        }
        this.setState({
            section:this.state.section
        });
        }
    }
