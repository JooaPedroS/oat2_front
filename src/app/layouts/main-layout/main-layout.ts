import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './main-layout.html',
})
export class MainLayout {}