import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const ChatContext = createContext();

export const ChatProvider = ({children})=>{

    const [messages, setMessages] = useState([]);
    const [users, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket, axios} = useContext(AuthContext);

    // function to get all users for siderbar
    const getUsers = async()=>{
        try {
            const{data} = await axios.get("/api/messages/users");
            if(data.success){
                setUser(data.users);
                setUnseenMessages(data.unseenMessages || {});
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    // function to get messages for selected user
    const getMessages = async (userId)=>{
        try {
           const {data} =  await axios.get(`/api/messages/${userId}`);
           if(data.success){
            setMessages(data.messages);
           }
        } catch (error) {
            toast.error(error.message);
        }
    }



    // funcion to send message to selected user
    const sendMessage = async(messageData)=>{
        try {
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`,
                messageData);

             if(data.success){
                setMessages((prevMessages)=>[...prevMessages, data.newMessage])
             }else{
                toast.error(data.message);
             }   
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to subscribe to message for selected user
    const subscribeToMessages = async()=>{
        if(!socket)return;

        socket.on("newMessage", (newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages)=>[...prevMessages, newMessage]);
                axios.put(`/api/message/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((preUnseenMessages)=>({
                    ...preUnseenMessages, [newMessage.senderId] : 
                    preUnseenMessages[newMessage.senderId] ? preUnseenMessages
                    [newMessage.senderId]+1 : 1
                }))
            }
        })
    }


    // function to unsubscribe from message
    const unsubscribeMessage = async()=>{
        if(socket)socket.off("newMessage");
    }

    useEffect(()=>{
        subscribeToMessages();
        return ()=> unsubscribeMessage();
    }, [socket, selectedUser])


    const value = {
      messages, users, selectedUser, getUsers, getMessages,
       sendMessage, setSelectedUser, unseenMessages, setUnseenMessages
    }

    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}