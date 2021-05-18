import { Component, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { EthState, GetAccounts, getAccounts } from './ethereum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public addresses$: Observable<string[]> | undefined;
  public addresses: string[] | undefined;

  constructor(private store: Store<EthState>, private zone: NgZone) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAccounts());
    this.addresses$ = this.store.pipe(select(((getAccounts))));
  }
}
