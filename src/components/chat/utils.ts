import { API_URL, CHAT_ROOM_ID } from "../../config";
import { uuidv4 } from "../../helpers/uuidv4"
import axios from "axios";
import { ChatToken } from "amazon-ivs-chat-messaging";

export const tokenProvider = async (username: string): Promise<ChatToken> => {
    const uuid = uuidv4();

    const permissions = ['SEND_MESSAGE'];

    const data = {
        arn: CHAT_ROOM_ID,
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
        const response = await axios.post(`${API_URL}/auth`, data);

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