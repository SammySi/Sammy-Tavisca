import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { taskModel } from 'src/app/shared/models/taskModel';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { element } from 'protractor';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.scss']
})
export class TaskElementComponent implements OnInit {
  title: string;
  taskLists: Array<taskModel>;
  @Output('detailsToDisplay') display = new EventEmitter<number>();
  @Output('delete') deleteDetail = new EventEmitter<number>();
  @Output('draggedElement') elementDrag = new EventEmitter<any>();
  @Output('draggedList') listDrag = new EventEmitter<any>();

  @Input('taskDetail') set taskDetail(data) {
    this.title = data.name;
    this.taskLists = data.tasks.sort(this.sortTasks);
  }

  constructor() { }

  ngOnInit(): void {
  }

  displayOnScreen(index: number) {
    this.display.emit(index)
  }

  startDrag(element, elemIndex, title) {
    let dataToBeSent = {
      'source': title,
      'elemIndex': elemIndex
    }
    element.dataTransfer.setData("taskData", JSON.stringify(dataToBeSent));
  }

  startListDrag(event) {
    let dataToBeSent = {
      'source': this.title
    }
    event.dataTransfer.setData("taskData", JSON.stringify(dataToBeSent))
  }

  insertElement(event) {
    event.preventDefault();
    let data = JSON.parse(event.dataTransfer.getData("taskData"));
    let dataToSend;
    if (data.elemIndex) {
      dataToSend = {
        'source': data.source,
        'elemIndex': data.elemIndex,
        'target': this.title
      }
      this.elementDrag.emit(dataToSend);
    } else {
      dataToSend = {
        'source': data.source,
        'target': this.title
      }
      this.listDrag.emit(dataToSend);
    }
  }

  allowDrag(event) {
    event.preventDefault();
  }

  delete(isList, index) {
    if (isList) {
      this.deleteDetail.emit(null);
    } else {
      this.deleteDetail.emit(index);
    }
  }

  sortTasks(prev: taskModel, next: taskModel) {
    let prevmsc = Date.parse(prev.date);
    let nextmsc = Date.parse(next.date);
    return (prevmsc - nextmsc);
  }

  formatDate(sampledate) {
    let date = new Date(sampledate)
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    return (day + '-' + month + '-' + year);
  }

}
