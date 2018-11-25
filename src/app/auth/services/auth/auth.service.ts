import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from '../../../shared/services/log/log.service';
import { Signin } from '../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  name = 'AuthService';

  constructor(
    private http: HttpClient,
    private log: LogService
  ) { }

  signin(data: Signin): Observable<any> {
    return this.http.post<any>('authorization/token', data)
      .pipe(
        tap((res: any) => console.log(res)),
        catchError(this.handleError('login', []))
      );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`security/${email}/forgotpassword`, null)
      .pipe(
        tap((res: any) => console.log(res)),
        catchError(this.handleError('forgotPassword', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      // send the error to remote logging infrastructure
       this.log.error(this.name, `${operation} failed: ${error.message}`, error);

      // Let the app keep running by returning an empty result.
      // return of(result as T);

      // Throw Error
      return throwError(error);
    };
  }
}
