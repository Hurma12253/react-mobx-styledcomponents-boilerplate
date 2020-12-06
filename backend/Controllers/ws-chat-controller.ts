import { Request } from 'express'
import { TypeOfExpression } from 'typescript'
import WebSocket from 'ws'
import {WsRes, WsResBody, WsReq} from '../typings/ws-chat-controllers'

const users = new Map<string, WebSocket>()

const send = (
	ws: WebSocket,
	data: WsResBody
) => {
	const d: WsRes = {
		jsonrpc: '2.0',
		id: data.id,
		...data,
	}

	ws.send(JSON.stringify(d))
}

const wsRoute = (ws: WebSocket, req: Request) => {
	ws.on('message', (msg: string) => {
		const message: WsReq = JSON.parse(msg)

		switch (message.method) {
			case 'username':
				if (users.has(message.params.username)) {
					send(ws, {
						id: message.id,
						error: { message: 'This user already exists!' },
					})
				} else {
					users.set(message.params.username, ws)
					send(ws, { id: message.id, result: 'success' })
				}
				break
			case 'message':
				users.forEach((ws) =>
					send(ws, {
						id: message.id,
						method: 'update',
						params: { message: message.params.message },
					})
				)
				break
			default:
				console.log('default')
		}
	})
}

export default wsRoute
