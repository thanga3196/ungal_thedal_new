package com.ungalthedal.api.controller.abstraction.contact;

import com.ungalthedal.api.domain.contact.Contact;
import org.springframework.http.ResponseEntity;

public interface IContactController {
    ResponseEntity<?> save(Contact contact);
}
