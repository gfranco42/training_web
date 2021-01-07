import React from 'react';
import { Route, Switch } from 'react-router-dom';


/* Importer la page ici*/
import Home from './pages/home.js';
import Profil from './pages/profil.js';
import Projects from './pages/projects.js';
import Studies from './pages/studies.js';
import Admin from './pages/admin.js';



/* Ajouter le path et la page ou le component a afficher*/
const Router = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/profil" component={Profil}/>
        <Route exact path="/projects" component={Projects}/>
        <Route exact path="/studies" component={Studies}/>
        <Route exact path="/admin" component={Admin}/>
    </Switch>
)

export default Router;