package com.hbs.user_service.data.repository;

import com.hbs.user_service.data.model.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceptionistRepository extends JpaRepository<Receptionist,Long> {
}
