
import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import Cashback from "../../entity/cashback";
import Order from "../../entity/order";
import User from "../../entity/user";
import { StatusOrder } from "../../enum/status-order";
import { TypeCashback } from "../../enum/type-cashback";
import OrderRepository from "../../repositories/order-repository";

export default class Store {
    private errors: any = [];

    public async do(req: Request, res: Response): Promise<Response> {
        try {
            let oldValue = req.body.value;
            const dealer = req.body.user;
            const code = `ODR${new Date().getTime()}`;
            const status = req.body.status ? req.body.status : StatusOrder.PROGRESS;
            const applyCashback = req.body.applyCashback ? true : false;
            const addCashback = this.calculateCashback(oldValue);
            const totalCashback = await this.totalCashback(dealer);
            console.log("applyCashback");
            console.log(applyCashback);
            console.log("old value");
            console.log(oldValue);
            console.log("cashback to next order");
            console.log(addCashback);
            console.log("cashback available");
            console.log(totalCashback);
            const order = await getConnection().transaction(async transactionManager => {
                //- Create order with 'discount' from cashback case possible
                const value = this.applyCashback(applyCashback, totalCashback, oldValue);
                console.log("new value");
                console.log(value);
                const order = await transactionManager.save(new Order(code, dealer, status, value));

                //- Store credits or debits
                await this.storeCreditOrDebit(applyCashback, order, oldValue, totalCashback, transactionManager);
                
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
            errors: ["Failed store a new order"],
        });
    }

    private calculateCashback(value: number): number {
        if (value <= 1000) {
            return (value*10)/100;
        }

        if (value <= 1500) {
            return (value*15)/100;
        }

        return (value*20)/100;
    }

    private async totalCashback(dealer: User): Promise<number> {
        const sumCredits = await OrderRepository.getCashbacks(dealer, TypeCashback.CREDIT);
        const sumDebits = await OrderRepository.getCashbacks(dealer, TypeCashback.DEBIT);
        return sumCredits - sumDebits;
    }

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
                //return (value - totalCashback) * -1;
                return 0;
            }
        }

        return value;
    }

    private async storeCreditOrDebit(applyCashback: boolean, order: Order, value: number, totalCashback: number, transactionManager: any) {
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

            //- if valor da compra inferior ao cashback
            else {
                if (value > 0) {
                    await transactionManager.save(new Cashback(order, TypeCashback.DEBIT, value));
                }
                await transactionManager.save(new Cashback(order, TypeCashback.CREDIT, (value - totalCashback) * -1));
            }
        }
    }
}