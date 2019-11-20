import { MigrationInterface, QueryRunner } from "typeorm";
import WhiteList from "../entity/white-list";
import { WhiteListSeeder } from "../seeds/white-list-seeder";

export class WhiteListMigration1574241627944 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // await getRepository(WhiteList).save(WhiteListSeeder);
        console.log("chegou aqui");
        await queryRunner.manager.insert(WhiteList, WhiteListSeeder);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        //-
    }

}
