import {Request, Response} from "express";
const responseUtils = require('./../../utils/response.utitlity');
import {donateRepository, landingRepository, packageRepository, userRepository} from '../../shared/config'
import validation from '../../validation/landings/landings.validation'
import {ILanding} from "../../shared/interfaces/landings/landings.interface";
import pardakhtPay from "../../services/peyment_methods/pardakhtpay";
import payPing from "../../services/peyment_methods/payping";
import idPay from "../../services/peyment_methods/idpay";
import zarinpal from "../../services/peyment_methods/zarinpal";
import Exception from "../../utils/error.utility";


export const get = async (req: Request, res: Response) => {
    try {
        validation.checkCategory(req.params)

        let result: any;

        switch (req.params.category) {
            case "home": {
                let home: any = await landingRepository.findLandingByCategory(req.params.category)
                home = home?.map((item: any) => {
                    item.image = process.env.AWS_DEFAULT_PATH + item.image
                    return item
                })

                let packages: any = await packageRepository.getAll()

                await donateRepository;

                result = {
                    home: home,
                    blogs: [{
                        id: '0',
                        image: 'test',
                        title: 'test',
                        description: 'test',
                        date: Date,
                        category: {
                            title: 'test',
                            icon: 'test',
                            color: 'test'
                        }
                    }],
                    packages: packages,
                    statistic: {
                        allUserCount: await userRepository.count(),
                        todayDonateAmount: await donateRepository.amountToday(),
                        todayDonateCount: await donateRepository.countToday(),
                        allDonateAmount: await donateRepository.amountAll(),
                        allDonateCount: await donateRepository.countAll(),
                    }
                }
                break
            }

            default:
                result = await landingRepository.findLandingByCategory(req.params.category)
                result = result?.map((item: any) => {
                    item.image = process.env.AWS_DEFAULT_PATH + item.image
                    return item
                })
        }

        responseUtils.success(res, result)

    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}