import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string;
  isDark: boolean = false;
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.title = "Task Management";
  }

  toggleTheme(){
    this.isDark = !this.isDark;
    (this.isDark) ? this.themeService.toggleDark() : this.themeService.toggleLight();
  }

}
