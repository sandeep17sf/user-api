import {Entity, Model, model, property} from '@loopback/repository';

export enum Roles {
  SUPERADMIN = "SuperAdmin",
  ADMIN = "Admin",
  SUBSCRIBER = "Subscriber",
}

@model()
export class Role extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  key: Roles;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  userId?: number;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
