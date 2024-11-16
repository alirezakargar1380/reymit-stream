import UserSchema from "../models/user.model";
import {IUser, IUserCreateInput, IUserSelector, IUserUpdateInput, IUserFindGatewayInput} from "../shared/interfaces/user.interface";
import { ObjectId } from "mongodb";

export class UserRepository{
   constructor(private userModel:typeof UserSchema){ }

   async create(user:IUserCreateInput):Promise<IUser>{
        return this.userModel.create(user);
    }

   async findById(id:string, selector?:IUserSelector):Promise<IUser | null>{
        return this.userModel.findOne({
            _id: id
        }, selector);
    }

   async findGateway(inputs: IUserFindGatewayInput, selector?:IUserSelector):Promise<IUser | null>{
        return this.userModel.findOne(inputs, selector);
    }

    async findByEmail(email:string):Promise<IUser | null>{
        return this.userModel.findOne({
            email: email
        });
    }

    async findByUsername(username:string):Promise<IUser | null>{
        return this.userModel.findOne({
            username:username
        });
    }

    async findByUsernameOrEmail(username:string, email:string):Promise<IUser | null>{
        return this.userModel.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        });
    }

    async updateById(id:string, user:IUserUpdateInput):Promise<IUser | null>{
        return await this.userModel.findOneAndUpdate({
            id:id
        }, {$set:{...user}} );
    }

    async count(): Promise<number> {
        return (
            await this.userModel.count()
        )
    }

}