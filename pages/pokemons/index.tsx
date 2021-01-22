
import { HookCallbacks } from 'async_hooks';
// import Head from 'next/head'
// import Image from 'next/image'
import { useEffect, useState, useMemo, Fragment, useCallback, Dispatch } from 'react';
import Promise, { any } from 'bluebird'

process.env.ENVIORONNEMENT = 'STAGING'





const PokemonCard = ({ pokemonDataByUrl: pokemonData
    , pokemonWithNameAndUrl
    , pokemonUrl
    , pokemonName }) => {

    const { front_default } = pokemonData.props.sprites;


    console.table(front_default);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-tl-xl sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
            <div className="flex items-center space-x-3.5 sm:space-x-5 lg:space-x-3.5 xl:space-x-5">
                <img src={front_default} alt="" width="160" height="160" className="flex-none w-20 h-20 rounded-lg bg-gray-100" />
                <div className="min-w-0 flex-auto space-y-0.5">
                    <p className="text-lime-600 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase">
                        <abbr title="Episode">Ep.</abbr> 128
            </p>
                    <h2 className="text-black dark:text-white text-base sm:text-xl lg:text-base xl:text-xl font-semibold truncate">
                        Scaling CSS at Heroku with Utility Classes
            </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg lg:text-base xl:text-lg font-medium">
                        Full Stack Radio
            </p>
            </div>
            </div>

        </div>)
};

export default function Spookymons() {
    const [getAllPokemonWithNameAndUrls, setPokemonWithNameAndUrls]: [any, Dispatch<any>] = useState([] as any);
    const [getPokemonDataByUrl, setPokemonDataByUrl]: [any, Dispatch<any>] = useState([] as any);

    const addNewPokemon = (newData) => {
        return (setPokemonDataByUrl(oldPokemonDataByUrl => ({ ...oldPokemonDataByUrl, ...newData })))
            }

    const Pokemon = ({ pokemonDataByUrl, pokemonWithNameAndUrl, pokemonUrl }) => {

        return <figure key={pokemonUrl} className={""}>

                    {!!pokemonDataByUrl[pokemonUrl] ? <div className="backvoer">
                        <img className={""} src={[pokemonUrl] && pokemonDataByUrl[pokemonUrl].sprites.front_default} alt={pokemonWithNameAndUrl.name} title={pokemonWithNameAndUrl.name}></img>
                        <img className={""} src={pokemonDataByUrl[pokemonUrl] && pokemonDataByUrl[pokemonUrl].sprites.front_default} alt={pokemonWithNameAndUrl.name} title={pokemonWithNameAndUrl.name}></img>
                    </div> : <div>
                            Chargement ({pokemonWithNameAndUrl.name})
                </div>}

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
                                {pokemonWithNameAndUrl.name}
                </div>

                <div className={"text-gray-500"}>
                <a href={pokemonUrl}>{pokemonUrl}</a>
                </div>

                </figcaption>

                </div>

                </figure>

            }


    useEffect(() => {
        async () => {
            fetch("//pokeapi.co/api/v2/pokemon?limit=100&offset=0")
                .then(fetched => {
                    fetched.json()
                        .then(data => {
                            console.table(data.results.slice(0, 3))
                            setPokemonWithNameAndUrls(data.results)
                        })
                })
        }
    }, [])

    // useEffect(() => {



    //     console.table(getAllPokemonWithNameAndUrls)
    //     Promise.map(getAllPokemonWithNameAndUrls, (p: any | {}) => fetch(p.url))
    //         .then(async x => {
    //             console.warn("RESULAT %s", x)
    //             addNewPokemon()
    //         })





    // }, [getAllPokemonWithNameAndUrls])




    useEffect(() => {
        async () => {
            getAllPokemonWithNameAndUrls.map(async (result: any | {}) => {
                const url = result.url;
                const data = await fetch(url);
                console.table(data)
                addNewPokemon(data)
            })
        }
    }, [getAllPokemonWithNameAndUrls])



            return (<>
                <div>
                    <title>Spookymons!</title>
                    <h1>Pokemon list</h1>
                    <div>
                        {
                            getAllPokemonWithNameAndUrls.map(pokemonWithNameAndUrl =>
                                (<Pokemon pokemonWithNameAndUrl={getAllPokemonWithNameAndUrls.url} pokemonUrl={getAllPokemonWithNameAndUrls.url} pokemonDataByUrl={getPokemonDataByUrl} />)

                            )}
                        </div>
                        </div>

            </>
            )
                    }