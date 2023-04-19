import React, { Component } from 'react';
import { Route, BrowserRouter as Router,Switch} from 'react-router-dom'
import Category from './Category';
import Login from './Login';
import Expenses from './Expenses';
import ModifyExpense from './ModifyExpense';
import ExpensesList from './ExpensesList';
import "@fontsource/poppins";

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Switch>
                     <Route path='/' exact={true} component={Login}/>
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