import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContainerComponent } from './dialog-container.component';
import { MatDialogContainer, MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OverlayRef, OverlayConfig, OverlayKeyboardDispatcher, Overlay, OverlayContainer, ScrollStrategyOptions, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ElementRef, ChangeDetectorRef, NgZone, Injector, ComponentFactoryResolver } from '@angular/core';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { PortalOutlet } from '@angular/cdk/portal';
import { ImmutableObject } from '@angular/cdk/overlay/overlay-ref';
import { Directionality } from '@angular/cdk/bidi';
import { Location } from '../../../../node_modules/@angular/common';
import { of } from 'rxjs';

describe('DialogContainerComponent', () => {
  let component: DialogContainerComponent;
  let dialogRef: MatDialogRef<DialogContainerComponent>;
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
    dialogRef = new MatDialogRef<DialogContainerComponent>(_overlayRef, _containerInstance);
    let data = {
      title: 'Select a title',
      list: []
    }
    component = new DialogContainerComponent(data, dialogRef);
    component.title = 'Select a title';
    component.optionsList = [];
  });

  it('should call ngOnInit method', () => {
    component.ngOnInit();
  })

  it('should call setReturnValue method', () => {
    spyOn(dialogRef, 'close').and.returnValue();
    let eve = {
      value: 'Groceries'
    }
    component.setReturnValue(eve);
  })

  
});
