package com.cc.CollegeConnect.WebSocketChatFeatures;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends CrudRepository<ChatRoom, String> {
    Optional<ChatRoom> findBySenderIdAndRecipientId(String senderId, String recipientId);
}
