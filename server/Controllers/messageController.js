
// get all users exept the logged in user

import Message from "../models/Message.js";
import User from "../models/User.js";

export const getUsersForSidebar = async()=>{
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id : {$ne : userId}}).select("-password");
        
        // count number of messages not seen
        const unseenMessages = {}
        const promises = filteredUsers.map(async()=>{
            const messages = await Message.find({senderId : user._id, reciverId : userId, seen : false})
            if(messages.length>0){
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.json({seccess : true, users:filteredUsers, unseenMessages});
    } catch (error) {
        console.log(error.message)
        res.json({success : false, message : error.message});
    }
}



// get all messages for selected user

export const getMessages = async (req, res)=>{
    try {
       const {id : selecteduserId} = req.params;  
       const myId = req.user._id;
       const messages = await Message.find({
        $or :[
            {senderId : myId, reciverId : selecteduserId},
            {senderId : selecteduserId, reciverId : myId}
        ]
       })
       await Message.updateMany({senderId : selecteduserId, reciverId : myId}, {seen:true});

       res.json({success : true, messages});
    } catch (error) {
         console.log(error.message)
        res.json({success : false, message : error.message});
    }
}





// api to mark message as seen using message id

export const markMssageAsSeen = async(req, res)=>{
    try {

        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen : true});
        res.json({success : true});
          
    } catch (error) {
        console.log(error.message)
        res.json({success : false, message : error.message});
    }
}