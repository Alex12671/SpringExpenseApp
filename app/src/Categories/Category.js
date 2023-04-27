import React, { Component } from 'react';
import AppNav from '../AppNav';
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import {Container,Input,Button,Label, FormGroup} from 'reactstrap';
import {Link} from 'react-router-dom';

class Category extends Component {

    emptyItem = {
        id : '',
        name : '',
        img : '',
    }

    constructor(props){
        super(props)
  
        this.state = {
            isLoading : true,
            Categories : [],
            item : this.emptyItem
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
              'Tu registro ha sido añadido.',
              'success'
            ).then((result) => {
              if(result.isConfirmed || result.isDismissed) {
                window.location.replace("/adminHome/categories");
              }
            })
          }
        });
    }

    onFileChangeHandler = (e) => {
      e.preventDefault();
      let item={...this.state.item};
      item.img = e.target.files[0];
      this.setState({
        item
      });
      const formData = new FormData();
      formData.append('file', this.state.item.img);
      fetch('/api/fileUpload', {
          method: 'post',
          body: formData
      }).then(res => {
          if(res.ok) {
              console.log(res.data);
              alert("File uploaded successfully.")
          }
      });
  };

    handleChange(event){
        const target= event.target;
        let value= target.value;
        const name = target.name;
        let item={...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async componentDidMount(){
        const response=await fetch('/api/categories');
        const body = await response.json();
        this.setState({Categories : body , isLoading: false});
    }

    render() { 
        const title =<h3 class="text-center mt-4 mb-4">AÑADIR CATEGORIA</h3>;
        const {isLoading} = this.state;
        if(isLoading) 
            return (<div>Cargando...</div>);
        
        return ( 
            <div>
                <AppNav/>
                <Container>
                  <div class="d-flex flex-column align-items-center justify-content-center">
                      <form class="bg-white shadow rounded w-50 p-5" onSubmit={this.handleSubmit} >
                      {title}
                      <FormGroup>
                          <Label for="description">Nombre</Label>
                          <Input type="text" name="name" id="name" 
                              onChange={this.handleChange} autoComplete="name" required/>
                      </FormGroup>
                      <div className="form-group files color">
                            <label>Upload Your File </label>
                            <input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>
                        </div>
                      <FormGroup>
                          <Button color="primary" type="submit">Guardar</Button>{' '}
                          <Link to="/adminHome/categories" class="btn btn-secondary">Cancel</Link>
                      </FormGroup>
                      
                      </form>
                  </div>
                </Container>
            </div>
                // <div>
                //     <AppNav/>
                //     <h2>Categories</h2>
                //     {
                //         Categories.map( category => 
                //             <div id={category.id}>
                //                 {category.name}
                //             </div>
                //         )
                //     }
                // </div>
         );
    }
}
 
export default Category;