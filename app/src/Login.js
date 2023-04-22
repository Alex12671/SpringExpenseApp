import React, { Component } from 'react';
import { ReactSession } from 'react-client-session';
import AppNav from './AppNav';
import {Container,Input,Button, Form} from 'reactstrap';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

ReactSession.setStoreType("localStorage");


class Login extends Component {

  constructor(props){
    super(props)

    this.state = { 
      isLoading :false,
      UsersList : [],
      item : {email : '', password : '' },
      }

    this.checkIfUserExists= this.checkIfUserExists.bind(this);
    this.handleChange= this.handleChange.bind(this);
  } 

  handleChange(event){
    const target= event.target;
    let value= target.value;
    const name = target.name;
    let item = this.state.item;
    item[name] = value;
    this.setState({item});
  }

  async checkIfUserExists(event) {
      event.preventDefault();
      const item = this.state.item;

      await fetch(`/api/users/checkIfExists`, {
        method : 'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(item),
      }).then(async (res) => {
        const body = await res.json();
        if(body.length > 0){
          ReactSession.set("email", body[0].email);
          ReactSession.set("role", body[0].role);
          ReactSession.set("user", body[0].name);
          ReactSession.set("id", body[0].id);
          if(ReactSession.get('role') === 'user') {
            window.location.href="/userHome";
          }
          else {
            window.location.href="/adminHome";
          }
        }
        else {
          Swal.fire(
            'Vaya...',
            'Las credenciales que has introducido son incorrectas',
            'error'
          )
        }
      });
  }

  render() { 
      return (
        <div>
            <AppNav/>
          <Container>
            <div class="d-flex flex-column align-items-center justify-content-center">
              <Form onSubmit={this.checkIfUserExists} className="d-flex flex-column align-items-center justify-content-center mt-5 shadow rounded w-50 bg-white">
                <h2 class="text-center mb-5 mt-4">INICIAR SESIÓN</h2>
                <Input className="form-control w-75 mb-4" type="email" name="email" placeholder="Escribe tu email..." onChange={this.handleChange} required />
                <Input className="form-control w-75 mb-5" type="password" name="password" placeholder="Escribe tu contraseña..." onChange={this.handleChange} required />
                <Button color="success" className="w-50 mb-3">INICIAR SESIÓN</Button>
                {/* <Button color="primary" className="w-50 mb-3"><Link to={"/adminHome/UserList/"} class="text-white h5 m-0">REGÍSTRATE</Link></Button> */}
                <Button color="primary" className="w-50 mb-3"><Link to={"/adminHome/users/"} class="text-white h5 m-0">REGÍSTRATE</Link></Button>
                
              </Form>
            </div>
          </Container>
        </div>
      );
  }
}
 
export default Login;