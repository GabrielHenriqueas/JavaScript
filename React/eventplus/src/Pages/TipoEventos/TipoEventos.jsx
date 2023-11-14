import React, { useState } from "react";
import Title from "../../components/Title/Title";
import "./TipoEventos.css";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/tipo-evento.svg";
import Container from "../../components/Container/Container";

import { Button, Input } from "../../components/FormComponents/FormComponents";

import api,{  } from "../../Services/Service"

const TipoEventos = () => {
  const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");

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

    } catch (error) {
      console.log("Deu ruim na api: ");
      console.log(error);
    }
  }

  function handleUpdate() {
    alert("Bora Atualizar")
  }

  return (
    <MainContent>
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
    </MainContent>
  );
};

export default TipoEventos;
