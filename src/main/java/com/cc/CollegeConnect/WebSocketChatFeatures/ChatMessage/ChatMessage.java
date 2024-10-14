package com.cc.CollegeConnect.WebSocketChatFeatures.ChatMessage;

import com.cc.CollegeConnect.WebSocketChatFeatures.MessageType;
import jakarta.persistence.Entity;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ChatMessage {
    @Id
    private String id;
    private String chatId;
    private String senderId;
    private String recipientId;
    private String content;
    private Date timestamp;
}
