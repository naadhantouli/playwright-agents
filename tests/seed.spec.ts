import { test, expect } from '@playwright/test';

const student = {
  firstName: 'first',
  lastName: 'last',
  email: 'test@t.com',
  gender: 'Female',
  mobile: '2342354235',
  dob: { day: '10', month: '4', year: '2026' }, // month is 0-indexed in datepicker (4 = May)
  hobbies: ['Sports', 'Reading', 'Music'],
  address: 'ssgsgwg',
  state: 'Uttar Pradesh',
  city: 'Agra',
};

test.describe('DemoQA Practice Form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
  });

  test('Happy path - fill and submit form successfully', async ({ page }) => {
    // Name
    await page.fill('#firstName', student.firstName);
    await page.fill('#lastName', student.lastName);

    // Email
    await page.fill('#userEmail', student.email);

    // Gender
    await page.locator('label[for="gender-radio-2"]').click(); // Female

    // Mobile
    await page.fill('#userNumber', student.mobile);

    // Date of Birth
    await page.click('#dateOfBirthInput');
    await page.selectOption('.react-datepicker__month-select', { value: student.dob.month });
    await page.selectOption('.react-datepicker__year-select', { value: student.dob.year })