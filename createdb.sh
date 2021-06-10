#!/bin/bash

#color vars
green=`tput setaf 2`
reset=`tput sgr0`

#create the databases
echo "${green}creating the databases...${reset}"
sudo -u postgres createdb store_dev
sudo -u postgres createdb store_test

#creates the user and grants privileges on databases
echo "${green}creating user store_developer...${reset}"
sudo -u postgres psql -c "create user store_developer with password 'password123';"
echo "${green}granting privileges on databases...${reset}"
sudo -u postgres psql -c "grant all privileges on database store_dev to store_developer;"
sudo -u postgres psql -c "grant all privileges on database store_test to store_developer;"
