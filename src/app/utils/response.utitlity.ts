import {Response} from "express"

export const success = (response: Response, data: any) => {
  response.status(200)
  response.json({
    status: true,
    data: data
  })
}

export const error = (response: Response, data: any) => {
  response.status(200)
  response.json({
    status: false,
    data: data
  })
}