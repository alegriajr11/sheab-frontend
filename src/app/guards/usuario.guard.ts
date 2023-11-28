import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url;
      const expectedRoles = next.data && next.data['expectedRol'];

    
      // Verificar si el usuario está autenticado
      if (!this.tokenService.isLogged) {
        this.router.navigate(['/']);
        return false;
      }
    
      // Obtener los roles reales del usuario
      const userRoles: string[] = this.getUserRoles();
    
      // Verificar si el usuario tiene al menos uno de los roles esperados
      const hasExpectedRole = expectedRoles.some((expectedRole: string) => userRoles.includes(expectedRole)); // Proporcionar un tipo explícito (string) para expectedRole
    
      if (!hasExpectedRole) {
        this.router.navigate(['/']);
        return false;
      }
    
      return this.checkUserLogin(next, url);
    }
    


  getUserRoles(): string[] {
    const roles: string[] = [];

    if (this.tokenService.isAdmin()) {
      roles.push('admin');
    }
    if (this.tokenService.IsSic()) {
      roles.push('sic');
    }
    if (this.tokenService.IsPamec()) {
      roles.push('pamec');
    }
    if (this.tokenService.IsSp()) {
      roles.push('sp');
    }
    if (this.tokenService.IsReso()) {
      roles.push('res');
    }

    if (this.tokenService.IsContador()) {
      roles.push('contador');
    }

    if (this.tokenService.IsCoordinador()) {
      roles.push('coordinador');
    }

    return roles;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.tokenService.isLogged()) {
      const userRole = this.tokenService.getRole();
      if (route.data['role'] && route.data['role'].indexOf(userRole) < 0) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
