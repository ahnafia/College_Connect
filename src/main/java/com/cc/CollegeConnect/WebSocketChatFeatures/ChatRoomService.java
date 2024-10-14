package com.cc.CollegeConnect.WebSocketChatFeatures;

import java.util.Optional;

public class ChatRoomService {
    private ChatRoomRepository chatRoomRepository;
    public Optional<String> getChatRoomId(String senderId, String recipientId, boolean ifExists){
        return chatRoomRepository
                .findBySenderIdAndRecipientId(senderId, recipientId)
                .map(ChatRoom::getChatId).or(() ->
        {
            if (ifExists){
                var chatId = createChatId(senderId, recipientId);
                return Optional.of(chatId);
            }
            return Optional.empty();
        });
    }

    private String createChatId(String senderId, String recipientId) {
        var chatId = String.format("%s%s", senderId, recipientId);

        ChatRoom senderRecipient = ChatRoom.builder().chatId(chatId).senderId(senderId).recipientId(recipientId).build();
        ChatRoom recipientSender = ChatRoom.builder().chatId(chatId).senderId(recipientId).recipientId(senderId).build();
        chatRoomRepository.save(senderRecipient);
        chatRoomRepository.save(recipientSender);
        return chatId;

    }
}
