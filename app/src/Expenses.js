import React, { Component } from 'react';
import AppNav from './AppNav';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import {Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';
import {Link} from 'react-router-dom';

class Expenses extends Component {

  // {
  //   "id": 100,
  //   "expensedate": "2019-06-16T17:00:00Z",
  //   "description": "New York Business Trip",
  //   "location": "New York",
  //   "category": {
  //   "id": 1,
  //   "name": "Travel"
  //   }
  //   },
 
    emptyItem = {
        description : '' ,
        expensedate : new Date(),
        id:104,
        location : '',
        category : {id:1 , name:'Travel'}
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
     
      const item = this.state.item;
    
      await fetch(`/api/expenses`, {
        method : 'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(item),
      });
      
      event.preventDefault();
      this.props.history.push("/expenses");
    }


    handleChange(event){
      const target= event.target;
      const value= target.value;
      const name = target.name;
      let item={...this.state.item};
      item[name] = value;
      this.setState({item});
      console.log(JSON.stringify(item));
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
        const title =<h3>AÑADIR GASTO</h3>;
        const {Categories, isLoading} =this.state;        

        if (isLoading)
            return(<div>Cargando...</div>)
        


        let optionList  =
                Categories.map( (category) =>
                    <option value={category.id} key={category.id}>
                                {category.name} 
                    </option>
                )

        return (
            <div>
                <AppNav/>
                <Container>
                  <div class="d-flex flex-column align-items-center justify-content-center bg-white shadow">
                      {title}
                      
                      <Form onSubmit={this.handleSubmit}>
                      <FormGroup>
                          <Label for="description">Título</Label>
                          <Input type="text" name="description" id="description" 
                              onChange={this.handleChange} autoComplete="name"/>
                      
                      </FormGroup>

                      <FormGroup>
                          <Label for="category" >Categoría</Label>
                          <select onChange={this.handleChange}>
                                  {optionList}
                          </select>
                      
                      </FormGroup>

                      <FormGroup>
                          <Label for="city">Fecha</Label>
                          <Input type="date" onChange={this.handleDateChange} class="form-control" />
                      </FormGroup>

                      <div className="row">
                          <FormGroup className="col-md-4 mb-3">
                          <Label for="price">Precio</Label>
                          <Input type="text" name="price" id="price" onChange={this.handleChange}/>
                          </FormGroup>
                        
                      </div>
                      <FormGroup>
                          <Button color="primary" type="submit">Guardar</Button>{' '}
                          <Link to="/expenses" class="btn btn-secondary">Cancel</Link>
                      </FormGroup>
                      </Form>
                  </div>
                </Container>
        </div>

        );
    }
}
 
export default Expenses;
