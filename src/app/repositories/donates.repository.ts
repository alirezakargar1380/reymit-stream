import { ObjectId } from "mongodb";
import donates from "../models/donates.model"
import {
    Ifilter,
    Idonates,
    IDonateCreateInput,
} from "../shared/interfaces/donates/donates.interface";
import mongoose from "mongoose";

export class DonatesRepository {
    constructor(private donate: typeof donates) { }

    async create(donate: IDonateCreateInput): Promise<Idonates> {
        return (
            await this.donate.create(donate)
        )
    }
    async donateByToken(token: string): Promise<Idonates | null> {
        return (
            await this.donate.findOne({token: token})
        )
    }
    async verifyByToken(token: string, transid: string | null = null): Promise<Idonates | null> {
        const updateData = transid == null ? {verified: true} : {verified: true, transid: transid}
        return (
            await this.donate.findOneAndUpdate({token: token}, updateData)
        )
    }
    async donatesByUserId(userId: ObjectId, filter: Ifilter, numberInPage: number, Page: number): Promise<Idonates[] | null> {
        return (await this.donate.find(
            {
                userId: userId,
                verified: true
            }
        ).where(filter).skip(numberInPage * (Page - 1)).limit(numberInPage)) //  page starts with 1 because - 1)
    }
    async donatesByUserIdCount(userId: ObjectId, filter: Ifilter): Promise<number> {
        return (await this.donate.count(
            {
                userId: userId,
                verified: true
            }
        ).where(filter))
    }
    async countAll(): Promise<number> {
        return (
            await this.donate.count({
                verified: true
            })
        )
    }
    async amountAll(): Promise<number> {
        const res: {_id: null, amount_irr: number}[] = await this.donate.aggregate(
            [
                {
                    $match: {
                        verified: true
                    }
                },
                {
                    $group: {
                        _id: null,
                        amount_irr: {$sum: '$amount_irr'}
                    }
                }
            ]
        )
        return res.length == 0 ? 0 : res[0]['amount_irr']
    }
    async countToday(): Promise<number> {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return (
            await this.donate.count({
                updatedAt: {$gte: startOfToday},
                verified: true
            })
        )
    }
    async amountToday(): Promise<number> {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const res: {_id: null, amount_irr: number}[] = await this.donate.aggregate(
            [
                {
                    $match: {
                        updatedAt: {$gte: startOfToday},
                        verified: true
                    }
                },
                {
                    $group: {
                        _id: null,
                        amount_irr: {$sum: '$amount_irr'}
                    }
                }
            ]
        )
        return res.length == 0 ? 0 : res[0]['amount_irr']
    }
}