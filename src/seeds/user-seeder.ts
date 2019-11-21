import bcrypt from "bcrypt";
import User from "../entity/user";

export default class UserSeeder {
  public static async do(): Promise<User[]> {
    let users: User[] = [];
    users.push(new User(
      '15350946056', 
      'admin@grupoboticario.com.br', 
      'Admin Boticário', 
      await UserSeeder.generateHashPassword('secret'), 
      true));
    return users;
  }
  
  private static async generateHashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}