package com.project.service;

import com.project.modal.Chat;
import com.project.modal.Message;
import com.project.modal.Project;
import com.project.modal.User;
import com.project.repository.ChatRepository;
import com.project.repository.MessageRepository;
import com.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@Service

public class MessageServiceImpl implements MessageService{
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectService projectService;
    @Override
    public Message sendMessage(Long senderId, Long projectId, String content) throws Exception {
        if (senderId == null) {
            throw new IllegalArgumentException("Sender ID must not be null");
        }
        if (projectId == null) {
            throw new IllegalArgumentException("Project ID must not be null");
        }
        User sender=userRepository.findById(senderId).orElseThrow(() -> new Exception("User not found with id: "+senderId));
        Chat chat=projectService.getProjectById(projectId).getChat();
        Message message=new Message();
        message.setContent(content);
        message.setSender(sender);
        message.setCreatedAt(LocalDate.from(LocalDateTime.now()));
        message.setChat(chat);
        Message savedMessage=messageRepository.save(message);
        chat.getMessages().add(savedMessage);
        return savedMessage;
    }

    @Override
    public List<Message> getMessagesByProjectId(Long projectId) throws Exception {
        Chat chat=projectService.getChatByProjectId(projectId);
        return messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
    }
}
