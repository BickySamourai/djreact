import React, { Component, Fragment } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Media } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import { MoreVertical } from 'react-feather';
import { Form, Input } from "reactstrap";
import WebSocketInstance from '../../websocket'


class Chat extends Component {


    initialiseChat(chat) {
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.setMessages.bind(this),
                this.addMessage.bind(this)
            )
            WebSocketInstance.fetchMessages(this.state.currentUser, chat)

        })
        WebSocketInstance.connect(chat);
    }



    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            array: [],
            query: '',
            messageSelected: [],
            msg: '',
            currentIdChat: 0,
            currentUser: 'Adnan',
            currentNameChat: '',
            namesRoom: {},
            firstname: localStorage.getItem('user_firstname'),
            lastname: localStorage.getItem('user_lastname'),
            currentUserId: localStorage.getItem('user_id'),
        };

        this.initialiseChat(this.props.match.params.id);

        this.handleChange = this.handleChange.bind(this);
        this.fetchMessages = this.fetchMessages.bind(this)
        this.handleChatMsgChange = this.handleChatMsgChange.bind(this)
        this.handleClickSend = this.handleClickSend.bind(this)
    }

    componentWillReceiveProps(newProps) {
        var pk = parseInt(newProps.match.params.id)
        this.setState({
            currentIdChat: (pk),
            currentNameChat: this.state.namesRoom[pk]

        })


        if (this.props.match.params.id !== newProps.match.params.id) {

            WebSocketInstance.disconnect();
            this.waitForSocketConnection(() => {
                WebSocketInstance.addCallbacks(
                    this.setMessages.bind(this),
                    this.addMessage.bind(this)
                )
                WebSocketInstance.fetchMessages(
                    localStorage.getItem("user_id")
                    , pk)

            })
            WebSocketInstance.connect(pk);
        }

    }

    addMessage(message) {
        this.setState({
            messages: [...this.state.messages, message]
        })
    }

    setMessages(messages) {
        this.setState({
            messages: messages
        })
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(function () {
            if (WebSocketInstance.state() === 1) {
                console.log("Connection is made");
                callback();
                return;
            } else {
                console.log("wait for connection...");
                component.waitForSocketConnection(callback);
            }
        }, 100);
    }

    renderTimestamp = timestamp => {
        let prefix = "";
        const timeDiff = Math.round(
            (new Date().getTime() - new Date(timestamp).getTime()) / 60000
        );
        if (timeDiff < 1) {
            prefix = "A l'instant";
        } else if (timeDiff < 60 && timeDiff >= 1) {
            var minute = ""
            if(timeDiff > 1){
                minute="minutes"
            }else{
                minute="minute"
            }
            prefix = `il y a ${timeDiff} ${minute}`;
        } else if (timeDiff < 24 * 60 && timeDiff > 60) {
            var heure = ""
            if(Math.round(timeDiff / 60) > 1){
                heure="heures"
            }else{
                heure="heure"
            }
            prefix = `il y a ${Math.round(timeDiff / 60)} ${heure}`;
        } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
            var jour =""
            if(Math.round(timeDiff / (60 * 24)) > 1){
                jour="jours"
            }else{
                jour="jour";
            }
            prefix = `il y a ${Math.round(timeDiff / (60 * 24))} ${jour}`;
        } else {
            prefix = `${new Date(timestamp)}`;
        }
        return prefix;
    };


    handleClickSend(event) {
        event.preventDefault();

        if (this.state.msg.length !== 0 && this.state.currentIdChat != 0) {
            const messageObject = {
                from: localStorage.getItem('user_id'),
                content: this.state.msg,
                id_chat: this.state.currentIdChat
            }
            WebSocketInstance.newChatMessage(messageObject);
            this.setState({
                msg: ''
            })
        }
    }

    handleChatMsgChange = e => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({ msg: e.target.value })
    }


    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    fetchMessages(e) {
        e.stopPropagation()
    }


    componentDidMount() {


        var newArray = this.state.array.slice();
        var newMessages = this.state.messages.slice()




        axios.get('http://127.0.0.1:8000/chat/')
            .then(resp => {
                resp.data.map((tab, index) => {

                    if (tab.model.endsWith("chatroom")) {
                        var path = "/chat/" + tab.pk
                        var room = "room_" + tab.pk
                        newArray.push(<Link to={path} key={tab.pk} id={room} className="list-group-item no-border" onClick={this.fetchMessages}>
                            <Media body>
                                <p className="list-group-item-text text-muted"><i className="ft-check primary font-small-2"></i> {tab.fields.nameRoom} <span className="float-right primary"><i className="font-medium-1 icon-pin blue-grey lighten-3"></i></span></p>
                            </Media>
                        </Link>)
                        let roomsCopy = JSON.parse(JSON.stringify(this.state.namesRoom))
                        roomsCopy[tab.pk] = tab.fields.nameRoom
                        this.setState({
                            array: newArray,
                            namesRoom: roomsCopy
                        });

                    } else if (tab.model.endsWith("message")) {
                        newMessages.push(tab)
                        this.setState({ messages: newMessages });
                    }

                })
            })
            .catch(error => {
                console.log('error')
                console.log(error)
            })
    }



    render() {
        return (
            <Fragment>
                <h1>{this.state.contents}</h1>
                <div className="chat-application">
                    <div className="content-overlay"></div>
                    <div className="chat-sidebar float-left d-none d-sm-none d-md-block d-lg-block">

                        <PerfectScrollbar>
                            <div className="chat-sidebar-content">
                                <div className="list-group position-relative" id="users-list">
                                    <div className="users-list-padding">

                                        {this.state.array}

                                    </div>

                                </div>
                            </div>
                        </PerfectScrollbar>
                    </div>

                    <div>
                        <div className="chat-name p-2 bg-white">
                            <div className="media">
                                <span className="chat-app-sidebar-toggle ft-align-justify font-large-1 mr-2 d-none d-block d-sm-block d-md-none"></span>
                                <div className="media-body">
                                    <span><b>{(this.state.currentNameChat != undefined && this.state.currentNameChat.length != 0) ? "Chambre de discussion " + this.state.currentNameChat.toUpperCase() : "Selectionnez une chatroom"}</b></span>
                                    <MoreVertical size={18} className="ft-more-vertical float-right mt-1" />
                                </div>
                            </div>
                        </div>

                        <PerfectScrollbar>
                            <section className="chat-app-window">
                                <div className="badge badge-dark mb-1">{(this.state.currentNameChat != undefined && this.state.currentNameChat.length != 0) ? "Chat " + this.state.currentNameChat.toUpperCase() : ""}</div>
                                <div className="chats">
                                    {this.state.messages.map((answer, i) => {
                                        console.log(answer)
                                        //userID
                                        if (answer.chatID == this.state.currentIdChat && this.state.currentNameChat != undefined && this.state.currentNameChat.length != 0) {
                                            var auth = answer.firstname.toUpperCase().charAt(0) + "" + answer.lastname.toUpperCase().charAt(0)
                                            if (this.state.currentUserId != answer.userID) {
                                                return (
                                                    <div className="chat chat-left" key={i}>
                                                        <div className="chat-avatar">
                                                            <h3 src="" className="width-50 rounded-circle" alt="avatar" title={answer.firstname.toUpperCase() + " " + answer.lastname.toUpperCase()}>{auth}</h3>
                                                        </div>
                                                        <div className="chat-body">
                                                            <div className="chat-content">
                                                                <p>{answer.content}</p>
                                                                <h6>{this.renderTimestamp(answer.date_sent)}</h6>
                                                            </div>

                                                        </div>
                                                    </div>

                                                );
                                            } else {
                                                return (
                                                    <div className="chat" key={i}>
                                                        <div className="chat-avatar">
                                                            <h3 src="" className="width-50 rounded-circle" alt="avatar" title={answer.firstname.toUpperCase() + " " + answer.lastname.toUpperCase()}>{auth}</h3>
                                                        </div>
                                                        <div className="chat-body">

                                                            <div className="chat-content">
                                                                <p>{answer.content}</p>
                                                                <h6>{this.renderTimestamp(answer.date_sent)}</h6>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }

                                    })}

                                </div>
                            </section>
                        </PerfectScrollbar>
                    </div>

                    <section className="chat-app-form bg-blue-grey bg-lighten-5">
                        <Form className="chat-app-input row">
                            <fieldset className="col-lg-10 col-8 m-0">
                                <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tapez votre message ici..."
                                    onChange={this.handleChatMsgChange}
                                    value={this.state.msg}
                                />



                            </fieldset>
                            <fieldset className="form-group position-relative has-icon-left col-lg-2 col-4 m-0">
                                <button
                                    type="button"
                                    className="btn btn-raised btn-primary"
                                    onClick={this.handleClickSend} >

                                    <i className="fa fa-paper-plane-o hidden-lg-up"></i> Envoyer </button>
                            </fieldset>
                        </Form>
                    </section>

                </div>
            </Fragment>
        );
    }
}



export default Chat;
