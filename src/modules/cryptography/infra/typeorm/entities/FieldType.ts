import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('field_type')
export class FieldType {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type_name: string;
}
