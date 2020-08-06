import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeachList';
import TeachForm from './pages/TeachForm';

function Routes(){
  return(
    <BrowserRouter >
      <Route path="/" exact component={Landing}/>
      <Route path="/study"  component={TeacherList}/>
      <Route path="/give-classes" component={TeachForm}/>
    </BrowserRouter>
  )
}

export default Routes;