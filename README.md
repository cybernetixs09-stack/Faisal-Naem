Restaurant Waitlist System
A simple restaurant waitlist system where customers can join a queue, receive a ticket number, and check how many parties are ahead of them. Staff can view the waiting queue and remove parties.
Tech stack
- Next.js
- TypeScript
- Drizzle ORM
- SQLite (better-sqlite3)
- CSS Modules
Next.js and TypeScript were chosen because they provide a simple full-stack structure with a clear API/UI boundary and strong typing. SQLite with Drizzle was chosen because it is lightweight and easy to run locally for this assessment, while the repository interface keeps the data layer replaceable if PostgreSQL is needed later.
How to run
Requirements
- Node.js
- npm
Install dependencies
npm install
Set the staff secret
Create .env.local in the project root:
STAFF_SECRET=your-local-staff-secret
Use the same value as the staff secret configured by the staff client for the assessment environment.
Prepare the database
If the database has not already been created, apply the Drizzle migrations:
npx drizzle-kit migrate
Start the development server
npm run dev
Open:
- Customer screen: http://localhost:3000/customer
- Staff screen: http://localhost:3000/staff
What is complete
Core requirements
- Customer can join with name and party size.
- Customer receives a unique ticket number.
- Customer can see the number of waiting parties ahead.
- Position changes correctly after a party ahead is removed.
- Staff can see waiting parties in join order.
- Staff can remove any waiting party.
- Empty names are rejected.
- Party size must be a whole number greater than zero.
- Ticket numbers are generated with SQLite AUTOINCREMENT and are never reused after removal.
- Parties ahead are counted as parties, not people.
Optional extras completed
- Same-device recovery using localStorage.
- Staff endpoint protection using a staff secret.
Not implemented
- Automatic real-time position updates.
- Customer self-removal.
- Customer accounts/login.
- SMS or other notifications.
- QR-code generation.
- Multiple restaurant branches.
These were intentionally not prioritized because they are outside the core requirements or optional.
Code organization
The application uses a simple layered structure:
Next.js API Route
        ↓
Controller
        ↓
Service
        ↓
WaitlistRepository interface
        ↓
SQLiteWaitlistRepository
        ↓
SQLite
The repository interface separates the application logic from the database implementation, so a PostgreSQL repository could be added later without changing the API/controller flow.
Checking the implementation
The main requirements were checked manually through the browser and application UI, including:
- Invalid names return 400.
- Invalid party sizes (0, negative values, decimals, and strings) return 400.
- Valid customer tokens return only that customer's information.
- Invalid customer tokens return 404.
- Removed customer tokens return 404.
- Staff requests without the secret return 401.
- Staff requests with the correct secret return 200.
- Removing a nonexistent ticket returns 404.
- Removed ticket numbers are not reused.
- Staff queue order matches join order.
- partiesAhead decreases when a party ahead is removed.
Example of checking an AI suggestion
An AI suggestion was to make ticket ordering explicit when calculating partiesAhead. The implementation was changed from counting waiting records with an earlier createdAt to counting waiting records with a lower ticketNumber. The behavior was then checked again by creating two parties, recording the second party's position, removing the first party, and confirming that the second party's partiesAhead decreased by exactly one.