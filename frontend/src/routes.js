import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';

export default function Routes() {
     return (
          <BrowserRouter>
               <Switch> {/* Apenas uma rota é chamada por vez */}
                    <Route path="/" exact component={Logon} /> {/* exact - ser exatamente /, para n atrapalhar os demais links */}
                    <Route path="/register" component={Register} />
                    <Route path="/profile" component={Profile} />
               </Switch>
          </BrowserRouter>
     )
}