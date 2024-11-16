import codePackageSchema from "../../models/code_package.model"
import { ICodePackage } from "../../shared/interfaces/package.interface";


export class CodePackageRepository {
    constructor(private codePackageModel: typeof codePackageSchema) { }

    async findByCode(code: string): Promise<ICodePackage | null> {
        return (await this.codePackageModel.findOne({ code: code }))
    }

    async deleteByCode(code: string) {
        return (await this.codePackageModel.deleteOne({ code: code }))
    }
}