import "tailwindcss/tailwind.css"
import "@styles/styles.css"
import { Inter } from "next/font/google"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
	subsets: ["latin"],
	display: "swap",
})

import SiteHeader from "@components/SiteHeader"
import SiteFooter from "@components/SiteFooter"

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}) {
	return (
		<html lang="it" className={inter.className}>
			<head>
				{/* <!-- Favicons --> */}
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<meta name="msapplication-TileColor" content="#5d56d5" />
				<meta name="theme-color" content="#5d56d5" />
				{/* <!-- PWA Tags --> */}
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="white"
				/>
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-title" content="Covid-19" />
				{/* <!-- Splash screens --> */}
				<link
					href="/splashscreens/iphone5_splash.png"
					media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
					rel="apple-touch-startup-image"
				/>
				<link
					href="/splashscreens/iphone6_splash.png"
					media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
					rel="apple-touch-startup-image"
				/>
				<link
					href="/splashscreens/iphoneplus_splash.png"
					media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
					rel="apple-touch-startup-image"
				/>
				<link
					href="/splashscreens/iphonex_splash.png"
					media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
					rel="apple-touch-startup-image"
				/>
				<link
					href="/splashscreens/iphonexr_splash.png"
					media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
					rel="apple-touch-startup-image"
				/>
				<link
					href="/splashscreens/iphonexsmax_splash.png"
					media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
					rel="apple-touch-startup-image"
				/>
				<link
					href="/splashscreens/ipad_splash.png"
					media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
					rel="apple-touch-startup-image"
				/>
				<link
					href="/splashscreens/ipadpro1_splash.png"
					media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
					rel="apple-touch-startup-image"
				/>
				<link
					href="/splashscreens/ipadpro3_splash.png"
					media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
					rel="apple-touch-startup-image"
				/>
				<link
					href="/splashscreens/ipadpro2_splash.png"
					media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
					rel="apple-touch-startup-image"
				/>
			</head>
			<body className="bg-governor-bay-600">
				<SiteHeader />
				{children}
				<SiteFooter />
			</body>
		</html>
	)
}
