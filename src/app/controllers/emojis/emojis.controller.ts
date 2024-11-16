import { Request, Response } from "express";
import fileValidation from "../../validation/file/file.validation";
import { v4 } from "uuid";
import multer from "multer";
import Exception from "../../utils/error.utility";
const responseUtils = require('./../../utils/response.utitlity');
const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024,
    }
}).single('emoji')
import { emojiRepository } from "../../shared/config"
import validation from "../../validation/emojis/emojis.validation"
import { storageFileManager } from './../../services/storage/storage'
import { IEmoji } from "../../shared/interfaces/emojis/emojis.interface";
import { ObjectId } from "mongodb";
import { IUploadFile } from '../../shared/interfaces/files/file.interface'
import { IUploadFileStorage } from "./../../shared/interfaces/files/storage.interface"
import { file_manager } from "./../../services/file/file_manager"

// ENUM
import { EUserActivites_Sections } from "./../../shared/interfaces/user_activites.interface";

// SERVICE
import * as activityService from './../../services/users/user_activites.service'

export const create_emoji = async (req: Request, res: Response) => {
    upload(req, res, async function (err: any) {
        try {

            validation.create(req.body); // validating details of emoji
            fileValidation.emoji(req.file); // validating file of emoji

            const data: IEmoji | null = await emojiRepository.getEmoji({
                emoji: req.body.image_url
            })
            if (data) throw Exception.setError("you already have this emoji", true)
            if (!req.file) throw Exception.setError("please select a file", true)

            const fileManager = new file_manager({
                mimetype: req.file.mimetype as string,
                file_name: v4(),
                user_id: res.locals.user_id,
            })
            let uploadResult: IUploadFileStorage = await fileManager.create(req.file.buffer as {})

            // saving emoji details in database
            const created_data: IEmoji = await emojiRepository.create({
                user: new ObjectId(res.locals.user_id),
                title: req.body.title,
                emoji: uploadResult.location as string,
                price: req.body.price,
                animationStyle: req.body.animationStyle,
                animationSpeed: req.body.animationSpeed,
                animationCount: req.body.animationCount,
            })

            responseUtils.success(res, created_data);
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

export const get_emojis = async (req: Request, res: Response) => {
    try {
        const userId: ObjectId = new ObjectId(res.locals.user_id); // converting string objectid to objectid
        responseUtils.success(res, (await emojiRepository.getEmojisByUserId(userId))); // getting all emojis for user to response
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const update_emoji = async (req: Request, res: Response) => {
    try {
        upload(req, res, async function (err: any) {
            try {
                if (err) throw Exception.setError(err.message, true); // error if upload failed

                validation.update(req.body); // validating details of emoji

                // converting string objectid to objectid
                const emojiId: ObjectId = new ObjectId(req.body.id)
                const userId: ObjectId = new ObjectId(res.locals.user_id)

                // checking emoji exist
                const emoji: IEmoji | null = await emojiRepository.getEmojiByIdAndUserId(userId, emojiId); // find emoji in database by details
                if (!emoji) throw Exception.setError("emoji not found", true); // error if emoji not found

                let imageUrl: string | null = null

                if (req.file) {
                    fileValidation.emoji(req.file); // validating file of emoji

                    const file: IUploadFile = req.file

                    // const fileName: string = emoji.emoji.split(`/`).pop() as string // getting name of emoji file by url
                    const fileManager = new file_manager({
                        mimetype: req.file.mimetype as string,
                        file_name: v4(),
                        user_id: res.locals.user_id,
                        // key: fileName
                    })
                    // await fileManager.delete_previous_file(fileName); // delete emoji file in object storage by name of emoji file

                    let s3Result: IUploadFileStorage
                    s3Result = await fileManager.create(file.buffer as {})
                    // const s3Result: any = await storage.uploadFile(filename as string, file.buffer as {}); // saving emoji file to s3 object storage

                    imageUrl = s3Result.location as string; // getting url of emoji file from s3 result
                }

                // update emoji details in database
                await emojiRepository.updateEmojiByIdAndUserId(userId, emojiId,
                    {
                        title: req.body.title,
                        price: Number(req.body.price),
                        animationStyle: req.body.animationStyle,
                        animationSpeed: req.body.animationSpeed,
                        animationCount: req.body.animationCount,
                        emoji: (imageUrl ? imageUrl : emoji.emoji)
                    }
                )

                responseUtils.success(res, (await emojiRepository.getEmojiByIdAndUserId(userId, emojiId)));
            } catch (e: any) {
                if (e.extensions) {
                    responseUtils.error(res, e.extensions)
                } else {
                    responseUtils.error(res, "internal server error")
                }
            }
        })
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const delete_emoji = async (req: Request, res: Response) => {
    try {
        validation.delete(req.body); // validating details of emoji

        // converting string objectid to objectid
        const emojiId: ObjectId = new ObjectId(req.body.id)
        const userId: ObjectId = new ObjectId(res.locals.user_id)

        const emoji: IEmoji | null = await emojiRepository.getEmojiByIdAndUserId(userId, emojiId); // find emoji in database by details
        if (!emoji) throw Exception.setError("emoji not found", true); // error if emoji not found
        const fileName: string = emoji.emoji.split(`/`).pop() as string // getting name of emoji file by url
        // await storage.deleteFile(fileName); // delete emoji file in object storage by name of emoji file
        await emojiRepository.deleteEmojiByIdAndUserId(userId, emojiId); // delete emoji details from database

        responseUtils.success(res, (await emojiRepository.getEmojisByUserId(userId)))
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}