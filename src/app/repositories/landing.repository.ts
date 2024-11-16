import landingSchema from "../models/landing.model"
import {
    ILanding,
} from "../shared/interfaces/landings/landings.interface"


export class LandingRepository {
    constructor(private emojiModel: typeof landingSchema) { }

    async findLandingByCategory(category: string): Promise<ILanding[] | null> {
        return await this.emojiModel.find({
            category: { "$in": ["common", category] }
        })
    }

}