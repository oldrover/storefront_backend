#!/bin/bash

#create the databases
sudo -u postgres createdb store_dev
sudo -u postgres createdb store_test

#creates the user and grants privileges on databases
sudo -u postgres psql -c "create user store_developer with password 'password123';"
sudo -u postgres psql -c "grant all privileges on database store_dev to store_developer;"
sudo -u postgres psql -c "grant all privileges on database store_test to store_developer;"
