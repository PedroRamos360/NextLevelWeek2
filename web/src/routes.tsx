import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';
import RegisterSucess from './pages/RegisterSucess';
import RegisterFail from './pages/RegisterFail';

export default function Routes() {
   return (
      <BrowserRouter>
         <Route exact path="/" component={Landing}/>
         <Route path="/study" component={TeacherList}/>
         <Route exact path="/give-classes" component={TeacherForm}/>
         <Route path="/give-classes/sucess" component={RegisterSucess}/>
         <Route path="/give-classes/fail" component={RegisterFail}/>
      </BrowserRouter>
   );
};
