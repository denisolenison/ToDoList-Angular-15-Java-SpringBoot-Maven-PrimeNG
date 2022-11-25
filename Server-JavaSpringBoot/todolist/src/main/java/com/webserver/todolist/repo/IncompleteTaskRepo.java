package com.webserver.todolist.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.webserver.todolist.model.IncompleteTask;

import java.util.Optional;

public interface IncompleteTaskRepo extends JpaRepository<IncompleteTask, Long>{
    void deleteITaskById(Long id);
    Optional<IncompleteTask> findITaskById(Long id);
}
