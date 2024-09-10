import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive  } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TarkovIntel';
}
