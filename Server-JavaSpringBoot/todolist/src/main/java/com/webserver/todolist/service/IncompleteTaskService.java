package com.webserver.todolist.service;

import com.webserver.todolist.exceptions.ITaskNotFoundException;
import com.webserver.todolist.model.IncompleteTask;
import com.webserver.todolist.repo.IncompleteTaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncompleteTaskService {
    private final IncompleteTaskRepo incompleteTaskRepo;

    @Autowired
    public IncompleteTaskService(IncompleteTaskRepo incompleteTaskRepo) {
        this.incompleteTaskRepo = incompleteTaskRepo;
    }

    public IncompleteTask addIncompleteTask(IncompleteTask incompleteTask) {
        return incompleteTaskRepo.save(incompleteTask);
    }

    public List<IncompleteTask> findAllIncompleteTasks() {
        return incompleteTaskRepo.findAll();
    }


    public void deleteIncompleteTask(Long id) {
        incompleteTaskRepo.deleteById(id);
    }

    public IncompleteTask findIncompleteTask(Long id) {
        return incompleteTaskRepo.findITaskById(id).orElseThrow(() -> new
                ITaskNotFoundException("Task (incomplete) by id " + id + " wasn't found"));
    }

}
