import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="pnf-title">
                    404
                </h1>
                <div className="pnf-desc">
                   A Página que você está procurando não foi encontrada. 
                </div>
                <Link to="/"><button className="btn-save btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2" type="button">VOLTAR</button></Link>
            </div>
        );
    }
}

export default NotFound;