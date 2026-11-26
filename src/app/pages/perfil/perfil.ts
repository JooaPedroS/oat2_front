import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil {
  private userService = inject(UserService);
  private itemService = inject(ItemService);
  private router = inject(Router);
  username = this.userService.get();

  depositados = this.itemService.buscarTodos().filter((i) => i.depositado).length
    

  sair() {
  localStorage.removeItem('username');
  this.router.navigate(['/register']);
   }

}

