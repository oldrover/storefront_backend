## API Endpoints
#### Products
- Index                                        : 'products' [GET] 
- Show                                         : 'products/:id' [GET]
- Create [token required]                      : 'products' [POST]
- Delete [token required]                      : 'products' [DELETE]    
- Products by category (args: product category): 'products/categories/:category' [GET]

#### Users
- Index [token required]                       : 'users/' [GET] 
- Show [token required]                        : 'users/:id'[GET]
- Create                                       : 'users' [POST]
- Delete [token required]                      : 'users/:id' [DELETE]

#### Orders
- Current Order by user (args: user id)[token required]:
    'orders/active/:id' [GET] 
- Completed Orders by user (args: user id)[token required]:
    'orders/completed/:id [GET]

## Data Shapes
#### Product
- id 
- name
- price
- category

#### User
- id
- userName
- firstName
- lastName
- password

#### Order
- id
- products: list of products with its quantity  
- userId
- status: active or complete

## Database Dictionary

### Table users
    id          SERIAL PRIMARY KEY
    userName    VARCHAR NOT NULL
    firstName   VARCHAR NOT NULL
    lastName    VARCHAR NOT NULL
    password    VARCHAR NOT NULL 

### Table products
    id          SERIAL PRIMARY KEY
    name        VARCHAR NOT NULL
    price       NUMERIC NOT NULL
    category    VARCHAR NOT NULL

### Table orders
    id          SERIAL PRIMARY KEY
    status      VARCHAR NOT NULL
    userId      BIGINT foreign key to users table(id)

### Table order_products
    id          SERIAL PRIMARY KEY
    quantity    INTEGER NOT NULL
    orderId     BIGINT foreign key to orders table(id)
    productId   BIGINT foreign key to products table(id)

