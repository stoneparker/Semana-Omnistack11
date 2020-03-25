import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';

export default function Routes() {
     return (
          <BrowserRouter>
               <Switch> {/* Apenas uma rota é chamada por vez */}
                    <Route path="/" exact component={Logon} /> {/* exact - ser exatamente /, para n atrapalhar os demais links */}
                    <Route path="/register" component={Register} />
               </Switch>
          </BrowserRouter>
     )
}