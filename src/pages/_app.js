import '../styles/globals.css';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress color='#21b6b7' />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
