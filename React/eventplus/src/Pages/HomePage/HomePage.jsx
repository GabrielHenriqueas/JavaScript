import React, { useEffect, useState } from "react";
import "./HomePage.css";
import MainContent from "../../components/MainContent/MainContent";
import Banner from "../../components/Banner/Banner";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";

const HomePage = () => {

  //fake mock - api mocada
  const [nextEvents, setNextEvents] = useState([
    {
      id: 1,
      title: "Evento X",
      descricao: "Evento de SQL Server",
      data: "10/11/2023",
    },
    {
      id: 2,
      title: "Evento Y",
      descricao: "Bora Codar JS",
      data: "11/11/2023",
    },
  ]);

  return (
    <MainContent>
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <NextEvent
                  title={e.title}
                  drescription={e.descricao}
                  eventDate={e.data}
                  idEvento={e.id}
                />
              );
            })}

          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
