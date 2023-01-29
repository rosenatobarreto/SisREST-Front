import React, { Component } from 'react';
import '../assets/css/Style.css';

class Header extends Component {

    constructor(props) {
    super(props);
    console.log(props);
  }
   
    render() {
        return (
            // <div>
            //     <header className="header w-screen border-2 border-red-800">
            //         <span>
                        
            //         </span>
            //     </header>
            // </div>

            <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
            <div className="flex flex-row-reverse pr-6">
                <p className="text-xs">{this.props.currentUser.email}</p>
            </div>
            <div className="flex flex-row-reverse pr-6">
                <p className="text-lg font-semibold">Administrador</p>
            </div>
            <div className="flex flex-row pl-6">
              <p className="text-xl font-semibold">Cadastrar Beneficiário</p>
            </div>
          </div>
        )
    }
}

export default Header