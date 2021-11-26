# Flojics-Task

User uses Post Api to send json formatted data
User receives in the response his json web token 
Data is then added to Rabbitmq 
Consumer(worker) send this data to mysql database named "Mymessages" in table "messages"
Then, User can use Get Api to list all data stored in database ,providing the token he got while posting the data
The Security layer is added via the json web token authentication ,to make sure that only registered users can view the data stored in db and nobody else
