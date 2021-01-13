import Head from 'next/head';
import react from 'react';

export default class Home extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    async componentDidMount() {
        const fetched = await fetch("//pokeapi.co/api/v2/pokemon?limit=100&offset=200")
        const json = await fetched.json()
        const data = [...json.results]
        console.dir({data: data})
        this.setState({
            ...this.state,
            items: data
        })
    }
    
    render() {
        return <react.Fragment>
            <div>
                <Head>
                    <title>Spookymons!</title>
                </Head>
                <h1>Pokemon list</h1>
                <ul>
                    {
                        !!this.state.items && this.state.items.length > 0 && this.state.items.map(item =>
                            <li key={item.name}><pre>{item.name}</pre></li>)
                    }
                </ul>
            </div>
        </react.Fragment>
    }
}