export const TIPOS_DE_USUARIO = {
    OPCION_1: 'ADMINISTRADOR',
    OPCION_2: 'CLIENTE',
} as const;

export type TiposDeUsuario = typeof TIPOS_DE_USUARIO[keyof typeof TIPOS_DE_USUARIO];
