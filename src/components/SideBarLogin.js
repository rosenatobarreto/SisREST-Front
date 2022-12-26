import React from 'react';
import Logo from '../assets/imgs/SisRestLogoLogin.png';
import LogoIFPB from '../assets/imgs/ifpb-1.png';

export default class SideBar extends React.Component {
    
    render() {
        return (
//"hidden sm:block relative w-[200px] flex-1 bg-[#93c47d]"
            <div className="w-[50%] bg-[#93c47d]">
                    <div className="flex flex-col h-screen justify-center items-center">
                        <img className="mt-0 mb-0" alt='logo' src={Logo} width='341px' heidth='341px'/>
                        <span><strong>Sistema de Gerenciamento</strong></span>
                        <span><strong>do Restaurante Estudantil</strong></span>
                        <br/>
                        <br/>
                        <div></div>
                        <img className="mt-{460px}" alt='ifpb' src={LogoIFPB} width='89px' heidth='108px' /> 
                    </div>
                </div>

        )
    }

    styles = {
        cardBg: {
            outerWidth: '20rem',
            margin: '50px 0 0 0'            
        }
    }
}