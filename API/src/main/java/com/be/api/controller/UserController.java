package com.be.api.controller;

import com.be.api.entity.User;
import com.be.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/users")
public class UserController {

    // ใช้ @Autowired เพื่อทำ Dependency Injection สำหรับ UserRepository
    @Autowired
    private UserRepository userRepository;


    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    @PostMapping
    public List<User> createUsers(@RequestBody List<User> users) {
        return userRepository.saveAll(users);
    }

    //@PostMapping
    //public User createUser(@RequestBody User user) {
      //  return userRepository.save(user);  // บันทึกผู้ใช้ใหม่ในฐานข้อมูล
   // }


    @PutMapping("/{id}")
    public Optional<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userRepository.findById(id).map(user -> {
            // อัปเดตชื่อและอีเมลของผู้ใช้
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        });
    }


    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    @GetMapping("/search")
    public List<User> getUsersByName(@RequestParam String name) {
        return userRepository.findByName(name);
    }
}
