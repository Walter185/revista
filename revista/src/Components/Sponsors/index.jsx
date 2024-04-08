import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Slider from "react-slick";
import { getSponsors } from "../../Firebase/firebase";

const ImageContainer = styled.div`
  width: 100%;
  padding: 5px;
  height: 300px; /* Altura fija para todas las imágenes */
  @media screen and (max-width: 1000px) {
    height: 200px;
  }  @media screen and (max-width: 600px) {
    height: 100px;
  }
  

`;
const Img = styled.img`
  width: auto;
  height: 100%;
  object-fit: fill; /* Para mantener la relación de aspecto y cubrir todo el contenedor */
`;

const Section = styled.section`
  padding-top: 1px;
  width: 100%;
  // background-color: #343a40;
`;

const Title = styled.h4`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 30px;
`;

const Contenedor = styled.div`
  position: relative;
  margin: 50px auto 30px auto;
  height: auto;
  width: 95%;

  @media screen and (max-width: 1000px) {
    width: 75%;
  }
  @media screen and (max-width: 600px) {
    width: 80%;
  }
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    arrows: true,
  };

  return (
    <Section>
      <Title style={{ color: "#78909c" }}>
        <h1>
          <b>Sponsors</b>
        </h1>
      </Title>
      <hr></hr>
      <Contenedor>
        <Slider {...settings}>
          {sponsors.map((sponsor, index) => (
            <ImageContainer key={index}>
              <Img src={sponsor.imgUrl} alt={sponsor.name} />
            </ImageContainer>
          ))}
        </Slider>
      </Contenedor>
    </Section>
  );
}
