import { createConnection, getConnectionOptions, getConnection } from "typeorm";

export const createTestConnection = async () => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection({...connectionOptions, name: "default"});
}