import { useEffect, useState, type CSSProperties } from 'react'
import './App.css'
import header from './assets/header.png'
import  axios from 'axios'
import { type AxiosResponse } from 'axios'
import { BeatLoader } from "react-spinners";
import { PokemonResult } from './models/Pokemon';
import { PokemonListResponse } from './models/AllPokemonResult';

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(null)
  const [currentPokemon, setCurrentPokemon] = useState<PokemonResult | null>(null)
  const [show, toggleShow] = useState(false)
  const [loading, toggleLoading] = useState(true)

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#646cffaa",
  }

  const getAllPokemon = () => {
    const randomOffset = getRandomInt(1, 20);
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${randomOffset}`)
      .then((res: AxiosResponse<PokemonListResponse>) => {
        setPokemonList(res.data)
      })
  }

  const getRandomInt = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min) + min)
  }

  const getPokemon = () => {
    const randomPokemon = pokemonList?.results[Math.floor(Math.random() * pokemonList?.results?.length)]

    if (!randomPokemon)
      return

    axios.get(randomPokemon?.url)
      .then((res: AxiosResponse<PokemonResult>) => {
        setCurrentPokemon(res.data)
      })
      .finally(() => { toggleLoading(false) })
  }
  
  useEffect(() => {
    getAllPokemon()
  }, [])

  useEffect(() => {
    if (pokemonList)
      getPokemon()
  }, [pokemonList])

  useEffect(() => {
    if (show && currentPokemon) {
      const audio = new Audio(currentPokemon.cries.latest)
      audio.play()
    }
  }, [show])

  return (
    <>
      <div>
        <img src={header} className="logo" alt="Vite logo" onClick={() => toggleShow(!show)} />
      </div>
      <div className='wrapper'>
        { loading ? (
          <BeatLoader
              color="#646cffaa"
              loading={loading}
              cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
        ) : (
        <>
          <img 
            className={`pokemon-img ${!show ? "black-out" : "reveal"}`} 
            src={currentPokemon?.sprites.front_default ?? undefined}>
          </img>
          <p>{ show && currentPokemon?.name }</p>
        </>
        )}
      </div>
      <div className="card">
        <button onClick={() => { toggleLoading(true), toggleShow(false), getPokemon()}}>
          New Pokemon
        </button>
      </div>
      <p className="read-the-docs">
        Project built by <a href="https://github.com/andrewrady">Andrew Rady</a>
      </p>
    </>
  )
}

export default App