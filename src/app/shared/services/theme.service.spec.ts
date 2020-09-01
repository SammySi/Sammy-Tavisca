import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { componentFactoryName } from '@angular/compiler';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    service = new ThemeService();
  });

  it('should call toggleDark method', () => {
    service.toggleDark();
  })

  it('should call toggleLight method', () => {
    service.toggleLight();
  })

});
