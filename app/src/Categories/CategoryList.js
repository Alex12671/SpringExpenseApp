import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AppNav from '../AppNav';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { Table,Container,Button} from 'reactstrap';
import Moment from 'react-moment';
import casa from '../Img/casa.png';

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
                            <Button className=" w-50 bg-info rounded p-1 mt-4"><Link to={"/adminHome"} class="text-white h5 m-0"> Volver a inicio   <img src={casa} class="img-fluid" width='60px'></img></Link></Button>
                        </div>
                    </Container>
            </div>
        );
    }
}
 
export default CategoriesList;
