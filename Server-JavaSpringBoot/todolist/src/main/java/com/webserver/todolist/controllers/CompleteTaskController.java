package com.webserver.todolist.controllers;

import com.webserver.todolist.model.CompleteTask;
import com.webserver.todolist.model.IncompleteTask;
import com.webserver.todolist.repo.CompleteTaskRepo;
import com.webserver.todolist.repo.IncompleteTaskRepo;
import com.webserver.todolist.service.CompleteTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ct")
public class CompleteTaskController {
    private final CompleteTaskService CompleteTaskService;

    @Autowired
    CompleteTaskRepo completeTaskRepo;

    public CompleteTaskController(CompleteTaskService CompleteTaskService) {
        this.CompleteTaskService = CompleteTaskService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<CompleteTask>> getAllCompleteTasks() {
        List<CompleteTask> CompleteTasks = CompleteTaskService.findAllCompleteTasks();
        return new ResponseEntity<>(CompleteTasks, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<CompleteTask> getCompleteTaskById(@PathVariable("id") Long id) {
        CompleteTask cTask = CompleteTaskService.findCompleteTask(id);
        return new ResponseEntity<>(cTask, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<CompleteTask> addCompleteTask(@RequestBody CompleteTask cTask) {
        CompleteTask newCTask = CompleteTaskService.addCompleteTask(cTask);
        return new ResponseEntity<>(newCTask, HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<CompleteTask> editCompleteTask(@PathVariable("id") Long id, @RequestBody CompleteTask cTask) {
        Optional<CompleteTask> thisCTask = Optional.ofNullable(CompleteTaskService.findCompleteTask(id));

        if (thisCTask.isPresent()) {
            CompleteTask thisCTaskData = thisCTask.get();
            thisCTaskData.setTaskId(cTask.getTaskId());
            thisCTaskData.setTaskName(cTask.getTaskName());
            thisCTaskData.setTaskStartDate(cTask.getTaskStartDate());
            thisCTaskData.setTaskEndDate(cTask.getTaskEndDate());
            thisCTaskData.setTaskCompleteDate(cTask.getTaskCompleteDate());
            thisCTaskData.setTaskProgress(cTask.getTaskProgress());
            return new ResponseEntity<>(completeTaskRepo.save(thisCTaskData), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/edit2/{id}/{id2}")
    public ResponseEntity<List<CompleteTask>> editTwoCompleteTasks(@PathVariable("id") Long id, @PathVariable("id2") Long id2,
                                                                   @RequestBody List<CompleteTask> cTasks) {

        Optional<CompleteTask> thisCTask1 = Optional.ofNullable(CompleteTaskService.findCompleteTask(id));
        Optional<CompleteTask> thisCTask2 = Optional.ofNullable(CompleteTaskService.findCompleteTask(id2));

        if (thisCTask1.isPresent()) {
            CompleteTask thisCTaskData1 = thisCTask1.get();

            thisCTaskData1.setTaskId(cTasks.get(0).getTaskId());
            thisCTaskData1.setTaskName(cTasks.get(0).getTaskName());
            thisCTaskData1.setTaskStartDate(cTasks.get(0).getTaskStartDate());
            thisCTaskData1.setTaskEndDate(cTasks.get(0).getTaskEndDate());
            thisCTaskData1.setTaskCompleteDate(cTasks.get(0).getTaskCompleteDate());
            thisCTaskData1.setTaskProgress(cTasks.get(0).getTaskProgress());

            if (thisCTask2.isPresent()) {
                ArrayList<CompleteTask> this2CTasksData = new ArrayList<CompleteTask>();

                CompleteTask thisCTaskData2 = thisCTask2.get();

                thisCTaskData2.setTaskId(cTasks.get(1).getTaskId());
                thisCTaskData2.setTaskName(cTasks.get(1).getTaskName());
                thisCTaskData2.setTaskStartDate(cTasks.get(1).getTaskStartDate());
                thisCTaskData2.setTaskEndDate(cTasks.get(1).getTaskEndDate());
                thisCTaskData2.setTaskCompleteDate(cTasks.get(1).getTaskCompleteDate());
                thisCTaskData2.setTaskProgress(cTasks.get(1).getTaskProgress());

                this2CTasksData.add(thisCTaskData1);
                this2CTasksData.add(thisCTaskData2);

                return new ResponseEntity<>(completeTaskRepo.saveAll(this2CTasksData), HttpStatus.OK);
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
    public ResponseEntity<List<CompleteTask>> editAllCompleteTasks(@RequestBody List<CompleteTask> cTasks) {
        Optional<List<CompleteTask>> thisCTasks = Optional.ofNullable(CompleteTaskService.findAllCompleteTasks());
        if (thisCTasks.isPresent()) {
            if (cTasks.size() == thisCTasks.get().size()) {
                ArrayList<CompleteTask> thisAllCTasksData = new ArrayList<CompleteTask>();
                for (int i = 0; i < cTasks.size(); ++i) {
                    CompleteTask thisCTaskData = thisCTasks.get().get(i);
                    thisCTaskData.setTaskId(cTasks.get(i).getTaskId());
                    thisCTaskData.setTaskName(cTasks.get(i).getTaskName());
                    thisCTaskData.setTaskStartDate(cTasks.get(i).getTaskStartDate());
                    thisCTaskData.setTaskEndDate(cTasks.get(i).getTaskEndDate());
                    thisCTaskData.setTaskCompleteDate(cTasks.get(i).getTaskCompleteDate());
                    thisCTaskData.setTaskProgress(cTasks.get(i).getTaskProgress());
                    thisAllCTasksData.add(thisCTaskData);
                }
                return new ResponseEntity<>(completeTaskRepo.saveAll(thisAllCTasksData), HttpStatus.OK);
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
    public ResponseEntity<HttpStatus> deleteCompleteTaskById(@PathVariable("id") Long id) {
        CompleteTaskService.deleteCompleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
