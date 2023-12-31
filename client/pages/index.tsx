import Head from 'next/head'
import AuthPage from "@/components/templates/AuthPage/AuthPage";

export default function Auth() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE-edge" />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link type="image/svg" sizes='32x32' href='/img/logo.svg' />
			</Head>
			<AuthPage/>
		</>
	)
}