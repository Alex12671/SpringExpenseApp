import React, { Component } from 'react';
import ExpensesIcon from '../Img/expensesIcon.png';
import {Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import AppNav from '../AppNav';
import {Container,Button} from 'reactstrap';

ReactSession.setStoreType("localStorage");


class UserHome extends Component {

    constructor(props){
        super(props)
  
        this.state = { 
          isLoading :false,
          LastMonthExpenses : '',
          TotalExpensesPrice : '',
          date :new Date().toISOString().substring(0,10),
         }
  
    } 

    async componentDidMount() {

        var id = ReactSession.get('id');

        var date = this.state.date;

        const response = await fetch(`/api/getMonthlyExpenses/${id}`);
        let body = 0;
        try {
            body = await response.json();
        } catch (error) {
            body = 0;
        }
        this.setState({TotalExpensesPrice : body , isLoading :false});

        const responseExp = await fetch(`/api/getLastMonthExpenses/${id}`);
        
        let bodyExp = 0;
        try {
            bodyExp = await responseExp.json();
        } catch (error) {
            bodyExp = 0;
        }
        this.setState({LastMonthExpenses : bodyExp , isLoading :false});
    }

    render() { 
        if(ReactSession.get('role') === 'user') {

            let percentage = 0;
            let color;
            if(Math.abs(this.state.TotalExpensesPrice) > Math.abs(this.state.LastMonthExpenses)) {
                percentage = ((Math.abs(this.state.TotalExpensesPrice) / Math.abs(this.state.LastMonthExpenses)) * 100).toFixed(2);
                color      = 'text-success';
            }
            else {
                percentage = ((Math.abs(this.state.LastMonthExpenses) / Math.abs(this.state.TotalExpensesPrice)) * 100).toFixed(2);
                color      = 'text-danger';
            }
            if (Math.abs(this.state.LastMonthExpenses) === 0 || Math.abs(this.state.TotalExpensesPrice) === 0) {
                percentage  = 0;
                color       = 'text-danger';
            }

            return (
                <div>
                    <AppNav/>
                <Container>
                    <Container className="d-flex flex-column align-items-center justify-content-center">
                        <Container className="w-75 flex-column bg-white shadow rounded p-3">
                            <h4 className="text-center">Bienvenid@, {ReactSession.get('user')}!</h4>
                            <Container className="d-flex flex-column align-items-center justify-content-center">
                                <Link to={"/userHome/expenses"} className="w-50 text-white h5 m-0"><Button className=" w-100 bg-info rounded p-1">VER TODOS MIS GASTOS <img alt="Icono gastos" src={ExpensesIcon} className="img-fluid" width='60px'></img></Button></Link>
                            </Container>
                        </Container>
                        <Container className="w-50 flex-column bg-white shadow rounded p-3">
                            <h4 className="text-center">Balance totales este mes</h4>
                            <Container className="d-flex flex-column align-items-center justify-content-center">
                                <p className='display-4'>{Math.abs(this.state.TotalExpensesPrice)}€</p>
                                <p className='align-self-start h5 m-0 mt-3'>Balance del mes pasado: {Math.abs(this.state.LastMonthExpenses)}€</p>
                                <p className='align-self-start h5 m-0 mt-3'>Diferencia: <span className={color}>{percentage}%</span></p>
                            </Container>
                        </Container>
                    </Container>
                </Container>
                </div>
            );
        }
        return (
            <div>
            <Container>
                <Container className="d-flex flex-column align-items-center justify-content-center">
                    <Container className="w-50 flex-column bg-white shadow rounded p-3">
                        <p class="text-center fw-bold mt-2 h4">Debes estar validado para ver esta página!</p>
                        <meta http-equiv="refresh" content="3; url=/"/>
                    </Container>
                </Container>
            </Container>
            </div>
        );
    }
}
 
export default UserHome;