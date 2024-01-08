import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class CreateReservation1704735475551 implements MigrationInterface {
  name = 'CreateReservation1704735475551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "amenity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_f981de7b1a822823e5f31da10dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "amenity_id" integer, "user_id" integer, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_ca710b8127d9739a4d49be1ae5e" FOREIGN KEY ("amenity_id") REFERENCES "amenity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.createIndex(
      'reservation',
      new TableIndex({
        name: 'IDX_RESERVATION_AMENITY_ID',
        columnNames: ['amenity_id'],
      }),
    );

    await queryRunner.createIndex(
      'reservation',
      new TableIndex({
        name: 'IDX_RESERVATION_USER_ID',
        columnNames: ['user_id'],
      }),
    );

    await queryRunner.createIndex(
      'reservation',
      new TableIndex({
        name: 'IDX_RESERVATION_END_TIME',
        columnNames: ['end_time'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_ca710b8127d9739a4d49be1ae5e"`,
    );
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(`DROP TABLE "amenity"`);

    await queryRunner.query(`DROP INDEX "IDX_RESERVATION_END_TIME"`);
    await queryRunner.query(`DROP INDEX "IDX_RESERVATION_USER_ID"`);
    await queryRunner.query(`DROP INDEX "IDX_RESERVATION_AMENITY_ID"`);
  }
}
