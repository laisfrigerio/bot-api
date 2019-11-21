
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import Cashback from "../../entity/cashback";
import Order from "../../entity/order";
import User from "../../entity/user";
import { StatusOrder } from "../../enum/status-order";
import { TypeCashback } from "../../enum/type-cashback";
import OrderRepository from "../../repositories/order-repository";
import WhiteListRepository from "../../repositories/white-list-repository";
import Validator from "../../validators";

export default class Store {
    private errors: any = [];
    private dealer: User;

    public async do(req: Request, res: Response): Promise<Response> {
        try {
            const { cpf, value } = req.body;
            const isValid = await this.isValid(value, cpf);

            if (!isValid) {
                return res.status(422).json({
                    errors: this.errors
                });
            }

            const code = `ODR${new Date().getTime()}`;
            const applyCashback = req.body.applyCashback ? true : false;
            const addCashback = this.calculateCashback(value);
            const totalCashback = await this.getAvailableCashback();
            const status = await this.checkStatus(cpf) ? StatusOrder.APPROVED : StatusOrder.PEDDING;
            const order = await getConnection().transaction(async transactionManager => {
                //- Create order with 'discount' from cashback case possible
                const newValue = this.applyCashback(applyCashback, totalCashback, value);
                const order = await transactionManager.save(new Order(code, this.dealer, status, newValue));

                //- Add or debit cashback
                await this.addOrDebitCashback(applyCashback, order, value, totalCashback, transactionManager);
                
                //- Add credit to the next order
                await transactionManager.save(new Cashback(order, TypeCashback.CREDIT, addCashback));
                return order;
            });
            return res.json(order);
        } catch (ex) {
            console.log("ex");
            console.log(ex);
        }

        return res.status(422).json({
            errors: ["Failed store a new order. Contact the administrator system"],
        });
    }

    private async isValid(value: number, cpf: string): Promise<boolean> {
        if (Validator.isRequired(cpf)) {
            this.errors.push("CPF is required");
        } else {
            this.dealer = await Validator.findCPF(cpf);
            if (!this.dealer) {
                this.errors.push("CPF is not registered");
            } else {
                const order = await Validator.peddingOrder(this.dealer);
                if (order) {
                    this.errors.push("Dealer has a pedding order");
                }
            }
        }

        if (Validator.isRequired(value)) {
            this.errors.push("Value is required");
        }

        return await this.errors.length === 0;
    }

    private async checkStatus(cpf: string): Promise<boolean> {
        const resources = await WhiteListRepository.all();
        const whiteList = resources.filter((item) => {
            return item.cpf === cpf;
        });

        return whiteList.length === 1;
    }

    /**
     * Calculate cashback to next order
     * @param value 
     */
    private calculateCashback(value: number): number {
        if (value <= 1000) {
            return (value*10)/100;
        }

        if (value <= 1500) {
            return (value*15)/100;
        }

        return (value*20)/100;
    }

    /**
     * Get available cashback
     * @param dealer 
     */
    private async getAvailableCashback(): Promise<number> {
        let sumCredits = await OrderRepository.getCashbacks(this.dealer, TypeCashback.CREDIT);
        if (sumCredits === null) {
            sumCredits = 0;
        }

        let sumDebits =  await OrderRepository.getCashbacks(this.dealer, TypeCashback.DEBIT);

        if (sumDebits === null) {
            sumDebits = 0;
        }

        return sumCredits - sumDebits;
    }

    /**
     * Apply cashback into current order
     * @param applyCashback 
     * @param totalCashback 
     * @param value 
     */
    private applyCashback(applyCashback: boolean, totalCashback: number, value: number) {
        if (applyCashback) {
            
            //- If valor cashback === valor compra
            if (value === totalCashback) {
                return 0;
            }

            //- if valor da compra maior que cashback
            else if (value > totalCashback) {
                return value - totalCashback;
            }

            //- if valor da compra inferior ao cashback
            else {
                return 0;
            }
        }

        return value;
    }

    /**
     * Add or debit cashback
     * 
     * @param applyCashback 
     * @param order 
     * @param value 
     * @param totalCashback 
     * @param transactionManager 
     */
    private async addOrDebitCashback(applyCashback: boolean, order: Order, value: number, totalCashback: number, transactionManager: any) {
        if (applyCashback) {
            
            //- If valor cashback === valor compra
            if (value === totalCashback) {
                if (totalCashback > 0) {
                    await transactionManager.save(new Cashback(order, TypeCashback.DEBIT, totalCashback));
                }
            }

            //- if valor da compra maior que cashback
            else if (value > totalCashback) {
                if (totalCashback > 0) {
                    await transactionManager.save(new Cashback(order, TypeCashback.DEBIT, totalCashback));
                }
            }

            //- else o valor da compra é inferior ao cashback
            else if (value > 0) {
                await transactionManager.save(new Cashback(order, TypeCashback.DEBIT, value));
            }
        }
    }
}