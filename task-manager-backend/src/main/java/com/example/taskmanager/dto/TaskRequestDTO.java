package com.example.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public record TaskRequestDTO (

	 @NotBlank(message = "Title is required and cannot be empty")
	 @Size(max = 150, message = "Title must be under 150 characters")
	    String title,
	 @Size(max = 500, message = "Description must be under 500 characters")
	    String description
	) {}