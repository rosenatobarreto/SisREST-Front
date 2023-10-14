import React, { Component } from 'react';
import './Login.css';
import SideBarLogin from '../../components/SideBarLogin';
import { showErrorMessage } from '../../components/Toastr';
import { GOOGLE_AUTH_URL, ACCESS_TOKEN } from '../../services/constants/Constants';
// import { login } from '../../util/APIUtils';
import { Redirect } from 'react-router-dom'
import googleLogo from '../../assets/imgs/btn-google-entrar.png';


    class Login extends Component {

    componentDidMount() {
       // Se o login OAuth2 encontrar um erro, o usuário será redirecionado para a página /login com um erro.
         // Aqui exibimos o erro e removemos o parâmetro de consulta de erro do local.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                showErrorMessage(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    
    render(){
        
        if(this.props.authenticated) {
                return <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                }}/>;            
        }
        return(

            <div className="min-h-screen h-full bg-white flex">
                
                <SideBarLogin />
                
                <div className="justify-center align-middle">
                    
                    <div className="">
                        {/* <img className="mt-0" alt='logo' src={Logo} width='341px' heidth='341px'/> 
                        <img className="mt-{463px}" alt='ifpb' src={LogoIFPB} width='89px' heidth='108px' /> */}
                    </div>
                </div>
                <div className="flex flex-1 flex-col justify-center align-middle px-4 py-6 sm:px-6 lg:flex lg:px-20 xl:px-24">
                    
                    <div className="mx-auto w-full max-w-sm align-middle">
                        
                        <div className="items-center">
                            {/* <img className="mt-4 lg:hidden w-24 h-22" alt='logo' src={Logo} /> */}
                            <h1 className="mt-1 text-[24px] text-center font-bold text-[#38761d]">Login</h1>
                        </div>
                        {/* <div className="hidden sm:block relative h-[161px] w-[400px] p-4 border-0 bg-[#b6d7a8] rounded-md"></div> */}
                        <div className=" sm:block relative h-[161px] w-full p-4 border-0 bg-white rounded-md">
                            

                            <div className="row flex justify-center align-middle px-4 mt-4">
                                <div className="col m-2">
                                <p className="text-sm text-center">Acesse com sua conta Google:</p>
                                </div>
                                
                            </div>
                            <div className="row flex justify-center align-middle px-4 mt-1">
                                <div className="col">
                                    {/* <LoginButton /> */}
                                    <SocialLogin />
                                </div>
         
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>


        );
     }
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="row flex justify-center align-middle mt-1 items-center">
                <a className="social-btn" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /></a>
            </div>
        );
    }
}

export default Login;