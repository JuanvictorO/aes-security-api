import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  auth_token: string;

  @Column()
  encrypt_key: string;

  @Column()
  seed: string;
}
