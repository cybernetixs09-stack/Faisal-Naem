### Restaurant Waitlist System

Time limit: 2 hours 30 minutes, including programming, checking your work, the README and submission. Your development tools and your GitHub account must be ready before the time starts.

#### Background

A restaurant gets very busy at weekends, and customers wait at the door without knowing their place in the queue. The owner wants a simple system that lets a customer join the waitlist from their phone and see their place, and lets staff manage the list from a separate screen.

#### Core criteria (Definition of Done)

1. A customer joins the waitlist by entering their name and party size, and receives a ticket number.
2. The customer can see how many parties are ahead of them. When a party ahead of them leaves the list, the customer sees the new number after refreshing the page.
3. Staff see the waiting parties in the order they joined, and can remove any party from the list.

#### Three rules (so that nobody loses time on different assumptions)

- The name cannot be empty, and the party size is a whole number greater than zero.
- Every ticket number is unique and is never reused after a party is removed.
- "Parties ahead" means the waiting parties before you, not the number of people.

#### General requirements

1. Tech stack: choose a programming language and framework that suit the project.
2. Database: use a suitable database to store the waitlist data.
3. Code organisation: keep the code clear and organised. No specific architecture and no automated tests are required.
4. Running locally: the project must run locally by following the steps in the README, without changing the code. Deploying it online is optional.
5. Documentation: a short README, as described under "What to submit".
6. GitHub: push the project to a GitHub repository. One push at the end is enough.

#### Optional extras (really optional: the core criteria done well earn full marks)

- Update the number of parties ahead automatically, without reloading the page.
- Return the customer to their place if they close the page and open it again on the same device.
- Protect the staff screen so that customers cannot access it.
- Let the customer leave the waitlist themselves.

#### Out of scope

- Customer login accounts.
- SMS or any other notifications.
- Generating the QR code.
- Support for more than one branch.
- Visual design: a simple, clear interface that works on a phone is enough, and its looks are not evaluated.

#### Rules

- You may use any AI tool in this stage, and the internet is available.
- You may ask questions to clarify the requirements. Every clarification is given to all candidates.
- Priority goes to the core criteria and their quality. Start the optional extras only after the core criteria are complete.

#### What to submit

Submit through this stage's form:

1. GitHub repository: the link to your repository, in the link field.
2. AI conversations: for every AI tool you used, the conversation's link, an export of the conversation, or the tool's log, uploaded as files (PDF, TXT, MD, JSON, PNG or JPG; up to 5 files of 3 MB each) or pasted as links in the text field. Summaries are not accepted. If you did not use AI, say so in the text field. How much you used AI does not affect your evaluation.
3. README: a short README in the repository with:

- How to run the project.
- Why you chose the technology and the database, in two sentences.
- What is complete and what is not.
- One example of how you checked a suggestion from AI.

#### Evaluation

Your work is evaluated on these points, from the largest weight to the smallest:

1. Correctness of the core criteria and the three rules.
2. Your understanding of your own code.
3. Organisation of the code.
4. How you checked your work and the AI's suggestions.

A short interview (about 10 minutes) follows submission: you explain your solution and show the cases you tried.







ui/ux is not important, we need to focus on scaleability more



think using next js and postgreSQL will be the best option, as nextJS is best for mvps and general ideas, and PostgreSQL is the best database for most uses


<!-- Message 2 -->

we can start by first making the controllers, we can use localstorage to add a token, however we face the problem of the user closing the site and having to add rejoin with a new user?

<!-- Message 3 -->


okay let's start coding it, i did npx create-next-app@latest, so guessing next step is adding an orm and database


<!-- Message 4 -->

docker is not installed, so we will use psql


<!-- Message 5 -->

we need a password for psql

do we create a new user?


<!-- Message 6 -->

changing the password seems like bad idea no?

not my device

<!-- Message 7 -->

also no, think we pivot to making the backend first?

<!-- Message 8 -->


let's do that, think creating the controller then routes first is the best plan


<!-- Message 9 -->

Error: Module not foun&#x64;**: Can't resolve&#x20;**'@/controllers/waitlist.controller'   1 | import { NextRequest } from "next/server"; **>** 2 | import { createWaitlistController } from "@/controllers/waitlist.controller";     | **^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^**   3 |   4 | export async function POST(request: NextRequest) {   5 |   return createWaitlistController(request);  Import map: aliased to relative './controllers/waitlist.controller' inside of [project]/  [https://nextjs.org/docs/messages/module-not-found](https://nextjs.org/docs/messages/module-not-found) &#x20;


file structure is waitlist/app


<!-- Message 10 -->

\
1/1
next
**svgNext.js 16.4.0Turbopack**
**Runtime Error**svg[svg](https://nextjs.org/docs/messages/module-not-found "Go to related documentation")svg
**./controllers/waitlist.controller.ts:4:1 Error: Module not found: Can't resolve '@/services/waitlist.service'   2 |   3 | import { NextRequest, NextResponse } from "next/server"; > 4 | import { createWaitlistParty } from "@/services/waitlist.service";     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   5 |   6 | export async function createWaitlistController(   7 |   request: NextRequest  Import map: aliased to relative './services/waitlist.service' inside of [project]/   Import trace:   App Route:     ./controllers/waitlist.controller.ts     ./app/api/waitlist/route.ts  [https://nextjs.org/docs/messages/module-not-found](https://nextjs.org/docs/messages/module-not-found)**
**Call Stack7**
Show 7 ignore-listed frame(s)


<!--Message 11 -->

i am not using postman, using chrome devtools

<!--Message 12 -->

fetch("/api/waitlist", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "John",
    partySize: 4
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

it is working

<!--Message 13 -->

okay let's do that


<!--Message 14 -->

yet to get  db access, we can figure it out later

<!--Message 15 -->

it is working

<!--Message 16 -->

fetch("/api/waitlist", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "John",
    partySize: 4
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
Promise {<pending>}
VM261:12 {ticketNumber: 2, customerToken: 'b2371310-1833-49b4-be53-bccc1fc1dc64', partiesAhead: 1}
fetch("/api/waitlist/abc-123...")
  .then(res => res.json())
  .then(data => console.log(data));
Promise {<pending>}
VM264:1  GET http://localhost:3000/api/waitlist/abc-123... 404 (Not Found)
(anonymous) @ VM264:1
VM264:3 {error: 'Waitlist party not found'}


<!--Message 17 -->

fetch("/api/waitlist/41e3d268-b1b6-46d4-b728-90c0b84d2e14")   .then(res => res.json())   .then(data => console.log(data));

1. *Promise {\<pending>}*

VM276:3&#x20;

1. *{ticketNumber: 3, name: 'Mike', partySize: 2, partiesAhead: 2}*
   1. **name**: "Mike"
   2. **partiesAhead**: 2
   3. **partySize**: 2
   4. **ticketNumber**: 3
   5. [[Prototype]]: Object



stay in english

<!--Message 18 -->

okay let's do it


<!--Message 19 -->

wait, the waitlist shoud be renamed to customer, or add a folder before it called customer&#x20;

also \
1/2
next
**svgNext.js 16.4.0Turbopack**
**Console Error**svgsvgsvg
**./controllers/waitlist.controller.ts:7:43 Error: Expected ';', '}' or \<eof>    5 |   getStaffWaitlist,    6 |   removeWaitlistParty, >  7 | } from "@/services/waitlist.service";from "@/services/waitlist.service";      |                                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    8 |    9 | export async function createWaitlistController(   10 |   request: NextRequest  Parsing ecmascript source code failed  Import trace:   App Route:     ./controllers/waitlist.controller.ts     ./app/api/waitlist/route.ts**
**Call Stack6**
Show 6 ignore-listed frame(s)


<!--Message 20 -->

all done

<!--Message 21 -->

wait, do you think we can switch to sqlite?

<!--Message 22 -->

we can switch to sqlite, make some interfaces so we can switch the app to postgres if we need to

<!--Message 23 -->

okay let's do it


<!--Message 24 -->

all installed

<!--Message 25 -->

$ npm run db:generate

> waitlist@0.1.0 db:generate
> drizzle-kit generate

No config path provided, using default 'drizzle.config.ts'
Reading config file 'C:\Users\MCC\Desktop\faisal-nextJS\waitlist\drizzle.config.ts'
1 tables
waitlist 8 columns 2 indexes 0 fks

[✓] Your SQL migration file ➜ drizzle\0000_fresh_gambit.sql 🚀

MCC@LAPTOP-VRE827M0 MINGW64 ~/Desktop/faisal-nextJS/waitlist (master)
$ npm run db:migrate

> waitlist@0.1.0 db:migrate
> drizzle-kit migrate

No config path provided, using default 'drizzle.config.ts'
Reading config file 'C:\Users\MCC\Desktop\faisal-nextJS\waitlist\drizzle.config.ts'


<!--Message 26 -->

[{
	"resource": "/c:/Users/MCC/Desktop/faisal-nextJS/waitlist/repositories/sqlite/waitlist.repository.ts",
	"owner": "typescript",
	"code": "2322",
	"severity": 8,
	"message": "Type '{ id: string; ticketNumber: number; customerToken: string; name: string; partySize: number; status: \"WAITING\" | \"REMOVED\"; createdAt: Date; removedAt: Date | null; }' is not assignable to type 'WaitlistParty'.\n  Types of property 'removedAt' are incompatible.\n    Type 'Date | null' is not assignable to type 'Date | undefined'.\n      Type 'null' is not assignable to type 'Date | undefined'.",
	"source": "ts",
	"startLineNumber": 59,
	"startColumn": 5,
	"endLineNumber": 59,
	"endColumn": 11,
	"modelVersionId": 2,
	"origin": "extHost1"
},{
	"resource": "/c:/Users/MCC/Desktop/faisal-nextJS/waitlist/repositories/sqlite/waitlist.repository.ts",
	"owner": "typescript",
	"code": "2322",
	"severity": 8,
	"message": "Type '{ status: \"WAITING\" | \"REMOVED\"; id: string; ticketNumber: number; customerToken: string; name: string; partySize: number; createdAt: Date; removedAt: Date | null; }[]' is not assignable to type 'WaitlistParty[]'.\n  Type '{ status: \"WAITING\" | \"REMOVED\"; id: string; ticketNumber: number; customerToken: string; name: string; partySize: number; createdAt: Date; removedAt: Date | null; }' is not assignable to type 'WaitlistParty'.\n    Types of property 'removedAt' are incompatible.\n      Type 'Date | null' is not assignable to type 'Date | undefined'.\n        Type 'null' is not assignable to type 'Date | undefined'.",
	"source": "ts",
	"startLineNumber": 68,
	"startColumn": 5,
	"endLineNumber": 68,
	"endColumn": 11,
	"modelVersionId": 2,
	"origin": "extHost1"
}]

<!--Message 27 -->

import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { waitlist } from "@/db/schema";
import type {
  CreateWaitlistPartyInput,
  WaitlistParty,
  WaitlistRepository,
} from "@/repositories/waitlist.repository";

export class SQLiteWaitlistRepository
  implements WaitlistRepository
{
  async create(
    input: CreateWaitlistPartyInput
  ): Promise<WaitlistParty> {
    const existing = await db
      .select()
      .from(waitlist)
      .orderBy(desc(waitlist.ticketNumber))
      .limit(1);

    const nextTicketNumber =
      existing.length > 0
        ? existing[0].ticketNumber + 1
        : 1;

    const party: WaitlistParty = {
      id: crypto.randomUUID(),
      ticketNumber: nextTicketNumber,
      customerToken: crypto.randomUUID(),
      name: input.name,
      partySize: input.partySize,
      status: "WAITING",
      createdAt: new Date(),
    };

    await db.insert(waitlist).values({
      id: party.id,
      ticketNumber: party.ticketNumber,
      customerToken: party.customerToken,
      name: party.name,
      partySize: party.partySize,
      status: party.status,
      createdAt: party.createdAt,
    });

    return party;
  }

  async findByCustomerToken(
    customerToken: string
  ): Promise<WaitlistParty | null> {
    const result = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.customerToken, customerToken))
      .limit(1);

    return result[0] ?? null;
  }

  async findWaiting(): Promise<WaitlistParty[]> {
    const result = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.status, "WAITING"));

    return result.map((party) => ({
      ...party,
      status: party.status as "WAITING" | "REMOVED",
    }));
  }

  async removeByTicket(
    ticketNumber: number
  ): Promise<WaitlistParty | null> {
    const result = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.ticketNumber, ticketNumber))
      .limit(1);

    const party = result[0];

    if (!party || party.status !== "WAITING") {
      return null;
    }

    const removedAt = new Date();

    await db
      .update(waitlist)
      .set({
        status: "REMOVED",
        removedAt,
      })
      .where(eq(waitlist.ticketNumber, ticketNumber));

    return {
      ...party,
      status: "REMOVED",
      removedAt,
    };
  }
}

send the correct updated file

<!-- message 28 -->

$ npm run build

> waitlist@0.1.0 build
> next build

▲ Next.js 16.4.0 (Turbopack)
✓ Running next.config.ts took 42ms
- Cache Components enabled
- Partial Prefetching enabled
- Experiments (use with caution):
  ✓ agentFeedback

  Creating an optimized production build ...
✓ Compiled successfully in 3.9s
  Running TypeScript ...
  Finished TypeScript in 3.3s ...
  Collecting page data using 9 workers ...
✓ Collecting page data using 9 workers in 1457ms
  Generating static pages using 9 workers (0/6) ...
  Generating static pages using 9 workers (1/6)
  Generating static pages using 9 workers (2/6)
  Generating static pages using 9 workers (4/6)
✓ Generating static pages using 9 workers (6/6) in 1333ms
  Finalizing page optimization ...
✓ Finalizing page optimization in 45ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/customer/waitlist
├ ƒ /api/customer/waitlist/[token]
├ ○ /api/staff/waitlist
└ ƒ /api/staff/waitlist/[ticket]


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand


<!-- message 29 -->

yes let's do it

<!-- message 30 -->

$ npm run build

> waitlist@0.1.0 build
> next build

▲ Next.js 16.4.0 (Turbopack)
✓ Running next.config.ts took 52ms
- Cache Components enabled
- Partial Prefetching enabled
- Experiments (use with caution):
  ✓ agentFeedback

  Creating an optimized production build ...
✓ Compiled successfully in 1118ms
  Running TypeScript ...
  Finished TypeScript in 2.8s ...
  Collecting page data using 9 workers ...
✓ Collecting page data using 9 workers in 1504ms
  Generating static pages using 9 workers (0/6) ...
  Generating static pages using 9 workers (1/6)
  Generating static pages using 9 workers (2/6)
  Generating static pages using 9 workers (4/6)
✓ Generating static pages using 9 workers (6/6) in 1506ms
  Finalizing page optimization ...
✓ Finalizing page optimization in 45ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/customer/waitlist
├ ƒ /api/customer/waitlist/[token]
├ ○ /api/staff/waitlist
└ ƒ /api/staff/waitlist/[ticket]


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

<!-- message 31 -->
it is working



1. \
   *[{…}]*
   1. **0**: {ticketNumber: 1, name: 'Alice', partySize: 3, createdAt: '2026-10-08T08:10:55.899Z'}
   2. **length**: 1
   3. [[Prototype]]: Array(0)

<!-- message 32 -->
$ npm run db:generate

> waitlist@0.1.0 db:generate
> drizzle-kit generate

No config path provided, using default 'drizzle.config.ts'
Reading config file 'C:\Users\MCC\Desktop\faisal-nextJS\waitlist\drizzle.config.ts'
1 tables
waitlist 8 columns 2 indexes 0 fks

[✓] Your SQL migration file ➜ drizzle\0001_lowly_the_order.sql 🚀

MCC@LAPTOP-VRE827M0 MINGW64 ~/Desktop/faisal-nextJS/waitlist (master)
$ npm run db:migrate

> waitlist@0.1.0 db:migrate
> drizzle-kit migrate

No config path provided, using default 'drizzle.config.ts'
Reading config file 'C:\Users\MCC\Desktop\faisal-nextJS\waitlist\drizzle.config.ts'

MCC@LAPTOP-VRE827M0 MINGW64 ~/Desktop/faisal-nextJS/waitlist (master)
$ done
bash: syntax error near unexpected token `done'

MCC@LAPTOP-VRE827M0 MINGW64 ~/Desktop/faisal-nextJS/waitlist (master)
$ npm run build

> waitlist@0.1.0 build
> next build

▲ Next.js 16.4.0 (Turbopack)
✓ Running next.config.ts took 41ms
- Cache Components enabled
- Partial Prefetching enabled
- Experiments (use with caution):
  ✓ agentFeedback

  Creating an optimized production build ...
✓ Compiled successfully in 922ms
  Running TypeScript ...
  Finished TypeScript in 3.0s ...
  Collecting page data using 9 workers ...
✓ Collecting page data using 9 workers in 1482ms
  Generating static pages using 9 workers (0/6) ...
  Generating static pages using 9 workers (1/6)
  Generating static pages using 9 workers (2/6)
  Generating static pages using 9 workers (4/6)
✓ Generating static pages using 9 workers (6/6) in 1396ms
  Finalizing page optimization ...
✓ Finalizing page optimization in 37ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/customer/waitlist
├ ƒ /api/customer/waitlist/[token]
├ ○ /api/staff/waitlist
└ ƒ /api/staff/waitlist/[ticket]


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
<!-- message 33 -->
okay
<!-- message 34 -->
all is working
<!-- message 35 -->
okay
<!-- message 36 -->
built successfully
<!-- message 37 -->
const alice = await fetch("/api/customer/waitlist", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Alice",
    partySize: 3
  })
}).then(res => res.json());

console.log(alice);
VM618:12 {ticketNumber: 2, customerToken: '14771a17-e4c2-4132-93ce-24372d6e1520', partiesAhead: 1}customerToken: "14771a17-e4c2-4132-93ce-24372d6e1520"partiesAhead: 1ticketNumber: 2[[Prototype]]: Object
undefined
const bob = await fetch("/api/customer/waitlist", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Bob",
    partySize: 2
  })
}).then(res => res.json());

console.log(bob);
VM622:12 {ticketNumber: 3, customerToken: 'bc6e75f2-eb0d-4457-8c19-7efde6612319', partiesAhead: 2}customerToken: "bc6e75f2-eb0d-4457-8c19-7efde6612319"partiesAhead: 2ticketNumber: 3[[Prototype]]: Object
undefined
await fetch("/api/customer/waitlist/"bc6e75f2-eb0d-4457-8c19-7efde6612319"")
  .then(res => res.json());
VM630:1 Uncaught SyntaxError: missing ) after argument list (at VM630:1:13)
await fetch("/api/customer/waitlist/"bc6e75f2-eb0d-4457-8c19-7efde6612319")
  .then(res => res.json());
VM635:1 Uncaught SyntaxError: missing ) after argument list (at VM635:1:13)
await fetch("/api/customer/waitlist/bc6e75f2-eb0d-4457-8c19-7efde6612319)
  .then(res => res.json());
VM640:1 Uncaught SyntaxError: Invalid or unexpected token (at VM640:1:13)
await fetch("/api/customer/waitlist/bc6e75f2-eb0d-4457-8c19-7efde6612319")
  .then(res => res.json());
forward-logs-shared.ts:120 [Fast Refresh] rebuilding
forward-logs-shared.ts:120 [Fast Refresh] done in 349ms
{ticketNumber: 3, name: 'Bob', partySize: 2, partiesAhead: 2}name: "Bob"partiesAhead: 2partySize: 2ticketNumber: 3[[Prototype]]: Object
await fetch(`/api/staff/waitlist/${alice.ticketNumber}`, {
  method: "DELETE"
}).then(res => res.json());


it is correct because we made a previous customer in the sqlite test
<!-- message 38 -->
await fetch(`/api/customer/waitlist/${bob.customerToken}`)
  .then(res => res.json());
{ticketNumber: 3, name: 'Bob', partySize: 2, partiesAhead: 0}
<!-- message 39 -->
okay let's make the front

we make seperate pages for the staff and the customer, and we need a way to make sure no customer can remove other customers
<!-- message 40 -->
# Restaurant Waitlist

Welcome, **Faisal**

**Ticket:** 4

**Party size:** 2

**Parties ahead:** 1

Refresh position\
&#x20;
<!-- message 41 -->
okay let's do it
<!-- message 42 -->
send the full staff rotue.ts please
<!-- message 43 -->
await fetch("/api/staff/waitlist")
  .then(res => res.json());
VM83:1  GET http://localhost:3000/api/staff/waitlist 401 (Unauthorized)
(anonymous) @ VM83:1
{error: 'Unauthorized'}
await fetch("/api/staff/waitlist", {
  headers: {
    "x-staff-secret": "YOUR_STAFF_SECRET"
  }
}).then(res => res.json());
VM87:1  GET http://localhost:3000/api/staff/waitlist 401 (Unauthorized)
(anonymous) @ VM87:1
{error: 'Unauthorized'}

it is working because I am yet to change the env file
<!-- message 44 -->
await fetch("/api/staff/waitlist", {   headers: {     "x-staff-secret": "waitlist-staff-9f7c2a1d8e4b6f3a"   } }).then(res => res.json());

1. *(2) [{…}, {…}]*
   1. **0**: {ticketNumber: 3, name: 'Bob', partySize: 2, createdAt: '2026-10-08T08:18:06.786Z'}
   2. **1**: {ticketNumber: 4, name: 'Faisal', partySize: 2, createdAt: '2026-10-08T08:22:41.130Z'}
   3. **length**: 2
   4. [[Prototype]]: Array(0)
<!-- message 45 -->
okay, actually let's add css modules, as inline css is ugly and less maintainable
<!-- message 46 -->
okay let's do it
<!-- message 47 -->
it is working
<!-- message 48 -->
okay lets do it
<!-- message 49 -->
correct
<!-- message 50 -->
all were tested, and all gave 400

<!-- message 51 -->
*d813c156-b08c-444f-b93b-7ca4f1b27213*
<!-- message 52 -->
1. *{status: 200, body: {…}}*
   1. **body**: {ticketNumber: 5, name: 'Isolation Test', partySize: 2, partiesAhead: 0}
   2. **status**: 200
   3. [[Prototype]]: Object

**11**

forward-logs-shared.ts:120 [HMR] connected

await fetch(   "/api/customer/waitlist/d813c156-b08c-444f-b93b-7ca4f1b27113" ).then(async res => ({   status: res.status,   body: await res.json() }));

VM92:1  GET [http://localhost:3000/api/customer/waitlist/d813c156-b08c-444f-b93b-7ca4f1b27113](http://localhost:3000/api/customer/waitlist/d813c156-b08c-444f-b93b-7ca4f1b27113) 404 (Not Found)

1. *{status: 404, body: {…}}*
   1. **body**: {error: 'Waitlist party not found'}
   2. **status**: 404
   3. [[Prototype]]: Object
<!-- message 53 -->
both passed
<!-- message 54 -->
correct
<!-- message 55 -->
also working
<!-- message 56 -->
we got 6
<!-- message 57 -->
1. \
   **0**: {ticketNumber: 6, name: 'Ticket Reuse Test', partySize: 1, createdAt: '2026-10-08T08:35:58.875Z'}
2. **1**: {ticketNumber: 7, name: 'Order Test A', partySize: 2, createdAt: '2026-10-08T08:36:17.239Z'}
3. **2**: {ticketNumber: 8, name: 'Order Test B', partySize: 4, createdAt: '2026-10-08T08:36:20.771Z'}
4. **length**: 3
5. [[Prototype]]: Array(0)
<!-- message 58 -->
const first = await fetch("/api/customer/waitlist", {   method: "POST",   headers: {     "Content-Type": "application/json"   },   body: JSON.stringify({     name: "Position Test A",     partySize: 2   }) }).then(res => res.json());  const second = await fetch("/api/customer/waitlist", {   method: "POST",   headers: {     "Content-Type": "application/json"   },   body: JSON.stringify({     name: "Position Test B",     partySize: 2   }) }).then(res => res.json());  console.log({   first,   second });

VM132:23&#x20;

1. *{first: {…}, second: {…}}*
   1. **first**: {ticketNumber: 9, customerToken: '6dea31b8-c545-450e-bbb2-ae23f8985897', partiesAhead: 3}
   2. **second**: {ticketNumber: 10, customerToken: '81f94873-35eb-4324-9fd1-882af4b90a6d', partiesAhead: 4}
   3. [[Prototype]]: Object

undefined

**9**

forward-logs-shared.ts:120 [HMR] connected

await fetch(   \`/api/customer/waitlist/${second.customerToken}\` ).then(async res => ({   status: res.status,   body: await res.json() }));

1. *{status: 200, body: {…}}*
   1. **body**: {ticketNumber: 10, name: 'Position Test B', partySize: 2, partiesAhead: 4}
   2. **status**: 200
   3. [[Prototype]]: Object

**4**

forward-logs-shared.ts:120 [HMR] connected

await fetch(   \`/api/staff/waitlist/${first.ticketNumber}\`,   {     method: "DELETE",     headers: {       "x-staff-secret": "waitlist-staff-9f7c2a1d8e4b6f3a"     }   } ).then(async res => ({   status: res.status,   body: await res.json() }));

1. *{status: 200, body: {…}}*

**2**

forward-logs-shared.ts:120 [HMR] connected

await fetch(   \`/api/customer/waitlist/${second.customerToken}\` ).then(async res => ({   status: res.status,   body: await res.json() }));

1. *{status: 200, body: {…}}*
   1. **body**: {ticketNumber: 10, name: 'Position Test B', partySize: 2, partiesAhead: 3}
   2. **status**: 200
   3. [[Prototype]]: Object
<!-- message 59 -->
okay let's do it



but first



### Restaurant Waitlist System

Time limit: 2 hours 30 minutes, including programming, checking your work, the README and submission. Your development tools and your GitHub account must be ready before the time starts.

#### Background

A restaurant gets very busy at weekends, and customers wait at the door without knowing their place in the queue. The owner wants a simple system that lets a customer join the waitlist from their phone and see their place, and lets staff manage the list from a separate screen.

#### Core criteria (Definition of Done)

1. A customer joins the waitlist by entering their name and party size, and receives a ticket number.
2. The customer can see how many parties are ahead of them. When a party ahead of them leaves the list, the customer sees the new number after refreshing the page.
3. Staff see the waiting parties in the order they joined, and can remove any party from the list.

#### Three rules (so that nobody loses time on different assumptions)

- The name cannot be empty, and the party size is a whole number greater than zero.
- Every ticket number is unique and is never reused after a party is removed.
- "Parties ahead" means the waiting parties before you, not the number of people.

#### General requirements

1. Tech stack: choose a programming language and framework that suit the project.
2. Database: use a suitable database to store the waitlist data.
3. Code organisation: keep the code clear and organised. No specific architecture and no automated tests are required.
4. Running locally: the project must run locally by following the steps in the README, without changing the code. Deploying it online is optional.
5. Documentation: a short README, as described under "What to submit".
6. GitHub: push the project to a GitHub repository. One push at the end is enough.

#### Optional extras (really optional: the core criteria done well earn full marks)

- Update the number of parties ahead automatically, without reloading the page.
- Return the customer to their place if they close the page and open it again on the same device.
- Protect the staff screen so that customers cannot access it.
- Let the customer leave the waitlist themselves.

#### Out of scope

- Customer login accounts.
- SMS or any other notifications.
- Generating the QR code.
- Support for more than one branch.
- Visual design: a simple, clear interface that works on a phone is enough, and its looks are not evaluated.

#### Rules

- You may use any AI tool in this stage, and the internet is available.
- You may ask questions to clarify the requirements. Every clarification is given to all candidates.
- Priority goes to the core criteria and their quality. Start the optional extras only after the core criteria are complete.

#### What to submit

Submit through this stage's form:

1. GitHub repository: the link to your repository, in the link field.
2. AI conversations: for every AI tool you used, the conversation's link, an export of the conversation, or the tool's log, uploaded as files (PDF, TXT, MD, JSON, PNG or JPG; up to 5 files of 3 MB each) or pasted as links in the text field. Summaries are not accepted. If you did not use AI, say so in the text field. How much you used AI does not affect your evaluation.
3. README: a short README in the repository with:

- How to run the project.
- Why you chose the technology and the database, in two sentences.
- What is complete and what is not.
- One example of how you checked a suggestion from AI.

#### Evaluation

Your work is evaluated on these points, from the largest weight to the smallest:

1. Correctness of the core criteria and the three rules.
2. Your understanding of your own code.
3. Organisation of the code.
4. How you checked your work and the AI's suggestions.

A short interview (about 10 minutes) follows submission: you explain your solution and show the cases you tried.





check the requirements again, make sure we are on the right track
<!-- message 60 -->
okay let's do it

we have about an hour remaining

<!-- message 61 -->
working

now the readme and prompts.md
<!-- message 62 -->
actually, one small note we should do, change the default page.tsx
<!-- message 63 -->
okay done
<!-- message 64 -->
we should make a git ignore file first
<!-- message 65 -->

@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}


<!-- message 66 -->

the app looks bad still, we shouldn't make it look amazing, but make it useable atleast

update all 3 css files

<!-- message 67 -->

still eh, make the forms visible, and same for the buttons

<!-- message 68 -->

it still looks bad

here are the tsx files

<!-- message 69 to gemini-->

can you find out why this css is not working?


<!-- message 70 to gemini-->
can we remove tailwind?

<!-- message 71 to gemini-->

update the css a bit, make it look centered, don't go full pretty, just make sure it is working on phone 

don't add animations or gradients etc

