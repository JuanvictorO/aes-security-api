export const generateStringSeed = ( tableName: string, columns: string[], seed: string ): string => {
  const seedCrypt = `${tableName}${columns.join(seed)}${seed}`;
  return seedCrypt;
};
