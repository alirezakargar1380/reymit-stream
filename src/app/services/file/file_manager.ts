// PACKAGE
import { v4 } from "uuid";
import { ObjectId } from "mongodb";

// SERVICE
import { storageFileManager } from './../storage/storage'
import { IUploadFileStorage } from "./../../shared/interfaces/files/storage.interface"
import * as activityService from './../../services/users/user_activites.service'
import {
    IUserActivites,
    IUserActivitesCreateInput,
    IUserActivitesCheckActivitesByDayInput,
    IUserActivitesCheckActivitesBySectionInput
} from "./../../shared/interfaces/user_activites.interface";

// INTERFACE
import { EUserActivites_Sections } from "./../../shared/interfaces/user_activites.interface";
import { IFileManagerParams } from "./../../shared/interfaces/files/file_manager.interface";
import logUtility from "../../utils/log.utility";

export class file_manager {
    private file_name: string
    private format?: string
    private user_id?: String
    public key?: string
    // private section: EUserActivites_Sections
    constructor(params: IFileManagerParams) {
        this.format = require('mimetypes').detectExtension(params.mimetype)
        this.file_name = `${params.file_name}.${this.format}`
        // this.section = params.section
        this.user_id = params.user_id
        this.key = params.key
    }

    async create(buffer: {}): Promise<IUploadFileStorage> {
        const file = new storageFileManager(this.file_name)
        return await file.uploadFile(buffer);
    }

    async delete(key: string) {
        if (await this.exist(key)) {
            const file = new storageFileManager(key)
            await file.deleteFile()
        }
    }

    async delete_previous_file(user_id: string) {
        // const result: any = await activityService.get_activityBySection({
        //     user_id: new ObjectId(user_id),
        //     section: this.section
        // })
        

        // if (!result) { return logUtility.error("resutl") } else { if (!result.data) return logUtility.error("data") }
        // logUtility.info("pass")
        // if (await this.exist(result.data)) {
        //     console.log(result.data)
        //     const file = new storageFileManager(result.data)
        //     await file.deleteFile()
        // }

        // await activityService.removeBySection({
        //     user_id: new ObjectId(user_id),
        //     section: this.section
        // })
    }

    async exist(key: string): Promise<boolean> {
        const file = new storageFileManager(key)
        return await file.checkFile()
    }
}