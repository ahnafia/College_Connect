package com.cc.CollegeConnect.WebSocketChatFeatures.ChatMessage;

import com.cc.CollegeConnect.WebSocketChatFeatures.ChatRoomRepository;
import com.cc.CollegeConnect.WebSocketChatFeatures.ChatRoomService;

import java.util.ArrayList;
import java.util.List;

public class ChatRoomMessagingService {
    private ChatMessageRepository chatMessageRepository;
    private ChatRoomService chatRoomService;


    public ChatMessage save(ChatMessage chatMessage){
        var chatId = chatRoomService
                .getChatRoomId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true)
                .orElseThrow();
        chatMessage.setChatId(chatId);
        chatMessageRepository.save(chatMessage);
        return chatMessage;
    }


    public List<ChatMessage> findChatMessage(String senderId, String recipientId){
        var chatId = chatRoomService.getChatRoomId(senderId, recipientId, false);
        return chatId.map(chatMessageRepository::findByChatId).orElse(new ArrayList<>());
    }
}
