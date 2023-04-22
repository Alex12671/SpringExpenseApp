import React, { Component } from 'react';
import { ReactSession } from 'react-client-session';
import { Route, BrowserRouter as Router,Switch} from 'react-router-dom'
import Category from './Categories/Category';
import CategoryList from './Categories/CategoryList';
import ModifyCategory from './Categories/ModifyCategory';
import Login from './Login';
import UserHome from './User/UserHome';
import AdminHome from './Admin/AdminHome';
import Expenses from './Expenses/Expenses';
import ModifyExpense from './Expenses/ModifyExpense';
import ExpensesList from './Expenses/ExpensesList';
import "@fontsource/poppins";
import UserList from './User/UserList';
import ModifyUser from './User/ModifyUser';

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
                     <Route path='/adminHome/categories' exact={true} component={CategoryList}/>
                     <Route path='/adminHome/addCategories' exact={true} component={Category}/>
                     <Route path='/adminHome/modifyCategories/:id' exact={true} component={ModifyCategory}/>
                     <Route path='/adminHome/addExpense' exact={true} component={Expenses}/>
                     <Route path='/adminHome/expenses' exact={true} component={ExpensesList}/>
                     <Route path='/adminHome/modifyExpense/:id' exact={true} component={ModifyExpense}/>
                     <Route path='/adminHome/userList' exact={true} component={UserList}/>
                     <Route path='/adminHome/modifyUser/:id' exact={true} component={ModifyUser}/>
                </Switch>
             </Router>
        );
    }
}
 
export default App;