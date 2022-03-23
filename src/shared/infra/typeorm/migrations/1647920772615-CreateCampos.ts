import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCampos1647920772615 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'campos',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'tabela_id',
            type: 'varchar',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'token',
            type: 'varchar',
            length: '64',
          },
        ],
        foreignKeys: [
          {
            name: 'TabelaCampos',
            referencedTableName: 'tabela',
            referencedColumnNames: ['id'],
            columnNames: ['tabela_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('campos');
  }
}
