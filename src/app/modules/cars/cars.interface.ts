/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { Types } from 'mongoose'

interface ICars {
  name: string
  description: string
  color: string
  isElectric: boolean
  status: 'available' | 'unavailable'
  features: string[]
  pricePerHour: number
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ICarsModel extends Model<ICars> {
  isCarAvailable(carId: Types.ObjectId): Promise<boolean>
}
export default ICars
