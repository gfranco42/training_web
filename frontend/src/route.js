import React from 'react';
import { Route, Switch } from 'react-router-dom';


/* Importer la page ici*/
import Home from './pages/home.js';
import Profil from './pages/profil.js';
import Projects from './pages/projects.js';
import Studies from './pages/studies.js';
import Admin from './pages/admin.js';
import Gallery from './pages/gallery.js';
import ErrorPage from './pages/errorPage.js';



/* Ajouter le path et la page ou le component a afficher*/
const Router = () => (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/profil" component={Profil}/>
            <Route exact path="/projects" component={Projects}/>
            <Route exact path="/studies" component={Studies}/>
            <Route exact path="/gallery" component={Gallery}/>
            <Route exact path="/admin" component={Admin}/>
            <Route exact path="/error" component={ErrorPage}/>
            <Route path="/" component={ErrorPage} />
        </Switch>
)

export default Router;