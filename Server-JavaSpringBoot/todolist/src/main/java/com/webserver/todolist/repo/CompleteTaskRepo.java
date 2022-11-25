package com.webserver.todolist.repo;

import com.webserver.todolist.model.CompleteTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompleteTaskRepo extends JpaRepository<CompleteTask, Long>{

    void deleteCTaskById(Long id);
    Optional<CompleteTask> findCTaskById(Long id);
}
