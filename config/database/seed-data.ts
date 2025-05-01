interface SeedData {
  entries: Entry[];
}

interface Entry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: Prueba 1',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'in-progress: Prueba 2',
      status: 'in-progress',
      createdAt: Date.now() - 10000,
    },
    {
      description: 'Completed: Prueba 3',
      status: 'completed',
      createdAt: Date.now() - 12300,
    },
  ],
};
