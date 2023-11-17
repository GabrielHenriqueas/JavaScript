import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import "./TipoEventos.css";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/tipo-evento.svg";
import Container from "../../components/Container/Container";
import TableTp from "./TableTp/TableTp";

import { Button, Input } from "../../components/FormComponents/FormComponents";

import api from "../../Services/Service";

import Notification from "../../components/Notification/Notification"

const TipoEventos = () => {
  //satate do componente Notification
  const [notifyUser, setNotifyUser] = ({});

  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [tipoEventos, setTipoEventos] = useState([
    // {"idTipoEvento": "123", "titulo": "Evento ABC"},
    // {"idTipoEvento": "555", "titulo": "Evento xpto"},
    // {"idTipoEvento": "444", "titulo": "Evento de JavaScript"}
  ]); //array mocado

  useEffect(() => {
    async function getTipoEventos() {
      try {
        const promise = await api.get("/TiposEvento");

        console.log(promise.data);
        setTipoEventos(promise.data);
      } catch (error) {
        alert("Deu ruim na API!");
      }
    }
    getTipoEventos();
    console.log("A TIPO EVENTOS FOI MONTADA!");
  }, []);



  async function handleSubmit(e) {
    // parar o submit do formulário
    e.preventDefault();
    // validar pelo menos 3 caracteres
    if (titulo.trim().length < 3) {
      alert("O Título deve ter no mínimo 3 caracteres");
      return;
    }
    // chamar a api
    try {
      const retorno = await api.post("/TiposEvento", { titulo: titulo });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      const retornoGet = await api.get(`/TiposEvento`);
      setTipoEventos(retornoGet.data);
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
    alert("Mostrando a tela de update");
  }

  async function handleUpdate(id) {
    try {
      const promise = await api.update(`/TiposEvento/${id}`);
      console.log(promise.data);

    } catch (error) {
      alert("Deu ruim na API!");
    }
  }

  function editActionAbort() {
    alert("Cancelar a tela de edição de dados");
  }

  async function handleDelete(id) {
    try {
      const promise = await api.delete(`/TiposEvento/${id}`);
      const retornoGet = await api.get(`/TiposEvento`);
      console.log(promise.data);
      setTipoEventos(retornoGet.data);

    } catch (error) {
      alert("Deu ruim na API!");
    }
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
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
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  {/* Cadastrar */}
                  <Input
                    type={"text"}
                    id={"titulo"}
                    name={"titulo"}
                    placeholder={"Título"}
                    required={"required"}
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />
                  {/* <span>{titulo}</span> */}
                  <Button
                    type={"submit"}
                    id={"cadastrar"}
                    name={"cadastrar"}
                    textButton={"Cadastrar"}
                  />
                </>
              ) : (
                {
                  /* Atualizar */
                }(<>Tela de Edição</>)
              )}
            </form>
          </div>
        </Container>
      </section>

      {/* Listagem de tipo eventos */}
      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista Tipo Eventos"} color="white" />

          <TableTp
            dados={tipoEventos}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEventos;
