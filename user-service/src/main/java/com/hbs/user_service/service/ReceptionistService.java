package com.hbs.user_service.service;

import com.hbs.user_service.data.dto.ReceptionistRegisterDto;
import com.hbs.user_service.data.dto.ReceptionistResponseDto;
import com.hbs.user_service.data.dto.UserResponseDto;
import com.hbs.user_service.data.model.Receptionist;
import com.hbs.user_service.data.repository.ReceptionistRepository;
import com.hbs.user_service.exception.ContentNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceptionistService {
    @Autowired
    private ReceptionistRepository receptionistRepository;

    /**
     * Create a new receptionist and save to the database
     * @param dto contains the receptionist data
     * @return an {@link ReceptionistResponseDto} containing receptionist data
     */
    public ReceptionistResponseDto addReceptionist(ReceptionistRegisterDto dto){
        Receptionist receptionist = new Receptionist();
        receptionist.setUsername(dto.getUsername());
        receptionist.setEmail(dto.getEmail());
        receptionist.setPassword(dto.getPassword());
        receptionist.setAddress(dto.getAddress());

        return mapToDtoFromReceptionist(receptionistRepository.save(receptionist));
    }

    /**
     * Update an existing receptionist based on the ID
     * @param id Receptionist ID
     * @param dto contains new data for the receptionist
     * @return an {@link ReceptionistResponseDto} containing receptionist data
     */
    public ReceptionistResponseDto updateReceptionist(long id, ReceptionistRegisterDto dto){
        Receptionist receptionist = receptionistRepository.findById(id)
                .orElseThrow(()-> new ContentNotFound("Invalid User!"));
        receptionist.setPassword(dto.getPassword());
        receptionist.setEmail(dto.getEmail());
        receptionist.setUsername(dto.getUsername());
        receptionist.setAddress(dto.getAddress());

        return mapToDtoFromReceptionist(receptionistRepository.save(receptionist));
    }

    /**
     * Fetch the receptionist based on the ID
     * @param id Receptionist's ID
     * @return an {@link ReceptionistResponseDto} containing receptionist data
     */
    public ReceptionistResponseDto getReceptionistById(long id){
        Receptionist receptionist = receptionistRepository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Receptionist not found!"));

        return mapToDtoFromReceptionist(receptionist);
    }

    /**
     * Fetch all the saved receptionists
     * @return a list of {@link ReceptionistResponseDto} containing receptionist data
     */
    public List<ReceptionistResponseDto> getAllReceptionists(){
        return receptionistRepository.findAll()
                .stream()
                .map(this::mapToDtoFromReceptionist)
                .toList();
    }

    /**
     * Delete an existing receptionists based on the ID
     * @param id receptionist's id
     * @return {@code boolean} value based on the result
     */
    public boolean deleteReceptionistById(long id){
        Receptionist receptionist = receptionistRepository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Receptionist not found!"));
        receptionistRepository.delete(receptionist);
        return true;
    }

    /**
     * Helper method for the conversion between response DTO and model class
     * @param receptionist contains details of the receptionist's
     * @return an {@link ReceptionistResponseDto} containing receptionist data
     */
    public ReceptionistResponseDto mapToDtoFromReceptionist(Receptionist receptionist){
        ReceptionistResponseDto dto = new ReceptionistResponseDto();
        dto.setId(receptionist.getId());
        dto.setEmail(receptionist.getEmail());
        dto.setUsername(receptionist.getUsername());
        dto.setRole("RECEPTIONIST");
        dto.setAddress(receptionist.getAddress());

        return dto;
    }
}
