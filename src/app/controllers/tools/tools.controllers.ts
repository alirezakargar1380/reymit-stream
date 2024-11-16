// Packages
import { Request, Response } from "express"
import multer from "multer";
import { v4 } from "uuid";

// UTILITES
const responseUtils = require('./../../utils/response.utitlity');
import Exception from "../../utils/error.utility";

// SERVICE
import * as activityService from './../../services/users/user_activites.service'
import { file_manager } from "./../../services/file/file_manager"

// CONFIGURATION
const upload = multer({
    limits: {
        fileSize: 20 * 1024 * 1024,
    }
}).single('file')

// INTERFACE
import { IUploadFileStorage } from "./../../shared/interfaces/files/storage.interface"

// validation
import uploadValidation from "./../../validation/tools/target/tools.validation"

import uploader_file_validation from "./../../validation/file/uploader_file.validation"
import { ObjectId } from "mongodb";
import { getDate_of_a_minute } from "../../utils/days.utilitys";
import logUtility from "../../utils/log.utility";

import user_uploader_activites from "./../../models/user_uploader_activites.logs.model"
import { EUserUploaderActivitesSectionsTypes } from "../../shared/interfaces/user_uploader_activites.iterface";

export const uploader = (req: Request, res: Response) => {
    upload(req, res, async function (err) {
        try {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "upload was failed"
                })
            }

            // validation
            uploadValidation.upload_files(req.body)

            if (!req.file) throw Exception.setError("Please select a file", true)

            if (req.body.file_type === EUserUploaderActivitesSectionsTypes.image)
                uploader_file_validation.image(req.file)
            if (req.body.file_type === EUserUploaderActivitesSectionsTypes.audio)
                uploader_file_validation.audio(req.file)
            if (req.body.file_type === EUserUploaderActivitesSectionsTypes.video)
                uploader_file_validation.video(req.file)


            const fileManager = new file_manager({
                mimetype: req.file.mimetype as string,
                file_name: v4(),
                user_id: res.locals.user_id,
                key: ''
            })

            // uploading image to storge by file manager
            let imageUrl: IUploadFileStorage = await fileManager.create(req.file.buffer as {})

            // add activity for user
            await user_uploader_activites.create({
                user_id: res.locals.user_id,
                type: req.body.file_type,
                key: imageUrl.location
            })

            responseUtils.success(res, imageUrl.location)
        } catch (e: any) {
            console.log(e)
            if (e.extensions) {
                responseUtils.error(res, e.extensions)
            } else {
                responseUtils.error(res, "internal server error")
            }
        }
    })
}