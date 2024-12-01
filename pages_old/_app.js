import "tailwindcss/tailwind.css"
import "../styles/styles.css"
import dynamic from "next/dynamic"

const TopProgressBar = dynamic(
	() => {
		return import("../src/components/TopProgressBar")
	},
	{ ssr: false }
)

function MyApp({ Component, pageProps }) {
	return (
		<>
			<TopProgressBar />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
