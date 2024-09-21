import { useState, useEffect } from 'react';
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { getRevistas } from '../../Firebase/firebase.js';

const Section = styled.section`
  padding-top: 10px;
  // margin-top: 30px;
  // background-color: #343a40;
  `;

const Title = styled.h4`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 30px;
  `;

const MachineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: transparent;
  `;

const MachineCard = styled.div`
  position: relative;
  width: 17%;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 40px;
  background: var(--chakra-colors-chakra-body-bg);
  color: var(--chakra-colors-chakra-body-text);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  &&:hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }
    @media only screen and (max-width: 800px){
      font-size:medium;
      width: 100%;
      }
`;

const MachineTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 5px;
  @media only screen and (max-width: 800px){
  font-size:medium;
  }
`;

const MachineDescription = styled.h5`
  margin-top: 10px;
  @media only screen and (max-width: 800px){
    font-size:medium;
    }
`;

const ModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FichaTecnicaButton = styled(Link)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export default function Revistas() {
  const [expandedImage, setExpandedImage] = useState(null);
  const [revistas, setRevistas] = useState([]);

  useEffect(() => {
    const fetchRevistas = async () => {
      const revistasData = await getRevistas();
      setRevistas(revistasData);
    };

    fetchRevistas();
  }, []);

  const openExpandedImage = (image) => {
    setExpandedImage(image);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };
  return (
    <Section>
      <Title style={{ color: "#78909c" }}>
        <h1><b>Revistas</b></h1>
      </Title><hr></hr>

      <MachineContainer>
        {revistas.map((revista) => (
          <MachineCard key={revista.id} >
            <MachineTitle>{revista.name}</MachineTitle>

            <Carousel
              showArrows={true}
              autoPlay={true}
              showThumbs={false}
              infiniteLoop={true}
            >
              <div onClick={() => openExpandedImage(revista.imgUrl)}>
                <img src={revista.imgUrl} alt={revista.name} />
              </div>
          
            </Carousel>
            {/* <MachineDescription>{revista.description}</MachineDescription> */}
            <br /><br />
            <FichaTecnicaButton to={`/PDFViewer/${revista.id}`} className="btn btn-outline-primary">Ver Revista</FichaTecnicaButton>
            {/* <FichaTecnicaButton to={revista.pdf} target="_blank" rel="noreferrer"className="btn btn-outline-primary">Ver PDF</FichaTecnicaButton> */}
          </MachineCard>
        ))}

      </MachineContainer>


      <ModalContainer isOpen={expandedImage}>
        <ModalContent onClick={closeExpandedImage}>
          <img src={expandedImage} alt="Expanded" className="expanded-image" />
        </ModalContent>
      </ModalContainer>
    </Section>
  );
};


