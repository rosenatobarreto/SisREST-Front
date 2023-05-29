import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  test('renders without errors', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Espera pela remoção do componente LoadingIndicator
    await waitForElementToBeRemoved(() => screen.getByTestId('loading-indicator'));

    // Verifica se o componente Header é renderizado
    expect(screen.getByTestId('header')).toBeInTheDocument();

    // Verifica se o componente Login é renderizado na rota raiz
    expect(screen.getByTestId('login')).toBeInTheDocument();

    // Verifica se o componente NotFound é renderizado para uma rota inválida
    expect(screen.getByTestId('not-found')).toBeInTheDocument();

    // Verifica se o componente CadastrarContaEstudante é renderizado para na rota "/cadastrarContaEstudante"
    expect(screen.getByTestId('cadastrarContaEstudante')).toBeInTheDocument();

    // Verifica se o componente AtualizarContaEstudante é renderizado para na rota "/atualizarContaEstudante"
    expect(screen.getByTestId('atualizarContaEstudante')).toBeInTheDocument();

    // Verifica se o componente ListarContasEstudante é renderizado para na rota "/listarContasEstudante"
    expect(screen.getByTestId('listarContasEstudante')).toBeInTheDocument();

    // Verifica se o componente CadastrarEdital é renderizado para na rota "/cadastrarEdital"
    expect(screen.getByTestId('cadastrarEdital')).toBeInTheDocument();



  });
});
