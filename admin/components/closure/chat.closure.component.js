const ChatUUID = (() => {
    var mChatUUID = "";
    var getID = () => {
        return mChatUUID;
    };

    var setID = (chat_uuid) => {
        mChatUUID = chat_uuid;
    };

    return {
        getID:getID,
        setID:setID
    }
})();

export default ChatUUID;