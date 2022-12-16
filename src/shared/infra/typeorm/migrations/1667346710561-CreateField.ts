import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateField1667346710561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'field',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'table_id',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'token',
            type: 'varchar',
            length: '64',
            isNullable: true,
            default: 'null',
          },
          {
            name: 'field_type_id',
            type: 'int',
          }
        ],
        foreignKeys: [
          {
            name: 'TableField',
            referencedTableName: 'table',
            referencedColumnNames: ['id'],
            columnNames: ['table_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FieldFieldType',
            referencedTableName: 'field_type',
            referencedColumnNames: ['id'],
            columnNames: ['field_type_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('field');
  }
}
