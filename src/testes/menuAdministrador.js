// import { render } from "@testing-library/react";
// import { MenuAdministrador } from "../src/components/MenuAdministrador";


// describe("MenuAdministrador", () => {
//     it("Deve renderizar corretamente", () => {
//         render(<MenuAdministrador/>)
//         expect(screen.getByText("Gerenciar Editais")).toBeInTheDocument();
//     })
// })

import * as React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
  });
});