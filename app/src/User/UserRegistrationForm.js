import React, { Component } from 'react';
import { ReactSession } from 'react-client-session';
import AppNav from '../AppNav';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import {Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';

ReactSession.setStoreType("localStorage");


class Registration extends Component {

  constructor(props){
    super(props)

    this.state = { 
      isLoading :false,
      UsersList : [],
      item : {
        id : '',
        email : '',
        name : '',
        password : '',
        role: 'user'},
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
      
      await fetch(`/api/users`, {
        method : 'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(item),
      }).then(async (res) => {
        const body = await res.json();
        if(res.statusText === "Created"){
          Swal.fire(
            'Registrado!',
            'Te has registrado correctamente!',
            'success'
          ).then((result) => {
            if(result.isConfirmed) {
              ReactSession.set("email", body.email);
              ReactSession.set("role", body.role);
              ReactSession.set("user", body.name);
              console.log(ReactSession.get('role'));
              if(ReactSession.get('role') === 'user') {
                window.location.href="/userHome";
                window.location.replace("/userHome");
              }
              else {
                window.location.href="/adminHome";
                window.location.replace("/adminHome");
              }
            }
          })
        }
        else {
          Swal.fire(
            'Vaya...',
            'Este usuario ya existe (creo)',
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
                <h2 class="text-center mb-5 mt-4">CREAR USUARIO</h2>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" 
                        onChange={this.handleChange} autoComplete="email" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input type="text" name="name" id="name" 
                        onChange={this.handleChange} autoComplete="name" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Contraseña</Label>
                    <Input type="password" name="password" id="password" 
                        onChange={this.handleChange} autoComplete="password" required/>
                </FormGroup>
                <Button color="success" className="w-50 mb-3">REGISTRARSE</Button>
                
              </Form>
            </div>
          </Container>
        </div>
      );
  }
}
 
export default Registration;