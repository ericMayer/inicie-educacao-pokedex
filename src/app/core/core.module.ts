import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormatPokemonSheapPipe } from './pipes/format-pokemon-sheap.pipe';
import { ImageNotFoundDirective } from './directives/image-not-found.directive';
import { CacheInterceptor } from './interceptor/cache.interceptor';

@NgModule({
  declarations: [
    FormatPokemonSheapPipe,
    ImageNotFoundDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatPokemonSheapPipe,
    ImageNotFoundDirective
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
