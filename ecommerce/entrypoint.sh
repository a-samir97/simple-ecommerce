#!/bin/bash
# Apply database migrations
echo "Running Frontend"
npm start

#echo "Load Fixtures"
##python manage.py loaddata fixtures/accounts.json
##python manage.py loaddata fixtures/stocks.json
##python manage.py loaddata fixtures/transactions.json
#
## Start server
#echo "Starting server"
#python manage.py runserver 0.0.0.0:8000