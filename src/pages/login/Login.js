import React from 'react';
import Logo from '../../assets/imgs/SisRestLogo.png';
import LogoIFPB from '../../assets/imgs/ifpb-1.png';
import SideBarLogin from '../../components/SideBarLogin';
import GoogleLogin from 'react-google-login';
import LoginButton from "../../components/Login";
import LogoutButton from "../../components/Logout";
import GoogleLoginComponent from '../../components/GoogleLoginComponent';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';
import { withRouter } from 'react-router-dom';

// const CLIENT_ID = "965349476239-1o9e0e1emo8nf7s9qcbpl4b5g2hm94uj.apps.googleusercontent.com";
// const SCOPES = "https://www.googleapis.com/auth/drive";
// function Login() {

    // useEffect(() => {
    //     function start() {
    //         gapi.client.init({
    //         clientId: CLIENT_ID,
    //         scope: ""
    //     })
    //  };
    //     gapi.load('client:auth2', start);
    // });

    // GoogleLogin.accounts.oauth2.initTokenClient({
    //     client_id: CLIENT_ID,
    //     scope: SCOPES,
    //     callback: (tokenResponse) => {
    //         console.log(tokenResponse);
    //     }
    // })

    // state = {
    //     matricula: '',
    //     senha: ''
    // };


    // login = () => {
    //     this.context.login(
    //         this.state.matricula,
    //         this.state.senha
        
    //     ).then(user => 
    //         {
    //             if (user) {

    //                 console.log("if",user.CLIENT_ID);
    //                 showSuccessMessage(`${user.name}, você está logado!`);
    //                 this.props.history.push('/viewUsers');
        
    //             } else {
    //                 console.log("else");
    //                 showErrorMessage("Dados incorretos! Login inválido");
    //             }

    //         }
    //     ).catch(error => 
    //         {
    //             console.log("catch");
    //             console.log(error);
    //             showErrorMessage('Erro! processando autenticação:', error);
    //         }
    //     );
    // }

    // create = () => {
    //     this.props.history.push('/createUser');
    // }

    class Login extends React.Component {

        state = {
            matricula: "",
            senha: "",
          };
        
          


     render(){
        
        return(

            <div className="min-h-screen h-full bg-white flex">
                
                <SideBarLogin />
                
                <div className="justify-center align-middle">
                    
                    <div className="">
                        {/* <img className="mt-0" alt='logo' src={Logo} width='341px' heidth='341px'/> 
                        <img className="mt-{463px}" alt='ifpb' src={LogoIFPB} width='89px' heidth='108px' /> */}
                    </div>
                </div>
                <div className="flex flex-1 flex-col justify-center align-middle px-4 py-6 sm:px-12 lg:flex lg:px-20 xl:px-24">
                    
                    <div className="mx-auto w-full max-w-sm align-middle">
                        
                        <div className="">
                            {/* <img className="mt-4 lg:hidden w-24 h-22" alt='logo' src={Logo} /> */}
                            <h1 className="mt-1 text-[24px] text-center font-bold text-[#38761d] py-1">Login</h1>
                        </div>
                        
                        <div className="hidden sm:block relative h-[161px] w-[400px] p-4 border-0 bg-[#b6d7a8] rounded-md">
                            
                            <form action="">
                                <div className="mb-4 flex items-center">
                                    <label class="block">
                                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-bold text-slate-700 mr-2">Matrícula</span>
                                    </label>
                                    <input type="text" placeholder="Matrícula" className="apperance-none block w-[286px] py-1 px-1 leading-tight text-gray-700
                                    bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
                                    value={this.state.matricula} onChange={(e) => { this.setState({ matricula: e.target.value }) }}></input>
                                
                                </div>
                                <div className="mb-4 flex">
                                    <label class="block">
                                        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-bold text-slate-700 mr-2"
                                        value={this.state.senha} onChange={(e) => { this.setState({ senha: e.target.value }) }}>Senha</span>
                                    </label>
                                    <input type="password" placeholder="Senha" className="apperance-none block w-[308px] py-1 px-1 leading-tight text-gray-700
                                    bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"></input>
                                </div>
                                <div className="mb-4 flex flex-row">
                                    <button onClick={this.login} className="inline-block w-[85px] items-center rounded-md border border-gray-300 bg-[#38761d] px-1 py-1 text-sm font-bold text-white shadow-sm hover:bg-gray-10 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">ENTRAR</button>
                                    <p className="ml-4 text-sm text-blue-800 py-2 hover:text-cyan-500"><a href="/">Esqueceu sua senha?</a></p>
                                </div>
                            <div cassName="mt-8">
                            </div>
                            </form>
                            <div className="row flex justify-center align-middle px-4 mt-4">
                                <div className="col m-2">
                                <p className="text-sm">Acesse com sua conta Google:</p>
                                </div>
                                
                            </div>
                            <div className="row flex justify-center align-middle px-4 mt-1">
                                <div className="col mr-2">
                                    <LoginButton />
                                </div>
                                <div className="col ml-2">
                                    <LogoutButton />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>


        );
     }
}

export default withRouter (Login);