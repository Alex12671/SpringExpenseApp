import React, { Component } from 'react';
import AppNav from '../AppNav';
import Swal from 'sweetalert2';
import { ReactSession } from 'react-client-session';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import {Container,Input,Button,Label, FormGroup} from 'reactstrap';
import {Link} from 'react-router-dom';

class Expenses extends Component {
 
    emptyItem = {
        id : '',
        description : '' ,
        expensedate : new Date(),
        price: 0,
        category : '',
        user : '',
    }

    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        Categories:[],
        date :new Date(),
        item : this.emptyItem
       }

      this.handleSubmit= this.handleSubmit.bind(this);
      this.handleChange= this.handleChange.bind(this);
      this.handleDateChange= this.handleDateChange.bind(this);

    } 

    async handleSubmit(event){
     
      event.preventDefault();
      const item = this.state.item;

      if(ReactSession.get('role') === 'user') {
        const response = await fetch(`api/getUserById/${ReactSession.get('id')}`);
        const body = await response.json();
        item.user = body;
      }
    

      await fetch(`/api/expenses`, {
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
                window.location.replace("/userHome/expenses");
            }
          })
        }
      });
      
     // this.props.history.push("/expenses");
    }


    handleChange(event){
      const target= event.target;
      let value= target.value;
      const name = target.name;
      let item={...this.state.item};
      if(name === 'category') {
        value = value.split("-");
        let id = value[0];
        let categoryName = value[1];
        item.category = {id: id, name: categoryName };
        this.setState({item});
        return;
      }
      item[name] = value;
      this.setState({item});
    }

    handleDateChange(date){
      let item={...this.state.item};
      item.expensedate= date.target.value;
      this.setState({item});
    
    }






    async remove(id){
        await fetch(`/api/expenses/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
          this.setState({Expenses : updatedExpenses});
        });

    }


    async componentDidMount() {
        const response= await fetch('/api/categories');
        const body= await response.json();
        this.setState({Categories : body , isLoading :false});
    }

    render() { 
        const title =<h3 class="text-center mt-4 mb-4">AÑADIR GASTO</h3>;
        const {Categories, isLoading} =this.state;        

        if (isLoading)
            return(<div>Cargando...</div>)
        


        let optionList  =
                Categories.map( (category) =>
                    <option value={category.id + "-" + category.name} key={category.id}>
                                {category.name} 
                    </option>
                )
        return (
            <div>
                <AppNav/>
                <Container>
                  <div class="d-flex flex-column align-items-center justify-content-center">
                      
                      <form class="bg-white shadow rounded w-50 p-5" onSubmit={this.handleSubmit} >
                      {title}
                      <FormGroup>
                          <Label for="description">Título</Label>
                          <Input type="text" name="description" id="description" 
                              onChange={this.handleChange} autoComplete="name" required/>
                      </FormGroup>

                      <FormGroup className="w-50">
                          <Label for="category" >Categoría</Label>
                          <select class="form-control" name="category" id="category" onChange={this.handleChange} required>
                              <option value="">Seleccione una categoría</option>
                                  {optionList}
                          </select>
                      
                      </FormGroup>

                      <FormGroup className="w-75">
                          <Label for="city">Fecha</Label>
                          <Input type="date" onChange={this.handleDateChange} class="form-control" required />
                      </FormGroup>

                      <FormGroup className="w-50">
                          <Label for="price">Precio</Label>
                          <Input type="text" name="price" id="price" onChange={this.handleChange} required/>
                      </FormGroup>
                        
                      <FormGroup>
                          <Button color="primary" type="submit">Guardar</Button>{' '}
                          <Link to="/userHome/expenses" class="btn btn-secondary">Cancel</Link>
                      </FormGroup>
                      </form>
                  </div>
                </Container>
        </div>

        );
    }
}
 
export default Expenses;
