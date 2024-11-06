package com.project.request;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class CreateCommentRequest {
    private Long issueId;
    private String content;
}
