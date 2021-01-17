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
        <Head>
            <title>Spookymons!</title>
        </Head>
        <h1>Pokemon list</h1>
        {pokemonUrlList && pokemonUrlList.map(pokemon => (
            <figure key={pokemon.name} className={""}>

                <img className={""} src={pokemonData[pokemon.url] && pokemonData[pokemon.url].sprites.front_default} alt={pokemon.name} title={pokemon.name}></img>

                <div className={""}>

                    <blockquote>
                        <p className={"text-lg font-semibold"}>
                            “Tailwind CSS is the only framework that I've seen scale
                            on large teams. It’s easy to customize, adapts to any design,
                            and the build size is tiny.”
                        </p>
                    </blockquote>

                    <figcaption className={"font-medium"}>

                        <div className={"text-cyan-600"}>
                            {pokemon.name}
                        </div>

                        <div className={"text-gray-500"}>
                            <a href={pokemon.url}>{pokemon.url}</a>
                        </div>

                    </figcaption>

                </div>

            </figure>
        ))}
    </>
}
