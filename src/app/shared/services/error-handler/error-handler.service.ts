import { Injectable } from '@angular/core';
import { LogService } from '../log/log.service';
import * as fromRoot from '../../../root-state';
import * as authActions from '../../../auth/state/auth.actions';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  name = 'ErrorHandler';

  constructor(
    private log: LogService,
    private store: Store<fromRoot.State>,
    private route: Router
  ) { }

  handle(error: any) {
    if (error) {
      switch (error.status) {
        case 401:
          this.store.dispatch(new authActions.Logout());
          this.store.pipe(select(fromRoot.isAuth))
            .subscribe(
              auth => {
                  if (!auth) {
                    this.route.navigate(['/signin']);
                    this.log.error(this.name, error.message, error);
                  }
              });
          break;
        default:
          break;
      }
    }
  }
}
