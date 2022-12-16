import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTable1647920188153 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'table',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'base_id',
            type: 'varchar',
          },
          {
            name: 'table_name',
            type: 'varchar',
            length: '64',
          },
        ],
        foreignKeys: [
          {
            name: 'BaseTable',
            referencedTableName: 'base',
            referencedColumnNames: ['id'],
            columnNames: ['base_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('table');
  }
}
