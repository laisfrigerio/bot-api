import {MigrationInterface, QueryRunner} from "typeorm";
import UserSeeder from "../seeds/user-seeder";
import User from "../entity/user";

export class UserMigration1574367146633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const users: User[] = await UserSeeder.do();
        await queryRunner.manager.insert(User, users);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        //-
    }

}
