import React, { Component } from 'react';
import AppNav from '../AppNav';
import { ReactSession } from 'react-client-session';
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import {Container,Button,Label} from 'reactstrap';
import {Link} from 'react-router-dom';

class ModifyExpense extends Component {

    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        Categories:[],
        Expense:[],
        date :new Date(),
        item : '',
       }

       this.handleSubmit= this.handleSubmit.bind(this);
       this.handleChange= this.handleChange.bind(this);
       this.handleDateChange= this.handleDateChange.bind(this);

    } 

    async handleSubmit(event){
     
      event.preventDefault();
      const item = this.state.item;
    
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
            'Editado!',
            'El gasto ha sido editado.',
            'success'
          ).then((result) => {
            if(result.isConfirmed || result.isDismissed) {
              if(ReactSession.get('role') === 'admin') {
                window.location.replace("/adminHome/expenses");
              }
              else {
                window.location.replace("/userHome/expenses");

              }
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


    async componentDidMount() {
        const response= await fetch('/api/categories');
        const body= await response.json();
        this.setState({Categories : body , isLoading :false});

        var id = window.location.href.split("/").pop();

        const responseExp = await fetch(`/api/getExpenseById/${id}`);
        const bodyExp = await responseExp.json();
        this.setState({Expense : body , item : bodyExp, isLoading :false});
    }

    render() { 

        const title =<h3 class="text-center mt-4 mb-4">MODIFICAR GASTO</h3>;
        const {Categories, isLoading} =this.state;        

        if (isLoading)
            return(<div>Cargando...</div>)
        


        let optionList  =
                Categories.map( (category) =>
                    <option value={category.id + "-" + category.name} key={category.id}>
                                {category.name} 
                    </option>
                )

        if(ReactSession.get('role') === 'admin') {
            return (
              <div>
                  <AppNav/>
                  <Container>
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        
                        <form class="bg-white shadow rounded w-50 p-5" onSubmit={this.handleSubmit}>
                        {title}
                        <div class="form-group">
                            <Label for="description">Título</Label>
                            <input class="form-control" type="text" name="description" id="description" 
                                onChange={this.handleChange} value={this.state.item.description} required/>
                        </div>

                        <div class="form-group w-50">
                            <Label for="category" >Categoría</Label>
                            <select class="form-control" name="category" id="category" onChange={this.handleChange} required>
                                  <option value="" selected disabled>Selecciona una categoría</option>
                                  {optionList}
                            </select>
                          </div>

                        <div class="form-group w-50">
                            <Label for="date">Fecha</Label>
                            <input type="text" onFocus={function(){document.getElementById('date').type='date'}} onChange={this.handleDateChange} class="form-control" name="date" id="date" value={this.state.item.expensedate} required/>
                        </div>

                        <div class="form-group w-50">
                            <Label for="price">Precio</Label>
                            <input class="form-control" type="text" name="price" id="price" onChange={this.handleChange} value={this.state.item.price} required/>
                        </div>

                        <input type="hidden" name="user" id="user" value={this.state.item.user}/>
                          
                        <div class="form-group w-50">
                            <Button color="primary" type="submit">Editar</Button>{' '}
                            <Link to="/adminHome/expenses" class="btn btn-secondary">Cancel</Link>
                        </div>
                        </form>
                    </div>
                  </Container>
          </div>

          );
        }
        return (
            <div>
                <AppNav/>
                <Container>
                  <div class="d-flex flex-column align-items-center justify-content-center">
                      
                      <form class="bg-white shadow rounded w-50 p-5" onSubmit={this.handleSubmit}>
                      {title}
                      <div class="form-group">
                          <Label for="description">Título</Label>
                          <input class="form-control" type="text" name="description" id="description" 
                              onChange={this.handleChange} value={this.state.item.description} required/>
                      </div>

                      <div class="form-group w-50">
                          <Label for="category" >Categoría</Label>
                          <select class="form-control" name="category" id="category" onChange={this.handleChange} required>
                                <option value="" selected disabled>Selecciona una categoría</option>
                                {optionList}
                          </select>
                        </div>

                      <div class="form-group w-50">
                          <Label for="date">Fecha</Label>
                          <input type="text" onFocus={function(){document.getElementById('date').type='date'}} onChange={this.handleDateChange} class="form-control" name="date" id="date" value={this.state.item.expensedate} required/>
                      </div>

                      <div class="form-group w-50">
                          <Label for="price">Precio</Label>
                          <input class="form-control" type="text" name="price" id="price" onChange={this.handleChange} value={this.state.item.price} required/>
                      </div>
                        
                      <input type="hidden" name="user" id="user" value={this.state.item.user}/>

                      <div class="form-group w-50">
                          <Button color="primary" type="submit">Editar</Button>{' '}
                          <Link to="/userHome/expenses" class="btn btn-secondary">Cancel</Link>
                      </div>
                      </form>
                  </div>
                </Container>
        </div>

        );
    }
}
 
export default ModifyExpense;
