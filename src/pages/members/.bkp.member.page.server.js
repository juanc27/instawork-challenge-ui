// /pages/members/member.page.server.js
// Environment: server

import fetch from 'node-fetch'

export async function onBeforeRender(pageContext) {
  // The route parameter of `/star-wars/@movieId` is available at `pageContext.routeParams`
  const { id } = pageContext.routeParams
	const loading = ref(false)
	const error = ref(null)


  // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
  const response = await fetch(`http://127.0.0.1:8000/members/${id}`)
  let movie = await response.json()
	console.log('Juan');
	console.log(id);
	try {
		const response = await fetch(`http://127.0.0.1:8000/members/${id}`)
		let member = await response.json()
	} catch (err) {
		error.value = err.toString()
	} finally {
		loading.value = false
	}

  // Our render and hydrate functions we defined earlier pass `pageContext.pageProps` to
  // the root Vue component `Page`; this is where we define `pageProps`.
  const pageProps = { movie, error, loading }

  // We make `pageProps` available as `pageContext.pageProps`
  return {
    pageContext: {
      pageProps
    }
  }
}

// By default `pageContext.*` are available only on the server. But our hydrate function
// we defined earlier runs in the browser and needs `pageContext.pageProps`; we use
// `passToClient` to tell `vite-plugin-ssr` to serialize and make `pageContext.pageProps`
// available to the browser.
export const passToClient = ['pageProps']
