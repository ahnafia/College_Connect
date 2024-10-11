package com.cc.CollegeConnect.WebSocketChatFeatures;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private String content;
    private MessageType messageType;
    private String sender;
}
