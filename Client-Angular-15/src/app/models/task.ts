export interface Task {

  id: number
  t_id: number;
  t_name: string;
  t_startDate: string;
  t_endDate: string;
  t_progress: number;
  t_isComplete: boolean;
  t_completeDate: string;

  getProgress() : void;
}

export class incTask implements Task {

  constructor(id: number, t_id: number, t_name: string, t_startDate: string,
              t_endDate: string, t_isComplete: boolean = false) {
    this.id = id;
    this.t_id = t_id;
    this.t_name = t_name;
    this.t_startDate = t_startDate;
    this.t_endDate = t_endDate;
    this.t_isComplete = t_isComplete;
    this.t_completeDate = new Date().toISOString();
    this.getProgress();
  }


  id: number;
  t_id: number;
  t_name: string;
  t_startDate: string;
  t_endDate: string;
  t_progress: number;
  t_isComplete: boolean;
  t_completeDate: string;

  getProgress() : void {
    this.t_progress = ((new Date()).valueOf() - new Date(this.t_startDate).valueOf()) /
      (new Date(this.t_endDate).valueOf() - new Date(this.t_startDate).valueOf());
    ((this.t_progress > 1) ? this.t_progress = 1 : this.t_progress);
    ((this.t_progress < 0) ? this.t_progress = 0 : this.t_progress);
  }
}

export class cTask extends incTask {

  constructor(id: number, t_id: number, t_name: string, t_startDate: string,
              t_endDate: string, t_isComplete: boolean = true, t_completeDate: string) {
    super(id, t_id, t_name, t_startDate, t_endDate, t_isComplete)
    this.t_completeDate = t_completeDate;
    this.t_progress = 0;
  }

  override getProgress() : void {
  }
}
