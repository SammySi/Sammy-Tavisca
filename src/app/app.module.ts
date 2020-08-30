import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppContentComponent } from './app-content/app-content.component';
import { TaskElementComponent } from './app-content/task-element/task-element.component';
import { DemoMaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogContainerComponent } from './app-content/dialog-container/dialog-container.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskPickerDialogComponent } from './app-content/task-picker-dialog/task-picker-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppContentComponent,
    TaskElementComponent,
    DialogContainerComponent,
    TaskPickerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    DialogContainerComponent,
    TaskPickerDialogComponent
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
