
import React, { createContext, useState } from 'react';
import Header from './Header'
import styled from 'styled-components'
import Wrapper from './Wrapper'
import Table from './Table'
import Rules from './Rules'
import { useUserAuth } from "../../contexts/UserAuthContext";
import { WhiteButton } from './Button'
import { Link } from "react-router-dom"


const AppStyled = styled.main`
  
  color: white;
  font-family: 'Barlow Semi Condensed', sans-serif;

  .game-content {
    padding: 2em;
    min-height: 100vh;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
  }
`
const Game = () => {
    
    return (
        <AppStyled>
            <Wrapper>
                <div className="game-content">
                    <Header />
                    <Table />
                    <Rules />
                </div>
            </Wrapper>
        </AppStyled>
    );
}

export default Game;