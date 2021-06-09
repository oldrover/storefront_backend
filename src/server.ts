import express, { Request, Response} from 'express';
import cors from 'cors';
import user_routes from './helpers/users';
import product_routes from './helpers/products';
import order_routes from './helpers/orders';

const app = express();
const address: string = "0.0.0.0:3000";

app.use(cors());
app.use(express.json());

app.get('/', function (_req: Request, res: Response) {
    res.send('Server is running!');
});

user_routes(app);
product_routes(app);
order_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
export default app;
