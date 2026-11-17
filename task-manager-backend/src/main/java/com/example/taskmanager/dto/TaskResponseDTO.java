package com.example.taskmanager.dto;

import java.time.Instant;

import com.example.taskmanager.model.Task;

public record TaskResponseDTO(Long id,
    String title,
    String description,
    Instant createdAt) {
	 public static TaskResponseDTO from(Task task) {
	        return new TaskResponseDTO(
	            task.getId(),
	            task.getTitle(),
	            task.getDescription(),
	            task.getCreatedAt()
	        );
	    }
}