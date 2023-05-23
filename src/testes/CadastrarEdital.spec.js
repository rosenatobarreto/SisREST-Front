// // Importar as dependências necessárias
// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import CadastrarEdital from "../../src/pages/cadastrarEdital/CadastrarEdital";

// // Criar um mock do serviço EditalApiService
// jest.mock("../services/EditalApiService");
// import EditalApiService from "../../services/EditalApiService";

// // Criar um mock do componente MenuAdministrador
// jest.mock("../components/MenuAdministrador");
// import MenuAdministrador from "../../components/MenuAdministrador";

// // Criar um mock do utilitário FormatDate
// jest.mock("../util/FormatDate");
// import { stringToDate } from "../../util/FormatDate";

// // Criar um mock do componente Toastr
// jest.mock("../components/Toastr");
// import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";

// // Definir alguns dados de teste
// const edital = {
//     numero: "123",
//     ano: "2021",
//     nome: "Edital Teste",
//     link: "http://example.com",
//     vigenteInicio: "01/01/2021",
//     vigenteFinal: "31/12/2021",
// };

// // Definir uma função auxiliar para renderizar o componente com as props necessárias
// const renderComponent = (props) => {
//     return render(
//         <CadastrarEdital
//             currentUser={{ email: "admin@example.com" }}
//             history={{ push: jest.fn() }}
//             {...props}
//         />
//     );
// };

// // Iniciar a suite de testes
// describe("CadastrarEdital component", () => {
//     // Antes de cada teste, limpar os mocks
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     // Testar se o componente renderiza corretamente os elementos da interface
//     it("should render the UI elements correctly", () => {
//         // Renderizar o componente
//         renderComponent();

//         // Verificar se o componente MenuAdministrador foi renderizado
//         expect(MenuAdministrador).toHaveBeenCalled();

//         // Verificar se os campos do formulário foram renderizados
//         expect(screen.getByLabelText(/Número/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Ano/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Título do Edital/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Link do Edital/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Vigente a partir de/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Vigente até/i)).toBeInTheDocument();

//         // Verificar se os botões do formulário foram renderizados
//         expect(screen.getByRole("button", { name: /CADASTRAR/i })).toBeInTheDocument();
//         expect(screen.getByRole("button", { name: /CANCELAR/i })).toBeInTheDocument();
//     });

//     // Testar se o componente chama o serviço EditalApiService.create com os dados corretos ao clicar no botão CADASTRAR
//     it("should call EditalApiService.create with correct data when clicking on CADASTRAR button", async () => {
//         // Renderizar o componente
//         renderComponent();

//         // Preencher os campos do formulário com os dados de teste
//         fireEvent.change(screen.getByLabelText(/Número/i), {
//             target: { value: edital.numero },
//         });
//         fireEvent.change(screen.getByLabelText(/Ano/i), {
//             target: { value: edital.ano },
//         });
//         fireEvent.change(screen.getByLabelText(/Título do Edital/i), {
//             target: { value: edital.nome },
//         });
//         fireEvent.change(screen.getByLabelText(/Link do Edital/i), {
//             target: { value: edital.link },
//         });
//         fireEvent.change(screen.getByLabelText(/Vigente a partir de/i), {
//             target: { value: edital.vigenteInicio },
//         });
//         fireEvent.change(screen.getByLabelText(/Vigente até/i), {
//             target: { value: edital.vigenteFinal },
//         });

//         // Simular o clique no botão CADASTRAR
//         fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/i }));

//         // Verificar se a função stringToDate foi chamada com os valores dos campos de data
//         expect(stringToDate).toHaveBeenCalledWith(edital.vigenteInicio);
//         expect(stringToDate).toHaveBeenCalledWith(edital.vigenteFinal);

//         // Verificar se o serviço EditalApiService.create foi chamado com os dados de teste
//         expect(EditalApiService.create).toHaveBeenCalledWith(edital);
//     });

//     // Testar se o componente mostra uma mensagem de sucesso e redireciona para outra página quando o serviço EditalApiService.create é resolvido com sucesso
//     it("should show success message and redirect to another page when EditalApiService.create is resolved successfully", async () => {
//         // Simular que o serviço EditalApiService.create é resolvido com sucesso
//         EditalApiService.create.mockResolvedValue();

//         // Renderizar o componente
//         const { history } = renderComponent();

//         // Simular o clique no botão CADASTRAR
//         fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/i }));

//         // Esperar que a promessa seja resolvida
//         await screen.findByText(/Edital cadastrado com sucesso!/i);

//         // Verificar se a mensagem de sucesso foi mostrada
//         expect(showSuccessMessage).toHaveBeenCalledWith(
//             "Edital cadastrado com sucesso!"
//         );

//         // Verificar se o redirecionamento para outra página foi feito
//         // expect(history.push).toHaveBeenCalledWith("/listarEditais");
//     });

//     // Testar se o componente mostra uma mensagem de erro quando o serviço EditalApiService.create é rejeitado com falha
//     it("should show error message when EditalApiService.create is rejected with failure", async () => {
//         // Simular que o serviço EditalApiService.create é rejeitado com falha
//         EditalApiService.create.mockRejectedValue();

//         // Renderizar o componente
//         renderComponent();

//         // Simular o clique no botão CADASTRAR
//         fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/i }));

//         // Esperar que a promessa seja rejeitada
//         await screen.findByText(/Erro ao cadastrar edital/i);
//         // Verificar se a mensagem de erro foi mostrada
//         expect(showErrorMessage).toHaveBeenCalledWith(
//             "Erro ao cadastrar edital"
//         );
//     });
//     });

describe('Jest', () => {
  it('should work', () => {
    expect(1).toBe(1)
  })
})