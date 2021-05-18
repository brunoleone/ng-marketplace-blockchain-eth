import { Inject, Injectable } from '@angular/core';
import { Observable, from as fromPromise, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import Web3 from 'web3';

import { WEB3 } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class EthService {

  constructor(@Inject(WEB3) private web3: Web3) { }

  /** Retorna a lista de contas disponíveis */
  public getAccounts(): Observable<string[]> {
    return fromPromise(this.web3.eth.getAccounts());
  }

  /** Retorna a conta selecionada */
  public currentAccount(): Observable<string | Error> {
    if (this.web3.eth.defaultAccount) {
      return of(this.web3.eth.defaultAccount);
    } else {
      return this.getAccounts().pipe(
        tap((account: string[]) => {
          if (account.length === 0) {
            throw new Error('No account available');
          }
        }),
        map((accounts: string[]) => accounts[0]),
        tap((account: string) => this.web3.eth.defaultAccount = account),
        catchError((err: Error) => of(err))
      );
    }
  }
}
