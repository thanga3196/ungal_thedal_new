package com.ungalthedal.api.service.contact;

import com.ungalthedal.api.domain.contact.Contact;
import com.ungalthedal.api.repository.contact.IContactRepository;
import com.ungalthedal.api.service.abstraction.contact.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService implements IContactService {
    public IContactRepository contactRepository;

    @Autowired
    ContactService(IContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Contact save(Contact contact) {
        return this.contactRepository.save(contact);
    }
}
