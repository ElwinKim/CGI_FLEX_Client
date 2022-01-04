import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'machinelist',
    loadChildren: () => import('./machine/machinelist/machinelist.module').then( m => m.MachinelistPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'machine-status/:id',
    loadChildren: () => import('./machine/machine-status/machine-status.module').then( m => m.MachineStatusPageModule)
  },
  {
    path: 'settings/:id',
    loadChildren: () => import('./settingpage/settings.module').then( m => m.SettingsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
