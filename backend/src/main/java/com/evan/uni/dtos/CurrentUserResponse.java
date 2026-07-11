package com.evan.uni.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CurrentUserResponse {
    private String username;
    private String role;
}