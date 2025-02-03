import { test, expect } from "@playwright/test";
import { Equipment } from "@/ts/types";

/**
 * Should create new equipment with valid data. 
 */
test("create new equipment", async ({ page }) => {

  //define valid equipment.
  const validEquipment : Equipment = { 
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
  await page.locator('#equipment-name').fill(validEquipment.name);
  await expect(page.locator('#equipment-name')).toHaveValue(validEquipment.name);

  await page.locator('#equipment-location').fill(validEquipment.location);
  await expect(page.locator('#equipment-location')).toHaveValue(validEquipment.location);

  await page.locator('#equipment-model').fill(validEquipment.model);
  await expect(page.locator('#equipment-model')).toHaveValue(validEquipment.model);

  await page.locator('#equipment-serial-number').fill(validEquipment.serialNumber);
  await expect(page.locator('#equipment-serial-number')).toHaveValue(validEquipment.serialNumber);

  //select inputs
  await page.locator('#equipment-department').selectOption(validEquipment.department);
  await expect(page.locator('#equipment-department')).toHaveValue(validEquipment.department);

  await page.locator('#equipment-status').selectOption(validEquipment.status);
  await expect(page.locator('#equipment-status')).toHaveValue(validEquipment.status);

  //date input
  await page.locator('#equipment-install-date').fill((validEquipment.installDate.toISOString().split("T"))[0]);
  await expect(page.locator('#equipment-install-date')).toHaveValue((validEquipment.installDate.toISOString().split("T"))[0]);

  // SUBMIT the form
  // for now we are testing the submission by making sure we pass on to the next page.
  // this test COULD be better checked!
  await page.locator('#equipment-submit').click();
  await expect(page).toHaveTitle("Equipment");

});


/**
 * Should show validation errors for invalid equipment data.
 */
test("show validation errors", async({page}) => {
  const invalidEquipment = { 
      id: "300", //id not an input field
      name: "ii", //3 char required err
      location: "", // empty locaation err
      department: "", // no department!
      model: "", //empty model err
      serialNumber: "feareqvnnmi***##", //not alpha numeric err
      installDate: new Date('2026-02-25T00:00:00'), // not a future date err
      status: "", //no status
  };

  //go to create new equipment page.
  await page.goto("/equipment/new-form/");
  await expect(page).toHaveTitle("New Equipment");


  // FILL the form.
  //text inputs...
  await page.locator('#equipment-name').fill(invalidEquipment.name);
  await expect(page.locator('#equipment-name')).toHaveValue(invalidEquipment.name);

  await page.locator('#equipment-location').fill(invalidEquipment.location);
  await expect(page.locator('#equipment-location')).toHaveValue(invalidEquipment.location);

  await page.locator('#equipment-model').fill(invalidEquipment.model);
  await expect(page.locator('#equipment-model')).toHaveValue(invalidEquipment.model);

  await page.locator('#equipment-serial-number').fill(invalidEquipment.serialNumber);
  await expect(page.locator('#equipment-serial-number')).toHaveValue(invalidEquipment.serialNumber);

  //select inputs
  await page.locator('#equipment-department').selectOption(invalidEquipment.department);
  await expect(page.locator('#equipment-department')).toHaveValue(invalidEquipment.department);

  await page.locator('#equipment-status').selectOption(invalidEquipment.status);
  await expect(page.locator('#equipment-status')).toHaveValue(invalidEquipment.status);

  //date input
  await page.locator('#equipment-install-date').fill((invalidEquipment.installDate.toISOString().split("T"))[0]);
  await expect(page.locator('#equipment-install-date')).toHaveValue((invalidEquipment.installDate.toISOString().split("T"))[0]);

  // attempt to SUBMIT the form
  await page.locator('#equipment-submit').click();

  //ensure validation errors are present. 
  await expect(page.locator('#equipment-name-error')).toBeVisible();
  await expect(page.locator('#equipment-location-error')).toBeVisible();
  await expect(page.locator('#equipment-model-error')).toBeVisible();
  await expect(page.locator('#equipment-serial-number-error')).toBeVisible();
  await expect(page.locator('#equipment-department-error')).toBeVisible();
  await expect(page.locator('#equipment-status-error')).toBeVisible();
  await expect(page.locator('#equipment-install-date-error')).toBeVisible();

  //await expect(page).toHaveTitle("Equipment");
});
