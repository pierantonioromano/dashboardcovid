import 'tailwindcss/tailwind.css'
import '../utilities/styles.css'

import dynamic from 'next/dynamic';
//import "nprogress/nprogress.css";

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false },
);

function MyApp({ Component, pageProps }) {
	return (
		<>
			<TopProgressBar />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp