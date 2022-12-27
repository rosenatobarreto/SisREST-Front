import React from 'react';
import '../assets/css/Style.css';

//eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.beneficiarios.map(user => {
        return (
            <tr key={user.id}>
                
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.matricula}</td>
                <td>{user.tipo}</td>
                <td className="col-md-2">
                    <button type="button" title="Editar"
                        className="btn btn-warning"
                        onClick={e => props.edit(user.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                        className="btn btn-primary btn-delete"
                        onClick={e => props.delete(user.id)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (

        <table className="table table-hover">
            <thead>
                <tr className="table-active">
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Matrícula</th>
                    <th scope="col">Papel</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}