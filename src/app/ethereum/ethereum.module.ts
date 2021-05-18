import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import Web3 from 'web3';
import { environment } from 'src/environments/environment';

import { WEB3 } from './tokens';

// Services
import { AccountsService } from './eth.services';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, ethReducer } from './eth.reducers';
import { EthEffects } from './eth.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(ethReducer),
    EffectsModule.forRoot([EthEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [AccountsService, {
    provide: WEB3,
    useFactory: () => new Web3(Web3.givenProvider || "ws://localhost:8546"),
  }]
})
export class EthereumModule { }
