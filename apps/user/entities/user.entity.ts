import Todo  from '@apps/todo/entities/todo.entity';
import { InferAttributes } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
// sequelize
@Table({ modelName: 'users' })
export default class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Todo)
  todos: Todo[];

  toJSON() {
    const { password, ...rest } = this.get();
    return rest;
  }
}

export type UserAttributes = InferAttributes<User>;