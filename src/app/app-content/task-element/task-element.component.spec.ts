import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskElementComponent } from './task-element.component';
import { taskListElement } from 'src/app/shared/models/taskListElement.model';
import { taskModel } from 'src/app/shared/models/taskModel';

describe('TaskElementComponent', () => {
  let component: TaskElementComponent;

  beforeEach(() => {
    component = new TaskElementComponent();
    component.title = "To-Do List";
    component.taskLists = [
      new taskModel('Laundry', '5 clothes to wash', '2020-08-29T09:30'),
      new taskModel('Medical Check-up', 'Visit doctor', '2020-08-28T16:30')
    ];
  });

  it('should call ngOnInit method', () => {
    component.ngOnInit();
  })

  xit('should call taskDetail method', () => {
    let data = new taskListElement(
      "To-Do List",
      [
        new taskModel('Laundry', '5 clothes to wash', '2020-08-29T09:30'),
        new taskModel('Medical Check-up', 'Visit doctor', '2020-08-28T16:30')
      ]
    );
    component.taskDetail(data);
  })

  it('should call displayOnScreen method', () => {
    component.displayOnScreen(0);
  })

  it('should call delete method', () => {
    component.delete(null, 0);
  })

  it('should call sortTasks method', () => {
    let prev = new taskModel('Medical Check-up', 'Visit doctor', '2020-08-28T16:30');
    let next = new taskModel('Laundry', '5 clothes to wash', '2020-08-29T09:30');
    component.sortTasks(prev, next);
  })

  it('should call formatDate method', () => {
    component.formatDate('2020-08-28T16:30');
  })


});
