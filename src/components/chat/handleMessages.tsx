import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { ChatMessage, ChatRoom } from 'amazon-ivs-chat-messaging';
import Menssagem from '../Mensagem';

export interface Message {
    id?: string | number
    username?: string
    avatar?: string
    message: string
    timestamp: Date
    type?: 'ERROR' | 'SUCCESS' | 'STICKER' | 'MESSAGE' | string
    sticker?: string
    userId: string
    messageId: string
    sender: {
        userId: string
    }
}

const HandleMessages = ({ chatRoom }: { chatRoom?: ChatRoom }) => {
    const [messages, setMessages] = React.useState<Message[]>([]);

    useEffect(() => {
        if (!chatRoom?.addListener) {
            return;
        }

        const unsubscribeOnConnected = chatRoom.addListener('connect', () => {
            // Connected to the chat room.
            renderConnect();
        });

        const unsubscribeOnMessageReceived = chatRoom.addListener('message', (message) => {
            // const messageType = message.attributes?.message_type || 'MESSAGE';
            handleMessage(message);
        });

        const unsubscribeOnMessageDeleted = chatRoom.addListener(
            'messageDelete',
            (deleteEvent) => {
              // Received message delete event
              const messageIdToDelete = deleteEvent.messageId;
              setMessages((prevState) => {
                // Remove message that matches the MessageID to delete
                const newState = prevState.filter(
                  (item) => item.messageId !== messageIdToDelete
                );
                return newState;
              });
            }
          );

          const unsubscribeOnUserDisconnect = chatRoom.addListener(
            'userDisconnect',
            (disconnectUserEvent) => {
              /* Example event payload:
               * {
               *   id: "AYk6xKitV4On",
               *   userId": "R1BLTDN84zEO",
               *   reason": "Spam",
               *   sendTime": new Date("2022-10-11T12:56:41.113Z"),
               *   requestId": "b379050a-2324-497b-9604-575cb5a9c5cd",
               *   attributes": { UserId: "R1BLTDN84zEO", Reason: "Spam" }
               * }
               */
              renderDisconnect(`${disconnectUserEvent.reason}`);
            }
          );

        return () => {
            unsubscribeOnConnected();
            unsubscribeOnMessageReceived();
            unsubscribeOnMessageDeleted();
            unsubscribeOnUserDisconnect();
        }
    }, [chatRoom])

    // Renderers
    const renderErrorMessage = (errorMessage: Message) => {
        return (
            <Typography sx={{ padding: '10px', fontSize: '12px', color: '#c72727' }} variant="body1" component="p" key={`${errorMessage.timestamp}`}>{errorMessage.message}</Typography>
        );
    };

    const renderSuccessMessage = (successMessage: Message) => {
        return (
            <Typography sx={{ padding: '10px', fontSize: '12px', color: '#098d00' }} variant="body1" component="p" key={`${successMessage.timestamp}`}>{successMessage.message}</Typography>
        );
    };

    const renderStickerMessage = (message: Message) => (
        <div className='chat-line-sticker-wrapper' key={`${message.timestamp}`}>
            <div className='chat-line chat-line--sticker' key={`${message.timestamp}`}>
            <img
                className='chat-line-img'
                src={message.avatar}
                alt={`Avatar for ${message.username}`}
            />
            <p>
                <span className='username'>{message.username}</span>
            </p>
            <img className='chat-sticker' src={message.sticker} alt={`sticker`} />
            </div>
        </div>
    );

    const renderMessage = (message: Message) => {
        return (
            <Menssagem menssagem={message}/>
        );
    };

    const renderConnect = () => {
        const status: Message = {
            id: 'success',
            type: 'SUCCESS',
            timestamp: new Date(),
            username: '',
            avatar: '',
            message: `Conectado`,
            userId: '',
            messageId: '',
            sender: {
                userId: ''
            }
        };
        setMessages(() => {
            return [status];
        });
    };

    const renderDisconnect = (reason: string) => {
        const reasonText = reason === 'Kicked by moderator' ? ': Banido pelo moderador' : '';

        const error = {
            type: 'ERROR',
            timestamp: new Date(),
            username: '',
            userId: '',
            avatar: '',
            message: `Desconectado ${reasonText}`,
            messageId: '',
            sender: {
                userId: ''
            }
        };
        setMessages((prevState) => {
          return [...prevState, error];
        });
      };
    
    const renderMessages = () => {
        return messages?.map((message: Message) => {
            switch (message.type) {
            case 'ERROR':
                const errorMessage = renderErrorMessage(message);
                return errorMessage;
            case 'SUCCESS':
                const successMessage = renderSuccessMessage(message);
                return successMessage;
            case 'STICKER':
                const stickerMessage = renderStickerMessage(message);
                return stickerMessage;
            case 'MESSAGE':
                const textMessage = renderMessage(message);
                return textMessage;
            default:
                console.info('Received unsupported message:', message);
                return <></>;
            }
        });
    };

    const handleMessage = (data: ChatMessage) => {
        const username = data?.sender?.attributes?.username;
        const userId = data.sender.userId;
        const avatar = data?.sender?.attributes?.avatar;
        const message = data.content;
        const messageId = data.id;
        const timestamp = data.sendTime;
    
        const newMessage: Message = {
            type: 'MESSAGE',
            timestamp,
            username,
            userId,
            avatar,
            message,
            messageId,
            sender: {
                userId: ''
            }
        };
    
        setMessages((prevState) => {
          return [...prevState, newMessage];
        });
      };

    return renderMessages()
}


export default HandleMessages;