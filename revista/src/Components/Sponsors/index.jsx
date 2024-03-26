import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import { getSponsors } from "../../Firebase/firebase";

const Img = styled.img`
width: 100%;
max-height: 350px;
object-fit: fill;
`;

const Section = styled.section`
  padding-top: 10px;
  // margin-top: 30px;
  background-color: #343a40;
  padding-bottom: 60px;

  `;

  const Title = styled.h4`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 30px;
  `;

  const Contenedor = styled.div`
  position: relative;
  margin: 50px auto 20px auto;
  width: 600px;
  height: 300px;
  `;

export default function CarrouselPrincipal() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const sponsorsData = await getSponsors();
      setSponsors(sponsorsData);
    };

    fetchSponsors();
  }, []);

  return (
    <Section>
      <Title style={{ color: "#78909c" }}>
          <h1><b>Sponsors</b></h1>
      </Title><hr></hr>
      <Contenedor>

      <Carousel
        showArrows={true}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        className="carousel-container"
        >
        {sponsors.map((sponsor, index) => (
          <div key={index}>
            <Img src={sponsor.imgUrl} alt={sponsor.name} />
          </div>
        ))}
      </Carousel>
        </Contenedor>
    </Section>
  );
}
