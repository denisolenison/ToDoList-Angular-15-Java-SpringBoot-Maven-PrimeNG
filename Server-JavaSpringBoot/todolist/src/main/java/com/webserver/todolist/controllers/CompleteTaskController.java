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
            thisCTaskData.setT_id(cTask.getT_id());
            thisCTaskData.setT_name(cTask.getT_name());
            thisCTaskData.setT_startDate(cTask.getT_startDate());
            thisCTaskData.setT_endDate(cTask.getT_endDate());
            thisCTaskData.setT_completeDate(cTask.getT_completeDate());
            thisCTaskData.setT_progress(cTask.getT_progress());
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

            thisCTaskData1.setT_id(cTasks.get(0).getT_id());
            thisCTaskData1.setT_name(cTasks.get(0).getT_name());
            thisCTaskData1.setT_startDate(cTasks.get(0).getT_startDate());
            thisCTaskData1.setT_endDate(cTasks.get(0).getT_endDate());
            thisCTaskData1.setT_completeDate(cTasks.get(0).getT_completeDate());
            thisCTaskData1.setT_progress(cTasks.get(0).getT_progress());

            if (thisCTask2.isPresent()) {
                ArrayList<CompleteTask> this2CTasksData = new ArrayList<CompleteTask>();

                CompleteTask thisCTaskData2 = thisCTask2.get();

                thisCTaskData2.setT_id(cTasks.get(1).getT_id());
                thisCTaskData2.setT_name(cTasks.get(1).getT_name());
                thisCTaskData2.setT_startDate(cTasks.get(1).getT_startDate());
                thisCTaskData2.setT_endDate(cTasks.get(1).getT_endDate());
                thisCTaskData2.setT_completeDate(cTasks.get(1).getT_completeDate());
                thisCTaskData2.setT_progress(cTasks.get(1).getT_progress());

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
                    thisCTaskData.setT_id(cTasks.get(i).getT_id());
                    thisCTaskData.setT_name(cTasks.get(i).getT_name());
                    thisCTaskData.setT_startDate(cTasks.get(i).getT_startDate());
                    thisCTaskData.setT_endDate(cTasks.get(i).getT_endDate());
                    thisCTaskData.setT_completeDate(cTasks.get(i).getT_completeDate());
                    thisCTaskData.setT_progress(cTasks.get(i).getT_progress());
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
