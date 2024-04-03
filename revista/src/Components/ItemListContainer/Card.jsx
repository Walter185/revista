import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  width: 55%;
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


function Card(props){
    const {id, description, imgUrl, name, price, category, pdf} = props.product;
    const [expandedImage, setExpandedImage] = useState(null);

    const openExpandedImage = (image) => {
        setExpandedImage(image);
      };
    
      const closeExpandedImage = () => {
        setExpandedImage(null);
      };
    
    return (
      <Section>

      <MachineContainer>
         <MachineCard>
             <MachineTitle>{name}</MachineTitle>

                <div onClick={() => openExpandedImage(imgUrl)}>
                    <img src={imgUrl} alt={name} />
                </div><br/>
                <MachineDescription>{description}</MachineDescription>
                <br />
                <FichaTecnicaButton to={pdf} target="_blank" rel="noreferrer"className="btn btn-outline-primary">Ver PDF</FichaTecnicaButton>
         </MachineCard>
      </MachineContainer>


<ModalContainer isOpen={expandedImage}>
  <ModalContent onClick={closeExpandedImage}>
    <img src={expandedImage} alt="Expanded" className="expanded-image" />
  </ModalContent>
</ModalContainer>
</Section>
    );
}

export default Card;