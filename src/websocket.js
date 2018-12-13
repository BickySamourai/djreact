class WebSocketService {
    static instance=null;
    //pour initialiser le serveur
    callbacks = {}

    static getInstance(){
        if(!WebSocketService.instance){
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor(){
        this.socketRef = null;
    }

    connect(url){
        console.log(url)
        const path = `ws://localhost:8000/ws/chat/${url}/`
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log("websocket ouvert")
        }

        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data)
        }


        this.socketRef.onerror = e => {
            console.log(e.message)
        }

        this.socketRef.onclose = () => {
            console.log("Fermeture du webSocket");
            this.connect();
        }

    }


    disconnect(){
        this.socketRef.close();
    }

    socketNewMessage(data){
        const parsedData = JSON.parse(data)

        //pour le fetch_messages et new_message
        const command = parsedData.command;

        if(Object.keys(this.callbacks).length === 0 ){
            return; //on n'a aucune commande
        }

        if(command==='messages'){
            this.callbacks[command](parsedData.messages)
        }
        if(command==='new_message'){
            this.callbacks[command](parsedData.message)
        }
    }


    fetchMessages(user_id,idchat){
       
            this.sendMessage({
                command:'fetch_messages',
                user_id:user_id,
                id_chat:idchat
            })
        
    }

    newChatMessage(message){
        console.log(message)
        this.sendMessage({
            command:'new_message',
            from:message.from,
            message:message.content,
            id_chat:message.id_chat
        })
    }

    addCallbacks(messageCallback,newMessageCallBack){
        this.callbacks['messages'] = messageCallback;
        this.callbacks['new_message'] = newMessageCallBack;
    }


    sendMessage(data){
        try{
            this.socketRef.send(JSON.stringify({...data}))
        }catch(err){
            console.log(err.message)
        }
    }

    state() {
        return this.socketRef.readyState;
    }

    waitForSocketConnection(callback){
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(
            function() {
                if(socket.readyState===1){
                    console.log("connection is secure")
                    if(callback != null){
                        callback();
                    }
                }else{
                    console.log("waiting for connection")
                    recursion(callback)
                }
            }


        ,1);
        
    }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;