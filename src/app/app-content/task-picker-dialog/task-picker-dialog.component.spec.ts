import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPickerDialogComponent } from './task-picker-dialog.component';
import { MatDialogRef, MatDialog, MatDialogContainer, MatDialogConfig } from '@angular/material/dialog';
import { OverlayRef, OverlayConfig, OverlayKeyboardDispatcher, Overlay, OverlayContainer, ScrollStrategyOptions, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ElementRef, ChangeDetectorRef, NgZone, Injector, ComponentFactoryResolver } from '@angular/core';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { PortalOutlet } from '@angular/cdk/portal';
import { ImmutableObject } from '@angular/cdk/overlay/overlay-ref';
import { Directionality } from '@angular/cdk/bidi';
import { Location } from '../../../../node_modules/@angular/common';
import { taskListElement } from 'src/app/shared/models/taskListElement.model';
import { taskModel } from 'src/app/shared/models/taskModel';

describe('TaskPickerDialogComponent', () => {
  let component: TaskPickerDialogComponent;
  let dialogRef: MatDialogRef<TaskPickerDialogComponent>;
  let dialog: MatDialog;
  let  _containerInstance: MatDialogContainer;
  let _overlayRef: OverlayRef;
  let _elementRef: ElementRef;
  let _focusTrapFactory: FocusTrapFactory;
  let _changeDetectorRef: ChangeDetectorRef;
  let _document: any;
  let _config: MatDialogConfig;
  let _portalOutlet: PortalOutlet;
  let _host: HTMLElement;
  let _pane: HTMLElement;
  let _config2: ImmutableObject<OverlayConfig>;
  let _ngZone: NgZone;
  let _keyboardDispatcher: OverlayKeyboardDispatcher;
  let _document2: Document; 
  let _overlay: Overlay;
  let _injector: Injector;
  let _location: Location;
  let _defaultOptions: MatDialogConfig;
  let scrollStrategy: any;
  let _parentDialog: MatDialog;
  let _overlayContainer: OverlayContainer; 
  let scrollStrategies: ScrollStrategyOptions;
  let _componentFactoryResolver: ComponentFactoryResolver;
  let _positionBuilder: OverlayPositionBuilder;        
  let _directionality: Directionality; 

  beforeEach(() => {
    _config = new MatDialogConfig();
    _config2 = new OverlayConfig();
    _overlayRef = new OverlayRef(_portalOutlet, _host, _pane, _config2, _ngZone, _keyboardDispatcher, _document2);
    _containerInstance = new MatDialogContainer(_elementRef, _focusTrapFactory, _changeDetectorRef, _document, _config);
    _overlay = new Overlay(scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _keyboardDispatcher, _injector, _ngZone, _document, _directionality);
    dialog = new MatDialog(_overlay, _injector, _location, _defaultOptions, scrollStrategy, _parentDialog, _overlayContainer);
    dialogRef = new MatDialogRef<TaskPickerDialogComponent>(_overlayRef, _containerInstance);
    let data = {
      title: 'Sample Title',
      list: [
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
      ]
    }
    component = new TaskPickerDialogComponent(data, dialogRef);
    component.title = 'Sample Title';
    component.optionsList = [
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
    ]
  });

  it('should call ngOnInit method', () => {
    component.ngOnInit();
  })

  it('should call setReturnValue method', () => {
    let eve = {
      source : {
        value: 'Groceries',
        group: {
          label: 'Pending'
        }
      }
    }
    spyOn(dialogRef, 'close').and.returnValue();
    component.setReturnValue(eve);
  })
});
