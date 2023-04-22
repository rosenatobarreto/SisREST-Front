import React from "react";

export class AppProvider extends React.Component {

    static Context = React.createContext();

    state = {
        // usuario: undefined,
        // metamodeloAvaliativo: undefined,
        // questionarios: undefined,
        // paineis: undefined,
        beneficiario: undefined
    }

    // loadParticipante = (email) => {
    //     let gasObj = GAS.getInstance();
    //     gasObj.request('MCPAParticipante.instance.SERVICE.GETParticipante', email)
    //     .then(RESPONSE => {
    //         this.setState({ usuario: { email: email, autorizado: true }});
    //     })
    //     .catch((e) => { 
    //         this.setState({ usuario: { email: email, autorizado: false}});
    //     });
    // }

    render() {
        return (
            <AppProvider.Context.Provider value={
                {
                    state: this.state,
                    setBeneficiario: (value) => this.setState({ beneficiario: value }),
                    // setQuestionarios: (value) => this.setState({ questionarios: value }),
                    // setMetamodeloAvaliativo: (value) => this.setState({ metamodeloAvaliativo: value }),
                    // setPaineis: (value) => this.setState({ paineis: value })
                }
            }>

                {/* {this.props.dataFromParent} */}
                {/* this indicates that all the child tags with MyProvider as Parent can access the global store. */}
                {this.props.children}
            </AppProvider.Context.Provider>
        )
    }

}