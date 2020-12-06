interface WsResHeader {
	jsonrpc: '2.0'
	id: number
}

export type WsResBody = WsResSuccessBase | WsResErrorBase | WsResUpdateBase
export type WsRes = WsResSuccess | WsResError | WsResUpdate

interface WsResSuccess extends WsResHeader {
	result: 'success'
}

interface WsResError extends WsResHeader {
	error: { message: string }
}

interface WsResUpdate extends WsResHeader {
	method: 'update'
	params: {
		message: string
	}
}

interface WsResSuccessBase {
	id: number
	result: 'success'
}

interface WsResErrorBase {
	id: number
	error: { message: string }
}

interface WsResUpdateBase {
	id: number
	method: 'update'
	params: {
		message: string
	}
}

////////////// Ws Requests /////////////////

export type WsReq = WsReqUsername | WsReqMessage

interface WsReqBase {
    id: number
}

interface WsReqUsername extends WsReqBase{
    method: 'username'
    params:{
        username: string
    }
}

interface WsReqMessage extends WsReqBase{
    method: 'message'
    params:{
        message: string
    }
}




