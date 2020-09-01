import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ThemeService } from '../shared/services/theme.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let themeService: ThemeService;

  beforeEach(() => {
    themeService = new ThemeService();
    component = new HeaderComponent(themeService);
    component.title = "Task Management";
    component.isDark = false;
  });

  it('should call ngOnInit method', () => {
    component.title = "Task Management";
    component.ngOnInit();
  })

  it('should call toggleTheme method', () => {
    component.toggleTheme();
  })

});
