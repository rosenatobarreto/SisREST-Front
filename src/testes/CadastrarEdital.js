import * as React from 'react';
import { render } from '@testing-library/react';
import CadastrarEdital from '../pages/cadastrarEdital/CadastrarEdital'


afterEach(cleanup)


// describe('CadastrarEdital', () => {

//   it('Cadastrar um edital', () => {
//     render(<CadastrarEdital />);
//     expect(true).toBe(true);

//   });

// });

it('Inserir texto atualiza o state', () => {
    const { getByText, getByLabelText } = render(<CadastrarEdital />);

    expect(getByText(/Change/i).textContent).toBe("Alterar: ")

    fireEvent.change(getByLabelText("Texto de entrada:"), {target: {numero: 'Text' } } )

    expect(getByText(/Change/i).textContent).not.toBe("Alterar: ")
 })


 it('O envio do formulário funciona corretamente', () => {
     const { getByTestId, getByText } = render(<HooksForm1 />);

     expect(getByText(/Submit Value/i).textContent).toBe("Valor de envio: ")

     fireEvent.submit(getByTestId("form"), {target: {text1: {value: 'Texto' } } })

     expect(getByText(/Submit Value/i).textContent).not.toBe("Valor de envio: ")
  })