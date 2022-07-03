import React from 'react'
import styled from 'styled-components'

const HeaderStyled = styled.div`
  color: cyan;
  padding: 12px 12px 12px 23px;
  border-radius: .5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'EvilEmpire';
  letter-spacing: 5px;
  
  
  border: 3px solid rgba(255, 255,255, .29);
  h1 {
    font-size: 18px;
    line-height: 16px;
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
  }
  @media screen and (min-width: 768px) {
    padding: 24px;
    h1 {
      font-size: 36px;
      line-height: .9;
    }
  }
`

const Header = () => {
  return (
    <HeaderStyled>
      <h1 style={{margin: "auto"}}> 
        Piedra Papel Tijera
      </h1>

    </HeaderStyled>
  )
}

export default Header
