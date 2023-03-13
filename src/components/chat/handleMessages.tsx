import { Typography } from '@mui/material';
import { ChatMessage, ChatRoom } from 'amazon-ivs-chat-messaging';
import React, { useEffect } from 'react';
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
        })

        return () => {
            unsubscribeOnConnected();
            unsubscribeOnMessageReceived();
        }
    }, [chatRoom])

    // Renderers
    const renderErrorMessage = (errorMessage: Message) => {
        return (
            <Typography variant="body1" component="p" key={`${errorMessage.timestamp}`}>{errorMessage.message}</Typography>
        );
    };

    const renderSuccessMessage = (successMessage: Message) => {
        return (
            <Typography variant="body1" component="p" key={`${successMessage.timestamp}`}>{successMessage.message}</Typography>
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
            message: `Connected to the chat room.`,
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