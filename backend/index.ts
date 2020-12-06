import express from 'express'
import http from 'http'
import expressWs from 'express-ws'
import charController from './Controllers/ws-chat-controller'

const {app} = expressWs(express())

app.get('/', (req, res) => {
	
	res.json('lol')
})

app.ws('/chat',charController)

app.listen(process.env.PORT || '8080', () => {
	console.log('Server is running...')
})
