## Database Schema

The following diagram represents the relationships between the different models in the MongoDB database:

```plaintext
+-----------------+          +-----------------+          +-----------------+
|     users       |          |     shows       |          |    theatre      |
+-----------------+          +-----------------+          +-----------------+
| _id             |<---------| _id             |<---------| _id             |
| name            |          | name            |          | name            |
| email           |          | date            |          | address         |
| password        |          | time            |          | phone           |
| isAdmin         |          | theatre         |          | email           |
| otp             |          | movie           |          | owner           |
| otpExpiry       |          | totalSeats      |          | isActive        |
+-----------------+          | bookedSeats     |          +-----------------+
                             | ticketPrice     |
                             +-----------------+

+-----------------+
|    bookings     |
+-----------------+
| _id             |
| user            |----> users._id
| show            |----> shows._id
| seats           |
| totalAmount     |
| transacationId  |
| paymentStatus   |
+-----------------+
```
