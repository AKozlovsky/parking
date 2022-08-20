import { MatCheckbox } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';

export class SelectionGroup {
  title: string = '';
  options: string[] = [];
  selectedInit: boolean[] = [];
  // elements
  optionElements: MatOption[];
  selectAll: MatCheckbox;
}
