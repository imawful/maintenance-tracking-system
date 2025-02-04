# React Maintenance Tracking System.

This project is a simple maintenance tracking system that allows technicians to log maintenance activities on equipment and visualize basic maintenance metrics. I developed this as part of a challenge where I was given specific requirements, features, technologies, and libraries to implement.

The application is a React-based web project focused on front-end development, with the potential for future backend integration.

# 1. Setup Instructions

## Prerequisites

The following are required to install and run the application.

- [Node.js](https://nodejs.org/en)
- Node Package Manager ([NPM](https://www.npmjs.com/))
- Web Browser

## Installation Steps

1. Clone the repository:

```sh
git clone https://github.com/imawful/maintenance-tracking-system.git
cd maintenance-tracking-system/
```

2. Install the dependencies:

```sh
# ensure you are in the root directory of cloned repo
npm install
```

## How to run the application

1. Start the application:

```sh
npm run dev
```

2. Open your web browser and visit:

- `http://localhost:3000/`

## How to run tests

Tests are located in the `e2e/` directory. There are currently two test specifications `equipment.spec.ts` and `records.spec.ts`. Each indiviual test has a unique name and can be run with the following command:

```sh
# for individual tests
npx playwright test -g "test name"

# for all tests
npx playwright test  # OR
npm run test
```

# 2. Features Implementation

## List of Completed Features + Screenshots

### Dashboard

![image](https://github.com/user-attachments/assets/6e278a67-474b-4e8f-805c-2c0b1d4faea0)

- Provides a quick overview of the latest **equipment breakdowns** based on their status.
- Displays a chart of **maintenance hours spent** per department.
- Shows **recent maintenance activities**.

### Forms

<p align="center">
  <img src="https://github.com/user-attachments/assets/9a843e11-b5e5-4a14-9bb9-f29ef7d76dbc" width="45%">
  <img src="https://github.com/user-attachments/assets/41822c07-6229-4663-abbc-e3f3de8bf27e" width="45%">
</p>

- Includes forms for **adding new equipment** and **creating new maintenance records**.
- Implments proper validation and error messages to ensure that only valid data is submitted.

### Tables

![image](https://github.com/user-attachments/assets/8cde74f2-1133-4cb3-8030-f87467506b92)
![image](https://github.com/user-attachments/assets/0c5e4066-2aa3-4748-afc9-2e7b5c8e3f60)


- Individual tables for equipment and maintenance records.
- Displays **all equipment and maintenance records** in a structured table format.
- Support for **sorting** columns.
- Allows **filtering by Department and Status** for equipment table.
- Allows **filtering by Type, Status, Priority, and Date (range)** for maintenance records.

### Charts

![image](https://github.com/user-attachments/assets/0e04f40d-90c9-4de7-a197-acfd3cdf8b9f)

- Used in dashboard to visualize:
  - **Equipment Status Breakdown**
  - **Maintenance Hours by Department**
- Includes extra data about equipment and mainenance for better insight.

### Zod Schemas

- Utilizes **Zod schemas** to define types for:
  - `Equipment`
  - `MaintenanceRecord`
- Ensures **type safety** across usage of equipment and records throughout the application.

# 3. Testing Approach

## Testing Strategy

For testing I implemented **end to end** tests for each scenario listed in the requirements using **Playwright**.
Playwright allowed me to use locators to select the different elements on my application's pages and interact with them.
I wrote each test with the expect user flow in mind, (i.e. go to create new equipment page, input each field, press submit button, check to see if equipment was created).

## What is tested and why

### Equipment Tests

- `create new equipment`
  
  Ensures that we can create new equipment with valid data. We test are form for creating equipment, and make sure the equipment gets added internally.

- `show validation errors`
  
  Ensures that validation errors are shown if certain data is invalid. We make sure the a message appears for each field in the form that doesn't have a valid entry.

- `edit exisitng equipment`
  
  Ensures that we can updae an equipment's status, location, or department. We test the edit button on the equipment page and make sure the edit form allows for updating these values. We then make sure the update persists after submission.

- `filter equipment table`
  
  Ensures that we can filter the different kinds of equipment on the equipment table. We select the filter for each of the different status and deparments and ensure the rows present on the page match our selected filters.

### Maintenance Record Tests

- `create new maintenance record`
  
  Ensures that we can create a new record with valid data. We test the form for creating a new record, and make sure the record gets added internally.

- `validate maintenance hours over 24`
  
  Ensures that values greater than 24 for the hours spent field will not be accepted. We enter in a value greater than 24, attempt to submit, and validate that an error message appears and the submission was unsuccessful.

- `validate maintenance hours negative`
  
  Similar to the "over 24 test" but ensures that negative number values are not accepted.

- `show equipment name in maintenance table`
  
  This test ensures that we can see the name of the equipment for each maintenance record **in** the maintenance table. We test to see that each of the columns under the **Equipment Name** header has a valid name.

- `filter maintenance records by date range`
  
  This test ensures that when selecting a specific date range on the records table we only see records that fall within the range. We test the filter fields under the date tab, and then make sure each visible row has a date falling between the range.

## How to run different types of tests

### Running individual tests by name:

```sh
npx playwright test -g "create new equipment" #or any test name
```

### Running all tests:

```sh
npx playwright test #OR
npm run test
```

# 4. Technical Decisions

## Key Libraries Used

### Zod

- Used to define an explicit **schema** for equipment and maintenance records.

### ts-to-Zod

- Used to generate zod schemas from a given interface.
- The equipment and maintenance records interfaces were first copied from the problem and used in this script to generate schemas.
- Schemas were then updated overtime for cooperation with forms.

### react-hook-form

- Used to develop forms with a zod resolver ensuring forms map correctly to defined schemas.

### TanStack Table

- Used to implment tables with options for filtering and sorting.

### Recharts

- Used to visualize equipment status and maintenance hours by department.

### TailwindCSS

- Used to style the various different components and pages.

### Prettier

- Used for formatting my code to ensure maintainability throughout development.

### anatine/zod-mock + faker-js

- Used to generate mock data from the defined schemas for equipment and maintenance records.

## Architecure Decisions

There are a total of ~6 pages in this application. Each of the pages in the application include UI buttons to help navigate across the different pages. I make sure to add titles to each of the pages, and implment a consistent style and layout. By keeping my components seprated by their concerns, the different pages in the app can be quickly updated or modified.

**Project Structure:**

- `src/components/`
  
  Contains the applications custom React components.

- `src/context/`
  
  Contains a file where we create a provider and context with methods exported to access the context and data.

- `src/pages/`
  
  Contains the different accessible pages across the application following Next.js **file-system based routing**.

- `src/styles/`
  
  Contains a global stylesheet for setting consistent values across the application. (Furhter styling is achieved using Tailwind).

- `src/ts/`
  
  Contains the application's schemas, interfaces, and exported types.

- `e2e/`
  
  Contains the written end to end tests used by Playwright.

## State Management Approach

To ensure that data used across the application is in **sync** a provider and context are used.

1. **Mock Data Generation**

   - Initially, we generate 50 equipment entries and 100 maintenance records using zod-mock and faker-js.

2. **State Management with Context**

   - We store the state of the generated equipment and records within the provider.
   - A custom `useMockData` hook is exported for interacting with the data acorss the application.

3. **Using Context**

   - In order to have proper access to `useMockData` the entire application is a child component of the `MockDataProvider` the "wrapping" takes place in `src/pages/\_app.tsx`.

4. **Error handling**
   - Proper error checks are used in `useMockData` to prevent usage outside of `MockDataProvider`.

First the mock data gets generated filling up 50 equipment entries and 100 maintenance records. Next, the state for records and equipment is stored in the provider. From the file defining the provider we export a `useMockData` function that we use accross the different components for updating a reading equipment and records.

# 5. Known Issues/Limitations

## Current bugs/limitaions

### Dates

- While dates are mostly fixed for the most part by only operating on UTC time, the dates displayed on the application don't account for local timezone.

### Bulk updates

- Updating multiple values at once has not been implemented. So we are limited to updating one equipment entry at a time.
- Being able to update status of equipment in bulk should not be diffcult to implement with the current structure just need a good design for fitting it in.

### Data persistence

- Right now we are only keeping the generated mock data in **session storage**.
- This means that upon closing the application / browser the data will be lost and new data will be generated next launch.
- This is enough to demonstrate a working system, however this could be expanded if a database is integrated.

### Group by equipment option?

- In the Maintenance Record table, certain filters could be added for searching for a specific equipment name.
- As of right now, you can sort the equipment name column and find the records associated with an equipment that way.

### Parts Replaced field on maintenance table

- Maintenance records include a filed called `partsReplaced` that stores an optional array of strings for the parts replaced during maintenance.
- As of now, there is no way of viewing this information throught the application. I'm limited by finding where to place it on the table.
- A seperate page for viewing individual records could be implemented so we can see further details such as parts replaced.

### Dynamic rendering based on screen size/resolution

- Although TailwindCSS was used across the application for responsive design, when creating components for the charts and tables things got a litle tricky.
- Some pages that include tables or charts might not look great on smaller devices so I recommend a full screen browser window for interacting with the application.

### Tests

- Some of the end to end tests can be more well written to ensure proper functionality when creating and updating data entries.
- As of right now im not checking the internal structures of the Equiment and MaintenanceRecords within the provider, we only test interactions and behavior from the browser view.

## Future Improvements

Some future improvements for this application include:

- Implemening solutions for current limitations.

- New pages for detailed views of maintenance and equipment.

- Database integration.

- Reporting.

# 6. Conclusion

Overall, it was really fun to attempt this challenge and get to learn some new technologies. I appreciate you taking the time to see my maintenance tracking system project in full. As I continue to learn and grow my skills I hope that I can find new opportunites where I can contribute to meaningful software along the way.

Thank you for your time!

- Kevin Barrios
- barrik3@unlv.nevada.edu

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
