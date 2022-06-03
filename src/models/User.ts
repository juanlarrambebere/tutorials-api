import { AllowNull, Column, Index, Model, Table } from "sequelize-typescript";
import { UserRole } from "../types";

export const USER_ROLES = ["admin", "user"] as const;

@Table
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

  @AllowNull(false)
  @Column
  role: UserRole;

  @Column
  accessToken: string;
}

export default User;
