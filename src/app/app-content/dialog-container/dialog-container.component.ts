import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss']
})
export class DialogContainerComponent implements OnInit {
  title: string;
  optionsList: Array<any>;
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<DialogContainerComponent>) {
    this.title = data.title;
    this.optionsList = data.list;
   }

  ngOnInit(): void {
    
  }

  setReturnValue(event) {
    this.dialogRef.close(event.value);
  }

}
