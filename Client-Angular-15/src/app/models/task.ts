export interface Task {

  id: number
  taskId: number;
  taskName: string;
  taskStartDate: string;
  taskEndDate: string;
  taskProgress: number;
  taskIsComplete: boolean;
  taskCompleteDate: string;

  getProgress() : void;
}

export class incTask implements Task {

  constructor(id: number, taskId: number, taskName: string, taskStartDate: string,
              taskEndDate: string, taskIsComplete: boolean = false) {
    this.id = id;
    this.taskId = taskId;
    this.taskName = taskName;
    this.taskStartDate = taskStartDate;
    this.taskEndDate = taskEndDate;
    this.taskIsComplete = taskIsComplete;
    this.taskCompleteDate = new Date().toISOString();
    this.getProgress();
  }


  id: number;
  taskId: number;
  taskName: string;
  taskStartDate: string;
  taskEndDate: string;
  taskProgress: number;
  taskIsComplete: boolean;
  taskCompleteDate: string;

  getProgress() : void {
    this.taskProgress = ((new Date()).valueOf() - new Date(this.taskStartDate).valueOf()) /
      (new Date(this.taskEndDate).valueOf() - new Date(this.taskStartDate).valueOf());
    ((this.taskProgress > 1) ? this.taskProgress = 1 : this.taskProgress);
    ((this.taskProgress < 0) ? this.taskProgress = 0 : this.taskProgress);
  }
}

export class cTask extends incTask {

  constructor(id: number, taskId: number, taskName: string, taskStartDate: string,
              taskEndDate: string, taskIsComplete: boolean = true, taskCompleteDate: string) {
    super(id, taskId, taskName, taskStartDate, taskEndDate, taskIsComplete)
    this.taskCompleteDate = taskCompleteDate;
    this.taskProgress = 0;
  }

  override getProgress() : void {
  }
}
