import React, { Component } from 'react';
import ExpensesIcon from '../Img/expensesIcon.png';
import {Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import AppNav from '../AppNav';
import {Container,Button} from 'reactstrap';

ReactSession.setStoreType("localStorage");


class UserHome extends Component {

    render() { 

        if(ReactSession.get('role') === 'user') {
            return (
                <div>
                    <AppNav/>
                <Container>
                    <Container className="d-flex flex-column align-items-center justify-content-center">
                        <Container className="w-75 flex-column bg-white shadow rounded p-3">
                            <h4 className="text-center">Bienvenid@, {ReactSession.get('user')}!</h4>
                            <Container className="d-flex flex-column align-items-center justify-content-center">
                                <Link to={"/userHome/expenses"} className="w-50 text-white h5 m-0"><Button className=" w-100 bg-info rounded p-1">VER TODOS MIS GASTOS <img alt="Icono gastos" src={ExpensesIcon} className="img-fluid" width='60px'></img></Button></Link>
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