import React, { Component } from 'react';
import ExpensesIcon from '../Img/expensesIcon.png';
import CategoriesIcon from '../Img/categoriesIcon.png';
import UsersIcon from '../Img/usersIcon.png';
import {Link } from 'react-router-dom';
import AppNav from '../AppNav';
import {Container,Button,} from 'reactstrap';
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");


class UserHome extends Component {

    render() { 

        if(ReactSession.get('role') === 'admin') {
            return (
                <div>
                    <AppNav/>
                <Container>
                    <Container className="d-flex flex-column align-items-center justify-content-center">
                        <Container className="w-75 flex-column bg-white shadow rounded p-3">
                            <h4 class="text-center">Bienvenid@, {ReactSession.get('user')}!</h4>
                            <Container className="d-flex flex-column align-items-center justify-content-center">
                                <Link to={"/adminHome/expenses/"} className="text-white h5 w-50 bg-info rounded"><Button className="w-100 bg-info">ADMINISTRAR GASTOS <img alt="Icono gastos" src={ExpensesIcon} class="img-fluid" width='60px'></img></Button></Link>
                                <Link to={"/adminHome/categories/"} className="text-white h5 w-50 bg-info rounded mt-4"><Button className=" w-100 bg-info">ADMINISTRAR CATEGORÍAS <img alt="Icono categorias" src={CategoriesIcon} class="img-fluid" width='60px'></img></Button></Link>
                                <Link to={"/adminHome/UserList/"} className="text-white h5 w-50 bg-info rounded mt-4"><Button className="w-100 bg-info">ADMINISTRAR USUARIOS <img alt="Icono usuarios" src={UsersIcon} class="img-fluid" width='60px'></img></Button></Link>
                            </Container>
                        </Container>
                    </Container>
                </Container>
                </div>
            );
        }
        return (
            <div>
            <Container>
                <Container className="d-flex flex-column align-items-center justify-content-center">
                    <Container className="w-50 flex-column bg-white shadow rounded p-3">
                        <p class="text-center fw-bold mt-2 h4">Debes estar validado para ver esta página!</p>
                        <meta http-equiv="refresh" content="3; url=/"/>
                    </Container>
                </Container>
            </Container>
            </div>
        );
    }
}
 
export default UserHome;