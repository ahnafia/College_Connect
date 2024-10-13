package com.cc.CollegeConnect.WebSocketChatFeatures.ChatMessage;

import com.cc.CollegeConnect.WebSocketChatFeatures.ChatRoom;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChatMessageRepository extends CrudRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatId(String chatId);
}
