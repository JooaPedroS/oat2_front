import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { Aviso } from '../../components/aviso/aviso';


/*
 essa classe é bem inutil para esse projeto pequeno, mas é bem conveniente um layout
*/
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Aviso],
  templateUrl: './main-layout.html',
})
export class MainLayout {}