import { container } from 'tsyringe';
import { CamposRepository } from '../infra/typeorm/repositories/CamposRepository';
import { ClienteRepository } from '../infra/typeorm/repositories/ClienteRepository';
import { TabelaRepository } from '../infra/typeorm/repositories/TabelaRepository';
import { CamposRepositoryInterface } from './CamposRepositoryInterface';
import { ClienteRepositoryInterface } from './ClienteRepositoryInterface';
import { TabelaRepositoryInterface } from './TabelaRepositoryInterface';

container.registerSingleton<ClienteRepositoryInterface>('ClienteRepository', ClienteRepository);
container.registerSingleton<TabelaRepositoryInterface>('TabelaRepository', TabelaRepository);
container.registerSingleton<CamposRepositoryInterface>('CamposRepository', CamposRepository);
