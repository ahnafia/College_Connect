package com.cc.CollegeConnect.WebSocketChatFeatures;

import com.cc.CollegeConnect.WebSocketChatFeatures.ChatMessage.ChatMessage;
import com.cc.CollegeConnect.WebSocketChatFeatures.ChatMessage.ChatRoomMessagingService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller

public class ChatController {

    private SimpMessagingTemplate simpMessagingTemplate;
    private ChatRoomMessagingService chatRoomMessagingService;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        ChatMessage message = chatRoomMessagingService.save(chatMessage);
        simpMessagingTemplate.convertAndSendToUser(
                chatMessage.getRecipientId(), "/queue/messages",
                new ChatNotification(
                        message.getId(),
                        message.getSenderId(),
                        message.getRecipientId(),
                        message.getContent()
                )
        );
    }


    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<ChatMessage>> findChatMessage(
            @PathVariable("senderId") String senderId,
            @PathVariable("recipientId") String recipientId
    ){
        return ResponseEntity.ok(chatRoomMessagingService.findChatMessage(senderId, recipientId));
    }
}
