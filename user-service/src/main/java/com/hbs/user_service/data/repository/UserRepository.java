package com.hbs.user_service.data.repository;

import com.hbs.user_service.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
