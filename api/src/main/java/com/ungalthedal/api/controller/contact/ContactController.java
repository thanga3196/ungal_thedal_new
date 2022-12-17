package com.ungalthedal.api.controller.contact;

import com.ungalthedal.api.controller.abstraction.contact.IContactController;
import com.ungalthedal.api.domain.contact.Contact;
import com.ungalthedal.api.service.abstraction.contact.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("contact")
@CrossOrigin(origins = "*")
public class ContactController implements IContactController {
    IContactService contactService;

    @Autowired
    public ContactController(IContactService contactService) {
        this.contactService = contactService;
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody Contact contact) {
        return ResponseEntity.ok(this.contactService.save(contact));
    }


}
