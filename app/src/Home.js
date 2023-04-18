import React, { Component } from 'react';
import AppNav from './AppNav';




class Home extends Component {
    state = {}

    render() { 
        return (
          <div>
             <AppNav/>
            <div class="container-fluid">
              <div class="d-flex flex-column align-items-center justify-content-center">
                <form class="d-flex flex-column align-items-center justify-content-center mt-5 shadow rounded w-25 bg-white">
                  <h2 class="text-center mb-5 mt-4">INICIAR SESIÓN</h2>
                  <input class="form-control w-75 mb-4" type="text" placeholder="Escribe tu usuario..." />
                  <input class="form-control w-75 mb-5" type="password" placeholder="Escribe tu contraseña..." />
                  <button class="btn btn-success w-50 mb-3">INICIAR SESIÓN</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}
 
export default Home;