package com.project.service;

import com.project.modal.Comment;
import com.project.modal.Issue;
import com.project.modal.User;
import com.project.repository.CommentRepository;
import com.project.repository.IssueRepository;
import com.project.repository.UserRepository;
import com.project.request.IssueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@Service

public class CommentServiceImpl implements CommentService{
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Comment createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue>issueOptional=issueRepository.findById(issueId);
        Optional<User>userOptional=userRepository.findById(userId);
        if(issueOptional.isEmpty()){
            throw new Exception("Issue not found with ID "+issueId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("User not found with ID "+userId);
        }
        Issue issue=issueOptional.get();
        User user=userOptional.get();
        Comment comment=new Comment();
        comment.setIssue(issue);
        comment.setUser(user);
        comment.setContent(content); // Set the content before saving
        comment.setCreatedDateTime(LocalDate.from(LocalDateTime.now()));
        Comment savedComment=commentRepository.save(comment);
        issue.getComments().add(savedComment);
        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<Comment>commentOptional=commentRepository.findById(commentId);
        Optional<User>userOptional=userRepository.findById(userId);
        if(commentOptional.isEmpty()){
            throw new Exception("Comment not found with ID "+commentId);
        }
        if(userOptional.isEmpty()){
            throw new Exception(("User not found with ID "+userId));
        }
        Comment comment=commentOptional.get();
        User user=userOptional.get();
        if(comment.getUser().equals(user)){
            commentRepository.delete(comment);
        }
        else {
            throw new Exception("User doesn't have permission to delete this comment");
        }
    }

    @Override
    public List<Comment> findCommentByIssueId(Long issueId) {
        return commentRepository.findByIssueId(issueId);
    }
}
