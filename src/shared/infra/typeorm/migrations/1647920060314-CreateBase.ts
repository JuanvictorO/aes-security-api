import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBase1647920060306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'base',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'client_id',
            type: 'varchar',
            length: '300',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '64',
          }
        ],
        foreignKeys: [
          {
            name: 'ClientTable',
            referencedTableName: 'client',
            referencedColumnNames: ['id'],
            columnNames: ['client_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('base');
  }
}
