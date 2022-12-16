import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('field_type')
export class FieldType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type_name: string;
}
