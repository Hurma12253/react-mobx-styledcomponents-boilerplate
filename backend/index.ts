import express from 'express'
import http from 'http'
import expressWs from 'express-ws'

const {app} = expressWs(express())

app.get('/', (req, res) => {
	
	res.json('lol')
})

app.ws('/',(ws,req)=>{
	ws.on('message',(message)=>{
		console.log(message)
	})
})

app.listen(process.env.PORT || '8080', () => {
	console.log('Server is running...')
})
