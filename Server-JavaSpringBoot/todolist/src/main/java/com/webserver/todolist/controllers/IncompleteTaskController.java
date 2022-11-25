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
            thisITaskData.setT_id(incTask.getT_id());
            thisITaskData.setT_name(incTask.getT_name());
            thisITaskData.setT_startDate(incTask.getT_startDate());
            thisITaskData.setT_endDate(incTask.getT_endDate());
            thisITaskData.setT_completeDate(incTask.getT_completeDate());
            thisITaskData.setT_progress(incTask.getT_progress());
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

            thisITaskData1.setT_id(incTasks.get(0).getT_id());
            thisITaskData1.setT_name(incTasks.get(0).getT_name());
            thisITaskData1.setT_startDate(incTasks.get(0).getT_startDate());
            thisITaskData1.setT_endDate(incTasks.get(0).getT_endDate());
            thisITaskData1.setT_completeDate(incTasks.get(0).getT_completeDate());
            thisITaskData1.setT_progress(incTasks.get(0).getT_progress());

            if (thisITask2.isPresent()) {
                ArrayList<IncompleteTask> this2ITasksData = new ArrayList<IncompleteTask>();

                IncompleteTask thisITaskData2 = thisITask2.get();

                thisITaskData2.setT_id(incTasks.get(1).getT_id());
                thisITaskData2.setT_name(incTasks.get(1).getT_name());
                thisITaskData2.setT_startDate(incTasks.get(1).getT_startDate());
                thisITaskData2.setT_endDate(incTasks.get(1).getT_endDate());
                thisITaskData2.setT_completeDate(incTasks.get(1).getT_completeDate());
                thisITaskData2.setT_progress(incTasks.get(1).getT_progress());

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
                    thisITaskData.setT_id(incTasks.get(i).getT_id());
                    thisITaskData.setT_name(incTasks.get(i).getT_name());
                    thisITaskData.setT_startDate(incTasks.get(i).getT_startDate());
                    thisITaskData.setT_endDate(incTasks.get(i).getT_endDate());
                    thisITaskData.setT_completeDate(incTasks.get(i).getT_completeDate());
                    thisITaskData.setT_progress(incTasks.get(i).getT_progress());
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
