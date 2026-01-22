// Demonstration of Ethiopian Calendar Engine

import {
  isLeapYear,
  daysInMonth,
  totalDaysSinceEpoch,
  dateFromTotalDays,
  dayOfWeek,
  formatDate,
  addDays,
  subtractDays,
  toAmeteAlem,
  fromAmeteAlem,
  getMoonPhase,
  isLeapYearMetonic,
  months,
  gregorianToEthiopian,
  getTodayEthiopian,
  formatEthiopianDate,
  GregorianDate,
  EthiopianDate,
  amToAA,
  calculateWenber,
  calculateAbekti,
  calculateMetq,
  resolveFeastMonth,
  calculateMewajaHamer,
  calculateMovableFeasts,
  AMHARIC_LOCALE,
  formatEthiopianDateLocalized,
  getFixedHolidays,
  getEvangelist,
  getYearInfo,
  getAllHolidays,
  EthiopianCalendar
} from './ethCal';

console.log('=== Ethiopian Calendar Engine Demo ===\n');

// Example 1: Basic calculations for epoch
console.log('1. Epoch (Meskerem 1, AM 1):');
console.log(`   Date: ${formatDate(1, 1, 1)}`);
console.log(`   Total days: ${totalDaysSinceEpoch(1, 1, 1)}`);
console.log(`   Day of week: ${dayOfWeek(1, 1, 1)}\n`);

// Example 2: A date in the year (e.g., 14 Tir 2010 AM)
const am = 2018;
const month = 5; // Tir
const day = 14;
console.log(`2. Date: ${formatDate(am, month, day)} (14 Tir ${am} AM)`);
const totalDays = totalDaysSinceEpoch(am, month, day);
console.log(`   Total days since epoch: ${totalDays}`);
const convertedBack = dateFromTotalDays(totalDays);
console.log(`   Converted back: ${formatDate(convertedBack.am, convertedBack.month, convertedBack.day)}`);
console.log(`   Day of week: ${dayOfWeek(am, month, day)}\n`);

// Example 3: Leap year check
console.log('3. Leap years:');
console.log(`   AM 2010 is leap: ${isLeapYear(2010)}`);
console.log(`   AM 2012 is leap: ${isLeapYear(2012)}`);
console.log(`   Days in Pagume AM 2010: ${daysInMonth(13, 2010)}`);
console.log(`   Days in Pagume AM 2012: ${daysInMonth(13, 2012)}\n`);

// Example 4: Date arithmetic
console.log('4. Date arithmetic:');
const startDate = { am: 2010, month: 5, day: 14 };
console.log(`   Starting date: ${formatDate(startDate.am, startDate.month, startDate.day)}`);
const added = addDays(startDate.am, startDate.month, startDate.day, 30);
console.log(`   +30 days: ${formatDate(added.am, added.month, added.day)}`);
const subtracted = subtractDays(startDate.am, startDate.month, startDate.day, 10);
console.log(`   -10 days: ${formatDate(subtracted.am, subtracted.month, subtracted.day)}\n`);

// Example 5: Round trip conversion
console.log('5. Round trip: Total days -> Date -> Total days');
const testTotalDays = 123456; // arbitrary
const date = dateFromTotalDays(testTotalDays);
const backToDays = totalDaysSinceEpoch(date.am, date.month, date.day);
console.log(`   ${testTotalDays} days -> ${formatDate(date.am, date.month, date.day)} -> ${backToDays} days`);
console.log(`   Match: ${testTotalDays === backToDays}\n`);

// Phase 2: Gregorian Bridge Layer
console.log('=== Phase 2: Gregorian ↔ Ethiopian Bridge ===\n');

// Example 6: Bridge epoch
console.log('6. Bridge epoch:');
const bridgeEth = gregorianToEthiopian(1970, 1, 1);
console.log(`   Gregorian 1970-01-01 -> Ethiopian ${formatEthiopianDate(bridgeEth)}`);
console.log(`   Expected: Tahsas 23, AM 1962\n`);

// Example 7: Today's date
console.log('7. Today\'s date:');
const today = getTodayEthiopian();
console.log(`   Ethiopian today: ${formatEthiopianDate(today)}\n`);

// Example 8: Specific Gregorian dates
console.log('8. Gregorian to Ethiopian conversions:');
const gregDates = [
  { year: 2023, month: 1, day: 1 },
  { year: 2000, month: 2, day: 29 }, // Leap day
  { year: 2026, month: 1, day: 22 }
];
for (const gd of gregDates) {
  const eth = gregorianToEthiopian(gd.year, gd.month, gd.day);
  console.log(`   Gregorian ${gd.year}-${gd.month}-${gd.day} -> ${formatEthiopianDate(eth)}`);
}

// Phase 3: Ethiopian Cycles & Movable Feasts
console.log('\n=== Phase 3: Ethiopian Cycles & Movable Feasts ===\n');

// Example 9: Era conversion
console.log('9. Era conversion:');
console.log(`   AM 2018 -> AA ${amToAA(2018)}`);
console.log(`   AA 7518 -> AM ${fromAmeteAlem(7518)}\n`);

// Example 10: Wenber calculation
console.log('10. Wenber calculation:');
const testAms = [2018, 2019, 2020];
for (const am of testAms) {
  const wenber = calculateWenber(am);
  const abekti = calculateAbekti(wenber);
  const metq = calculateMetq(wenber);
  console.log(`   AM ${am}: Wenber=${wenber}, Abekti=${abekti}, Metq=${metq}`);
}
console.log();

// Example 11: Movable feasts for current year
console.log('11. Movable feasts for AM 2018:');
try {
  const feasts = calculateMovableFeasts(2018);
  for (const [name, date] of Object.entries(feasts)) {
    console.log(`   ${name}: ${formatEthiopianDate(date)}`);
  }
} catch (e) {
  console.error('   Error:', (e as Error).message);
}
console.log();

// Example 12: Feast month resolution
console.log('12. Feast month resolution:');
console.log(`   Metq 10 -> Month ${resolveFeastMonth(10)} (Tikimt)`);
console.log(`   Metq 20 -> Month ${resolveFeastMonth(20)} (Meskerem)\n`);

// Example 13: Mewaja Hamer calculation
console.log('13. Mewaja Hamer for AM 2018:');
const metq2018 = calculateMetq(calculateWenber(2018));
const mewajaHamer = calculateMewajaHamer(2018, metq2018);
console.log(`   Metq=${metq2018}, Mewaja Hamer=${mewajaHamer}\n`);

// Example 14: Historical feasts
console.log('14. Historical feasts (AM 2010):');
try {
  const histFeasts = calculateMovableFeasts(2010);
  console.log(`   Hosanna: ${formatEthiopianDate(histFeasts["ሆሣዕና"])}`);
  console.log(`   Tinseae: ${formatEthiopianDate(histFeasts["ትንሣኤ"])}`);
} catch (e) {
  console.error('   Error:', (e as Error).message);
}

// Phase 4: Localization, Fixed Holidays, Chronology & Public API
console.log('\n=== Phase 4: Localization, Fixed Holidays, Chronology & Public API ===\n');

// Example 15: Localization
console.log('15. Localized formatting:');
const sampleDate = { am: 2018, month: 5, day: 14 };
console.log(`   Default (Amharic): ${formatEthiopianDateLocalized(sampleDate)}`);
console.log(`   Same as: ${formatEthiopianDateLocalized(sampleDate, AMHARIC_LOCALE)}\n`);

// Example 16: Fixed holidays
console.log('16. Fixed holidays for AM 2018:');
const fixedHolidays = getFixedHolidays(2018);
fixedHolidays.forEach(holiday => {
  console.log(`   ${formatEthiopianDate(holiday)}`);
});
console.log();

// Example 17: Year information
console.log('17. Year information:');
const yearInfo = getYearInfo(2018);
console.log(`   AM ${yearInfo.am}: Leap=${yearInfo.isLeap}, Evangelist=${yearInfo.evangelist}\n`);

// Example 18: Evangelist cycle
console.log('18. Evangelist cycle:');
const evangelists = [2018, 2019, 2020, 2021].map(am => ({ am, evangelist: getEvangelist(am) }));
evangelists.forEach(info => {
  console.log(`   AM ${info.am}: ${info.evangelist}`);
});
console.log();

// Example 19: All holidays for a year
console.log('19. All holidays for AM 2018:');
const allHolidays = getAllHolidays(2018);
allHolidays.forEach(holiday => {
  console.log(`   ${holiday.name} (${holiday.type}): ${formatEthiopianDate(holiday.date)}`);
});
console.log();

// Example 20: Public API usage
console.log('20. Public API usage:');
console.log(`   Today: ${EthiopianCalendar.format(EthiopianCalendar.today())}`);
const gregDate = { year: 2023, month: 1, day: 1 };
const ethDate = EthiopianCalendar.fromGregorian(gregDate.year, gregDate.month, gregDate.day);
console.log(`   Gregorian ${gregDate.year}-${gregDate.month}-${gregDate.day} -> ${EthiopianCalendar.format(ethDate)}`);
const yearInfoAPI = EthiopianCalendar.getYearInfo(2018);
console.log(`   Year 2018 info: Leap=${yearInfoAPI.isLeap}, Evangelist=${yearInfoAPI.evangelist}`);
const allHolidaysAPI = EthiopianCalendar.getAllHolidays(2018);
console.log(`   Total holidays in 2018: ${allHolidaysAPI.length}`);
