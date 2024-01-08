import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class CreateUser1704730870206 implements MigrationInterface {
  name = 'CreateUser1704730870206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );

    // Add index on name column
    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_NAME',
        columnNames: ['name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop index on name column
    await queryRunner.query(`DROP INDEX "IDX_USER_NAME"`);

    await queryRunner.query(`DROP TABLE "user"`);
  }
}
