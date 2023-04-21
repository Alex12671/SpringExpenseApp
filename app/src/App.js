import React, { Component } from 'react';
import { ReactSession } from 'react-client-session';
import { Route, BrowserRouter as Router,Switch} from 'react-router-dom'
import Category from './Category';
import Login from './Login';
import UserHome from './User/UserHome';
import AdminHome from './Admin/AdminHome';
import Expenses from './Expenses/Expenses';
import ModifyExpense from './Expenses/ModifyExpense';
import ExpensesList from './Expenses/ExpensesList';
import "@fontsource/poppins";

ReactSession.setStoreType("localStorage");

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Switch>
                     <Route path='/' exact={true} component={Login}/>
                     <Route path='/userHome' exact={true} component={UserHome}/>
                     <Route path='/adminHome' exact={true} component={AdminHome}/>
                     <Route path='/categories' exact={true} component={Category}/>
                     <Route path='/addExpense' exact={true} component={Expenses}/>
                     <Route path='/expenses' exact={true} component={ExpensesList}/>
                     <Route path='/modifyExpense/:id' exact={true} component={ModifyExpense}/>
                </Switch>
             </Router>
        );
    }
}
 
export default App;