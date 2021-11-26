# Flojics-Task

1. User uses Post Api to send json formatted data <br />
2. User receives in the response his json web token for authentication <br />
3. Data is then added to Rabbitmq <br />
4. Consumer(worker) send this data to mysql database named "Mymessages" in table "messages" ,and the message in the rabbit queue gets acked (deleted) <br />
5. Then, User can use Get Api to list all data stored in database ,providing the token he got while posting the data <br />
6. The Security layer is implemented via the json web tokens provided to user ,to make sure that only registered users can view the data stored in db and nobody else. <br />
