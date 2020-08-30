import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContentComponent } from './app-content.component';
import { taskListElement } from '../shared/models/taskListElement.model';
import { taskModel } from '../shared/models/taskModel';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { OverlayContainer, ScrollStrategyOptions, OverlayPositionBuilder, OverlayKeyboardDispatcher, Overlay } from '@angular/cdk/overlay';
import { ComponentFactoryResolver, NgZone, Injector } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Location } from '../../../node_modules/@angular/common';

let dialogSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

describe('AppContentComponent', () => {
  let component: AppContentComponent;
  let dialog: MatDialog;
  let _overlayContainer: OverlayContainer; 
  let scrollStrategies: ScrollStrategyOptions;
  let _componentFactoryResolver: ComponentFactoryResolver;
  let _positionBuilder: OverlayPositionBuilder;      
  let _directionality: Directionality;   
  let _ngZone: NgZone;
  let _keyboardDispatcher: OverlayKeyboardDispatcher;
  let scrollStrategy: any;
  let _parentDialog: MatDialog;
  let _injector: Injector;
  let _document: any;
  let _location: Location;  
  let _defaultOptions: MatDialogConfig;
  let overlay: Overlay;


  beforeEach(() => {
    overlay = new Overlay(scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _keyboardDispatcher, _injector, _ngZone, _document, _directionality);
    dialog = new MatDialog(overlay, _injector, _location, _defaultOptions, scrollStrategy, _parentDialog, _overlayContainer);
    component = new AppContentComponent(dialog);
    component.taskLists = [
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
    component.screenDetails = new taskModel('Laundry', '5 clothes to wash', '2020-08-29T09:30');
  });

  it('should call ngOnInit method', () => {
    component.taskLists = [
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
    component.ngOnInit();
  })

  it('should call keyDown method', () => {
    component.currentKeysPressed = ['Alt', 't'];
    let eve = new KeyboardEvent('keydown');
    component.keyDown(eve);
  })

  it('should call keyDown method', () => {
    component.currentKeysPressed = ['Alt', 'Shift' ,'T'];
    let eve = new KeyboardEvent('keydown');
    component.keyDown(eve);
  })

  it('should call keyDown method', () => {
    component.currentKeysPressed = ['Alt', 'r'];
    let eve = new KeyboardEvent('keydown');
    component.keyDown(eve);
  })

  it('should call keyDown method', () => {
    component.currentKeysPressed = ['Enter'];
    let eve = new KeyboardEvent('keydown');
    component.keyDown(eve);
  })

  it('should call keyDown method', () => {
    component.currentKeysPressed = ['Alt', 'v'];
    let eve = new KeyboardEvent('keydown');
    component.keyDown(eve);
  })

  it('should call keyDown method', () => {
    component.currentKeysPressed = ['Alt', 'e'];
    let eve = new KeyboardEvent('keydown');
    component.keyDown(eve);
  })

  it('should call keyDown method', () => {
    component.currentKeysPressed = ['Alt', 'd'];
    let eve = new KeyboardEvent('keydown');
    component.keyDown(eve);
  })

  it('should call populateScreen method', () => {
    component.screenDetails = component.taskLists[0].tasks[0];
    component.selectedTaskType = component.taskLists[0].name;
    component.populateScreen(0,0);
  })

  it('should call addTaskDetails method', () => {
    component.addTaskDetails();
  })

  it('should call submitForValidation method with true for add', () => {
    component.newName = 'Sample Task';
    component.newDesc = 'Sample Desc';
    component.newDate = '2020-08-29T09:30';
    component.newStatus = 'Pending';
    component.submitForValidation(true);
  })

  it('should call submitForValidation method with true for edit', () => {
    component.newName = 'Groceries';
    component.newDesc = 'Sample Desc';
    component.newDate = '2020-08-29T09:30';
    component.newStatus = 'Pending';
    component.submitForValidation(true);
  })

  it('should call submitForValidation method with false', () => {
    component.oldName = 'Groceries';
    component.newName = 'Groceries';
    component.newDesc = 'Sample Desc';
    component.newDate = '2020-08-29T09:30';
    component.newStatus = 'Pending';
    component.submitForValidation(false);
  })

  it('should call editTask method', () => {
    component.editTask();
  })

  it('should call checkFields method', () => {
    component.checkFields();
  })

  it('should call deleteItem method for list', () => {
    component.deleteItem(null, 0);
  })

  it('should call deleteItem method for task', () => {
    component.deleteItem(0, 0);
  })

  it('should call enableAddList method', () => {
    component.enableAddList();
  })

  it('should call checkAndAddList method for duplicate', () => {
    component.newListName = 'Pending';
    component.checkAndAddList();
  })

  it('should call checkAndAddList method for non-duplicate', () => {
    component.newListName = 'Ready';
    component.checkAndAddList();
  })

  it('should call checkElement method for duplicate', () => {
    let elementData = {
      'source': 'Pending',
      'elemIndex': 0,
      'target': 'Pending'
    };
    component.checkElement(elementData);
  })

  it('should call checkElement method for non-duplicate', () => {
    let elementData = {
      'source': 'To-Do List',
      'elemIndex': 0,
      'target': 'Pending'
    };
    component.checkElement(elementData);
  })

  it('should call checkList method', () => {
    let elementData = {
      source: 'To-Do List',
      target: 'Pending'
    };
    component.checkList(elementData);
  })

  it('should call checkList method', () => {
    let elementData = {
      target: 'To-Do List',
      source: 'Pending'
    };
    component.checkList(elementData);
  })

  it('should call sortTaskData method', () => {
    component.sortTaskData();
  })

  xit('should call deleteList method', () => {
    spyOn(dialog, 'open').and.returnValue(null);
    component.deleteList();
  })

  xit('should call deleteListItem method', () => {
    spyOn(dialog, 'open').and.returnValue(null);
    component.deleteListItem();
  })

  it('should call formatDate method', () => {
    let date = '2020-08-29T09:30';
    component.formatDate(date);
  })

  xit('should call openTaskSelector method', () => {
    spyOn(dialog, 'open').and.returnValue(null);
    component.openTaskSelector();
  })
});
