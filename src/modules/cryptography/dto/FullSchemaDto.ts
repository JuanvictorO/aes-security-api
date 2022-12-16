export interface FullSchemaDto {
  client_id: string;
  seed: string;
  encrypt_key: string;
  database_name: string;
  tables: Table[];
}

interface Table {
  name: string;
  columns: Column[];
}

interface Column {
  name: string;
  type: string;
}
