#!/bin/bash

export PGPASSWORD = '54890971'
echo "Configure Database customerdb"

database = 'customerdb'
dropdb -U node_user customerdb
createdb -U node_user customerdb
psql -U node_user customerdb < ./bin/sql/customer.sql

echo "customerdb configured"
