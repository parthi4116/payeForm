import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject$: BehaviorSubject<"">;
  payerSubject$: BehaviorSubject<"">;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject$ = new BehaviorSubject<any>(null);
    this.payerSubject$ = new BehaviorSubject<any>(null);
  }


  login(params: any) {
    localStorage.setItem("userName", params.userName),
      localStorage.setItem("userPwd", params.userPwd)
    this.currentUserSubject$.next(params);
    this.router.navigate(['/dashboard'])

  }


  apiCall(url: any, params: any): Observable<any> {
    let fullUrl = url + '/sample-response.json';
    return this.http.get<any>(fullUrl, params);
  };


  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);

  }

}
