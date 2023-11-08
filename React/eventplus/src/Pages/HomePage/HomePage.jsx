import React from "react";
import "./HomePage.css";
import MainContent from "../../components/MainContent/MainContent";
import Banner from "../../components/Banner/Banner";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";

const HomePage = () => {
  return (
    <MainContent>
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"}/>

          <div className="events-box">
            <NextEvent
              title={"Happy Hour Event"}
              drescription={"Evento Legal"}
              eventDate={"14/11/2023"}
              idEvento={"d41b6eb0-e29d-494f-8b38-ac9c3ee48861"}
            />
            
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
