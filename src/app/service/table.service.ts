import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private http: HttpClient) {  }

  
  getImageData(EndPoint: string){
    return this.http.get(environment.apiUrl+EndPoint, { params: { skipAlert: 'true' } });
  }

  uploadToCloudinary(file:any,){
    let formParams = new FormData();
    formParams.append("file",file);
    formParams.append("upload_preset",environment.cloudvariable);
    return this.http.post(environment.cloudinaryUrl,formParams, { params: { skipAlert: 'true' } });
  }

  updatetoDb(data:any, patchUrl:any){
  return this.http.patch(environment.apiUrl+patchUrl+data._id ,data);
  }
  addNewtoDb(data:any, patchUrl:any){
  return this.http.post(environment.apiUrl+patchUrl,data);
  }
 
  deleteData(id:any , scope:string){
    return this.http.delete(environment.apiUrl+scope+id);
  }

  login(data:any){
    return this.http.post(environment.apiUrl+'signin',data);
  }

  isLoggedIn(){
    return localStorage.getItem('token')
  }
  
}

