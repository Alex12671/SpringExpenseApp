import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AppNav from '../AppNav';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { Table,Container,Button} from 'reactstrap';
import casa from '../Img/casa.png';

class UserList extends Component {


    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        UserList : [],
       }

    } 

    async remove(id){
        await fetch(`/api/users/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedUsers = [...this.state.UserList].filter(i => i.id !== id);
          this.setState({UserList : updatedUsers});
        });

    }


    async componentDidMount() {

        const responseExp= await fetch('/api/users');
        const bodyExp = await responseExp.json();
        this.setState({UserList : bodyExp , isLoading :false});

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
        const title =<h3 class="text-center">LISTA DE USUARIOS</h3>;
        const {UserList,isLoading} = this.state;
        

        if (isLoading)
            return(<div>Cargando...</div>)

        let rows=
            UserList.map( user =>
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td><Link to={"/adminHome/modifyUser/" + user.id} class="btn btn-info">Editar</Link></td>
                <td><Button color="danger" onClick={() => this.removeConfirmation(user.id)}>Delete</Button></td>

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
                                        <th width="20%">Email</th>
                                        <th width="20%">nombre</th>
                                        <th width="20%">password</th>
                                        <th width="10%">Rol</th>
                                        <th width="10%">Editar</th>
                                        <th width="10%">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </Table>
                            <Link to={"/adminHome"} className="text-white h5 w-50 bg-info rounded mt-4"><Button className="w-100 bg-info border-0">Volver a inicio   <img src={casa} class="img-fluid" width='60px'></img></Button></Link>
                        </div>
                    </Container>
            </div>
        );
    }
}
 
export default UserList;
