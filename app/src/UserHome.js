import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import AppNav from './AppNav';
import {Container,Input,Button, Form} from 'reactstrap';
import Swal from 'sweetalert2';

ReactSession.setStoreType("localStorage");


class UserHome extends Component {

    render() { 
        return (
            <div>
                <AppNav/>
            <Container>
                <Container className="d-flex flex-column align-items-center justify-content-center">
                    <Container className="w-75 flex-column bg-white shadow rounded">
                        <Container className="d-flex flex-column align-items-center justify-content-center w-25 bg-secondary p-3">
                            <Link to={"/userExpenses/"} class="btn btn-info">Ver todos mis gastos</Link>
                        </Container>
                    </Container>
                </Container>
            </Container>
            </div>
        );
    }
}
 
export default UserHome;