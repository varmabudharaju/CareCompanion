import React from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header";

const HomePage = () => {
    return(
        <div>
            {/* <Container> <Header/></Container> */}

            <Header/>
            
            <h1>This is home Page</h1>

        </div>
        
    );
};

export default HomePage;