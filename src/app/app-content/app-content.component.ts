import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { taskModel } from '../shared/models/taskModel';
import { taskListElement } from '../shared/models/taskListElement.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { TaskPickerDialogComponent } from './task-picker-dialog/task-picker-dialog.component';

@Component({
  selector: 'app-app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit {

  taskLists: Array<taskListElement> = [];
  currentKeysPressed: Array<string> = [];

  keys: Array<string> = [
    'Name',
    'Description',
    'Date',
    'Status'
  ]

  screenDetails: taskModel;
  selectedTaskType: string;
  enableSubmit: boolean;
  errorMessage: string;
  enableSumbitForEdit: boolean;
  oldName: string;
  enableListAdd: boolean;
  minDate: string;

  newName: string;
  newDesc: string;
  newDate: string;
  newStatus: string;
  newListName: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.taskLists = [
      new taskListElement(
        "To-Do List",
        [
          new taskModel('Laundry', '5 clothes to wash', '2020-08-29T09:30'),
          new taskModel('Medical Check-up', 'Visit doctor', '2020-08-28T16:30')
        ]
      ),
      new taskListElement(
        "Pending",
        [
          new taskModel('Groceries', 'Take list along for shopping', '2020-08-26T13:00'),
          new taskModel('Temple Visit', 'Peace', '2020-08-26T14:00')
        ]
      ),
    ];
  }

  @HostListener('window:keydown', ['$event']) keyDown(event: KeyboardEvent) {
    this.currentKeysPressed = this.currentKeysPressed.concat(event.key);

    switch (this.currentKeysPressed.toLocaleString()) {
      case 'Alt,t': {
        event.preventDefault();
        if (!this.enableSubmit && (this.screenDetails == null)) this.addTaskDetails();
        break;
      }

      case 'Alt,Shift,T': {
        event.preventDefault();
        if (!this.enableListAdd) this.enableAddList();
        break;
      }

      case 'Alt,r': {
        event.preventDefault();
        this.resetScreen();
        break;
      }

      case 'Enter': {
        event.preventDefault();
        if (this.enableSubmit && (this.screenDetails == null) && this.checkFields()) this.submitForValidation(true);
        if (this.screenDetails && this.enableSumbitForEdit && this.checkFields()) this.submitForValidation(false);
        if (this.enableListAdd) this.checkAndAddList();
        break;
      }

      case 'Alt,v': {
        event.preventDefault();
        this.openTaskSelector();
        break;
      }

      case 'Alt,e': {
        event.preventDefault();
        if (this.screenDetails && !this.enableSumbitForEdit) this.editTask();
        break;
      }

      case 'Alt,d': {
        event.preventDefault();
        this.deleteListItem();
        break;
      }

      case 'Alt,Shift,D': {
        event.preventDefault();
        this.deleteList();
        break;
      }
    }
  }

  @HostListener('window:keyup', ['$event']) keyUp(event: KeyboardEvent) {
    this.currentKeysPressed = [];
  }

  populateScreen(taskIndex, taskListIndex) {
    this.screenDetails = this.taskLists[taskListIndex].tasks[taskIndex];
    this.selectedTaskType = this.taskLists[taskListIndex].name;
  }

  addTaskDetails() {
    this.enableSubmit = true;
    this.errorMessage = '';
  }

  submitForValidation(isNewRecord) {
    if (isNewRecord) {
      let newTask: taskModel = new taskModel(this.newName, this.newDesc, this.newDate);
      let duplicateTaskName = this.taskLists.filter(x => x.name === this.newStatus)[0].tasks.find(x => x.name === this.newName);
      if (duplicateTaskName) {
        this.errorMessage = "Task for Name already exists. Please try another name."
      } else {
        let ind = this.taskLists.findIndex(x => x.name === this.newStatus);
        this.taskLists[ind].tasks.push(newTask);
      }
      this.enableSubmit = false;
    } else {
      let ind = this.taskLists.findIndex(x => x.name === this.newStatus);
      let taskInd = this.taskLists[ind].tasks.findIndex(x => x.name === this.oldName);
      this.taskLists[ind].tasks[taskInd].name = this.newName;
      this.taskLists[ind].tasks[taskInd].description = this.newDesc;
      this.taskLists[ind].tasks[taskInd].date = this.newDate;
    }
    this.sortTaskData();
    this.resetScreen();
  }

  resetScreen() {
    this.screenDetails = null;
    this.errorMessage = '';
    this.enableSubmit = false;
    this.enableListAdd = false;
    this.newListName = '';
    this.selectedTaskType = null;
    this.enableSumbitForEdit = false;
    this.newName = null;
    this.newDesc = null;
    this.newDate = null;
    this.newStatus = null;
  }

  editTask() {
    this.oldName = this.screenDetails.name;
    this.newName = this.screenDetails.name;
    this.newDesc = this.screenDetails.description;
    this.newDate = this.screenDetails.date;
    this.newStatus = this.selectedTaskType;
    this.enableSumbitForEdit = true;
    this.errorMessage = '';
  }

  checkFields() {
    return (this.newName && this.newDesc && this.newDate && this.newStatus);
  }

  deleteItem(index, listIndex) {
    this.errorMessage = '';
    let deleteConf = confirm('Do you wish to delete the' + (index ? ' task' : ' task list'));
    if (deleteConf) {
      if (index != null) {
        this.taskLists[listIndex].tasks.splice(index, 1);
      } else {
        this.taskLists.splice(listIndex, 1);
      }
    }
    this.sortTaskData();
  }

  enableAddList() {
    this.errorMessage = '';
    this.enableListAdd = true;
    this.newListName = '';
  }

  checkAndAddList() {
    let duplicateList = this.taskLists.find(x => x.name === this.newListName);
    if (duplicateList) {
      this.errorMessage = "Provided list name already exists."
    } else {
      let newTaskList: taskListElement = new taskListElement(this.newListName, []);
      this.taskLists.push(newTaskList);
    }
    this.newListName = '';
    this.enableListAdd = false;
  }

  checkElement(elementData) {
    let sourceInd = this.taskLists.findIndex(x => x.name === elementData.source);
    let destinationInd = this.taskLists.findIndex(x => x.name === elementData.target);
    let originalTask = this.taskLists[sourceInd].tasks[elementData.elemIndex];
    let duplicateTask = this.taskLists[destinationInd].tasks.find(x => x.name === originalTask.name);
    if (duplicateTask) {
      this.errorMessage = 'Cannot add dropped task since it already exists in the list.';
    } else {
      this.taskLists[sourceInd].tasks.splice(elementData.elemIndex, 1);
      this.taskLists[destinationInd].tasks.push(originalTask);
      this.sortTaskData();
    }
  }

  checkList(elementData) {
    let sourceInd = this.taskLists.findIndex(x => x.name === elementData.source);
    let destInd;
    if(elementData.target) {
      destInd = this.taskLists.findIndex(x => x.name === elementData.target);
      if(sourceInd < destInd){
        this.taskLists.splice(destInd + 1, 0, this.taskLists[sourceInd]);
        this.taskLists.splice(sourceInd, 1);
      } 
      else if(sourceInd > destInd) {
        let elemToAdd = this.taskLists[sourceInd];
        this.taskLists.splice(sourceInd, 1);
        this.taskLists.splice(destInd, 0, elemToAdd);
      } 
    }
  }

  sortTaskData() {
    this.taskLists.forEach(element => {
      element.tasks = element.tasks.sort(this.sortTasks);
    });
  }

  sortTasks(prev: taskModel, next: taskModel) {
    let prevmsc = Date.parse(prev.date);
    let nextmsc = Date.parse(next.date);
    return (prevmsc - nextmsc);
  }

  deleteList() {
    const dialog = this.dialog.open(DialogContainerComponent, {
      data: {
        'list': this.taskLists.map((element) => {
          return element.name
        }),
        'title': 'Delete List Item'
      },
      width: '450px'
    })
    let listToDelete: string
    dialog.afterClosed().subscribe((res) => {
      listToDelete = res;
      let ind = this.taskLists.findIndex(x => x.name === listToDelete);
      if (ind === -1) {
        this.errorMessage = 'List with provided name does not exist';
      } else {
        this.taskLists.splice(ind, 1);
      }
    });
  }

  deleteListItem() {
    let listToDelete: string;
    const dialog = this.dialog.open(DialogContainerComponent, {
      data: {
        'list': this.taskLists.map((element) => {
          return element.name
        }),
        'title': 'Delete List Item'
      },
      width: '450px'
    })
    dialog.afterClosed().subscribe((res) => {
      listToDelete = res;
      let ind = this.taskLists.findIndex(x => x.name === listToDelete);
      if (ind === -1) {
        this.errorMessage = 'List with provided name does not exist';
      } else {
        let listItemToDelete: string;
        const anotherDialog = this.dialog.open(DialogContainerComponent, {
          data: {
            'list': this.taskLists[ind].tasks.map((element) => {
              return element.name
            }),
            'title': 'Delete List Item'
          }
        })
        anotherDialog.afterClosed().subscribe((result) => {
          listItemToDelete = result;
          let listItemInd = this.taskLists[ind].tasks.findIndex(x => x.name === listItemToDelete);
          if (listItemInd === -1) {
            this.errorMessage = 'Task with provided name does not exist';
          } else {
            this.taskLists[ind].tasks.splice(listItemInd, 1);
          }
          this.sortTaskData();
        }) 
      }
    })
  }

  formatDate(sampledate) {
    let date = new Date(sampledate)
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    return (day + '-' + month + '-' + year);
  }

  openTaskSelector(){
    const dialog = this.dialog.open(TaskPickerDialogComponent, {
      data: {
        title: 'Select Task to view',
        list: this.taskLists
      },
      width: '450px'
    });
    dialog.afterClosed().subscribe((res) => {
      this.populateScreen(res.taskIndex, res.taskListIndex);
    })
  }

}
