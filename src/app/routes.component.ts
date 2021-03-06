import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {USER_ROUTES} from './user/user.routes';



import {ADMIN_ROUTES} from './admin/admin.routes';
import {UserComponent} from './user/user.component';
import {FormComponent} from './form/form.component';
import {AuthGuardService} from './auth/authguard.service';

import {MainPageComponent} from './mainPage/mainPage.component';
import {MainPageHomeComponent} from './mainPageHome/mainPageHome.component';


import {USER_COMPANIES} from './companie/companie.routes';
import {CompanieComponent} from './companie/companie.component';

import {USER_PROMOTIONS} from './promotion/promotion.routes';
import {PromotionComponent} from './promotion/promotion.component';

import {USER_PRESSES} from './press/press.routes';
import {PressComponent} from './press/press.component';

import {VIDEOS} from './video/video.routes';
import {VideoComponent} from './video/video.component';

import {USER_PRODUCTS} from './product/product.routes';
import {ProductComponent} from './product/product.component';

import {MapComponent} from './map/map.component';

import {AdminComponent} from './admin/admin.component';
import {ErrorPageComponent} from './errorPage/errorPage.component';
import {AdminGuardService} from './admin/services/adminGuard';

const APP_ROUTES: Routes = [
  {path: '', component: MainPageHomeComponent, pathMatch: 'full'},
  {path: 'home2', component: MainPageComponent, pathMatch: 'full'},
  {path: 'companie', component: CompanieComponent, children: USER_COMPANIES},
  {path: 'press', component: PressComponent, children: USER_PRESSES},
  {path: 'product', component: ProductComponent, children: USER_PRODUCTS},
  {path: 'video', component: VideoComponent, children: VIDEOS},
  {path: 'promotion', component: PromotionComponent, children: USER_PROMOTIONS},
//  {path: 'companie/:id', component: CompanieDetailComponent},
//  {path: 'companie/edit/:id', component: EditCompanieComponent},
  {path: 'map', component: MapComponent, pathMatch: 'full'},
  {path: 'user', component: UserComponent, children: USER_ROUTES},
  {path: 'form', component: FormComponent, canActivate: [AuthGuardService]},
  {path: 'admin', component: AdminComponent, children: ADMIN_ROUTES, canActivate: [AdminGuardService]},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '404'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
