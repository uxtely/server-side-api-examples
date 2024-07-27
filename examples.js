/**
 * Copyright (c) Uxtely LLC. All rights reserved.
 * Licensed under the ISC license found in the LICENSE
 * file in the root directory of this source tree.
 */

process.on('unhandledRejection', error => { throw error })

const app = require('express')()
const jsonParser = require('body-parser').json()


app.use((_, response, next) => {
	response.header('Access-Control-Allow-Origin', 'https://my.uxtly.com')
	response.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})


app.get('/in-stock-count/:productId', (request, response) => {
	switch (request.params.productId) {
		case 'abc':
			response.json({ count: 200 })
			break
		case 'cba':
			response.json({ count: 2 })
			break
		default:
			response.sendStatus(404)
	}
})


app.post('/hypotenuse', jsonParser, (request, response) => {
	const card = request.body
	const apiKey = card.api_key.value
	const sideA = card.side_a.value
	const sideB = card.side_b.value

	if (apiKey !== 'MyApiKey')
		response.sendStatus(401)
	else
		response.json({
			hypotenuse: Math.sqrt(sideA ** 2 + sideB ** 2)
		})
})


app.post('/form-submit', jsonParser, (request, response) => {
	const card = request.body
	const first_name = card.first_name.value
	const last_name = card.last_name.value

	console.log(first_name, last_name)
	response.sendStatus(200)
})


app.listen(7000, 'localhost', error => {
	if (error)
		console.error(error)
	else
		console.log('Listening on http://localhost:7000')
})

