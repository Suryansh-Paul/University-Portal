package com.evan.uni.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

import java.util.*;

@Service
public class JwtService {
    @Value
    ("${jwt.secret}")
    private String secretKey;



public SecretKey getkey() {
 return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
}

public String generateToken(String username){
    Date now = new Date();
    Date expiry = new Date(now.getTime()+1000*60*30);

   return Jwts.builder()
           .setSubject(username)
           .setIssuedAt(now)
           .setExpiration(expiry)
           .signWith(getkey())
           .compact();

}

 private Claims extractAllClaims(String token){
       return Jwts.parserBuilder()
               .setSigningKey(getkey())
               .build()
               .parseClaimsJws(token)
               .getBody();
 }

 public String extractUsername(String token){
    Claims claims = extractAllClaims(token);
    String username = claims.getSubject();
    return username;
}

public  Date extractExpiration(String token){
    Claims claims = extractAllClaims(token);
    Date expirationDate = claims.getExpiration();
    return expirationDate;
}

public  boolean isTokenExpired(String token){
    Date expirationDate = extractExpiration(token);
    return expirationDate.before(new Date());
}

public boolean isTokenvalid(String token , UserDetails userDetails){
    String username = extractUsername(token);
   return  username.equals(userDetails.getUsername())&& !isTokenExpired(token);
}





}