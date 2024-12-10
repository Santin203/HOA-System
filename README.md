# Homeowners Association Helper - CS 3365 - Fall 2024

## Product Vision

The **Homeowners Association (HOA) Helper** is a web application designed to assist neighbors administering a homeowners association (HOA). It simplifies tracking monthly payments, understanding payment status (who is up-to-date, who is delayed, and what amount is due), sending payment reminders, and generating monthly statements. It also alerts the HOA board for review to ensure proper funding.

Unlike other services, our HOA helper provides a real-time view of payment statuses for both property owners and administration, helping all involved parties stay reminded of upcoming or overdue payments.

---

This web application uses **TypeScript** and is deployed on **Vercel**. The backend relies on **Prisma ORM** and a **Prisma Postgres** database, powered by Prisma.

For more details, refer to the Prisma Postgres documentation: [Prisma Postgres](https://www.prisma.io/docs/orm/overview/databases/prisma-postgres).


## How to Run

### Deployed Version

The web application is deployed and hosted on Vercel. You can access the app by visiting the following link:

[HOA System](https://hoa-system-alpha.vercel.app/)

### Running Locally

To run the project locally, you need to have **Node.js** and **npm** installed. If you don’t have them, you can download and install Node.js from [here](https://nodejs.org/en/).

#### Steps to Run Locally:

1. **Clone the Repository:**

   Clone the repository to your local machine by running:

   ```bash
   git clone https://github.com/Santin203/HOA-System.git
   ```

2. **Install Dependencies:**

   Navigate into the project directory and install all required dependencies:

   ```bash
   cd hoa-helper
   npm install
   ```

3. **Setup .env File:**

   Create a `.env` file in the root of the project folder (`hoa-helper`) and set up the required environment variables. Refer to the project report document for the specific variable values. Once configured, save the `.env` file.

4. **Connect to the Database:**

   After setting up the `.env` file, run the following commands to connect to the database:

   ```bash
   npx prisma db pull
   npx prisma generate
   ```

5. **Run the Application:**

   To start the development server, run:

   ```bash
   npm run dev
   ```

   This will run the web application locally at [http://localhost:3000](http://localhost:3000).

6. **Stopping the Local Server:**

   To stop the local server, press `CTRL + C` in the terminal.

---

### Steps to Run Locally After Pull:
This repo might be updated once in a while, therefore, you need to run the following commands to updated the dependencies before running the webapp locally:

1. **Pull the repository**
   After making sure that the directory is correct, that is, under the hoa-helper folder, run:
   ```bash
   git pull
   ```
   to pull and update the repository.
   
2. **Update Dependencies**
   After pulling the repo, under the same directory, run:
   ```bash
   npm install
   ```
   to update the dependencies.

3. **Update Local Database**
   Run the commands:
   ```bash
   npx prisma db pull
   ```
   and
   ```bash
   npx prisma generate
   ```
   to update the local database schema.

4. **Run the Application:**

   To start the development server, run:

   ```bash
   npm run dev
   ```

   This will run the web application locally at [http://localhost:3000](http://localhost:3000).

5. **Stopping the Local Server:**

   To stop the local server, press `CTRL + C` in the terminal.






