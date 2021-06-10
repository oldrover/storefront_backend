# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

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

#### Orders
- id
- list of products in the order with its quantity  
- userId
- status: active or complete

## Database Dictionary

### Table users
    id          SERIAL PRIMARY KEY
    userName    VARCHAR
    firstName   VARCHAR
    lastName    VARCHAR
    password    VARCHAR 

### Table products
    id          SERIAL PRIMARY KEY
    name        VARCHAR
    price       NUMERIC

### Table orders
    id          SERIAL PRIMARY KEY
    status      VARCHAR
    userId      BIGINT foreign key to users table(id)

### Table order_products
    id          SERIAL PRIMARY KEY
    quantity    INTEGER
    orderId     BIGINT foreign key to orders table(id)
    productId   BIGINT foreign key to products table(id)

