import { checkDatabaseConnection } from '../config/database';

export class HealthService {
  public static async getHealthStatus(): Promise<string> {
    const isConnected = await checkDatabaseConnection();
    return isConnected ? 'Database Connected' : 'Database Failed';
  }
}
