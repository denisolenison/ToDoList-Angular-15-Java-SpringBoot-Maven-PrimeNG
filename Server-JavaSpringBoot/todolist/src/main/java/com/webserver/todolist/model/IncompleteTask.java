package com.webserver.todolist.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class IncompleteTask implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;

    private Long taskId;
    private String taskName;
    private String taskStartDate;
    private String taskEndDate;
    private float taskProgress;
    private boolean taskIsComplete;
    private String taskCompleteDate;

    public IncompleteTask() {}

    public IncompleteTask(Long taskId, String taskName, String taskStartDate, String taskEndDate, float taskProgress,
                          String taskCompleteDate) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskStartDate = taskStartDate;
        this.taskEndDate = taskEndDate;
        this.taskProgress = taskProgress;
        this.taskIsComplete = false;
        this.taskCompleteDate = taskCompleteDate;
    }

    public Long getId() {
        return id;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskStartDate() {
        return taskStartDate;
    }

    public void setTaskStartDate(String taskStartDate) {
        this.taskStartDate = taskStartDate;
    }

    public String getTaskEndDate() {
        return taskEndDate;
    }

    public void setTaskEndDate(String taskEndDate) {
        this.taskEndDate = taskEndDate;
    }

    public float getTaskProgress() {
        return taskProgress;
    }

    public void setTaskProgress(float taskProgress) {
        this.taskProgress = taskProgress;
    }

    public boolean isTaskIsComplete() {
        return taskIsComplete;
    }

    public void setTaskIsComplete(boolean taskIsComplete) {
        this.taskIsComplete = taskIsComplete;
    }

    public String getTaskCompleteDate() {
        return taskCompleteDate;
    }

    public void setTaskCompleteDate(String taskCompleteDate) {
        this.taskCompleteDate = taskCompleteDate;
    }
}
