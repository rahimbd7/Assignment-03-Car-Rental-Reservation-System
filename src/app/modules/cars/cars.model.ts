// car.model.ts
import { Schema, model} from 'mongoose';
import ICars from './cars.interface';


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

const CarsModel = model<ICars>('cars', CarSchema);

export default CarsModel;
