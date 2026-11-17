package com.example.taskmanager.model;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false)
	    private String title;

	    @Column(length = 1000)
	    private String description;

	    @CreationTimestamp
	    @Column(nullable = false, updatable = false)
	    private Instant createdAt;

	    public Task() {}

	    public Task(String title, String description) {
	        this.title = title;
	        this.description = description;
	    }

	    public Long getId() { return id; }
	    public String getTitle() { return title; }
	    public String getDescription() { return description; }
	    public Instant getCreatedAt() { return createdAt; }

}
