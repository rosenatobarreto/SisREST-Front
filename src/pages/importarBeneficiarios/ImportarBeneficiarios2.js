/* eslint-disable no-undef */
import React, { useEffect, useState, ChangeEvent, memo } from "react";

// import axios from 'axios';

const ImportarBeneficiarios2 = (props) => {

  const [arquivos, setArquivos] = useState([]);
  const [idEdital, setIdEdital] = useState(0);

  // Crie um objeto FormData
const formData = new FormData();

// Suponha que 'arquivos' é um array de arquivos
for (let i = 0; i < arquivos.length; i++) {
  formData.append(`arquivos[${i}]`, arquivos[i]);
}



// // Adicione o id do edital ao formData
// formData.append('idEdital', idEdital);

// Fazendo a requisição POST com fetch
fetch('http://localhost:8080/api/csv/processar', {
  method: 'POST',
  body: formData
},idEdital)
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
})
.catch(error => {
  console.error('Error:', error);
});

  return(
    
      <form onSubmit={onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={onChange} />
        <button type="submit">Upload</button>
      </form>
   
  )
}

export default memo(ImportarBeneficiarios2);