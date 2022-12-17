package com.ungalthedal.api.repository.contact;

import com.ungalthedal.api.domain.contact.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IContactRepository extends JpaRepository<Contact, Long> {

}
