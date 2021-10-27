/**
 * Essa pasta / Arquivo foi criado apenas para alguns modulos, que não estão sendo identificados pelo typeScript.
 *  Então as declarações a seguir é uma tipagem customisadas.
 * Também foi nescessário declarar no (tsconfig.js) para ser declarado que há tipos em node_modules e também em (src/@types...)
 */


declare namespace Express {
    export interface Request {
        user_id: string;
    }
}