import React, { Component } from 'react';
import AppNav from '../AppNav';
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import {Container,Button,Label} from 'reactstrap';
import {Link} from 'react-router-dom';

class ModifyCategory extends Component {

    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        Categories:[],
        item : '',
       }

       this.handleSubmit= this.handleSubmit.bind(this);
       this.handleChange= this.handleChange.bind(this);
    } 

    async handleSubmit(event){
      event.preventDefault();
      const item = this.state.item;
    
      await fetch(`/api/categories`, {
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
            'Tu registro ha sido editado.',
            'success'
          ).then((result) => {
            if(result.isConfirmed) {
              window.location.replace("/adminHome/categories");
            }
          })
        }
      });
    }


    handleChange(event){
      const target= event.target;
      let value= target.value;
      const name = target.name;
      let item={...this.state.item};
      item[name] = value;
      this.setState({item});
    }

    async componentDidMount() {
        // const response= await fetch('/api/categories');
        // const body= await response.json();
        // this.setState({isLoading :false});

        var id = window.location.href.split("/").pop();

        const responseExp = await fetch(`/api/getCategoryById/${id}`);
        const bodyExp = await responseExp.json();
        this.setState({item : bodyExp, isLoading :false});
    }

    render() { 
        const title =<h3 class="text-center mt-4 mb-4">MODIFICAR CATEGORIA</h3>;
        const {isLoading} =this.state;        

        if (isLoading)
            return(<div>Cargando...</div>)
        
        return (
            <div>
                <AppNav/>
                <Container>
                  <div class="d-flex flex-column align-items-center justify-content-center">
                      <form class="bg-white shadow rounded w-50 p-5" onSubmit={this.handleSubmit}>
                      {title}
                      <div class="form-group">
                          <Label for="name">Nombre</Label>
                          <input class="form-control" type="text" name="name" id="name" 
                              onChange={this.handleChange} value={this.state.item.name} required/>
                      </div>

                      <div class="form-group w-50">
                          <Button color="primary" type="submit">Editar</Button>{' '}
                          <Link to="/adminHome/categories" class="btn btn-secondary">Cancel</Link>
                      </div>
                      </form>
                  </div>
                </Container>
        </div>
        );
    }
}
 
export default ModifyCategory;
