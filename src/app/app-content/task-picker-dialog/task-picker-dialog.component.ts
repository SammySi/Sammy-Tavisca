import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-picker-dialog',
  templateUrl: './task-picker-dialog.component.html',
  styleUrls: ['./task-picker-dialog.component.scss']
})
export class TaskPickerDialogComponent implements OnInit {
  returnValue: string;
  title: string;
  optionsList: Array<any>;
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<TaskPickerDialogComponent>) {
    this.title = data.title;
    this.optionsList = data.list;
   }

  ngOnInit(): void {
    
  }

  setReturnValue(event) {
    let taskListIndex = this.optionsList.findIndex(x => x.name === event.source.group.label);
    let taskIndex = this.optionsList[taskListIndex].tasks.findIndex(x => x.name === event.source.value);
    let returnValue = {
      taskListIndex: taskListIndex,
      taskIndex: taskIndex
    }
    this.dialogRef.close(returnValue);
  }

}
