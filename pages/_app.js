import '../styles/globals.css'
import Layout from '../component/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout/>
      <Component {...pageProps} />
    </>
  )
  
}

export default MyApp
