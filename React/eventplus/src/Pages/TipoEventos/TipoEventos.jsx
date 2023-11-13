import React from "react";
import Title from "../../components/Title/Title";
import "./TipoEventos.css";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/tipo-evento.svg";
import Container from "../../components/Container/Container";

import { Input } from "../../components/FormComponents/FormComponents";

const TipoEventos = () => {
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

            <form onSubmit={frmEdit ? handleUpdate : handleSubmit}>
              <p>Componente de Formulário </p>
              <Input
                type={"text"}
                required={"required"}
              />
            </form>
          </div>
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEventos;
