import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AppNav from '../AppNav';
import { ReactSession } from 'react-client-session';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { Table,Container,Button} from 'reactstrap';
import Moment from 'react-moment';
import UsersIcon from '../Img/usersIcon.png';
import { Chart } from "react-google-charts";
class UserExpensesDetails extends Component {
    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        UserExpenses : [],
        GroupedExpenses : [],
        date :new Date().toISOString().substring(0,10),
       }

       this.previousMonth= this.previousMonth.bind(this);
       this.followingMonth= this.followingMonth.bind(this);

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
        const id = this.props.match.params.id;
        //var id = ReactSession.get('id');

        var date = this.state.date;

        const response= await fetch(`/api/getTotalPriceByCategory/${id}/${date}`);
        const body = await response.json();
        this.setState({GroupedExpenses : body , isLoading :false});

        const responseExp= await fetch(`/api/userExpenses/${id}/${date}`);
        const bodyExp = await responseExp.json();
        this.setState({UserExpenses : bodyExp , isLoading :false});

    }

    async previousMonth() {
      var x = new Date(this.state.date);
      x.setDate(1);
      x.setMonth(x.getMonth()-1);
      this.setState({date : x.toISOString().substring(0, 10)});

      const id = this.props.match.params.id;

      const response= await fetch(`/api/getTotalPriceByCategory/${id}/${x.toISOString().substring(0, 10)}`);
      const body = await response.json();
      this.setState({GroupedExpenses : body , isLoading :false});

      const responseExp= await fetch(`/api/userExpenses/${id}/${x.toISOString().substring(0, 10)}`);
      const bodyExp = await responseExp.json();
      this.setState({UserExpenses : bodyExp , isLoading :false});

    }

    async followingMonth() {
      var x = new Date(this.state.date);
      x.setDate(1);
      x.setMonth(x.getMonth()+1);
      this.setState({date : x.toISOString().substring(0, 10)});

      const id = this.props.match.params.id;

        var date = this.state.date ;

        const response= await fetch(`/api/getTotalPriceByCategory/${id}/${x.toISOString().substring(0, 10)}`);
        const body = await response.json();
        this.setState({GroupedExpenses : body , isLoading :false});

        const responseExp= await fetch(`/api/userExpenses/${id}/${x.toISOString().substring(0, 10)}`);
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
        const title =<h3 class="text-center">Detalle cliente</h3>;
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        const {GroupedExpenses,UserExpenses,isLoading} = this.state;
        

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
                <td><Button color="danger" onClick={() => this.removeConfirmation(expense.id)}>Eliminar</Button></td>
              </tr>
        );
        
        let array1 = [];
        let array2 = [];
        for (let i = 0; i < this.state.GroupedExpenses.length; i++) {
          array1.push(this.state.GroupedExpenses[i][1].name);
          array2.push(this.state.GroupedExpenses[i][0]);
        }

        let dataArray = [];
        dataArray.push(["Task", "Expenses"])
        let array = [];
        for (let i = 0; i < array1.length; i++) {
          array.push(array1[i]);
          if (array2[i] < 0 ) {
            array2[i] = array2[i] * -1
          }
          array.push(array2[i]);
          dataArray.push(array);
          array = [];
        }
        const data = dataArray;
        const options = {
          title: "My Expenses",
        };

        let totalExpense = GroupedExpenses.reduce((acc, expense) => acc + expense[0], 0 );

        let month = months[this.state.date.substring(6,7) - 1];


        return (
            <div>
                <AppNav/>
                    <Container>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            {title}
                            <div class="d-flex">
                              <Button onClick={this.previousMonth}>{"<"}</Button>
                              <h3> Mostrando balance del mes de {month} {this.state.date.substring(0,4)} </h3>
                              <Button onClick={this.followingMonth}>{">"}</Button>
                            </div>
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
                            <Link to={"/adminHome/UserList/"} className="text-white h5 w-50 bg-info rounded mt-4"><Button className="w-100 bg-info">ADMINISTRAR USUARIOS <img alt="Icono usuarios" src={UsersIcon} class="img-fluid" width='60px'></img></Button></Link>
                          <div>
                            <Chart
                              chartType="PieChart"
                              data={data}
                              options={options}
                              width={"100%"}
                              height={"400px"}
                            />
                        </div>
                          <div className="w-50 d-flex flex-column align-items-center justify-content-center mt-4 bg-white rounded">
                            <h3>Gasto total de {month} {this.state.date.substring(0,4)}</h3>
                            <p className="display-4" >{totalExpense}€</p>
                          </div>
                        </div>
                    </Container>
            </div>
        );
    }
}
 
export default UserExpensesDetails;
