## **Project Storefront Backend** 

### Project Summary
Imagine that you are a web developer at a small company. The company stakeholders have decided they want to set up an online store to make their great product ideas available for purchase -- and they want you and your co-worker to build it.

The stakeholders have put together a list of requirements for this online store. Your co-worker will be building the frontend and you will be supplying the JavaScript API. The requirements have been collected into requirements document.

Your job is to architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.

Your application needs to be ready for beta tests, so it needs to have tests, keep user information secure, and provide user authentication tokens that are ready to integrate with the frontend.

## **Endpoints and Database Dictionary** 
---
Please have a look at the `REQUIREMENTS.md`

## **Ports**
- Database Port: 5432
- Backend Port : 3000 

## **Setup the Postgres Databases** 
---
You can either use the included `createdb.sh` or create the databases and user yourself:
- Create the databases `store_dev` and `store_test`
- Create a user `store_developer` and grant all privileges to it on the databases

## **Tests**
---
For testing purposes i included the `.env`-file which usually should never be available in the repository!
If you want to run the tests you should change ENV to test in the `.env` file

## **Scripts**
---
`yarn watch`  to build and run the project  
`yarn migrate` to create all tables in the databases  
`yarn migratedown` for save deletion of all tables the databases  
`yarn test` for running the tests
