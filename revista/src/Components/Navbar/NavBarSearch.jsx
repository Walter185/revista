import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Form = styled.form`
    width: 50%;
    height: 40px;
    display:flex;
    margin-left:20px;
`;

export default function NavBarSearch(){
    const [userInput, setUserInput] = useState("");
    const navigateTo = useNavigate();

    function handleChange(evt){
        setUserInput(evt.target.value);
    }

    function handleSubmit(evt){
        evt.preventDefault();
        navigateTo(`/search/${userInput}`);
    }

    return(
        <Form className="opacity-75" role="search" onSubmit={handleSubmit}>
            <input 
                className="form-control rounded-pill" 
                type="search" 
                name="userInput" 
                value={userInput} 
                placeholder="search" 
                onChange={handleChange}/>
        </Form>
    );
}