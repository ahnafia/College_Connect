package com.cc.CollegeConnect;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Matches")
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Matches {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String requested_user;
    private String connectionRequest_user;
    private boolean connection_accepted;

    public Matches(String connectionRequest_user, String requested_user, boolean connection_accepted) {
        this.connectionRequest_user = connectionRequest_user;
        this.requested_user = requested_user;
        this.connection_accepted = connection_accepted;
    }
}
