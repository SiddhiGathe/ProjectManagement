package com.project.controller;

import com.project.modal.Chat;
import com.project.modal.Message;
import com.project.modal.User;
import com.project.request.CreateMessageRequest;
import com.project.service.MessageService;
import com.project.service.ProjectService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")

public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProjectService projectService;
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody CreateMessageRequest request)throws Exception{
        // Now, proceed with fetching user and project
        User user = userService.findUserById(request.getSenderId());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + request.getSenderId());
        }

        Chat chats = projectService.getProjectById(request.getProjectId()).getChat();
        if (chats == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chats not found for project ID: " + request.getProjectId());
        }
        Message sentMessage=messageService.sendMessage(request.getSenderId(),request.getProjectId(),request.getContent());
        return ResponseEntity.ok(sentMessage);
    }
    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>>getMessagesByChatId(@PathVariable Long projectId)throws Exception{
        List<Message> messages=messageService.getMessagesByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }
}
