package com.ungalthedal.api.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterResponse extends Response {
    public RegisterResponse() {
        super();
    }

    public RegisterResponse(String msg, String type) {
        super(msg, type);
    }
}
