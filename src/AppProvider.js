import React from "react";
import PedidoAcessoApiService from "../../services/PedidoAcessoApiService";
export class AppProvider extends React.Component {

    static Context = React.createContext();
    static servicePedidosAcesso = new PedidoAcessoApiService();

    state = {
        pedidos: [],
        beneficiario: undefined
    }

    findAll () {
        this.servicePedidosAcesso
        .getAll("/buscarTodos")
        .then((response) => {
          const pedidos = response.data;
          this.setState({ pedidos: pedidos })
          console.log(pedidos);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };

    render() {
        return (
            <AppProvider.Context.Provider value={
                {
                    state: this.state,
                    setBeneficiario: (value) => this.setState({ beneficiario: value }),
                    setPedidos: (value) => this.setState({ pedidos: value })
                }
            }>

                {this.props.children}
            </AppProvider.Context.Provider>
        )
    }

}