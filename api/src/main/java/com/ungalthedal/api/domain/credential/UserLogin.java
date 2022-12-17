package com.ungalthedal.api.domain.credential;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_login")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "failed_attempts")
    private long failedAttempts;

    @Column(name = "locked_dte")
    private Date lockedDte;
}
