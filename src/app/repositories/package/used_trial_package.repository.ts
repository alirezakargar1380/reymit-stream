import usedTrialPackageSchema from "../../models/used_trial_package.model"
import { IUsedTrialPackage, IUsedTrialPackageCreateInput } from "../../shared/interfaces/usedTrialPackage.interface";
import { ObjectId } from "mongodb";

export class UsedTrialPackageRepository {
    constructor(private usedTrialPackageModel: typeof usedTrialPackageSchema) { }

    async findByUserIdAndPackageId(userId: string): Promise<IUsedTrialPackage | null> {
        return (
            await this.usedTrialPackageModel.findOne({
                userId: new ObjectId(userId),
                // package: new ObjectId(packageId)
            })
        )
    }

    async create(usedTrialPackage: IUsedTrialPackageCreateInput) {
        return (
            await this.usedTrialPackageModel.create(usedTrialPackage)
        )
    }
}