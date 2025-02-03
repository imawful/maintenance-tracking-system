import { test, expect } from "@playwright/test";
import { Equipment } from "@/ts/types";

/**
 * Should create new equipment with valid data.
 */
test("create new equipment", async ({ page }) => {
  //define valid equipment.
  const validEquipment: Equipment = {
    id: "300",
    name: "Test Equipment Hatlas",
    location: "Summerlin",
    department: "Assembly",
    model: "Model T for Test",
    serialNumber: "abcdefghijklmnopqrstuvwxyz1234567890",
    installDate: new Date(),
    status: "Down",
  };

  //go to create new equipment page.
  await page.goto("/equipment/new-form/");
  await expect(page).toHaveTitle("New Equipment");

  // FILL the form.

  //text inputs...
  await page.locator("#equipment-name").fill(validEquipment.name);
  await expect(page.locator("#equipment-name")).toHaveValue(
    validEquipment.name,
  );

  await page.locator("#equipment-location").fill(validEquipment.location);
  await expect(page.locator("#equipment-location")).toHaveValue(
    validEquipment.location,
  );

  await page.locator("#equipment-model").fill(validEquipment.model);
  await expect(page.locator("#equipment-model")).toHaveValue(
    validEquipment.model,
  );

  await page
    .locator("#equipment-serial-number")
    .fill(validEquipment.serialNumber);
  await expect(page.locator("#equipment-serial-number")).toHaveValue(
    validEquipment.serialNumber,
  );

  //select inputs
  await page
    .locator("#equipment-department")
    .selectOption(validEquipment.department);
  await expect(page.locator("#equipment-department")).toHaveValue(
    validEquipment.department,
  );

  await page.locator("#equipment-status").selectOption(validEquipment.status);
  await expect(page.locator("#equipment-status")).toHaveValue(
    validEquipment.status,
  );

  //date input
  await page
    .locator("#equipment-install-date")
    .fill(validEquipment.installDate.toISOString().split("T")[0]);
  await expect(page.locator("#equipment-install-date")).toHaveValue(
    validEquipment.installDate.toISOString().split("T")[0],
  );

  // SUBMIT the form
  // for now we are testing the submission by making sure we pass on to the next page.
  // this test COULD be better checked!
  await page.locator("#equipment-submit").click();
  await expect(page).toHaveTitle("Equipment");
});

/**
 * Should show validation errors for invalid equipment data.
 */
test("show validation errors", async ({ page }) => {
  const invalidEquipment = {
    id: "300", //id not an input field
    name: "ii", //3 char required err
    location: "", // empty locaation err
    department: "", // no department!
    model: "", //empty model err
    serialNumber: "feareqvnnmi***##", //not alpha numeric err
    installDate: new Date("2026-02-25T00:00:00"), // not a future date err
    status: "", //no status
  };

  //go to create new equipment page.
  await page.goto("/equipment/new-form/");
  await expect(page).toHaveTitle("New Equipment");

  // FILL the form.
  //text inputs...
  await page.locator("#equipment-name").fill(invalidEquipment.name);
  await expect(page.locator("#equipment-name")).toHaveValue(
    invalidEquipment.name,
  );

  await page.locator("#equipment-location").fill(invalidEquipment.location);
  await expect(page.locator("#equipment-location")).toHaveValue(
    invalidEquipment.location,
  );

  await page.locator("#equipment-model").fill(invalidEquipment.model);
  await expect(page.locator("#equipment-model")).toHaveValue(
    invalidEquipment.model,
  );

  await page
    .locator("#equipment-serial-number")
    .fill(invalidEquipment.serialNumber);
  await expect(page.locator("#equipment-serial-number")).toHaveValue(
    invalidEquipment.serialNumber,
  );

  //select inputs
  await page
    .locator("#equipment-department")
    .selectOption(invalidEquipment.department);
  await expect(page.locator("#equipment-department")).toHaveValue(
    invalidEquipment.department,
  );

  await page.locator("#equipment-status").selectOption(invalidEquipment.status);
  await expect(page.locator("#equipment-status")).toHaveValue(
    invalidEquipment.status,
  );

  //date input
  await page
    .locator("#equipment-install-date")
    .fill(invalidEquipment.installDate.toISOString().split("T")[0]);
  await expect(page.locator("#equipment-install-date")).toHaveValue(
    invalidEquipment.installDate.toISOString().split("T")[0],
  );

  // attempt to SUBMIT the form
  await page.locator("#equipment-submit").click();

  //ensure validation errors are present.
  await expect(page.locator("#equipment-name-error")).toBeVisible();
  await expect(page.locator("#equipment-location-error")).toBeVisible();
  await expect(page.locator("#equipment-model-error")).toBeVisible();
  await expect(page.locator("#equipment-serial-number-error")).toBeVisible();
  await expect(page.locator("#equipment-department-error")).toBeVisible();
  await expect(page.locator("#equipment-status-error")).toBeVisible();
  await expect(page.locator("#equipment-install-date-error")).toBeVisible();

  //await expect(page).toHaveTitle("Equipment");
});

test("edit existing equipment", async ({ page }) => {
  //define valid equipment.
  const validEquipment: Equipment = {
    id: "300",
    name: "Test Equipment Hatlas",
    location: "Summerlin",
    department: "Assembly",
    model: "Model T for Test",
    serialNumber: "abcdefghijklmnopqrstuvwxyz1234567890",
    installDate: new Date(),
    status: "Down",
  };

  //go to create new equipment page.
  await page.goto("/equipment/");
  await expect(page).toHaveTitle("Equipment");

  //at least 50 equipment should be present given our mock data. we will update #49

  //for updating existing equipment we can update 3 fields.
  //  status, department, location.
  const prevStatus = await page.locator("#equipment-49-status").innerText();
  const validStatus = ["Operational", "Down", "Maintenance", "Retired"].filter(
    (status) => status !== prevStatus,
  );
  const newStatus = validStatus[Math.floor(Math.random() * validStatus.length)];

  const prevDepartment = await page
    .locator("#equipment-49-department")
    .innerText();
  const validDepartment = [
    "Machining",
    "Assembly",
    "Packaging",
    "Shipping",
  ].filter((dept) => dept !== prevDepartment);
  const newDepartment =
    validDepartment[Math.floor(Math.random() * validDepartment.length)];

  const prevLocation = await page.locator("#equipment-49-location").innerText();
  const newLocation = "Arbitrary New Location";

  expect(prevStatus === newStatus).toBe(false);
  expect(prevDepartment === newDepartment).toBe(false);
  expect(prevLocation === newLocation).toBe(false);

  //click on update
  await page.locator("#equipment-49-actions a").click();
  await expect(page).toHaveTitle("Editing Equipment");

  //text inputs...
  await page.locator("#equipment-location").fill(newLocation);
  await expect(page.locator("#equipment-location")).toHaveValue(newLocation);

  //select inputs
  await page.locator("#equipment-department").selectOption(newDepartment);
  await expect(page.locator("#equipment-department")).toHaveValue(
    newDepartment,
  );

  await page.locator("#equipment-status").selectOption(newStatus);
  await expect(page.locator("#equipment-status")).toHaveValue(newStatus);

  //sumbit the update
  await page.locator("#equipment-submit").click();
  await expect(page).toHaveTitle("Equipment");

  //validate updates
  const updatedStatus = await page.locator("#equipment-49-status").innerText();
  const updatedDepartment = await page
    .locator("#equipment-49-department")
    .innerText();
  const updatedLocation = await page
    .locator("#equipment-49-location")
    .innerText();

  expect(updatedStatus === newStatus).toBe(true);
  expect(updatedDepartment === newDepartment).toBe(true);
  expect(updatedLocation === newLocation).toBe(true);

  expect(updatedStatus === prevStatus).toBe(false);
  expect(updatedDepartment === prevDepartment).toBe(false);
  expect(updatedLocation === prevLocation).toBe(false);
});

test("filter equipment table", async ({ page }) => {
  //go to equipment page.
  await page.goto("/equipment/");
  await expect(page).toHaveTitle("Equipment");

  //number of equipment in table (-1 for header row)
  const initialRows = (await page.locator("tr").count()) - 1;
  expect(initialRows === 50).toBe(true);

  //note: these tests might fail if for some reason all 50 mock generated
  //      equipment are of the same department/status.

  // TESTING STATUS FILTERS
  //filter to show only operational equipment
  await page.locator("#equipment-status-filter").selectOption("Operational");
  const operationalRows = (await page.locator("tr").count()) - 1;
  expect(operationalRows !== initialRows).toBe(true);
  for (const column of await page.locator("td").all()) {
    const id = await column.getAttribute("id");
    if (id?.includes("status")) {
      expect((await column.innerText()) === "Operational").toBe(true);
    }
  }

  //clear filters
  await page.locator("#clear-filter-button").click();

  //filter to show only down equipment
  await page.locator("#equipment-status-filter").selectOption("Down");
  const downRows = (await page.locator("tr").count()) - 1;
  expect(downRows !== initialRows).toBe(true);
  for (const column of await page.locator("td").all()) {
    const id = await column.getAttribute("id");
    if (id?.includes("status")) {
      expect((await column.innerText()) === "Down").toBe(true);
    }
  }

  //clear filters
  await page.locator("#clear-filter-button").click();

  //filter to show only maintenance equipment
  await page.locator("#equipment-status-filter").selectOption("Maintenance");
  const maintenanceRows = (await page.locator("tr").count()) - 1;
  expect(maintenanceRows !== initialRows).toBe(true);
  for (const column of await page.locator("td").all()) {
    const id = await column.getAttribute("id");
    if (id?.includes("status")) {
      expect((await column.innerText()) === "Maintenance").toBe(true);
    }
  }

  //clear filters
  await page.locator("#clear-filter-button").click();

  //filter to show only retired equipment
  await page.locator("#equipment-status-filter").selectOption("Retired");
  const retiredRows = (await page.locator("tr").count()) - 1;
  expect(retiredRows !== initialRows).toBe(true);
  for (const column of await page.locator("td").all()) {
    const id = await column.getAttribute("id");
    if (id?.includes("status")) {
      expect((await column.innerText()) === "Retired").toBe(true);
    }
  }

  //clear filters
  await page.locator("#clear-filter-button").click();

  // TESTING DEPARTMENT FILTERS
  //filter to show only machining equipment
  await page.locator("#equipment-department-filter").selectOption("Machining");
  const machiningRows = (await page.locator("tr").count()) - 1;
  expect(machiningRows !== initialRows).toBe(true);
  for (const column of await page.locator("td").all()) {
    const id = await column.getAttribute("id");
    if (id?.includes("department")) {
      expect((await column.innerText()) === "Machining").toBe(true);
    }
  }

  //clear filters
  await page.locator("#clear-filter-button").click();

  //filter to show only assembly equipment
  await page.locator("#equipment-department-filter").selectOption("Assembly");
  const assemblyRows = (await page.locator("tr").count()) - 1;
  expect(assemblyRows !== initialRows).toBe(true);
  for (const column of await page.locator("td").all()) {
    const id = await column.getAttribute("id");
    if (id?.includes("department")) {
      expect((await column.innerText()) === "Assembly").toBe(true);
    }
  }

  //clear filters
  await page.locator("#clear-filter-button").click();

  //filter to show only packaging equipment
  await page.locator("#equipment-department-filter").selectOption("Packaging");
  const packagingRows = (await page.locator("tr").count()) - 1;
  expect(packagingRows !== initialRows).toBe(true);
  for (const column of await page.locator("td").all()) {
    const id = await column.getAttribute("id");
    if (id?.includes("department")) {
      expect((await column.innerText()) === "Packaging").toBe(true);
    }
  }

  //clear filters
  await page.locator("#clear-filter-button").click();

  //filter to show only shipping equipment
  await page.locator("#equipment-department-filter").selectOption("Shipping");
  const shippingRows = (await page.locator("tr").count()) - 1;
  expect(shippingRows !== initialRows).toBe(true);
  for (const column of await page.locator("td").all()) {
    const id = await column.getAttribute("id");
    if (id?.includes("department")) {
      expect((await column.innerText()) === "Shipping").toBe(true);
    }
  }
});
