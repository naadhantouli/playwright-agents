import { test, expect } from '@playwright/test';

const student = {
  firstName: 'first',
  lastName: 'last',
  email: 'test@t.com',
  mobile: '2342354235',
  address: 'ssgsgwg',
  dob: { month: '6', year: '1990', day: '17' }, // month is 0-indexed: 6 = July
};

test.describe('DemoQA Practice Form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
  });

  test('Happy path - submit form successfully', async ({ page }) => {
    await page.fill('#firstName', student.firstName);
    await page.fill('#lastName', student.lastName);
    await page.fill('#userEmail', student.email);
    await page.locator('label[for="gender-radio-2"]').click();
    await page.fill('#userNumber', student.mobile);

    // Date of Birth
    await page.click('#dateOfBirthInput');
    await page.selectOption('.react-datepicker__month-select', { value: student.dob.month });
    await page.selectOption('.react-datepicker__year-select', { value: student.dob.year });
    await page.locator('.react-datepicker__day--0' + student.dob.day + ':not(.react-datepicker__day--outside-month)').click({ force: true });

    // Subjects
    await page.fill('#subjectsInput', 'Maths');
    await page.keyboard.press('Enter');

    // Hobbies
    await page.locator('label[for="hobbies-checkbox-0"]').click(); // Sports
    await page.locator('label[for="hobbies-checkbox-1"]').click(); // Reading

    await page.fill('#currentAddress', student.address);

    await page.locator('#state').click();
    await page.locator('#react-select-3-option-0').click();

    await page.locator('#city').click();
    await page.locator('#react-select-4-option-0').click();

    await page.locator('#submit').click();

    await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
  });

  test('Negative - invalid email', async ({ page }) => {
    await page.fill('#firstName', student.firstName);
    await page.fill('#lastName', student.lastName);
    await page.fill('#userEmail', 'notanemail');
    await page.locator('label[for="gender-radio-2"]').click();
    await page.fill('#userNumber', student.mobile);
    await page.locator('#submit').click();
    await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible();
  });

  test('Negative - missing required fields', async ({ page }) => {
    await page.locator('#submit').click();
    await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible();
  });

  test('Negative - mobile too short', async ({ page }) => {
    await page.fill('#firstName', student.firstName);
    await page.fill('#lastName', student.lastName);
    await page.fill('#userEmail', student.email);
    await page.locator('label[for="gender-radio-2"]').click();
    await page.fill('#userNumber', '123');
    await page.locator('#submit').click();
    await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible();
  });

});