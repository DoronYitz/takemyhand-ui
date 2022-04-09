import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class ToasterService {
  constructor() {}

  popToaster(icon: 'success' | 'error' | 'warning', text: string) {
    Swal.fire({
      text: text,
      timer: 5000,
      icon: icon,
      toast: true,
      position: 'bottom-left',
      showConfirmButton: false,
      background: '#1d1c31',
    });
  }
}
