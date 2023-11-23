import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import "./EventosPage.css";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventImage from "../../assets/images/evento.svg";
import Container from "../../components/Container/Container";
import TableEv from "./TableEv/TableEv";

import {
  Button,
  Input,
  Select,
} from "../../components/FormComponents/FormComponents";

import api from "../../Services/Service";

import Notification from "../../components/Notification/Notification";

import Spinner from "../../components/Spinner/Spinner";

const EventosPage = () => {
  //satate do componente Notification
  const [notifyUser, setNotifyUser] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);

  const [frmEdit, setFrmEdit] = useState(false);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [data, setData] = useState("");
  const [instituicao, setInstituicao] = useState("923fb695-5e20-4bbd-a7d5-01bf54d2096b");

  const [titulo, setTitulo] = useState("");
  const [idEvento, setIdEvento] = useState(null); //usar apenas para a edição

  const [tipoEventos, setTipoEventos] = useState([
    // {"idTipoEvento": "123", "titulo": "Evento ABC"},
    // {"idTipoEvento": "555", "titulo": "Evento xpto"},
    // {"idTipoEvento": "444", "titulo": "Evento de JavaScript"}
  ]); //array mocado

  const [eventos, setEventos] = useState([
    // {"idTipoEvento": "123", "titulo": "Evento ABC"},
    // {"idTipoEvento": "555", "titulo": "Evento xpto"},
    // {"idTipoEvento": "444", "titulo": "Evento de JavaScript"}
  ]); //array mocado

  useEffect(() => {
    async function getEventos() {
      try {
        const promise = await api.get("/Evento");

        console.log(promise.data);
        setEventos(promise.data);
      } catch (error) {
        alert("Deu ruim na API!");
      }
    }
    getEventos();
    console.log("A PÁGINA EVENTOS FOI MONTADA!");
  }, []);

  async function handleSubmit(e) {
    setShowSpinner(true);
    // parar o submit do formulário
    e.preventDefault();
    // validar pelo menos 3 caracteres
    if (nome.trim().length < 3) {
      alert("O Título deve ter no mínimo 3 caracteres");
      return;
    }
    // chamar a api
    try {
      const retorno = await api.post("/Evento", {
        nomeEvento: nome,
        descricao: descricao,
        idTipoEvento: tipoEvento,
        dataEvento: data,
        idInstituicao: instituicao,
      });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      const retornoGet = await api.get(`/Evento`);
      setEventos(retornoGet.data);
      console.log("CADASTRO COM SUCESSO!");
      console.log(retorno.data);
      setTitulo(""); //limpa a variável
      setNome(""); //limpa a variável
      setDescricao(""); //limpa a variável
      setTipoEvento(""); //limpa a variável
      setData(""); //limpa a variável
    } catch (error) {
      console.log("Deu ruim na api: ");
      console.log(error);
    }
    setShowSpinner(false);
  }
  /****************** EDITAR CADASTRO ******************/

  async function showUpdateForm(idElemento) {
    setFrmEdit(true);

    try {
      // fazer um getById para pegar os dados
      const retorno = await api.get(`/Evento/${idElemento}`);

      // preencher o título e o id no state

      setTitulo(retorno.data.titulo);
      setNome(retorno.data.nomeEvento);
      setDescricao(retorno.data.descricao);
      setIdEvento(retorno.data.idTipoEvento);
      setData(retorno.data.dataEvento);
    } catch (error) {
      alert("Não foi possível mostrar a tela de edição, tente novamente!");
    }
  }

  async function handleUpdate(e) {
    try {
      e.preventDefault();

      // salvar os dados
      const retorno = await api.put(`/Evento/${idEvento}`, {
        idInstituicao: instituicao,
        nomeEvento: nome,
        descricao: descricao,
        dataEvento: data,
        idTipoEvento: tipoEvento,
      });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Atualizado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      // atualizar o state (apiGet)
      const retornoGet = await api.get(`/Evento`);
      setEventos(retornoGet.data); // atualiza o state da tabela
      // limpar o state do título e do idEvento
      editActionAbort();
    } catch (error) {
      alert("Problemas na atualização. Verifique a conexão com a internet!");
    }
  }

  // reseta o state e cancela a tela de edição
  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setIdEvento(null);
    setNome("");
    setDescricao("");
    setTipoEvento("");
    setData("");
  }

  async function handleDelete(id) {
    try {
      const promise = await api.delete(`/Evento/${id}`);

      const retornoGet = await api.get(`/Evento`);
      console.log(promise.data);
      setEventos(retornoGet.data);
    } catch (error) {
      alert("Deu ruim na API!");
    }
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      {/* <Spinner /> */}

      {/* spinner loading condicional */}
      {showSpinner ? <Spinner /> : null}

      {/* Cadastro de tipo eventos */}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Página Eventos"} />
            <ImageIllustrator alterText={"?????"} imageRender={eventImage} />

            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  {/* Cadastrar */}
                  <Input
                    type={"text"}
                    id={"nome"}
                    name={"nome"}
                    placeholder={"Nome"}
                    required={"required"}
                    value={nome}
                    manipulationFunction={(e) => {
                      setNome(e.target.value);
                    }}
                  />

                  <Input
                    type={"text"}
                    id={"descricao"}
                    name={"descricao"}
                    placeholder={"Descrição"}
                    required={"required"}
                    value={descricao}
                    manipulationFunction={(e) => {
                      setDescricao(e.target.value);
                    }}
                  />

                  <Select
                    type={"text"}
                    id={"tipoEvento"}
                    name={"tipoEvento"}
                    placeholder={"Tipo Evento"}
                    required={"required"}
                    value={tipoEvento}
                    manipulationFunction={(e) => {
                      setTipoEvento(e.target.value);
                    }}
                  />

                  <Input
                    type={"date"}
                    id={"data"}
                    name={"data"}
                    required={"required"}
                    value={data}
                    manipulationFunction={(e) => {
                      setData(e.target.value);
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
                <>
                  {/* Editar */}

                  <Input
                    type={"text"}
                    id={"nome"}
                    name={"nome"}
                    placeholder={"Nome"}
                    required={"required"}
                    value={nome}
                    manipulationFunction={(e) => {
                      setNome(e.target.value);
                    }}
                  />

                  <Input
                    type={"text"}
                    id={"descricao"}
                    name={"descricao"}
                    placeholder={"Descrição"}
                    required={"required"}
                    value={descricao}
                    manipulationFunction={(e) => {
                      setDescricao(e.target.value);
                    }}
                  />

                  <Select
                    type={"text"}
                    id={"tipoEvento"}
                    name={"tipoEvento"}
                    placeholder={"Tipo Evento"}
                    required={"required"}
                    value={tipoEvento}
                    manipulationFunction={(e) => {
                      setTipoEvento(e.target.value);
                    }}
                  />

                  <Input
                    type={"date"}
                    id={"data"}
                    name={"data"}
                    required={"required"}
                    value={data}
                    manipulationFunction={(e) => {
                      setData(e.target.value);
                    }}
                  />

                  <div className="buttons-editbox">
                    <Button
                      textButton="Atualizar"
                      id="atualizar"
                      name="atualizar"
                      type="submit"
                      additionalClass="button-component--middle"
                    />

                    <Button
                      textButton="Cancelar"
                      id="cancelar"
                      name="cancelar"
                      type="button"
                      manipulationFunction={editActionAbort}
                      additionalClass="button-component--middle"
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>

      {/* Listagem de tipo eventos */}
      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista Eventos"} color="white" />

          <TableEv
            dados={eventos}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default EventosPage;
