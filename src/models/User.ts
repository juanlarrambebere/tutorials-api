import { AllowNull, Column, Model, Table, Unique } from "sequelize-typescript";

@Table
class User extends Model {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;
}

export default User;
