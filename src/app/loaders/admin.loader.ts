import userModel from "../models/user.model";
import express from "express";
import mongoose from "mongoose"

import adminModel from '../models/admin.model'
import emojiModel from '../models/emojis.model'
import landingModel from '../models/landing.model'
import packageModel from '../models/package.model'

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const uploadFeature = require('@adminjs/upload')


export default ({ app }: { app: express.Application }) => {
    AdminJS.registerAdapter(AdminJSMongoose)

    const provider: {aws: {}} = {
        aws: {
            bucket: process.env.AWS_BUCKET,
            endpoint: process.env.AWS_ENDPOINT,
            s3ForcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT,
            region: process.env.AWS_DEFAULT_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            signatureVersion: 'v4'
        }
    }

    const adminJs = new AdminJS({
        databases: [mongoose],
        rootPath: '/admin',
        resources: [
            {
                resource: emojiModel,
                features: [
                    uploadFeature({
                        provider: provider,
                        properties: {
                            key: 'emoji'
                        }
                    })
                ]
            },
            {
                resource: landingModel,
                features: [
                    uploadFeature({
                        provider: provider,
                        properties: {
                            key: 'image'
                        }
                    })
                ]
            },
            {
                resource: packageModel,
                features: [
                    uploadFeature({
                        provider: provider,
                        properties: {
                            key: 'image',
                        }
                    })
                ]
            },
        ]
    })
    const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
        authenticate: async (email: string, password: string) => {
            if ((await adminModel.countDocuments()) == 0 && email === "admin" && password === "123") return true;
            const user = await adminModel.findOne({ email: email, password: password });
            return user ? user : false;
        },
        cookiePassword: 'password',
    }, null, {
        resave: true,
        saveUninitialized: true
    })
    app.use(adminJs.options.rootPath, router)

}