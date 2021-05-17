package com.pw.kalspal.util;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

public class AuthID {
    public static String getID(Authentication authentication){
        String fullID = authentication.getName();
        String[] split = fullID.split("\\|");
        if(split.length != 2){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Auth0 ID format");
        }
        return split[1];
    }
}
