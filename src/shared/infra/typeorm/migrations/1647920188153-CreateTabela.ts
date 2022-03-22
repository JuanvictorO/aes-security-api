import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTabela1647920188153 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tabela',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'cliente_id',
            type: 'varchar',
          },
          {
            name: 'tabela_nome',
            type: 'varchar',
            length: '32',
          },
        ],
        foreignKeys: [
          {
            name: 'ClienteTabela',
            referencedTableName: 'cliente',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tabela');
  }
}
