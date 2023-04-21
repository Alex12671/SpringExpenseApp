import React, { Component } from 'react';
import ExpensesIcon from '../Img/expensesIcon.png';
import {Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import AppNav from '../AppNav';
import {Container,Input,Button, Form} from 'reactstrap';
import Swal from 'sweetalert2';

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
                                    <Button className=" w-50 bg-info rounded p-1"><Link to={"/adminHome/expenses/"} class="text-white h5 m-0">VER TODOS MIS GASTOS <img src={ExpensesIcon} class="img-fluid" width='60px'></img></Link></Button>
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