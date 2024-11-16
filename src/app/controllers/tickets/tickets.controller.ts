// Schema
import Tickets_Schema from "../../models/tickets/tickets.model";
import Tickets_Messages_Schema from "../../models/tickets/tickets_messages.model";

// VALIDATION
import fileValidation from "../../validation/file/file.validation";
import ticketsValidation from "../../validation/tickets/tickets.validation";

// PACKAGES
import multer from "multer";
import { v4 } from "uuid"
import { ObjectId } from 'mongodb';
import { Request, Response } from "express";

// UTILS
import ticketsModel from "../../models/tickets/tickets.model";
import { random_ticket_code } from "../../utils/number.utility"
const responseUtils = require('./../../utils/response.utitlity');

// CONGIFURATION
const upload = multer({
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
}).single('image')

// SERVICE
import Exception from "../../utils/error.utility";

// Repositorys
import {
    ticket_messagesRepository,
    ticketRepository
} from "../../shared/config";

// INTERFACES
import { ITicketMessagesAggregateByTicketId } from "../../shared/interfaces/tickets/tickets-messages.interface"
import { ITicket } from "../../shared/interfaces/tickets/ticket.interface"

// constants
import { TicketStatus, TicketAnswredBy } from "../../shared/constants/ticket.constant";
import { TicketRepository } from "../../repositories/ticket.repsitory";

import { file_manager } from "./../../services/file/file_manager"
import { IUploadFileStorage } from "../../shared/interfaces/files/storage.interface";

export const get_tickets = async (req: Request, res: Response) => {
    try {
        ticketsValidation.get_tickets(req.query);

        const pageNumber = typeof req.query.page_number === "string" ? parseInt(req.query.page_number) : 1 || 1;
        if (pageNumber < 1) throw Exception.setError("Invalid page number", true);
        let limit = pageNumber * 10;
        let skip = (pageNumber - 1) * 10;
        const numberOfAllTickets = await Tickets_Schema.countDocuments({
            user_id: new ObjectId(res.locals.user_id)
        });

        let tickets

        if (req.query.subject) {
            // tickets = await Tickets_Schema.find({
            //     $text: {
            //         $search: req.query.subject as string
            //     },
            //     user_id: res.locals.user_id
            // }).skip(skip).limit(limit)
            tickets = await ticketRepository.searchByUserId({
                user_id: new ObjectId(res.locals.user_id),
                subject: req.query.subject as string,
                limit: limit,
                skip: skip,
            })

        } else {
            tickets = await ticketRepository.findByUserId({
                user_id: new ObjectId(res.locals.user_id),
                limit: limit,
                skip: skip
            })

        }

        responseUtils.success(res, {
            all_number_of_ticket: numberOfAllTickets,
            tickets: tickets
        })
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions);
        } else {
            responseUtils.error(res, "internal server error");
        }
    }
}

export const get_tickets_messages = async (req: Request, res: Response) => {
    try {
        ticketsValidation.get_tickets_messages(req.params);

        let ticket: ITicket | null = await ticketRepository.findUserTicket({
            _id: new ObjectId(req.params.ticket_id as string),
            user_id: new ObjectId(res.locals.user_id)
        })
        ticket = await ticketRepository.findUserTicket({
            _id: new ObjectId(req.params.ticket_id as string),
            user_id: new ObjectId(res.locals.user_id)
        })
        if (!ticket) throw Exception.setError("ticket not found", false);

        responseUtils.success(res, {
            ticket: ticket,
            ticket_messages: await ticket_messagesRepository.aggregateByTicketId(req.params.ticket_id as string)
                .then((res: ITicketMessagesAggregateByTicketId[] | null) => {
                    return res
                }).catch((err: TypeError) => {
                    throw err
                })
        })
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions);
        } else {
            responseUtils.error(res, "internal server error");
        }
    }
}

export const new_ticket = async (req: Request, res: Response) => {
    /**
     * TODO:
     *    - add validation
     *    - make service for create new ticket
     */
    upload(req, res, async function (err) {
        try {
            let file_link = null
            if (err) return res.status(400).json({
                success: false,
                message: err.message
            })

            if (req.file) {
                fileValidation.ticket_file(req.file)

                const fileManager = new file_manager({
                    mimetype: req.file.mimetype as string,
                    file_name: v4(),
                    user_id: res.locals.user_id,
                    key: ''
                })
                let uploadResult: IUploadFileStorage = await fileManager.create(req.file.buffer as {})
                file_link = uploadResult.location as string
            }

            const ticket: ITicket = await ticketRepository.create({
                user_id: new ObjectId(res.locals.user_id),
                number_of_ticket: random_ticket_code(),
                subject: req.body.subject,
                status: TicketStatus.waiting_to_answer
            })

            await ticket_messagesRepository.create({
                ticket_id: ticket._id,
                user_id: res.locals.user_id,
                description: req.body.description,
                attach_file_link: file_link,
                answred_by: TicketAnswredBy.user,
            })

            responseUtils.success(res, "your ticket created");
        } catch (e: any) {
            console.log(e);
            if (e.extensions) {
                responseUtils.error(res, e.extensions);
            } else {
                responseUtils.error(res, "internal server error");
            }
        }
    })
}

export const reply_ticket_by_user = async (req: Request, res: Response) => {
    upload(req, res, async function (err) {
        try {
            let file_link = null
            if (err) return res.status(400).json({
                success: false,
                message: err.message
            })

            ticketsValidation.reply_ticket_by_user(req.body);

            const ticket: ITicket | null = await ticketRepository.findUserTicket({
                _id: new ObjectId(req.body.ticket_id),
                user_id: new ObjectId(res.locals.user_id)
            })

            if (!ticket)
                return responseUtils.error(res, "ticket not found");
            else {
                ticket.status = TicketStatus.waiting_to_answer
                await ticketRepository.updateById(ticket._id, ticket)
            }

            if (req.file) {
                fileValidation.ticket_file(req.file)

                const fileManager = new file_manager({
                    mimetype: req.file.mimetype as string,
                    file_name: v4(),
                    user_id: res.locals.user_id,
                    key: ''
                })
                let uploadResult: IUploadFileStorage = await fileManager.create(req.file.buffer as {})
                
                file_link = uploadResult.location
            }
            
            const data = await Tickets_Messages_Schema.create({
                ticket_id: req.body.ticket_id,
                user_id: res.locals.user_id,
                description: req.body.description,
                attach_file_link: file_link,
                answred_by: TicketAnswredBy.user,
            })

            responseUtils.success(res, {
                message: "your ticket sended!",
                data: data
            });
        } catch (e: any) {
            console.log(e);
            if (e.extensions) {
                responseUtils.error(res, e.extensions);
            } else {
                responseUtils.error(res, "internal server error");
            }
        }
    })
}

export const reply_ticket_by_admin = async (req: Request, res: Response) => {
    return res.send("this api not developed yet")
    upload(req, res, async function (err) {
        try {
            /*
                TODO: 
                  - check if user is admin
            */
            let file_link = null
            ticketsValidation.reply_ticket_by_admin(req.body);

            const ticket: ITicket | null = await ticketRepository.findOneById(new ObjectId(req.body.ticket_id))
            if (!ticket) return responseUtils.error(res, "ticket not found");

            ticket.status = TicketStatus.answered
            await ticketRepository.updateById(ticket._id, ticket)

            if (req.file) {
                fileValidation.ticket_file(req.file)

                const fileManager = new file_manager({
                    mimetype: req.file.mimetype as string,
                    file_name: v4(),
                    user_id: res.locals.user_id,
                    key: ''
                })
                let uploadResult: IUploadFileStorage = await fileManager.create(req.file.buffer as {})
                
                file_link = uploadResult.location
            }

            const data = await Tickets_Messages_Schema.create({
                ticket_id: req.body.ticket_id,
                user_id: res.locals.user_id,
                description: req.body.description,
                attach_file_link: file_link,
                answred_by: TicketAnswredBy.admin,
            })

            responseUtils.success(res, {
                message: "your ticket sended!",
                data: data
            });
        } catch (e: any) {
            console.log(e);
            if (e.extensions) {
                responseUtils.error(res, e.extensions);
            } else {
                responseUtils.error(res, "internal server error");
            }
        }
    })
}

export const close_ticket = async (req: Request, res: Response) => {
    try {
        /*
            TODO: 
                - check if user is logged in
                - get ticket id
                - vlidation
        */
        const ticket = await Tickets_Schema.findOne({
            _id: req.body.ticket_id,
            user_id: res.locals.user_id,
        })

        if (!ticket)
            return responseUtils.error(res, "ticket not found");

        if (ticket.status === "closed")
            return responseUtils.error(res, "ticket is already closed");

        ticket.status = TicketStatus.closed
        await ticket.save();

        responseUtils.success(res, "your ticket closed!");
    } catch (e: any) {
        console.log(e);
        if (e.extensions) {
            responseUtils.error(res, e.extensions);
        } else {
            responseUtils.error(res, "internal server error");
        }
    }
}
