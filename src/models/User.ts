import { AllowNull, Column, Index, Model, Table } from "sequelize-typescript";

@Table({ timestamps: true })
class User extends Model {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  // TODO investigate why @Unique is not working, it duplicated the index at db level.
  @Index({
    name: "email_index",
    type: "UNIQUE",
  })
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;
}

export default User;
