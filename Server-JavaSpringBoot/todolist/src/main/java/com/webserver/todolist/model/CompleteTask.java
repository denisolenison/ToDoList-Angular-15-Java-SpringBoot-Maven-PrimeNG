package com.webserver.todolist.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class CompleteTask implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private Long t_id;
    private String t_name;
    private String t_startDate;
    private String t_endDate;
    private float t_progress;
    private boolean t_isComplete;
    private String t_completeDate;

    public CompleteTask() {}

    public CompleteTask(Long t_id, String t_name, String t_startDate, String t_endDate, float t_progress,
                          String t_completeDate) {
        this.t_id = t_id;
        this.t_name = t_name;
        this.t_startDate = t_startDate;
        this.t_endDate = t_endDate;
        this.t_progress = t_progress;
        this.t_isComplete = true;
        this.t_completeDate = t_completeDate;
    }

    public Long get_id() {
        return id;
    }

    public Long getT_id() {
        return t_id;
    }

    public void setT_id(Long t_id) {
        this.t_id = t_id;
    }

    public String getT_name() {
        return t_name;
    }

    public void setT_name(String t_name) {
        this.t_name = t_name;
    }

    public String getT_startDate() {
        return t_startDate;
    }

    public void setT_startDate(String t_startDate) {
        this.t_startDate = t_startDate;
    }

    public String getT_endDate() {
        return t_endDate;
    }

    public void setT_endDate(String t_endDate) {
        this.t_endDate = t_endDate;
    }

    public float getT_progress() {
        return t_progress;
    }

    public void setT_progress(float t_progress) {
        this.t_progress = t_progress;
    }

    public String getT_completeDate() {
        return t_completeDate;
    }

    public void setT_completeDate(String t_completeDate) {
        this.t_completeDate = t_completeDate;
    }
}
