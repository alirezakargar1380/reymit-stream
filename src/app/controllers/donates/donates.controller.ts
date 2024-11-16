import {Request, Response} from "express";
const responseUtils = require('./../../utils/response.utitlity');
import donateSchema from "../../models/donates.model"
import validation from "../../validation/donates/donates.validation"
import { Ifilter } from "../../shared/interfaces/donates/donates.interface"
import Exception from "../../utils/error.utility";
import mongoose from 'mongoose'
import { donateRepository } from '../../shared/config'
import io from "../../../server"

export const get_donates = async (req: Request, res: Response) => {
    try {
        validation.get_donates_filter(req.query)
        let filter: Ifilter = {}

        if ('displayName' in req.query) {
            filter.displayName = {$regex: '.*' + req.query.displayName + '.*'}
        }

        if ('paymentMethod' in req.query) {
            filter.paymentMethod = req.query.paymentMethod as string
        }

        if ('dateFrom' in req.query && 'dateTo' in req.query) {
            filter.updatedAt = {
                $gte: new Date(req.query.dateFrom as string), $lt: new Date(req.query.dateTo as string)
            }
        } else if ('dateFrom' in req.query || 'dateTo' in req.query) {
            if ('dateFrom' in req.query) filter.updatedAt = { $gte: new Date(req.query.dateFrom as string) };
            if ('dateTo' in req.query) filter.updatedAt = { $lt: new Date(req.query.dateTo as string) };
        }

        if ('amountFrom' in req.query && 'amountTo' in req.query) {
            filter.amount_irr = {
                $gte: Number(req.query.amountFrom), $lte: Number(req.query.amountTo)
            }
        } else if ('amountFrom' in req.query || 'amountTo' in req.query) {
            if ('amountFrom' in req.query) filter.amount_irr = { $gte: Number(req.query.amountFrom) };
            if ('amountTo' in req.query) filter.amount_irr = { $lte: Number(req.query.amountTo) };
        }

        if ('publishName' in req.query) filter.publishName = (req.query.publishName == 'true');
        if ('publishName' in req.query) filter.publishDesc = (req.query.publishDesc == 'true');
        if ('publishNameInDonatorList' in req.query) filter.publishNameInDonatorList = (req.query.publishNameInDonatorList == 'true');

        const numberInPage = 30

        if (!(Number(req.query.Page) > 0)) throw Exception.setError({ message: "invalid page number", }, true);
        const donates = await donateRepository.donatesByUserId(new mongoose.Types.ObjectId(res.locals.user_id), filter, numberInPage, Number(req.query.Page))
        const donates_count = await donateRepository.donatesByUserIdCount(new mongoose.Types.ObjectId(res.locals.user_id), filter)

        responseUtils.success(res, {count: donates_count, data: donates})
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

