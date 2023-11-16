import React, { useState } from "react";
import Title from "../../components/Title/Title";
import "./TipoEventos.css";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/tipo-evento.svg";
import Container from "../../components/Container/Container";
import TableTp from "./TableTp/TableTp";

import { Button, Input } from "../../components/FormComponents/FormComponents";

import api,{  } from "../../Services/Service"

const TipoEventos = () => {
  const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [TipoEventos, setTipoEventos] = useState([ 
      {"idTipoEvento": "123", "titulo": "Evento ABC"},
      {"idTipoEvento": "555", "titulo": "Evento xpto"},
      {"idTipoEvento": "444", "titulo": "Evento de JavaScript"}
     ]); //array mocado

  async function handleSubmit(e) {
    // parar o submit do formulário
    e.preventDefault();
    // validar pelo menos 3 caracteres
    if( titulo.trim().length < 3 ) {
      alert("O Título deve ter no mínimo 3 caracteres")
      return;
    }
    // chamar a api
    try {
      const retorno = await api.post("/TiposEvento", {titulo: titulo});
      console.log("CADASTRO COM SUCESSO!");
      console.log(retorno.data);
      setTitulo(""); //limpa a variável
    } catch (error) {
      console.log("Deu ruim na api: ");
      console.log(error);
    }
  }
  /****************** EDITAR CADASTRO ******************/

  function showUpdateForm() {
    alert('Mostrando a tela de update');
  }

  function handleUpdate() {
    alert("Bora Atualizar")
  }
  function editActionAbort() {
    alert("Cancelar a tela de edição de dados");
  }

  function handleDelete() {
    alert('Bora lá apagar na api');
  }

  return (
    <MainContent>
      {/* Cadastro de tipo eventos */}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Página Tipo Eventos"} />
            <ImageIllustrator
              alterText={"?????"}
              imageRender={eventTypeImage}
            />

            <form 
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}>
              {!frmEdit ? 
                (<>
                  {/* Cadastrar */}
                  <Input
                    type={"text"}
                    id={"titulo"}
                    name={"titulo"}
                    placeholder={"Título"}
                    required={"required"}
                    value={titulo}
                    manipulationFunction={
                      (e) => {
                        setTitulo(e.target.value)
                      }
                    }   
                  />
                  <span>{titulo}</span>
                  <Button  
                    type={"submit"}
                    id={"cadastrar"}
                    name={"cadastrar"}
                    textButton={"Cadastrar"}
                  />
                </>) 
              : 
                {/* Atualizar */}
                (<>Tela de Edição</>)
              }

            </form>
          </div>
        </Container>
      </section>
      
      {/* Listagem de tipo eventos */}
      <section className="lista-eventos-section">

      <Container>
        <Title titleText={"Lista Tipo Eventos"} color="white"/>
        
        <TableTp 
          dados={TipoEventos}
          fnUpdate={showUpdateForm}
          fnDelete={handleDelete}
        />
      </Container>

      </section>
    </MainContent>
  );
};

export default TipoEventos;
