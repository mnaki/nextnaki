import Head from 'next/head';
import { useEffect, useState } from 'react';


export default function Spookymons() {
    const [pokemonUrlList, setPokemonUrlList] = useState([]);
    const [pokemonData, setPokemonData] = useState([]);
    const addPokemonData = (newData) => {
        return setPokemonData(pokemonData => ({ ...pokemonData, ...newData }))
    }
    const [isLoaded, setLoaded] = useState(false) // TODO


    useEffect(() => {
        fetch("//pokeapi.co/api/v2/pokemon?limit=10&offset=0").then(fetched => {
            fetched.json().then(data => {
                console.table(data.results.slice(0, 4))
                setPokemonUrlList(data.results)
            })
        })
    }, [])

    useEffect(async () => {
        const result = pokemonUrlList.map(async pokemonUrlList => ({
            [pokemonUrlList.url]: (
                await (await fetch(pokemonUrlList.url)).json()
            )
        }))
        console.log({ result })
        const fe = result.map(async (result) => {
            const data = await result
            console.dir({ data })
            addPokemonData(data)
            return data
        })
        console.table(fe)
        setPokemonUrlList(pokemonUrlList)
    }, [pokemonUrlList])


    return <>
        <div>
            {/* <pre>{JSON.stringify(pokemonData, false, 2)}</pre> */}
            <Head>
                <title>Spookymons!</title>
            </Head>
            <h1>Pokemon list</h1>
            {pokemonUrlList && pokemonUrlList.map(pokemon => <div key={pokemon.name}>
                <h2>{pokemon.name}</h2>
                <h3>{pokemon.url}</h3>
                <div><img src={pokemonData[pokemon.url] && pokemonData[pokemon.url].sprites.front_default} alt="" /></div>
            </div>)}
        </div>
    </>
}

// const getPokemonData = ({ pokemonUrl }) => {
//     const [pokemonData, setPokemonData] = useState({});

//     useEffect(() => {
//         fetch(pokemonUrl).then(fetched => {
//             fetched.json().then(data => {
//                 console.table(data.results.slice(0, 4))
//                 setPokemonData(data.results)
//             })
//         })
//     }, [])

//     return <>
//         <pre>{JSON.stringify(pokemonData, false, 2)}</pre>
//     </>
// }