package com.hbs.room_service.data.repository;

import com.hbs.room_service.data.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room,Long> {
}
