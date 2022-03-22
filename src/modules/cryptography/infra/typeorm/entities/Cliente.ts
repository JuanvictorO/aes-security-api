import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  auth_token: string;

  @Column()
  key: string;

  @Column()
  seed: string;
}
