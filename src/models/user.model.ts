import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Customer} from './customer.model';
import {Role } from './role.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    required: true,
    id: true
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
  })
  phone?: string;
  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  createdAt?: string;
  @property({
    type: 'string',
  })
  updatedAt?: string;

  @belongsTo(() => Customer)
  customerId: number;

  @hasOne(() => Role)
  role: Role;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
