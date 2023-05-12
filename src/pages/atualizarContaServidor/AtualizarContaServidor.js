import React, { Component } from "react";
import ContaServidorApiService from "../../services/ContaServidorApiService";
// import Footer from "../../components/Footer";
import MenuAdministrador from "../../components/MenuAdministrador";
import Footer from "../../components/Footer";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import { InputMask } from 'primereact/inputmask';
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from "primereact/radiobutton";
import { Button } from 'primereact/button';

class CadastrarContaServidor extends Component {

    constructor(props) {
        super(props);
        this.service = new ContaServidorApiService();
    }

    state = {
        id: 0,
        nome: "",
        email: "",
        matriculaSIAPE: 0,
        isAdmin: true,
        campus: "",
    };

    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        this.find(id);
    }
    
    validate = () => {
        const errors = [];
        return errors;
    };
    
    update = () => {

        const errors = this.validate();

        if (errors.length > 0) {
            errors.forEach((message, index) => {
                showErrorMessage(message);
            });
            return false
        }

        this.service.update(this.state.id,
            {
                nome: this.state.nome,
                email: this.state.email,
                matriculaSIAPE: this.state.matriculaSIAPE,
                isAdmin: this.state.isAdmin,
                campus: this.state.campus,
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Conta atualizada com sucesso!');
            this.props.history.push("/listarContasServidor");
        }
        ).catch(error => {
            console.log(error.response);
            showErrorMessage('A conta não pode ser atualizada!');
        }
        );

        console.log('request finished');
    }


    // create = () => {
    //     const errors = this.validate();

    //     if (errors.length > 0) {
    //         errors.forEach((message, index) => {
    //             showErrorMessage(message);
    //         });
    //         return false;
    //     }

    //     this.service
    //         .create({
    //             nome: this.state.nome,
    //             email: this.state.email,
    //             matriculaSIAPE: this.state.matriculaSIAPE,
    //             isAdmin: this.state.isAdmin,
    //             campus: this.state.campus,
    //         })
    //         .then((response) => {
    //             console.log(response);

    //             showSuccessMessage("Conta criada com sucesso!");
    //             this.props.history.push("/listarContasServidor");
    //         })
    //         .catch((error) => {
    //             console.log(error.response);
    //             showErrorMessage("A conta não pode ser criada!");
    //         });

    //     console.log("request finished");
    // };

    find = (id) => {

        this.service.get(`/buscarPorID/${id}`)
            .then((response) => {
                const contaServidor = response.data;
                const id = contaServidor.id;
                const nome = contaServidor.nome;
                const matriculaSIAPE = contaServidor.matriculaSIAPE;
                const email = contaServidor.email;
                const campus = contaServidor.campus;

                this.setState({ id: id, nome: nome, email: email, matriculaSIAPE: matriculaSIAPE, campus: campus });
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    cancel = () => {
        this.props.history.push("/listarContasServidor");
    };

    render() {
        return (

            <div className="container-fluid h-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
                {/*Col left  */}
                <div className="w-[220px] flex-shrink flex-grow-0 px-0">
                    {/* Side Menu */}
                    <MenuAdministrador />
                </div>
                {/* Col right */}
                <div className="w-full">
                    {/* Header */}
                    <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
                        <div className="flex flex-row-reverse pr-6">
                            <p className="text-xs">{this.props.currentUser.email}</p>
                        </div>
                        <div className="flex flex-row-reverse pr-6">
                            <p className="text-lg font-semibold">Administrador</p>
                        </div>
                        <div className="flex flex-row pl-6">
                            <p className="text-xl font-semibold">Cadastrar Servidor</p>
                        </div>
                    </div>

                    {/* Content two */}
                    <div className="pt-4 pl-8 pr-8 mb-4">
                        <div className="mt-0 sm:mt-0">
                            <div className="md:grid md:grid-cols-1 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">

                                    </div>
                                </div>
                                <div className="mt-2 md:col-span-2 md:mt-0">
                                    <form action="">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            {/* <div className="grid grid-cols-6 gap-6">
                    </div> */}

                                            <div className="col-span-10 sm:col-span-10 lg:col-span-12">
                                                <label
                                                    // htmlFor="nome"
                                                    className="block text-sm font-medium text-gray-700 pb-2">
                                                    Nome
                                                </label>
                                                <div className="card flex justify-content-center gap-3 w-full">
                                                    <InputText className="w-full" value={this.state.nome} onChange={(e) => { this.setState({ nome: e.target.value }) }} />

                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-6 lg:col-span-6">

                                                <label
                                                    // htmlFor="email"
                                                    className="block text-sm font-medium text-gray-700 pb-2 pt-4">
                                                    E-mail
                                                </label>

                                                <div className="card flex justify-content-center gap-3 w-96">
                                                    <InputText className="w-96" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                                                <label
                                                    // htmlFor="matSiape"
                                                    className="block text-sm font-medium text-gray-700 pb-2 pt-4">
                                                    Administrador do Sistema?
                                                </label>

                                                <div className="card flex justify-content-center gap-3">
                                                    {/* <InputText id="matSiapeId" className="w-auto" value={matriculaSIAPE} onChange={(e) => setMatriculaSIAPE(e.target.value)} /> */}
                                                    <select
                                                        name="isAdmin"
                                                        className="w-20 h-10 md:w-20rem border-green-50"
                                                        value={this.state.isAdmin} onChange={(e) => { this.setState({ isAdmin: e.target.value }) }}>
                                                        <option value="true" >Sim</option>
                                                        <option value="false" >Não</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                                                <label
                                                    // htmlFor="matSiape"
                                                    className="block text-sm font-medium text-gray-700 pb-2 pt-4">
                                                    Matrícula Siape
                                                </label>

                                                <div className="card flex justify-content-center gap-3 w-auto">
                                                    <InputText className="w-auto" value={this.state.matriculaSIAPE}
                                                        onChange={(e) => { this.setState({ matriculaSIAPE: e.target.value }) }} />
                                                </div>
                                            </div>

                                            <div className="col-span-10 sm:col-span-10 lg:col-span-12">
                                                <label
                                                    // htmFor="campus"
                                                    className="block text-sm font-medium text-gray-700 pb-2 pt-4">
                                                    Campus
                                                </label>
                                                <div className="card flex justify-content-center gap-3 w-auto">
                                                    <InputText className="w-auto" value={this.state.campus} onChange={(e) => { this.setState({ campus: e.target.value }) }} />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="">

                                            <div className="row flex flex-row-reverse align-middle px-6 mt-1">

                                                <div className="col ml-2">
                                                    <div className="card flex justify-content-center">
                                                        <Button label="CANCELAR" severity="sucess" outlined onClick={this.cancel} />
                                                    </div>
                                                </div>

                                                <div className="col mr-2">
                                                    <div className="card flex justify-content-center">
                                                        <Button label="ATUALIZAR" severity="sucess" onClick={this.update} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default CadastrarContaServidor;