import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    HomeComponent,
    CardPokemonComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    SharedModule,
    InfiniteScrollModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
