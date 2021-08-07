import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

	static async getInitialProps(ctx) {
    	const initialProps = await Document.getInitialProps(ctx)
    	return { ...initialProps }
	}

	render() {
		return (
      		<Html lang="it">
				<Head>
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="manifest" href="/site.webmanifest" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta name="theme-color" content="#ffffff" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
					<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
					<meta name="apple-mobile-web-app-status-bar-style" content="white" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-title" content="Covid-19" />
				</Head>
				<body className="bg-white">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument