import React from "react";
import styled from "styled-components";
import Logo from "./../img/logo.svg";
import {Swiper, SwiperSlide} from "swiper/react"

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from "@material-ui/icons/Close";

// ======= Material UI Imports =======

// Cards
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
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

// Tamanho card
const useStyles = makeStyles({
  root: {
    width: 332,
  },
});

// ====== DIVS ======
const ExtDiv = styled.div`
  display: flex;

  @media (min-width: 600px) {
    justify-content: center;
  }
`;

const IntDiv = styled.div`
  height: 99.4vh;
  border: 2px solid rgba(190, 190, 190, 0.6);
  width: 100%;

  @media (min-width: 600px) {
    width: 40vw;
  }
`;

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
  margin-left: 3em;
`;

const ProfileDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const ButtonDiv = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-evenly;
`;

// IMG
const ImgProfile = styled.img`
  width: 90%;
  height: 20rem;
  border-radius: 5px;
  box-shadow: 0px 23px 60px 0px rgba(0, 0, 0, 0.3);

  @media (min-width: 600px) {
    width: 60%;
  }
`;

function UsersScreen(props) {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0)
  const onSwiped = () => {
    setIndex(index + 1)
  }

  return (
    <ExtDiv>
      <IntDiv>
        <ThemeProvider theme={theme}>
          {/* Navegação */}
          <NavDiv>
            <img src={Logo} />
            <IconDiv>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={props.onClickMatches}
              >
                Matches
              </Button>
            </IconDiv>
          </NavDiv>
          {props.profile === null && (
            <p>
              <LinearProgress />
            </p>
          )}
          {/* Div Progile */}
          {props.profile !== null && (
            <ProfileDiv>
              {/* IMG Profile */}
              <Swiper
              cards={props.profile}
              cardIndex={index}
              >
                
              </Swiper>
              <ImgProfile src={props.profile.photo} />

              {/* Card com Infos */}
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {props.profile.name}, {props.profile.age}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {props.profile.bio}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ProfileDiv>
          )}
          {/* End Div Profile */}
          {props.profile !== null && (
            <ButtonDiv>
              <Fab
                onClick={() => props.onClickChoice(false)}
                color="primary"
                aria-label="add"
              >
                <CloseIcon />
              </Fab>
              <Fab
                onClick={() => props.onClickChoice(true)}
                color="secondary"
                aria-label="add"
              >
                <FavoriteIcon />
              </Fab>
            </ButtonDiv>
          )}

        </ThemeProvider>
      </IntDiv>
    </ExtDiv>
  );
}

export default UsersScreen;
