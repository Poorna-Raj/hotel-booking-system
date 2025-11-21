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
    
    public AdminResponseDto addAdmin(AdminRegisterDto dto){
        Admin admin = new Admin();
        admin.setPassword(dto.getPassword());
        admin.setDepartment(dto.getDepartment());
        admin.setEmail(dto.getEmail());
        admin.setUsername(dto.getUsername());
        
        return mapToDtoFromAdmin(adminRepository.save(admin));
    }

    public AdminResponseDto updateAdmin(long id, AdminRegisterDto dto){
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Admin not found!"));

        admin.setUsername(dto.getUsername());
        admin.setPassword(dto.getPassword());
        admin.setEmail(dto.getEmail());
        admin.setDepartment(dto.getDepartment());

        return mapToDtoFromAdmin(adminRepository.save(admin));
    }

    public AdminResponseDto getAdminById(Long id){
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Invalid Admin!"));
        return mapToDtoFromAdmin(admin);
    }

    public List<AdminResponseDto> getAllAdmin(){
        return adminRepository.findAll()
                .stream()
                .map(this::mapToDtoFromAdmin)
                .toList();
    }

    public boolean deleteById(Long id){
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Invalid Admin!"));
        adminRepository.delete(admin);
        return true;
    }

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
