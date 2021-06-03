import Client from '../database';
import { Product } from './product';

export type order = {
    id: Number;
    products: Product[];
    user_id: number;
    completed: boolean;
}
