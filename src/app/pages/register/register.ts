import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})

export class Register {
  private service = inject(UserService);
  private router = inject(Router);

  name = this.service.get()
  
  save() {
    if (!this.name.trim()) return;

    this.service.store(this.name);

    this.router.navigate(['/']);
  }
}
