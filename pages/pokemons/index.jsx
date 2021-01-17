import Head from 'next/head';
import { useEffect, useState } from 'react';


export default function Spookymons() {
    const [pokemonUrlList, setPokemonList] = useState([]);
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoaded, setLoaded] = useState(false) // TODO


    useEffect(() => {
        fetch("//pokeapi.co/api/v2/pokemon?limit=100&offset=200").then(fetched => {
            fetched.json().then(data => {
                console.table(data.results.slice(0, 4))
                setPokemonList(data.results)
            })
        })
    }, [])

    useEffect(async () => {
        const result = await pokemonUrlList.map(async pokemonUrlList => ({
            [pokemonUrlList.url]: (
                await (await fetch(pokemonUrlList.url)).json()
            )
        }))
        console.log({ result })
        setPokemonData(await Promise.allSettled(result))
    }, [pokemonUrlList])


    return <>
        <div>
            <pre>{JSON.stringify(pokemonData, false, 2)}</pre>
            <Head>
                <title>Spookymons!</title>
            </Head>
            <h1>Pokemon list</h1>
            {pokemonUrlList && pokemonUrlList.map(pokemon => <div key={pokemon.name}>
                <h2>{pokemon.name}</h2>
                <h3>{pokemon.url}</h3>
            </div>)}
            {/* <pre>{JSON.stringify(pokemonList, false, 2)}</pre> */}
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