import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Base } from './Base';
import { Field } from './Field';

@Entity('table')
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  table_name: string;

  @Column()
  base_id: string;

  @ManyToOne(() => Base)
  @JoinColumn({ name: 'base_id' })
  base: Base;

  @OneToMany(() => Field, field => field.table)
  field: Field[];
}
