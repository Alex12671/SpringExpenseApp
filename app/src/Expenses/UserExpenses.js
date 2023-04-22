import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AppNav from '../AppNav';
import { ReactSession } from 'react-client-session';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { Table,Container,Button} from 'reactstrap';
import Moment from 'react-moment';
import casa from '../Img/casa.png';

class UserExpenses extends Component {


    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        UserExpenses : [],
        GroupedExpenses : [],
        date :new Date(),
       }

    } 

    async remove(id){
        await fetch(`/api/expenses/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedExpenses = [...this.state.UserExpenses].filter(i => i.id !== id);
          this.setState({UserExpenses : updatedExpenses});
        });

    }


    async componentDidMount() {

        var id = ReactSession.get('id');

        const response= await fetch(`/api/getTotalPriceByCategory/${id}`);
        const body = await response.json();
        this.setState({GroupedExpenses : body , isLoading :false});
        console.log(body);

        const responseExp= await fetch(`/api/userExpenses/${id}`);
        const bodyExp = await responseExp.json();
        this.setState({UserExpenses : bodyExp , isLoading :false});

    }


    removeConfirmation(id) {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            this.remove(id);
            }
          })
    }


    render() { 
        const title =<h3 class="text-center">LISTA DE GASTOS</h3>;
        const {UserExpenses,isLoading} = this.state;
        

        if (isLoading)
            return(<div>Cargando...</div>)

        let rows=
            UserExpenses.map( expense =>
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.price}€</td>
                <td><Moment date={expense.expensedate} format="DD/MM/YYYY"/></td>
                <td>{expense.category.name}</td>
                <td><Link to={"/modifyExpense/" + expense.id} class="btn btn-info">Editar</Link></td>
                <td><Button color="danger" onClick={() => this.removeConfirmation(expense.id)}>Delete</Button></td>

              </tr>


            )
        

        return (
            <div>
                <AppNav/>
                    <Container>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            {title}
                            <Table className="table table-bordered table-striped table-light border-dark mt-4">
                                <thead class="table-dark">
                                    <tr>
                                        <th width="30%">Descripción</th>
                                        <th width="10%">Precio</th>
                                        <th>Fecha</th>
                                        <th>Categoría</th>
                                        <th width="10%">Editar</th>
                                        <th width="10%">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </Table>
                            <Link to="/addExpense" class="btn btn-success">AÑADIR GASTO</Link>
                            <Button className=" w-50 bg-info rounded p-1 mt-4"><Link to={"/adminHome"} class="text-white h5 m-0"> Volver a inicio   <img src={casa} class="img-fluid" width='60px'></img></Link></Button>
                        </div>
                    </Container>
            </div>
        );
    }
}
 
export default UserExpenses;
