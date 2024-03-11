import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  public isLoading = new BehaviorSubject<boolean>(false);

  showLoader() {
    this.isLoading.next(true);
  }

  hideLoader() {
    this.isLoading.next(false);
  }

// Function to create a toast with dynamic background color
 createToast(icon: 'success' | 'error', title: string , time:number) {
  Swal.fire({
    icon: icon,
    title: title,
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
    color: '#FFFFFF', 
    background: icon === 'success' ? '#28a745' : '#dc3545',
  });
}
}
