import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import Token from './Token.jsx'
import { WhiteButton } from './Button'
import { updateUserDiscount, updateUserAttempt } from '../../controllers/Users'
import { useUserAuth } from "../../contexts/UserAuthContext";


const TableStyled = styled.div`
  display: grid;
  grid-template-columns: 130px 130px;
  justify-content: center;
  justify-items: center;
  grid-gap: 30px 50px;
  margin: 2em 0;
  position: relative;
  & div:nth-of-type(3) {
    grid-column: span 2;
  }
  .in-game {
    text-align: center;
    text-transform: uppercase;
    font-size: .8em;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .results {
    text-align: center;
    h2 {
      text-transform: uppercase;
      font-size: 56px;
      margin: 10px;
    }
  }
  .line {
    display: ${({ playing }) => !playing ? 'block' : 'none'};
    height: 14px;
    background: white;
    position: absolute;
    width: 200px;
    top: 58px;
    &:before {
      content: '';
      height: 14px;
      background: white;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      transform: rotate(60deg);
      transform-origin: left top;
    }

    &:after {
      content: '';
      height: 14px;
      background: white;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      transform: rotate(-60deg);
      transform-origin: right top;
    }
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 300px 300px;
    ${({ playing, results }) => (playing && results) && 'grid-template-columns: 300px 110px 110px 300px;'}

    & div:nth-of-type(3) {
      ${({ playing, results }) => (playing && results) && 'grid-column: 2 / 4; grid-row: 1;'}
    }
    .line {
      width: 300px;
    }
    .results {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .in-game {
      font-size: 1.2em;
      display: flex;
      flex-direction: column;
      > div {
        order: 2;
      }
      > p {
        order: 1;
        margin-bottom: 2em;
      }
    }
  }
`
const elements = [
  'paper',
  'scissors',
  'rock',
]
const Table = () => {
  const { currentUser, setCurrentUser } = useUserAuth();
  const [results, setResults] = useState('')
  const [housePick, setHousePick] = useState('default')
  const [playing, setPlaying] = useState(false)
  const [pick, setPick] = useState('')
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function launchHousePick() {
    return new Promise((resolve, reject) => {
      let pick
      const interval = setInterval(() => {
        pick = elements[getRandomInt(0, 3)]
        setHousePick(pick)
      }, 75)
      setTimeout(() => {
        clearInterval(interval)
        resolve(pick)
      }, 2000)
    })
  }
  async function onClick(name) {
    setPlaying(true)
    setPick(name)
    const house = await launchHousePick()
    const results = playWithIA(name, house)
    setResults(results)
  }

  const handleUpdateUserDiscount = () => {
    updateUserDiscount(currentUser.uid, true)
    setCurrentUser({
      ...currentUser, discount: true
    })
  }

  const handleUpdateUserAttempt = () => {
    let nextAttempt = new Date()
    nextAttempt.setHours(nextAttempt.getHours() + 1)
    console.log(nextAttempt)

    updateUserAttempt(currentUser.uid, nextAttempt)
    setCurrentUser({
      ...currentUser, nextAttempt: nextAttempt
    })
  }

  function playWithIA(pick, housePick) {
    handleUpdateUserAttempt()
    if (housePick === pick) {
      return 'draw'
    }
    if (pick === 'paper') {
      if (housePick === 'scissors') {
        return 'lose'
      }
      if (housePick === 'rock') {
        handleUpdateUserDiscount()
        return 'win'
      }
    }
    if (pick === 'scissors') {
      if (housePick === 'paper') {
        handleUpdateUserDiscount()
        return 'win'
      }
      if (housePick === 'rock') {
        return 'lose'
      }
    }
    if (pick === 'rock') {
      if (housePick === 'paper') {
        return 'lose'
      }
      if (housePick === 'scissors') {
        handleUpdateUserDiscount()
        return 'win'
      }
    }
  }

  return (
    <TableStyled playing={playing} results={(results !== '')}>
      <span className="line"></span>
      {
        !playing ? (
          <>
            <Token name="paper" onClick={onClick} />
            <Token name="scissors" onClick={onClick} />
            <Token name="rock" onClick={onClick} />
          </>
        ) : (
          <>
            <div className="in-game">
              <Token playing={playing} name={pick} isShadowAnimated={(results === 'win')} />
              <p>Elegiste</p>
            </div>
            <div className="in-game">
              <Token playing={playing} name={housePick} isShadowAnimated={(results === 'lose')} />
              <p>Gamer Invasion eligió</p>
            </div>
            <div className="results">
              {
                results && (
                  <>
                    <h2>YOU {results}</h2>

                    <Link to="/carrito">
                      <WhiteButton>
                        {results === 'win' ? <span>Reclamar premio</span> : <span>Volver al carrito</span>}
                      </WhiteButton>
                    </Link>
                  </>
                )
              }
            </div>
          </>
        )
      }
    </TableStyled>
  )
}

export default Table
