import { Inject } from "@nestjs/common";
import { CanActivate } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { catchError } from "rxjs";
import { tap } from "rxjs";
import { AUTH_SERVICE } from "./services";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  canActivate(context: ExecutionContext): Observable<boolean>{
   const authentication = this.getAuthentication(context);
   return this.authClient.send('validate_user', {
    Authentication: authentication,
   }).pipe(
    tap((res) => {
      this.addUser(res, context)
    }),
    catchError(() => {
      throw new UnauthorizedException()
    })
   )
  } 

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if(context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().Authentication
    } else if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest().cookies?.Authentication;
    }
    if(!authentication) {
      throw new UnauthorizedException('No value was provided for Auth');
    }
    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) {
    if(context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}