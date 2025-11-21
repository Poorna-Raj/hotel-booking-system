package com.hbs.user_service.data.repository;

import com.hbs.user_service.data.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Long> {
}
