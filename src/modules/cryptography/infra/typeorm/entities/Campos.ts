import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Tabela } from './Tabela';

@Entity('campos')
export class Campos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  token: string;

  @Column()
  tabela_id: number;

  @ManyToOne(() => Tabela)
  @JoinColumn({ name: 'tabela_id' })
  tabela: Tabela;
}
