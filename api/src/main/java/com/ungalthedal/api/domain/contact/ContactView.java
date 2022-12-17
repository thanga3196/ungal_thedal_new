package com.ungalthedal.api.domain.contact;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "v_contact")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ContactView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "subject")
    private String subject;

    @Column(name = "message")
    private String message;

    @Column(name = "read_ind")
    private Boolean readInd;
}