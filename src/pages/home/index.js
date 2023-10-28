import React, { useState } from "react";
import ToggleSwitch from "../../components/ToggleSwitch";
import ButtonGroup from "../../components/ButtonGroup";
import logo from "../../logo.svg";
import Navigator from "../../components/Navigator";

const Home = () => {
  const [isToggled, setIsToggled] = useState(false);

  const buttons = [
    { id: 1, label: "Button 1" },
    { id: 2, label: "Button 2" },
    { id: 3, label: "Button 3" },
  ];

  return (
    <div className="home">
      <img src={logo} alt="logo" />
      <h2>Tipo de jogo</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <p>vs Jogador</p>
        <ToggleSwitch isToggled={isToggled} setIsToggled={setIsToggled} />
        <p>vs Bot</p>
      </div>
      <h2>Nome dos jogadores</h2>
      <input placeholder="Jogador 1" />
      <input placeholder="Jogador 2" />
      <h2>Tamanho do tabuleiro</h2>
      <ButtonGroup buttons={buttons} />
      <Navigator to="/play" label="Começar partida" />
      <Navigator to="/historic" label="Histórico de partidas" />
    </div>
  );
};

export default Home;
