import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AppNav from '../AppNav';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { Table,Container,Button} from 'reactstrap';
import casa from '../Img/casa.png';
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");

class CategoriesList extends Component {
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        CategoriesList : [],
       }

    } 

    async remove(id){
        await fetch(`/api/categories/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedCategory = [...this.state.CategoriesList].filter(i => i.id !== id);
          this.setState({CategoriesList : updatedCategory});
        });

    }


    async componentDidMount() {
        const responseExp= await fetch('/api/categories');
        const bodyExp = await responseExp.json();
        this.setState({CategoriesList : bodyExp , isLoading :false});
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
      if(ReactSession.get('role') === 'admin') {
        const title =<h3 class="text-center">LISTA DE CATEGORIAS</h3>;
        const {CategoriesList,isLoading} = this.state;
        

        if (isLoading)
            return(<div>Cargando...</div>)

        let rows=
            CategoriesList.map( category =>
              <tr key={category.id}>
                <td>{category.name}</td>
                <td><Link to={"/adminHome/modifyCategories/" + category.id} class="btn btn-info">Editar</Link></td>
                <td><Button color="danger" onClick={() => this.removeConfirmation(category.id)}>Delete</Button></td>

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
                                        <th width="50%">Nombre</th>
                                        <th width="10%">Editar</th>
                                        <th width="10%">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </Table>
                            <Link to="/adminHome/addCategories" class="btn btn-success">AÑADIR CATEGORIA</Link>
                            <Link to={"/adminHome"} className="text-white h5 w-50 bg-info rounded mt-4"><Button className="w-100 bg-info border-0">Volver a inicio   <img alt="Icono casa" src={casa} class="img-fluid" width='60px'></img></Button></Link>
                        </div>
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
 
export default CategoriesList;
