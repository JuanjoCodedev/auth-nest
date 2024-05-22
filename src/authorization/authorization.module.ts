import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from './role/role.entity';
import { RoleRouteAccessEntity } from './role_route_access/role_route_access.entity';
import { UserRouteAccessEntity } from './user_route_access/user_route_access.entity';

import { RoleController } from './role/role.controller';
import { RoleRouteAccessController } from './role_route_access/role_route_access.controller';
import { UserRouteAccessController } from './user_route_access/user_route_access.controller';

import { RoleService } from './role/role.service';
import { RoleRouteAccessService } from './role_route_access/role_route_access.service';
import { UserRouteAccessService } from './user_route_access/user_route_access.service';

import { UserRouteAccessGuard } from './user_route_access/user_route_access.guard';
import { RoleAccessGuard } from './role_route_access/role_route_access.guard';
import { AuthorizationAccessGuard } from './authorization.guard';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity, RoleRouteAccessEntity, UserRouteAccessEntity])],
    controllers: [RoleController, RoleRouteAccessController, UserRouteAccessController],
    providers: [RoleService, RoleRouteAccessService, UserRouteAccessService, UserRouteAccessGuard, RoleAccessGuard, AuthorizationAccessGuard],
    exports: [UserRouteAccessGuard, RoleAccessGuard, AuthorizationAccessGuard],
})
export class AuthorizationModule { }
