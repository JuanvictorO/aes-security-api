import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCliente1647920060306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cliente',
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
          },
          {
            name: 'key_cript',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'seed',
            type: 'varchar',
            length: '100',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cliente');
  }
}
