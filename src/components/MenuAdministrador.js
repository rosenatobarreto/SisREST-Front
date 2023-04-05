import React, { Component } from "react";
import "../assets/css/Style.css";
import LogoIntern from "../assets/imgs/SisRestLogoIntern.png";
// import SideBar from "../components/SideBar";

class MenuAdministrador extends Component {
  render() {
    return (

      <div className="w-[220px] sticky top-0 pt-4 pl-4 pr-4 bg-[#93c47d] h-full">
         
        <div className="mx-auto">
          <img
            className="h-[120px] w-auto pl-12 pr-4 flex-auto"
            alt="SisRest"
            src={LogoIntern}
          />
        </div>

        <div class="border-b-2 mt-2 mb-2 border-green-100 ..."></div>
        
        <ul className="flex sm:flex-col overflow-hidden content-center justify-center divide-y divide-gray-600">
          <li className="py-2 hover:bg-gray-300">
            <a className="truncate" href="/">
                <span className="hidden sm:inline text-sm">Pedidos de Refeição</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="truncate" href="/">
              <span className="hidden sm:inline text-sm">Lista Diária</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/">
              <span className="hidden sm:inline text-sm">Cancelamentos</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/listarBeneficiarios">
              <span className="hidden sm:inline text-sm">Gerenciar Usuários</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/">
              <span className="hidden sm:inline text-sm">Consultar Faltas</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/listarEditais">
              <span className="hidden sm:inline text-sm">Gerenciar Editais</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/">
              <span className="hidden sm:inline text-sm">Sair</span>
            </a>
          </li>
        </ul>
        
      </div>
    );
  }
}

export default MenuAdministrador;

// import { useState } from "react"; // import state

// export default function Header() {
//   const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

//   return (
//     <div className="flex items-center justify-between border-b border-gray-400 py-8">
//       <a href="/">
//         <img src="https://designbygio.it/images/logo.png" alt="logo" />
//       </a>
//       <nav>
//         <section className="MOBILE-MENU flex lg:hidden">
//           <div
//             className="HAMBURGER-ICON space-y-2"
//             onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
//           >
//             <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
//             <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
//             <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
//           </div>

//           <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> // toggle class based on isNavOpen state
//             <div
//               className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
//               onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
//             >
//               <svg
//                 className="h-8 w-8 text-gray-600"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </div>
//             <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
//               <li className="border-b border-gray-400 my-8 uppercase">
//                 <a href="/about">About</a>
//               </li>
//               <li className="border-b border-gray-400 my-8 uppercase">
//                 <a href="/portfolio">Portfolio</a>
//               </li>
//               <li className="border-b border-gray-400 my-8 uppercase">
//                 <a href="/contact">Contact</a>
//               </li>
//             </ul>
//           </div>
//         </section>

//         <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
//           <li>
//             <a href="/about">About</a>
//           </li>
//           <li>
//             <a href="/portfolio">Portfolio</a>
//           </li>
//           <li>
//             <a href="/contact">Contact</a>
//           </li>
//         </ul>
//       </nav>
//       <style>{`
//       .hideMenuNav {
//         display: none;
//       }
//       .showMenuNav {
//         display: block;
//         position: absolute;
//         width: 100%;
//         height: 100vh;
//         top: 0;
//         left: 0;
//         background: white;
//         z-index: 10;
//         display: flex;
//         flex-direction: column;
//         justify-content: space-evenly;
//         align-items: center;
//       }
//     `}</style>
//     </div>
//   );
// }
