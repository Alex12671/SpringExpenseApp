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
import DeleteIcon from '../Img/deleteIcon.png';
import EditIcon from '../Img/editIcon.png';
import { Pie } from 'react-chartjs-2';

class UserExpenses extends Component {


    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        UserExpenses : [],
        GroupedExpenses : [],
        date : new Date().toISOString().substring(0,10),
        colores : [],
        data : [],
        opciones : [],
        porcentajes: [],
       }

       this.previousMonth= this.previousMonth.bind(this);
       this.followingMonth= this.followingMonth.bind(this);
       this.filterExpenses= this.filterExpenses.bind(this);

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
        var date = this.state.date;

        const response = await fetch(`/api/getTotalPriceByCategory/${id}/${date}`);
        const body     = await response.json();
        this.setState({GroupedExpenses : body , isLoading :false});

        const responseExp = await fetch(`/api/userExpenses/${id}/${date}`);
        const bodyExp     = await responseExp.json();
        this.setState({UserExpenses : bodyExp , isLoading :false});

        // const porcentajes = [];
        // for (let i = 0; i < body; i++) {
        //   porcentajes.push(body[i]);
        // }

        await this.generarColores();
        this.configurarGrafica();

    }

    async previousMonth() {
      var x = new Date(this.state.date);
      x.setDate(1);
      x.setMonth(x.getMonth()-1);
      this.setState({date : x.toISOString().substring(0, 10)});

      var id = ReactSession.get('id');

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

      var id = ReactSession.get('id');

        var date = this.state.date ;

        const response= await fetch(`/api/getTotalPriceByCategory/${id}/${x.toISOString().substring(0, 10)}`);
        const body = await response.json();
        this.setState({GroupedExpenses : body , isLoading :false});

        const responseExp= await fetch(`/api/userExpenses/${id}/${x.toISOString().substring(0, 10)}`);
        const bodyExp = await responseExp.json();
        this.setState({UserExpenses : bodyExp , isLoading :false});


    }

    async filterExpenses() {
      var x = new Date(this.state.date);
      this.setState({date : x.toISOString().substring(0, 10)});

      var id = ReactSession.get('id');

      var text = document.getElementById('buscar').value;

      if(text.value != "") {
        const response= await fetch(`/api/getTotalPriceByCategory/${id}/${x.toISOString().substring(0, 10)}`);
        const body = await response.json();
        this.setState({GroupedExpenses : body , isLoading :false});
  
        const responseExp= await fetch(`/api/filterExpenses/${id}/${x.toISOString().substring(0, 10)}/${text}`);
        const bodyExp = await responseExp.json();
        this.setState({UserExpenses : bodyExp , isLoading :false});
        return;
      }
      const response= await fetch(`/api/getTotalPriceByCategory/${id}/${x.toISOString().substring(0, 10)}`);
        const body = await response.json();
        this.setState({GroupedExpenses : body , isLoading :false});
  
        const responseExp= await fetch(`/api/filterExpenses/${id}/${x.toISOString().substring(0, 10)}/""`);
        const bodyExp = await responseExp.json();
        this.setState({UserExpenses : bodyExp , isLoading :false});
        return;

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

    generarCaracter() {
      var caracter = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
      var numero   = [Number(Math.random()*15).toFixed(0)];
      return caracter[numero];
    }

    colorHex() {
      var color = '';
      for(var i = 0; i<6; i++) {
        color = color + this.generarCaracter();
      }
      return '#' + color;
    }
    
    generarColores() {
      var colores = [];
      for(var i= 0; i<this.state.GroupedExpenses.length; i++) {
        colores.push(this.colorHex());
      }
      this.setState({colores: colores});
      console.log(this.state.colores);
    }

    configurarGrafica() {
      const data = {
        labels: this.state.GroupedExpenses,
        datasets:[{
          data: this.state.GroupedExpenses,
          backgroundColor: this.state.colores,
        }]
      };

      const opciones = {
        responsive: true,
        maintainAspectRatio: false,
      }
      this.setState({data: data, opciones: opciones});
    }

    render() { 
        const title =<h2 class="text-center">LISTA DE GASTOS</h2>;
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        const {GroupedExpenses,UserExpenses,isLoading} = this.state;
        

        if (isLoading)
            return(
              <div>
              <AppNav/>
              <div>Cargando...</div>
              </div>
              )

        let rows=
            UserExpenses.map( expense =>
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.price}€</td>
                <td><Moment date={expense.expensedate} format="DD/MM/YYYY"/></td>
                <td>{expense.category.name}</td>
                <td className="text-center"><Link to={"/modifyExpense/" + expense.id}><img src={EditIcon} width="55px"></img></Link></td>
                <td className="text-center deleteIcon"><img src={DeleteIcon} width="55px" onClick={() => this.removeConfirmation(expense.id)} ></img></td>
              </tr>
        );
        let grouped =
            GroupedExpenses.map( expense => 
              <div className="col-4 bg-white rounded mb-3 mr-2 p-2">
                <h5 className="text-center ml-1">{expense[1].name}</h5>
                <div class="row justify-content-center align-items-center">
                  <p className="text-center display-4 mr-3">{expense[0]}€</p>
                  <img src={expense[1].img} height="55px"></img>
                </div>              
              </div>              
        )

        let totalExpense = GroupedExpenses.reduce((acc, expense) => acc + expense[0], 0 );

        let month = months[this.state.date.substring(6,7) - 1];


        return (
            <div>
                <AppNav/>
                    <Container>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            {title}
                            <Link to={"/userHome"} className="text-white w-25 bg-info rounded mt-4 mb-5"><Button className="w-100 bg-info border-0"><span className="h5 m-0">Volver a inicio</span>   <img alt="Icono casa" src="/casa.png" class="img-fluid" width='60px'></img></Button></Link>
                            <div class="d-flex flex-row mb-3">
                              <Link to="/addExpense" class="btn btn-success mr-5">AÑADIR GASTO</Link>
                              <Link to="/addIncome" class="btn btn-success">AÑADIR INGRESO</Link>
                            </div>
                            <div class="d-flex mb-4">
                              <Button onClick={this.previousMonth}>{"<"}</Button>
                              <h3> Mostrando gastos del mes de {month} {this.state.date.substring(0,4)} </h3>
                              <Button onClick={this.followingMonth}>{">"}</Button>
                            </div>
                            <div class="d-flex justify-content-center align-items-center w-50">
                              <input id="buscar" className="form-control w-50" onBlur={this.filterExpenses} type="text" placeholder="Buscar por nombre..."/>
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
                          <div className="row w-100 mt-4 justify-content-around align-items-center">
                            {grouped}
                          </div>
                          <div style={{ width: '100%', heigh: '500px' }}>
                            <Pie data={this.state.data} options={this.state.opciones}/>
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
 
export default UserExpenses;
