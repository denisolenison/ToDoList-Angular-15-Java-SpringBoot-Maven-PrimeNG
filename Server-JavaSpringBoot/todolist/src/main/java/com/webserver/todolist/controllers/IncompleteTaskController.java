package com.webserver.todolist.controllers;

import com.webserver.todolist.model.IncompleteTask;
import com.webserver.todolist.repo.IncompleteTaskRepo;
import com.webserver.todolist.service.IncompleteTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/it")
public class IncompleteTaskController {
    private final IncompleteTaskService incompleteTaskService;

    @Autowired
    IncompleteTaskRepo incompleteTaskRepo;

    public IncompleteTaskController(IncompleteTaskService incompleteTaskService) {
        this.incompleteTaskService = incompleteTaskService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<IncompleteTask>> getAllIncompleteTasks() {
        List<IncompleteTask> incompleteTasks = incompleteTaskService.findAllIncompleteTasks();
        return new ResponseEntity<>(incompleteTasks, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<IncompleteTask> getIncompleteTaskById(@PathVariable("id") Long id) {
        IncompleteTask incTask = incompleteTaskService.findIncompleteTask(id);
        return new ResponseEntity<>(incTask, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<IncompleteTask> addIncompleteTask(@RequestBody IncompleteTask incTask) {
        IncompleteTask newIncTask = incompleteTaskService.addIncompleteTask(incTask);
        return new ResponseEntity<>(newIncTask, HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<IncompleteTask> editIncompleteTask(@PathVariable("id") Long id, @RequestBody IncompleteTask incTask) {
        Optional<IncompleteTask> thisITask = Optional.ofNullable(incompleteTaskService.findIncompleteTask(id));

        if (thisITask.isPresent()) {
            IncompleteTask thisITaskData = thisITask.get();
            thisITaskData.setTaskId(incTask.getTaskId());
            thisITaskData.setTaskName(incTask.getTaskName());
            thisITaskData.setTaskStartDate(incTask.getTaskStartDate());
            thisITaskData.setTaskEndDate(incTask.getTaskEndDate());
            thisITaskData.setTaskCompleteDate(incTask.getTaskCompleteDate());
            thisITaskData.setTaskProgress(incTask.getTaskProgress());
            return new ResponseEntity<>(incompleteTaskRepo.save(thisITaskData), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/edit2/{id}/{id2}")
    public ResponseEntity<List<IncompleteTask>> editTwoIncompleteTasks(@PathVariable("id") Long id, @PathVariable("id2") Long id2,
                                                                 @RequestBody List<IncompleteTask> incTasks) {

        Optional<IncompleteTask> thisITask1 = Optional.ofNullable(incompleteTaskService.findIncompleteTask(id));
        Optional<IncompleteTask> thisITask2 = Optional.ofNullable(incompleteTaskService.findIncompleteTask(id2));

        if (thisITask1.isPresent()) {
            IncompleteTask thisITaskData1 = thisITask1.get();

            thisITaskData1.setTaskId(incTasks.get(0).getTaskId());
            thisITaskData1.setTaskName(incTasks.get(0).getTaskName());
            thisITaskData1.setTaskStartDate(incTasks.get(0).getTaskStartDate());
            thisITaskData1.setTaskEndDate(incTasks.get(0).getTaskEndDate());
            thisITaskData1.setTaskCompleteDate(incTasks.get(0).getTaskCompleteDate());
            thisITaskData1.setTaskProgress(incTasks.get(0).getTaskProgress());

            if (thisITask2.isPresent()) {
                ArrayList<IncompleteTask> this2ITasksData = new ArrayList<IncompleteTask>();

                IncompleteTask thisITaskData2 = thisITask2.get();

                thisITaskData2.setTaskId(incTasks.get(1).getTaskId());
                thisITaskData2.setTaskName(incTasks.get(1).getTaskName());
                thisITaskData2.setTaskStartDate(incTasks.get(1).getTaskStartDate());
                thisITaskData2.setTaskEndDate(incTasks.get(1).getTaskEndDate());
                thisITaskData2.setTaskCompleteDate(incTasks.get(1).getTaskCompleteDate());
                thisITaskData2.setTaskProgress(incTasks.get(1).getTaskProgress());

                this2ITasksData.add(thisITaskData1);
                this2ITasksData.add(thisITaskData2);

                return new ResponseEntity<>(incompleteTaskRepo.saveAll(this2ITasksData), HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/editall")
    public ResponseEntity<List<IncompleteTask>> editAllIncompleteTasks(@RequestBody List<IncompleteTask> incTasks) {
        Optional<List<IncompleteTask>> thisITasks = Optional.ofNullable(incompleteTaskService.findAllIncompleteTasks());
        if (thisITasks.isPresent()) {
            if (incTasks.size() == thisITasks.get().size()) {
                ArrayList<IncompleteTask> thisAllITasksData = new ArrayList<IncompleteTask>();
                for (int i = 0; i < incTasks.size(); ++i) {
                    IncompleteTask thisITaskData = thisITasks.get().get(i);
                    thisITaskData.setTaskId(incTasks.get(i).getTaskId());
                    thisITaskData.setTaskName(incTasks.get(i).getTaskName());
                    thisITaskData.setTaskStartDate(incTasks.get(i).getTaskStartDate());
                    thisITaskData.setTaskEndDate(incTasks.get(i).getTaskEndDate());
                    thisITaskData.setTaskCompleteDate(incTasks.get(i).getTaskCompleteDate());
                    thisITaskData.setTaskProgress(incTasks.get(i).getTaskProgress());
                    thisAllITasksData.add(thisITaskData);
                }
                return new ResponseEntity<>(incompleteTaskRepo.saveAll(thisAllITasksData), HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteIncompleteTaskById(@PathVariable("id") Long id) {
        incompleteTaskService.deleteIncompleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
