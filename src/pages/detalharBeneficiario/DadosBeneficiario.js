/* eslint-disable array-callback-return */
import React, { Component, useEffect, useState, useRef, memo } from "react";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import EditalApiService from "../../services/EditalApiService";
import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
import MenuAluno from "../../components/MenuAluno";
import { Button } from 'primereact/button';
import { formatDateBr } from "../../util/FormatDate";
import QRCode from 'qrcode.react';

const DadosBeneficiario = (props) => {

  const serviceBeneficiario = new BeneficiarioApiService();
  const serviceEdital = new EditalApiService();
  const serviceContaEstudante = new ContaEstudanteApiService();
  console.log('Detalhes props: ', props.currentUser.email);

  // const [ativo, setAtivo] = useState(true);
  const [editalNumero, setEditalNumero] = useState(0);
  const [editalAno, setEditalAno] = useState(0);
  const [editalNome, setEditalNome] = useState('');
  const [editalLink, setEditalLink] = useState('');
  const [editalVigenteInicio, setEditalVigenteInicio] = useState('');
  const [editalVigenteFinal, setEditalVigenteFinal] = useState('');
  const [contaEstudanteNome, setContaEstudanteNome] = useState('');
  const [contaEstudanteEmail, setContaEstudanteEmail] = useState('');
  const [contaEstudanteMatricula, setContaEstudanteMatricula] = useState(0);
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [beneficiariosList, setBeneficiariosList] = useState([]);
  const [textQrcode, setTextQrcode] = useState([]);

  const UserQRCode = () => {
    // Converta as informações do usuário em uma string.
    const userInfo = JSON.stringify(textQrcode);
    // const testeQrcode = "Testando o QRCode";

    return (
      <div>
        <h3>QR Code</h3>
        <QRCode value={userInfo} />
      </div>
    );
  }

  useEffect(() => {
    findAll();
    findByEmail();


    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []
  );

  const findAll = () => {
    serviceBeneficiario
      .get("/buscarTodos")
      .then((response) => {
        findByEmail();
        const beneficiarios = response.data;
        setBeneficiariosList(beneficiarios);
        // console.log('findAll',beneficiarios);
      })
      .catch((error) => {
        console.log(error.response);
      });

  };


  const findByEmail = () => {

    const listaBeneficiarios = beneficiariosList.map((beneficiario) => {
      
      // console.log('teste')
      //console.log('teste',beneficiario)
      // if (contaEstudanteEmail === props.currentUser.email){
      //   console.log('->teste currentUser')
      // }
        // setAtivo(beneficario.ativo)
      setTextQrcode(beneficiario);
      setEditalNumero(beneficiario.edital.numero)
      setEditalNome(beneficiario.edital.nome)
      setEditalAno(beneficiario.edital.ano)
      setEditalLink(beneficiario.edital.link)
      setEditalVigenteInicio(beneficiario.edital.vigenteInicio)
      setEditalVigenteFinal(beneficiario.edital.vigenteFinal)
      setContaEstudanteNome(beneficiario.contaEstudante.nome)
      // setContaEstudanteEmail(beneficiario.contaEstudante.email)
      setContaEstudanteMatricula(beneficiario.contaEstudante.matricula)
      // }
    });
    console.log('Email =',contaEstudanteEmail)
    console.log('Nome =',contaEstudanteNome)
    
    
  }



  // this.serviceBeneficiario.get(`/buscarPorID/${id}`)
  //   .then((response) => {
  //     const beneficiario = response.data;
  //     const id = beneficiario.id;
  //     const ativo = beneficiario.ativo;
  //     const editalNumero = beneficiario.edital.numero;
  //     const editalAno = beneficiario.edital.ano;
  //     const editalNome = beneficiario.edital.nome;
  //     const editalLink = beneficiario.edital.link;
  //     const editalVigenteInicio = beneficiario.edital.vigenteInicio;
  //     const editalVigenteFinal = beneficiario.edital.vigenteFinal;
  //     const contaEstudanteNome = beneficiario.contaEstudante.nome;
  //     const contaEstudanteEmail = beneficiario.contaEstudante.email;
  //     const contaEstudanteMatricula = beneficiario.contaEstudante.matricula;

  //     if (beneficiario.contaEstudante.email === this.props.currentUser.email){

  //       this.setState({id:id, ativo:ativo,editalNumero:editalNumero,editalNome:editalNome,
  //         editalAno:editalAno,editalLink:editalLink,editalVigenteInicio:editalVigenteInicio,
  //         editalVigenteFinal:editalVigenteFinal,contaEstudanteNome:contaEstudanteNome,
  //         contaEstudanteEmail:contaEstudanteEmail,contaEstudanteMatricula:contaEstudanteMatricula});
  //     }

  //   })
  //   .catch((error) => {
  //     console.log('deu erro');
  //     console.log('error.response',error.response);
  //   });


  // findById = (id) => {

  //   this.serviceBeneficiario.get(`/buscarPorID/${id}`)
  //     .then((response) => {
  //       const beneficiario = response.data;
  //       const id = beneficiario.id;
  //       const ativo = beneficiario.ativo;
  //       const editalNumero = beneficiario.edital.numero;
  //       const editalAno = beneficiario.edital.ano;
  //       const editalNome = beneficiario.edital.nome;
  //       const editalLink = beneficiario.edital.link;
  //       const editalVigenteInicio = beneficiario.edital.vigenteInicio;
  //       const editalVigenteFinal = beneficiario.edital.vigenteFinal;
  //       const contaEstudanteNome = beneficiario.contaEstudante.nome;
  //       const contaEstudanteEmail = beneficiario.contaEstudante.email;
  //       const contaEstudanteMatricula = beneficiario.contaEstudante.matricula;

  //       if (beneficiario.contaEstudante.email === this.props.currentUser.email){

  //         this.setState({id:id, ativo:ativo,editalNumero:editalNumero,editalNome:editalNome,
  //           editalAno:editalAno,editalLink:editalLink,editalVigenteInicio:editalVigenteInicio,
  //           editalVigenteFinal:editalVigenteFinal,contaEstudanteNome:contaEstudanteNome,
  //           contaEstudanteEmail:contaEstudanteEmail,contaEstudanteMatricula:contaEstudanteMatricula});
  //       }

  //     })
  //     .catch((error) => {
  //       console.log('deu erro');
  //       console.log('error.response',error.response);
  //     });
  //   };

  const voltar = () => {
    props.history.push("/boasVindas");
  };

  return (
    <div className="container-fluid h-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
      {/*Col left  */}
      <div className="w-[220px] flex-shrink flex-grow-0 px-0">
        {/* Side Menu */}
        <MenuAluno />
      </div>
      {/* Col right */}
      <div className="w-full">
        {/* Header */}
        <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
          <div className="flex flex-row-reverse pr-6">
            <p className="text-xs">{props.currentUser.email}</p>
          </div>
          <div className="flex flex-row-reverse pr-6">
            <p className="text-lg font-semibold">Estudante</p>
          </div>
          <div className="flex flex-row pl-6">
            <p className="text-xl font-semibold">Minhas informações</p>
          </div>
        </div>

        {/* Content two */}
        <div className="pt-4 pl-8 pr-8 mb-4">
          <div className="mt-0 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 ml-5 sm:px-0">
                  <h3 className="text-lg mb-10 font-medium leading-6 text-gray-900">Dados do Estudante</h3>

                  <p className="mt-1 ml-10 text-md text-gray-900">Nome:</p>
                  <p className="mt-0 ml-10 mb-5 text-lg text-gray-900">{contaEstudanteNome}</p>

                  <p className="mt-1 ml-10 text-md text-gray-900">E-mail:</p>
                  <p className="mt-0 ml-10 mb-5 text-lg text-gray-900">{contaEstudanteEmail}</p>

                  <p className="mt-1 ml-10 text-md text-gray-900">Matrícula:</p>
                  <p className="mt-0 ml-10 mb-5 text-lg text-gray-900">{contaEstudanteMatricula}</p>

                  <p className="mt-1 ml-10 text-md text-gray-900">Edital:</p>
                  <p className="mt-0 ml-10 mb-5 text-lg text-gray-900">{editalNumero}-{editalAno} {editalNome}</p>

                  <p className="mt-1 ml-10 text-md text-gray-900">Link do edital:</p>
                  <p className="mt-0 ml-10 mb-5 text-lg text-gray-900"><a href={editalLink} target="_blank" rel="noreferrer" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{editalLink}</a></p>

                  <p className="mt-1 ml-10 text-md text-gray-900">Vigência do edital:</p>
                  <p className="mt-0 ml-10 mb-5 text-lg text-gray-900">{formatDateBr(editalVigenteInicio)} a {formatDateBr(editalVigenteFinal)}</p>


                </div>
                <div className="row flex flex-row mt-1 ml-14 mb-5">{UserQRCode()}</div>
                <div className="row flex flex-row-reverse align-middle px-6 mt-1">

                  <Button id="btnBack" label="VOLTAR" severity="sucess" raised onClick={voltar} />
                  <br />
                  <br />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default memo(DadosBeneficiario);
