import React, { Component } from 'react';
import AppNav from '../AppNav';
import Swal from 'sweetalert2';
import '../App.css';
import {Container,Button,Label} from 'reactstrap';
import {Link} from 'react-router-dom';

class ModifyUser extends Component {

    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        User:[],
        item : '',
       }

       this.handleSubmit= this.handleSubmit.bind(this);
       this.handleChange= this.handleChange.bind(this);

    } 

    async handleSubmit(event){
     
      event.preventDefault();
      const item = this.state.item;
    
      await fetch(`/api/users`, {
        method : 'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body : JSON.stringify(item),
      }).then((res) => {
        if(res.statusText === "Created") {
          Swal.fire(
            'Añadido!',
            'Tu registro ha sido añadido.',
            'success'
          ).then((result) => {
            if(result.isConfirmed) {
              window.location.replace("/adminHome/userList");
            }
          })
        }
      });
      
     // this.props.history.push("/users");
    }

    handleChange(event){
        const target= event.target;
        let value= target.value;
        const name = target.name;
        let item={...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(item);
    }


    async componentDidMount() {
        //const response= await fetch('/api/users');
        //const body= await response.json();
        //this.setState({Users : body , isLoading :false});

        var id = window.location.href.split("/").pop();

        const responseExp = await fetch(`/api/getUserById/${id}`);
        const bodyExp = await responseExp.json();
        this.setState({item : bodyExp, isLoading :false});
    }

    render() { 
        const title =<h3 class="text-center mt-4 mb-4">MODIFICAR USUARIO</h3>;       
        const {Users, isLoading} =this.state;        

        if (isLoading)
            return(<div>Cargando...</div>)

        return (
            <div>
                <AppNav/>
                <Container>
                  <div class="d-flex flex-column align-items-center justify-content-center">
                      
                      <form class="bg-white shadow rounded w-50 p-5" onSubmit={this.handleSubmit}>
                      {title}
                      <div class="form-group w-50">
                          <Label for="email">Email</Label>
                          <input class="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={this.state.item.email} required/>
                      </div>

                      <div class="form-group w-50">
                          <Label for="name">Nombre</Label>
                          <input class="form-control" type="text" name="name" id="name" 
                              onChange={this.handleChange} value={this.state.item.name} required/>
                      </div>

                      <div class="form-group w-50">
                          <Label for="password">Password</Label>
                          <input class="form-control" type="text" name="password" id="password" 
                              onChange={this.handleChange} value={this.state.item.password} required/>
                      </div>

                      <div class="form-group w-50">
                          <Label for="role">Rol</Label>
                          <input class="form-control" type="text" name="role" id="role" 
                              onChange={this.handleChange} value={this.state.item.role} required/>
                      </div>
                        
                      <div class="form-group w-50">
                          <Button color="primary" type="submit">Editar</Button>{' '}
                          <Link to="/adminHome/userList" class="btn btn-secondary">Cancel</Link>
                      </div>
                      </form>
                  </div>
                </Container>
        </div>

        );
    }
}
 
export default ModifyUser;
