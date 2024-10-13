package com.cc.CollegeConnect.WebSocketChatFeatures;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ChatRoomRepository extends CrudRepository<ChatRoom, Long> {

    Optional<ChatRoom> findBySenderandRecipientId(String senderId, String recipientId);
}
