import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClient1647920060306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'client',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'auth_token',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'encrypt_key',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'seed',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('client');
  }
}
