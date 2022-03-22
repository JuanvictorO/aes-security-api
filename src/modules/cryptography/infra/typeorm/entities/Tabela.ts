import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Campos } from './Campos';
import { Cliente } from './Cliente';

@Entity('tabela')
export class Tabela {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tabela_nome: string;

  @Column()
  cliente_id: string;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @OneToMany(() => Campos, campos => campos.tabela)
  campos: Campos[];
}
