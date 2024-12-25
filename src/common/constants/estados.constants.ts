export const ESTADOS = {
    OPCION_1: 'ACTIVO',
    OPCION_2: 'ELIMINADO'
} as const;

export const ADJUDICADO= {
    OPCION_1: 'SI',
    OPCION_2: 'NO'
} as const;

export type Estados = typeof ESTADOS[keyof typeof ESTADOS]; 

