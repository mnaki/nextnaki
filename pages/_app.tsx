import '../styles/globals.css'

import Cors from 'cors'
// import initMiddleware from '../../lib/init-middleware'

// Initialize the cors middleware
// const cors = initMiddleware(
//     // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
//     Cors({
//         // Only allow requests with GET, POST and OPTIONS
//         methods: ['GET', 'POST', 'OPTIONS'],
//     })
// )

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp