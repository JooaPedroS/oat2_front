import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AvisoService {
  // Aviso pequeno no canto da tela que some sozinho (toast)
  private toast(icon: SweetAlertIcon, mensagem: string, cor?: string) {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title: mensagem,
      iconColor: cor,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (el) => {
        // a cor enviada pelo sistema também pinta a barrinha de tempo
        if (cor) {
          const barra = el.querySelector<HTMLElement>('.swal2-timer-progress-bar');
          if (barra) barra.style.background = cor;
        }
        // pausa o tempo enquanto o mouse estiver em cima
        el.addEventListener('mouseenter', Swal.stopTimer);
        el.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }

  // mensagem + cor opcional (se não mandar, usa a cor padrão do tipo)
  sucesso(mensagem: string, cor?: string) {
    return this.toast('success', mensagem, cor);
  }
  erro(mensagem: string, cor?: string) {
    return this.toast('error', mensagem, cor);
  }
  aviso(mensagem: string, cor?: string) {
    return this.toast('warning', mensagem, cor);
  }
  info(mensagem: string, cor?: string) {
    return this.toast('info', mensagem, cor);
  }

  // Caixa de confirmação antes de ações perigosas. Devolve true se o usuário confirmou.
  async confirmar(titulo: string, texto = '', botao = 'Sim, remover'): Promise<boolean> {
    const r = await Swal.fire({
      icon: 'warning',
      title: titulo,
      text: texto,
      showCancelButton: true,
      confirmButtonText: botao,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2d6a4f',
      cancelButtonColor: '#8aa096',
      reverseButtons: true,
      focusCancel: true,
    });
    return r.isConfirmed;
  }
}
