package com.cc.CollegeConnect.WebSocketChatFeatures;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class ChatRoom {
    @Id
    private String id;
    private String chatId;
    private String senderId;
    private String recipientId;
}
