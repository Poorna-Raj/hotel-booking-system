package com.hbs.user_service.service;

import com.hbs.user_service.data.dto.AdminRegisterDto;
import com.hbs.user_service.data.dto.AdminResponseDto;
import com.hbs.user_service.data.model.Admin;
import com.hbs.user_service.data.repository.AdminRepository;
import com.hbs.user_service.exception.ContentNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    /**
     * Creates a new admin account and save to the database.
     * @param dto contains the admin data required to create a new admin
     * @return an {@link AdminResponseDto} containing the saved admin's details
     */
    public AdminResponseDto addAdmin(AdminRegisterDto dto){
        Admin admin = new Admin();
        admin.setPassword(dto.getPassword());
        admin.setDepartment(dto.getDepartment());
        admin.setEmail(dto.getEmail());
        admin.setUsername(dto.getUsername());
        
        return mapToDtoFromAdmin(adminRepository.save(admin));
    }

    /**
     * Update a given admin based on the ID
     * @param id ID of the Admin
     * @param dto New data to be updated for the current admin details
     * @return an {@link AdminResponseDto} containing admin details
     */
    public AdminResponseDto updateAdmin(long id, AdminRegisterDto dto){
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Admin not found!"));

        admin.setUsername(dto.getUsername());
        admin.setPassword(dto.getPassword());
        admin.setEmail(dto.getEmail());
        admin.setDepartment(dto.getDepartment());

        return mapToDtoFromAdmin(adminRepository.save(admin));
    }

    /**
     * Search and return the admin details based on the ID
     * @param id admin's ID
     * @return an {@link AdminResponseDto} containing admin details
     */
    public AdminResponseDto getAdminById(Long id){
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Invalid Admin!"));
        return mapToDtoFromAdmin(admin);
    }

    /**
     * Fetch all the admins
     * @return  a List of {@link AdminResponseDto} containing admin details
     */
    public List<AdminResponseDto> getAllAdmin(){
        return adminRepository.findAll()
                .stream()
                .map(this::mapToDtoFromAdmin)
                .toList();
    }

    /**
     * Delete an admin based on the ID
     * @param id Admin's ID
     * @return {@code boolean} value based on the result
     */
    public boolean deleteById(Long id){
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Invalid Admin!"));
        adminRepository.delete(admin);
        return true;
    }

    /**
     * Helper method for conversion between DTO and Model class
     * @param save Admin entity class
     * @return an {@link AdminResponseDto} containing admin details
     */
    private AdminResponseDto mapToDtoFromAdmin(Admin save) {
        AdminResponseDto dto = new AdminResponseDto();
        dto.setId(save.getId());
        dto.setUsername(save.getUsername());
        dto.setEmail(save.getEmail());
        dto.setRole("ADMIN");
        dto.setDepartment(save.getDepartment());

        return dto;
    }
}
