import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { hoadingInterceptor } from './core/interceptors/loading/hoading.interceptor';
// import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes , withHashLocation() , withInMemoryScrolling({scrollPositionRestoration:'top'})), provideClientHydration(withEventReplay() ),
     provideHttpClient(withFetch() , 
    withInterceptors([headersInterceptor , errorsInterceptor , hoadingInterceptor])),
     provideAnimations(),
     provideToastr(),
     importProvidersFrom(NgxSpinnerModule)
    
    
    ]
};
