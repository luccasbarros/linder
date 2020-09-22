import React from "react";
import styled from "styled-components";
import Logo from "./../img/logo.svg";
// Axios
import axios from "axios";

// Hooks
import { useState, useEffect } from "react";

// Icons
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

// ======= Material UI Imports =======

import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// Tema pras cores
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F50057",
    },
    secondary: {
      main: "#41C700",
    },
  },
});


const ExtDiv = styled.div`

  @media (min-width: 600px) {
    display:flex;
    justify-content: center;
  }
`;
const IntDiv = styled.div`
  min-height: 99.4vh;
  width: 100%;
  border: 2px solid rgba(190, 190, 190, 0.6);
  @media (min-width: 600px) {
    width: 40vw;
  }
`;

const DivClearButton = styled.div`
display: flex;
justify-content: center;
margin-top: 2rem;
`

const MatchDiv = styled.div`
display: flex;
max-width: 60vw;
margin: 1rem 2rem;
border-bottom: 2px solid rgba(190, 190, 190, 0.6);
`

const ParaMatch = styled.p`
margin-left: 1rem;
`

const NavDiv = styled.div`
  display: flex;
  border-bottom: 2px solid rgba(255, 0, 0, 0.3);
  height: 10vh;
  align-items: center;
  justify-content: space-around;
  @media (min-width: 600px) {
    justify-content: center;
    width: 40vw;
  }
`;

const IconDiv = styled.div`
  padding: 2px;
  margin-right: 3em;
`;

function MatchScreen(props) {

  useEffect(() => {
    props.getMatches();
  }, []);

  
  return (
    <ExtDiv>
      <IntDiv>
        <ThemeProvider theme={theme}>
          <NavDiv>
            <IconDiv>
              <Button
                startIcon={<KeyboardBackspaceIcon />}
                variant="contained"
                size="small"
                color="primary"
                onClick={props.onClickBack}
              >
                Voltar
              </Button>
              
            </IconDiv>
            <img src={Logo} />
          </NavDiv>
          {props.match === null && <p><LinearProgress/></p>}
          {props.match !== null && props.match.map((match) => {
            return <MatchDiv key={match.id}><Avatar alt={match.name} src={match.photo}/> <ParaMatch>{match.name}</ParaMatch></MatchDiv>;
          })}
          {props.match !== null && <DivClearButton><Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={props.deleteButton}
              >
                Limpar Matches
              </Button></DivClearButton>}
            
        </ThemeProvider>
        
      </IntDiv>
    </ExtDiv>
  );
}

export default MatchScreen;
