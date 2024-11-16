import PackageSchema from "../../models/package.model"
import { IPackage } from "../../shared/interfaces/package.interface";
import { ObjectId } from "mongodb";

export class PackageRepository {
    constructor(private PackageModel: typeof PackageSchema) { }

    async getAll(): Promise<IPackage[]> {
        return (
            await this.PackageModel.find()
        )
    }

    async findPackageById(packageId: string): Promise<IPackage | null> {
        return (
            await this.PackageModel.findOne({
                _id: new ObjectId(packageId),
            })
        )
    }

    async findTrialPackageById(packageId: string): Promise<IPackage | null> {
        return (
            await this.PackageModel.findOne({
                _id: new ObjectId(packageId),
                is_trial: true
            })
        )
    }
}