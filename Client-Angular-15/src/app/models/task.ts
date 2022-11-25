export interface Task {

  t_id: number;
  t_name: string;
  t_startDate: Date;
  t_endDate: Date;
  t_progress: number;
  t_isComplete: boolean;
  t_completeDate: Date;

  getProgress() : void;
}

export class incTask implements Task {

  constructor(t_id: number, t_name: string, t_startDate: Date,
              t_endDate: Date, t_isComplete: boolean = false) {
    this.t_id = t_id;
    this.t_name = t_name;
    this.t_startDate = t_startDate;
    this.t_endDate = t_endDate;
    this.t_isComplete = t_isComplete;
    this.t_completeDate = new Date();
    this.getProgress();
  }

  t_id: number;
  t_name: string;
  t_startDate: Date;
  t_endDate: Date;
  t_progress: number;
  t_isComplete: boolean;
  t_completeDate: Date;

  getProgress() : void {
    this.t_progress = ((new Date()).valueOf() - this.t_startDate.valueOf()) /
      (this.t_endDate.valueOf() - this.t_startDate.valueOf());
    ((this.t_progress > 1) ? this.t_progress = 1 : this.t_progress);
    ((this.t_progress < 0) ? this.t_progress = 0 : this.t_progress);
  }
}

export class cTask extends incTask {

  constructor(t_id: number, t_name: string, t_startDate: Date,
              t_endDate: Date, t_isComplete: boolean = true, t_completeDate: Date) {
    super(t_id, t_name, t_startDate, t_endDate, t_isComplete)
    this.t_completeDate = t_completeDate;
    this.t_progress = 0;
  }

  override getProgress() : void {
  }
}
