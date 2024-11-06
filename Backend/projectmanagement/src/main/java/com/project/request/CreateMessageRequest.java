package com.project.request;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class CreateMessageRequest {
    private Long senderId;
    private String content;
    private Long projectId;
}
