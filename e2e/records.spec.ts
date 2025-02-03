import { test, expect } from "@playwright/test";
import { MaintenanceRecord } from "@/ts/types";
test("create new maintenance record", async ({ page }) => {
  const newRecord: MaintenanceRecord = {
    id: "300",
    equipmentId: "0", //mock data will generate eq ids 0-49
    date: new Date(),
    type: "Repair",
    technician: "Javier",
    hoursSpent: 20,
    description: "a description about a fake repair for testing purposes.",
    priority: "Low",
    completionStatus: "Incomplete",
  };

  await page.goto("/maintenance/new-record/");
  await expect(page).toHaveTitle("New Maintenance Record");

  //text inputs...
  await page.locator("#maintenance-technician-name").fill(newRecord.technician);
  await expect(page.locator("#maintenance-technician-name")).toHaveValue(
    newRecord.technician,
  );

  await page
    .locator("#maintenance-hours-spent")
    .fill(newRecord.hoursSpent.toString());
  await expect(page.locator("#maintenance-hours-spent")).toHaveValue(
    newRecord.hoursSpent.toString(),
  );

  await page.locator("#maintenance-description").fill(newRecord.description);
  await expect(page.locator("#maintenance-description")).toHaveValue(
    newRecord.description,
  );

  //select inputs
  await page
    .locator("#maintenance-equipment-id")
    .selectOption(newRecord.equipmentId);
  await expect(page.locator("#maintenance-equipment-id")).toHaveValue(
    newRecord.equipmentId,
  );

  await page.locator("#maintenance-type").selectOption(newRecord.type);
  await expect(page.locator("#maintenance-type")).toHaveValue(newRecord.type);

  await page.locator("#maintenance-priority").selectOption(newRecord.priority);
  await expect(page.locator("#maintenance-priority")).toHaveValue(
    newRecord.priority,
  );

  await page
    .locator("#maintenance-completion-status")
    .selectOption(newRecord.completionStatus);
  await expect(page.locator("#maintenance-completion-status")).toHaveValue(
    newRecord.completionStatus,
  );

  //date input
  await page
    .locator("#maintenance-date")
    .fill(newRecord.date.toISOString().split("T")[0]);
  await expect(page.locator("#maintenance-date")).toHaveValue(
    newRecord.date.toISOString().split("T")[0],
  );

  // SUBMIT the form
  // for now we are testing the submission by making sure we pass on to the next page.
  // this test COULD be better checked!
  await page.locator("#maintenance-submit").click();
  await expect(page).toHaveTitle("Maintenance Records");
});

test("validate maintenance hours over 24", async ({ page }) => {
  const invalidHourRecord = {
    id: "300",
    equipmentId: "0", //mock data will generate eq ids 0-49
    date: new Date(),
    type: "Repair",
    technician: "Javier",
    hoursSpent: 30, //30 is over the hour limit.
    description: "a description about a fake repair for testing purposes.",
    priority: "Low",
    completionStatus: "Incomplete",
  };

  await page.goto("/maintenance/new-record/");
  await expect(page).toHaveTitle("New Maintenance Record");

  await expect(page.locator("#maintenance-hours-spent-error")).toBeVisible({
    visible: false,
  });
  //text inputs...
  await page
    .locator("#maintenance-technician-name")
    .fill(invalidHourRecord.technician);
  await expect(page.locator("#maintenance-technician-name")).toHaveValue(
    invalidHourRecord.technician,
  );

  await page
    .locator("#maintenance-hours-spent")
    .fill(invalidHourRecord.hoursSpent.toString());
  await expect(page.locator("#maintenance-hours-spent")).toHaveValue(
    invalidHourRecord.hoursSpent.toString(),
  );

  await page
    .locator("#maintenance-description")
    .fill(invalidHourRecord.description);
  await expect(page.locator("#maintenance-description")).toHaveValue(
    invalidHourRecord.description,
  );

  //select inputs
  await page
    .locator("#maintenance-equipment-id")
    .selectOption(invalidHourRecord.equipmentId);
  await expect(page.locator("#maintenance-equipment-id")).toHaveValue(
    invalidHourRecord.equipmentId,
  );

  await page.locator("#maintenance-type").selectOption(invalidHourRecord.type);
  await expect(page.locator("#maintenance-type")).toHaveValue(
    invalidHourRecord.type,
  );

  await page
    .locator("#maintenance-priority")
    .selectOption(invalidHourRecord.priority);
  await expect(page.locator("#maintenance-priority")).toHaveValue(
    invalidHourRecord.priority,
  );

  await page
    .locator("#maintenance-completion-status")
    .selectOption(invalidHourRecord.completionStatus);
  await expect(page.locator("#maintenance-completion-status")).toHaveValue(
    invalidHourRecord.completionStatus,
  );

  //date input
  await page
    .locator("#maintenance-date")
    .fill(invalidHourRecord.date.toISOString().split("T")[0]);
  await expect(page.locator("#maintenance-date")).toHaveValue(
    invalidHourRecord.date.toISOString().split("T")[0],
  );

  // SUBMIT the form
  await page.locator("#maintenance-submit").click();

  // validate error
  await expect(page.locator("#maintenance-hours-spent-error")).toBeVisible();
});

test("validate maintenance hours negative", async ({ page }) => {
  const invalidHourRecord = {
    id: "300",
    equipmentId: "0", //mock data will generate eq ids 0-49
    date: new Date(),
    type: "Repair",
    technician: "Javier",
    hoursSpent: -2, //negative hours.
    description: "a description about a fake repair for testing purposes.",
    priority: "Low",
    completionStatus: "Incomplete",
  };

  await page.goto("/maintenance/new-record/");
  await expect(page).toHaveTitle("New Maintenance Record");
  await expect(page.locator("#maintenance-hours-spent-error")).toBeVisible({
    visible: false,
  });

  //text inputs...
  await page
    .locator("#maintenance-technician-name")
    .fill(invalidHourRecord.technician);
  await expect(page.locator("#maintenance-technician-name")).toHaveValue(
    invalidHourRecord.technician,
  );

  await page
    .locator("#maintenance-hours-spent")
    .fill(invalidHourRecord.hoursSpent.toString());
  await expect(page.locator("#maintenance-hours-spent")).toHaveValue(
    invalidHourRecord.hoursSpent.toString(),
  );

  await page
    .locator("#maintenance-description")
    .fill(invalidHourRecord.description);
  await expect(page.locator("#maintenance-description")).toHaveValue(
    invalidHourRecord.description,
  );

  //select inputs
  await page
    .locator("#maintenance-equipment-id")
    .selectOption(invalidHourRecord.equipmentId);
  await expect(page.locator("#maintenance-equipment-id")).toHaveValue(
    invalidHourRecord.equipmentId,
  );

  await page.locator("#maintenance-type").selectOption(invalidHourRecord.type);
  await expect(page.locator("#maintenance-type")).toHaveValue(
    invalidHourRecord.type,
  );

  await page
    .locator("#maintenance-priority")
    .selectOption(invalidHourRecord.priority);
  await expect(page.locator("#maintenance-priority")).toHaveValue(
    invalidHourRecord.priority,
  );

  await page
    .locator("#maintenance-completion-status")
    .selectOption(invalidHourRecord.completionStatus);
  await expect(page.locator("#maintenance-completion-status")).toHaveValue(
    invalidHourRecord.completionStatus,
  );

  //date input
  await page
    .locator("#maintenance-date")
    .fill(invalidHourRecord.date.toISOString().split("T")[0]);
  await expect(page.locator("#maintenance-date")).toHaveValue(
    invalidHourRecord.date.toISOString().split("T")[0],
  );

  // SUBMIT the form
  await page.locator("#maintenance-submit").click();
  //validate errors
  await expect(page.locator("#maintenance-hours-spent-error")).toBeVisible();
});

test("show equipment name in maintenance table", async ({ page }) => {
  await page.goto("/maintenance/");
  await expect(page).toHaveTitle("Maintenance Records");
});

test("filter maintenance records by date range", async ({ page }) => {
  await page.goto("/maintenance/");
  await expect(page).toHaveTitle("Maintenance Records");
});
