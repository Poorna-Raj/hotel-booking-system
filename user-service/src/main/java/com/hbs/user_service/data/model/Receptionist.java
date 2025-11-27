package com.hbs.user_service.data.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@DiscriminatorValue("RECEPTIONIST")
@Data
public class Receptionist extends User{
    private String address;
}
