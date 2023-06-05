// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import CadastrarBeneficiario from '../../cadastrarBeneficiario/CadastrarBeneficiario';
// import BeneficiarioApiService from '../../services/BeneficiarioApiService';

// jest.mock('../../services/BeneficiarioApiService');

// describe('CadastrarBeneficiario', () => {
//   beforeEach(() => {
//     jest.resetAllMocks();
//   });

//   test('should render and submit form successfully', async () => {
//     const mockCreate = jest.fn();
//     BeneficiarioApiService.prototype.create = mockCreate;

//     const { getByLabelText, getByText } = render(<CadastrarBeneficiario />);
    
//     // Preenche os campos do formulário
//     fireEvent.change(getByLabelText('CPF'), { target: { value: '12345678900' } });
//     fireEvent.change(getByLabelText('Programa'), { target: { value: 'Programa Teste' } });

//     // Simula a seleção do edital e do estudante
//     fireEvent.change(getByLabelText('Selecione o edital'), { target: { value: 'Edital Teste' } });
//     fireEvent.change(getByLabelText('Selecione o estudante'), { target: { value: 'Estudante Teste' } });

//     // Clica no botão "CADASTRAR"
//     fireEvent.click(getByText('CADASTRAR'));

//     await waitFor(() => {
//       // Verifica se a função de criação foi chamada com os valores corretos
//       expect(mockCreate).toHaveBeenCalledWith({
//         ativo: true,
//         cpf: '12345678900',
//         programa: 'Programa Teste',
//         situacao: 'Deferido',
//         edital: expect.any(Number),
//         contaEstudante: expect.any(Number),
//       });
//     });
//   });



//   test('should render and cancel form', () => {
//     const mockPush = jest.fn();
//     const mockHistory = { push: mockPush };
//     const { getByText } = render(<CadastrarBeneficiario history={mockHistory} />);

//     // Clica no botão "CANCELAR"
//     fireEvent.click(getByText('CANCELAR'));

//     // Verifica se a função de redirecionamento foi chamada corretamente
//     expect(mockPush).toHaveBeenCalledWith('/listarBeneficiarios');
//   });
// });
/////////////////////////////////
// import React from "react";
// import { render, fireEvent, waitFor, screen } from "@testing-library/react";
// import CadastrarBeneficiario from "../../cadastrarBeneficiario/CadastrarBeneficiario";

// describe("CadastrarBeneficiario", () => {
//   test("deve exibir o título 'Cadastrar Beneficiário'", () => {
//     render(<CadastrarBeneficiario />);
//     const titulo = screen.queryByText("Cadastrar Beneficiário");
//     expect(titulo).toBeInTheDocument();
//   });

//   test("deve preencher o campo CPF corretamente", () => {
//     render(<CadastrarBeneficiario />);
//     const cpfInput = screen.queryByText("CPF");
//     fireEvent.change(cpfInput, { target: { value: "12345678900" } });
//     expect(cpfInput.value).toBe("12345678900");
//   });

//   test("deve preencher o campo Programa corretamente", () => {
//     render(<CadastrarBeneficiario />);
//     const programaInput = screen.queryByText("Programa");
//     fireEvent.change(programaInput, { target: { value: "Programa Teste" } });
//     expect(programaInput.value).toBe("Programa Teste");
//   });

//   test("deve chamar a função 'create' ao clicar no botão 'CADASTRAR'", async () => {
//     const createMock = jest.fn();
//     const originalCreate = window.BeneficiarioApiService.create;
//     window.BeneficiarioApiService.create = createMock;

//     render(<CadastrarBeneficiario />);
//     const cadastrarButton = screen.queryByText("CADASTRAR");
//     fireEvent.click(cadastrarButton);

//     await waitFor(() => {
//       expect(createMock).toHaveBeenCalled();
//     });

//     window.BeneficiarioApiService.create = originalCreate;
//   });

//   test("deve redirecionar para '/listarBeneficiarios' ao clicar no botão 'CANCELAR'", () => {
//     const pushMock = jest.fn();
//     const historyMock = { push: pushMock };

//     render(<CadastrarBeneficiario history={historyMock} />);
//     const cancelarButton = screen.getByLabelText("CANCELAR");
//     fireEvent.click(cancelarButton);

//     expect(pushMock).toHaveBeenCalledWith("/listarBeneficiarios");
//   });
// });
// describe("ListarBeneficiarios", () => {
//   test("deve exibir o título 'Listar Beneficiários'", () => {
//     render(<ListarBeneficiarios />);
//     const titulo = screen.getByText("Listar Beneficiários");
//     expect(titulo).toBeInTheDocument();
//     });
//     }
//   );

import React from "react";
import { CadastrarBeneficiario } from "../pages/cadastrarBeneficiario/CadastrarBeneficiario";
// const CadastrarBeneficiario = require("../pages/cadastrarBeneficiario/CadastrarBeneficiario");

describe("CadastrarBeneficiario", () => {
  test("deve exibir o título 'Cadastrar Beneficiário'", () => {
    const cadastrarBeneficiario = new CadastrarBeneficiario();
    const titulo = cadastrarBeneficiario.renderTitulo();

    expect(titulo).toBe("Cadastrar Beneficiário");
  });

  test("deve preencher o campo CPF corretamente", () => {
    const cadastrarBeneficiario = new CadastrarBeneficiario();
    const cpfInput = document.createElement("input");
    cpfInput.name = "CPF";
    cpfInput.value = "12345678900";

    cadastrarBeneficiario.handleInputChange(cpfInput);

    expect(cadastrarBeneficiario.state.cpf).toBe("12345678900");
  });

  test("deve preencher o campo Programa corretamente", () => {
    const cadastrarBeneficiario = new CadastrarBeneficiario();
    const programaInput = document.createElement("input");
    programaInput.name = "Programa";
    programaInput.value = "Programa Teste";

    cadastrarBeneficiario.handleInputChange(programaInput);

    expect(cadastrarBeneficiario.state.programa).toBe("Programa Teste");
  });

  test("deve chamar a função 'create' ao clicar no botão 'CADASTRAR'", () => {
    const cadastrarBeneficiario = new CadastrarBeneficiario();
    cadastrarBeneficiario.create = jest.fn();
    const cadastrarButton = document.createElement("button");
    cadastrarButton.name = "CADASTRAR";

    cadastrarBeneficiario.handleClick(cadastrarButton);

    expect(cadastrarBeneficiario.create).toHaveBeenCalled();
  });

  test("deve redirecionar para '/listarBeneficiarios' ao clicar no botão 'CANCELAR'", () => {
    const cadastrarBeneficiario = new CadastrarBeneficiario();
    const pushMock = jest.fn();
    cadastrarBeneficiario.props = { history: { push: pushMock } };
    const cancelarButton = document.createElement("button");
    cancelarButton.name = "CANCELAR";

    cadastrarBeneficiario.handleClick(cancelarButton);

    expect(pushMock).toHaveBeenCalledWith("/listarBeneficiarios");
  });
});
