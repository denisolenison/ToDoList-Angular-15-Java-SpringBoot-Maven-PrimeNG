package com.webserver.todolist.service;

import com.webserver.todolist.exceptions.CTaskNotFoundException;
import com.webserver.todolist.model.CompleteTask;
import com.webserver.todolist.repo.CompleteTaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompleteTaskService {
    private final CompleteTaskRepo completeTaskRepo;

    @Autowired
    public CompleteTaskService(CompleteTaskRepo completeTaskRepo) {
        this.completeTaskRepo = completeTaskRepo;
    }

    public CompleteTask addCompleteTask(CompleteTask completeTask) {
        return completeTaskRepo.save(completeTask);
    }

    public List<CompleteTask> findAllCompleteTasks() {
        return completeTaskRepo.findAll();
    }

    public void deleteCompleteTask(Long id) {
        completeTaskRepo.deleteById(id);
    }

    public CompleteTask findCompleteTask(Long id) {
        return completeTaskRepo.findCTaskById(id).orElseThrow(() -> new
                CTaskNotFoundException("Task (complete) by id " + id + " wasn't found"));
    }

}
