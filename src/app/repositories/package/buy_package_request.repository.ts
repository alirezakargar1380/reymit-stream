import buyPackageRequestSchema from "../../models/buy_package_requests"
import {IBuyPackageRequest, IBuyPackageRequestCreateInput} from "../../shared/interfaces/package.interface";


export class BuyPackageRequestRepository {
    constructor(private buyPackageRequestModel: typeof buyPackageRequestSchema) { }

    async create(buyPackageRequest: IBuyPackageRequestCreateInput) {
        return (await this.buyPackageRequestModel.create(buyPackageRequest))
    }

    async findByToken(token: string): Promise<IBuyPackageRequest | null> {
        return await this.buyPackageRequestModel.findOne({ token: token })
    }

    async findLastRecord(): Promise<IBuyPackageRequest | null> {
        return await this.buyPackageRequestModel.findOne().sort({ _id: -1 })
    }

    async verifyByToken(token: string, updatedData: any) {
        return (
            await this.buyPackageRequestModel.updateOne({ token: token }, updatedData)
        )
    }

    async history(user_id: string) {
        return await this.buyPackageRequestModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userItem"
                }
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "package",
                    foreignField: "_id",
                    as: "packageItem"
                }
            },
            {
                $match: {
                    $expr: { $eq: ['$user', { $toObjectId: user_id }] },
                    verified: true
                }
            },
            {
                $project: {
                    _id: 1,
                    tracking_code: 1,
                    description: 1,
                    iri_price: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "userItem.username": 1,
                    "userItem.name": 1,

                    "packageItem.day": 1,
                    "packageItem.iri_price": 1,
                    "packageItem.title": 1,
                    "packageItem.image": 1,
                }
            },
            {
                $unwind: {
                    "path": "$userItem",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $unwind: {
                    "path": "$packageItem",
                    "preserveNullAndEmptyArrays": true
                }
            }

        ])
    }

}