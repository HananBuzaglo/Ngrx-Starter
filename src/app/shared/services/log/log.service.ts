import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';

export class Log {
  constructor(
    public time: Date,
    public correlationId: string,
    public type: string,
    public source: string,
    public description: string,
    public data: any
  ) {}
}


@Injectable({
  providedIn: 'root'
})
export class LogService {

  correlationId = '';
  log: Array<Log> = [];

  constructor(
    private _http: HttpClient
  ) {
    this.setCorrelationId();
    console.log('Session ID: ', this.correlationId);
  }

  /// Create uniqe id for log correlationID.
  setCorrelationId() {
    this.correlationId = UUID.UUID();
  }

  // send log to server
  sendLog(data: Log): Observable<any> {
    return this._http.post('applogs', data);
  }

  // INFO - Handling all information logs
  info(source: string, description: string, logData?: any) {
    const data = logData ? logData : '';
    console.log('[' + source + ']' + ' -', description, data);
    // ToDo: send log to server

    // Push logs for tracking current session
    this.log.push(new Log(new Date(), this.correlationId, 'INFO', source, description, data));
  }

  // DEBUG - Handling all debugging logs
  debug(source: string, description: string, logData?: any) {
    const data = logData ? logData : '';
    console.log('[' + source + ']' + ' -', description, data);
    // ToDo: send log to server

    // Push logs for tracking current session
    this.log.push(new Log(new Date(), this.correlationId, 'DEBUG', source, description, data));
  }

  // ERROR - Handling all error logs
  error(source: string, description: string, logData?: any) {
    const data = logData ? logData : '';
    console.error('[' + source + ']' + ' -', description, data);
    // ToDo: send log to server

    // Push logs for tracking current session
    this.log.push(new Log(new Date(), this.correlationId, 'ERROR', source, description, data));
  }
}
