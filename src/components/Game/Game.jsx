
import React, { createContext, useState } from 'react';
import Header from './Header'
import styled from 'styled-components'
import Wrapper from './Wrapper'
import Table from './Table'
import Rules from './Rules'
import { useUserAuth } from "../../contexts/UserAuthContext";

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
    const { currentUser } = useUserAuth();

    const getDate = () => {
        var date = currentUser?.nextAttempt
        var dateStr =
            ("00" + date.getDate()).slice(-2) + "/" +
            ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2)
        return dateStr
    }

    const enableToPlay = () => {
        if (!currentUser) {
            return false
        }
        const currentTime = new Date();
        const nextAttempt = currentUser?.nextAttempt

        if (nextAttempt < currentTime) {
            return true
        }
        return false
    }
    return (
        <AppStyled>
            <Wrapper>
                {enableToPlay() ?
                    <div className="game-content">
                        <Header />
                        <Table />
                        <Rules />
                    </div> : 
                     <div
                     style={{
                       margin: "auto",
                       color: "yellow",
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                       fontWeight: "bold",
                       fontSize: "1em",
                       textAlign: "center",
                       marginTop: "5em"
                     }}
                   >
                     <span>No puedes optar por el descuento. Inicia sesión o espera a tu próximo intento.</span>
                   </div>
                }
            </Wrapper>
        </AppStyled>
    );
}

export default Game;