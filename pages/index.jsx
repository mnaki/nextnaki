import Link from 'next/link';

export default function Home() {
    return <div>
        Hello world
         <ul>
            <li><Link href="/pokemons">See pokemons</Link></li>
         </ul>
    </div>
}