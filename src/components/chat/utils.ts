import { uuidv4 } from "../../helpers/uuidv4"
import axios from "axios";
import { ChatToken } from "amazon-ivs-chat-messaging";
import { API_URL, CHAT_ROOM_ID, PLAYBACK_URL } from "../../config";

const dados = window.duda_data || {
    config: {
        url_video: PLAYBACK_URL,
        chat_api_url: API_URL,
        chat_room_id: CHAT_ROOM_ID
    }
};

export const tokenProvider = async (username: string): Promise<ChatToken> => {
    const uuid = uuidv4();
    const { chat_api_url, chat_room_id } = dados.config;

    const permissions = ['SEND_MESSAGE'];

    const data = {
        arn: chat_room_id,
        userId: `${username}.${uuid}`,
        attributes: {
            username: `${username}`
        },
        capabilities: permissions
    }

    let token: ChatToken = {
        token: '',
        sessionExpirationTime: new Date(),
        tokenExpirationTime: new Date()
    };

    try {
        const response = await axios.post(`${chat_api_url}/auth`, data);

        token = {
            token: response.data.token,
            sessionExpirationTime: new Date(response.data.sessionExpirationTime),
            tokenExpirationTime: new Date(response.data.tokenExpirationTime)
        }
    } catch (error) {
        console.log('Error', error);
    }

    return token;
}