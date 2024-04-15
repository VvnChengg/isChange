import { useParams } from 'react-router-dom';
import ChatRoom from "../../components/PrivateMessage/ChatRoom";

export default function Chatroom() {
    const { chatid } = useParams();

    return (
        <div>
            <ChatRoom chatid={chatid} />
        </div>
    );
}