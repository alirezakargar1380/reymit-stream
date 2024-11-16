import condition_Schema from "../../../../models/tools/new_event_alert/new_support_alert/conditions/condition.model"
import {
  IToolsNewDonationConditions,
  IToolsNewDonationConditionsCreateInput,
  IToolsNewDonationConditionsUpdateInput,
  IAllToolsNewDonationConditions,
  IToolsNewDonationConditionsFindInput
} from "../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.interface"
import { ObjectId } from "mongodb"

export class Tools_NewEventAlert_newDonationsAlert_conditions {
  constructor(private conditionModel: typeof condition_Schema) { }

  async getConditionById(user_id: ObjectId, condition_id: ObjectId): Promise<IAllToolsNewDonationConditions[] | null> {
    return await this.conditionModel.aggregate([
      {
        $lookup: {
          from: "tools.new_event_alert.new_support_alert.conditions.send_emojis",
          localField: "_id",
          foreignField: "condition_id",
          as: "send_emoji"
        },
      },
      {
        $lookup: {
          from: "tools.new_event_alert.new_support_alert.conditions.send_voices",
          localField: "_id",
          foreignField: "condition_id",
          as: "send_voice"
        },
      },
      {
        $lookup: {
          from: "tools.new_event_alert.new_support_alert.conditions.video_content_settings_tools",
          localField: "_id",
          foreignField: "condition_id",
          as: "video_content_settings_tool"
        },
      },
      {
        $lookup: {
          from: "tools.new_event_alert.new_support_alert.conditions.general_settings",
          localField: "_id",
          foreignField: "condition_id",
          as: "general_settings"
        },
      },
      {
        $lookup: {
          from: "tools.new_event_alert.new_support_alert.conditions.appearance_settings",
          localField: "_id",
          foreignField: "condition_id",
          as: "appearance_settings"
        },
      },
      {
        $match: {
          user_id: {
            $eq: {
              $toObjectId: user_id.toString()
            }
          },
          _id: {
            $eq: {
              $toObjectId: condition_id.toString()
            }
          }
        }
      }
    ])
  }

  async getConditionByAmount(user_id: string, amount: Number): Promise<IAllToolsNewDonationConditions[]> {
    return await this.conditionModel.aggregate([
      {
        $lookup: {
          from: "tools.new_event_alert.new_support_alert.conditions.send_emojis",
          localField: "_id",
          foreignField: "condition_id",
          as: "send_emoji"
        },
      },
      {
        $lookup: {
          from: "tools.new_event_alert.new_support_alert.conditions.send_voices",
          localField: "_id",
          foreignField: "condition_id",
          as: "send_voice"
        },
      },
      {
        $lookup: {
          from: "tools.new_event_alert.new_support_alert.conditions.video_content_settings_tools",
          localField: "_id",
          foreignField: "condition_id",
          as: "video_content_settings_tool"
        },
      },
      {
        $lookup: {
          from: "tools.new_event_alert.new_support_alert.conditions.general_settings",
          localField: "_id",
          foreignField: "condition_id",
          as: "general_settings"
        },
      },
      {
        $lookup: {
          from: "tools.new_event_alert.new_support_alert.conditions.appearance_settings",
          localField: "_id",
          foreignField: "condition_id",
          as: "appearance_settings"
        },
      },
      {
        $match: {
          $expr: { $eq: ['$user_id', { $toObjectId: user_id }] },
          amount: {
            $lte: amount
          }
        }
      }
    ])
  }

  async create(inputs: IToolsNewDonationConditionsCreateInput): Promise<IToolsNewDonationConditions> {
    return await this.conditionModel.create(inputs)
  }

  async findByUserId(user_id: ObjectId): Promise<IToolsNewDonationConditions[] | null> {
    return await this.conditionModel.find({
      user_id: user_id
    })
  }

  async findOne(inputs: IToolsNewDonationConditionsFindInput): Promise<IToolsNewDonationConditions | null> {
    return await this.conditionModel.findOne(inputs)
  }

  async deleteById(_id: ObjectId) {
    await this.conditionModel.findOneAndDelete({ _id: _id })
  }

  async updateById(_id: ObjectId, inputs: IToolsNewDonationConditionsUpdateInput): Promise<IToolsNewDonationConditions | null> {
    return await this.conditionModel.findOneAndUpdate({
      _id: _id
    }, inputs)
  }

}
