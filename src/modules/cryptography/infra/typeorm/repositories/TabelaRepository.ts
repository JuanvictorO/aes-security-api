import { TabelaRepositoryInterface } from 'modules/cryptography/repositories/TabelaRepositoryInterface';
import { BaseRepository } from 'shared/repositories/BaseRepository';
import { Tabela } from '../entities/Tabela';

export class TabelaRepository extends BaseRepository<Tabela> implements TabelaRepositoryInterface {
  constructor() {
    super(Tabela);
  }
}
