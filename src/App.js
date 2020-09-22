import React from "react";
import { useState } from "react";
import UsersScreen from "./components/UsersScreen";
import MatchScreen from "./components/MatchScreen";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [profile, setProfile] = useState(null);
  const [match, setMatch] = useState(null);

  // Atualizando os perfis
  useEffect(() => {
    getProfile();
  }, []);

  const getMatches = () => {
    const request = axios.get(
      "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/luccas/matches"
    );

    request
      .then((response) => {
        console.log("Deu certo", response.data.matches);
        setMatch(response.data.matches);
      })
      .catch((err) => {
        console.log("Deu merda", err);
      });
  };
  // pegando perfil
  const getProfile = () => {
    axios
      .get(
        "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/luccas/person"
      )
      .then((response) => {
        console.log(response.data);
        console.log("Deu o get!");
        setProfile(response.data.profile);
      })
      .catch((err) => {
        console.log(err);
        console.log("Deu o erro!");
      });
  };

  // função que vai no button pra escolher
  const choosePerson = (choice) => {
    const body = {
      id: profile.id,
      choice: choice,
    };
    const request = axios.post(
      "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/luccas/choose-person",
      body
    );

    request
      .then((response) => {
        console.log("Deu certo!", response.data);
        getProfile();
      })
      .catch((err) => {
        console.log("Deu ruim", err);
      });
  };

  // limpar matches
  const clearMatches = () => {
    const body = {
      id: profile.id,
    };
    const request = axios.put(
      "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/luccas/clear",
      body
    );

    request
      .then((response) => {
        console.log("Apagou", response.data);
        getMatches()
      })
      .catch((err) => {
        console.log("Deu ruim", err);
      });
  };

  //  onClicks da página
  const onClickMatches = () => {
    setCurrentPage("matches");
  };

  const onClickBack = () => {
    setCurrentPage("home");
  };

  const renderize = () => {
    if (currentPage === "home") {
      return (
        <UsersScreen
          onClickMatches={onClickMatches}
          onClickChoice={choosePerson}
          profile={profile}
          deleteButton={clearMatches}
        />
      );
    } else if (currentPage === "matches") {
      return <MatchScreen onClickBack={onClickBack} deleteButton={clearMatches} match={match} getMatches={getMatches}/>;
    }
  };

  return <div>{renderize()}</div>;
}

export default App;
