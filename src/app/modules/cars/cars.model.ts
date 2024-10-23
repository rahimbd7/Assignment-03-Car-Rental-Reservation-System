// car.model.ts
import { Schema, Types, model} from 'mongoose';
import ICars, { ICarsModel } from './cars.interface';



const CarSchema = new Schema<ICars>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        color: {
            type: String,
            required: true,
            trim: true,
        },
        isElectric: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['available', 'unavailable'],
            default: 'available',
        },
        features: {
            type: [String],
            default: [],
        },
        pricePerHour: {
            type: Number,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, 
    }
);



CarSchema.statics.isCarAvailable = async function (carId: Types.ObjectId) {
    const car = await this.findOne({ _id: carId, isDeleted: false });
    if (!car) {
        throw new Error('Car not found or is deleted');
    }
    return car.status === 'available';
};

const CarsModel= model<ICars, ICarsModel>('cars', CarSchema);
export default CarsModel;
