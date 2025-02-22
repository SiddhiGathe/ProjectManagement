package com.project.service;

import com.project.modal.User;

public interface UserService {
    User findUserProfileByJwt(String jwt)throws Exception;
    User findUserByEmail(String email)throws Exception;
    User findUserById(Long user)throws Exception;
    User updateUsersProjectSize(User user,int number);
}
