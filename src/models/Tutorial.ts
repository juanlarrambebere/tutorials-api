import { AllowNull, Column, DeletedAt, Model, Table } from "sequelize-typescript";

@Table
class Tutorial extends Model {
  @AllowNull(false)
  @Column
  title: string;

  @AllowNull
  @Column
  videoUrl: string;

  @AllowNull
  @Column
  description: string;

  @AllowNull
  @Column
  status: string;

  @DeletedAt
  deletedAt: Date;
}

export default Tutorial;
