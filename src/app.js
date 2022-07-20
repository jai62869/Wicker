import React from "react";
import Router from 'react-router';
import App from './components/App';
import Page from './components/Page';
const {Route} = Router;
// the way it will render
var routes = <Route handler={App}>

    <Route name = 'page' path = '/page/:id' handler = {page} />
</Route>;
// adding page route
Router.run (routes, Router.HistoryLocation, Root =>
    React.render(<Root />, document.getElementById('app')));
