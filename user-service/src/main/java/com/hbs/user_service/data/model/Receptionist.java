package com.hbs.user_service.data.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("RECEPTIONIST")
public class Receptionist extends User{
}
