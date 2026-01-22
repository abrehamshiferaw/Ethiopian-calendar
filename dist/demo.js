"use strict";
// Demonstration of Ethiopian Calendar Engine
Object.defineProperty(exports, "__esModule", { value: true });
const ethCal_1 = require("./ethCal");
console.log('=== Ethiopian Calendar Engine Demo ===\n');
// Example 1: Basic calculations for epoch
console.log('1. Epoch (Meskerem 1, AM 1):');
console.log(`   Date: ${(0, ethCal_1.formatDate)(1, 1, 1)}`);
console.log(`   Total days: ${(0, ethCal_1.totalDaysSinceEpoch)(1, 1, 1)}`);
console.log(`   Day of week: ${(0, ethCal_1.dayOfWeek)(1, 1, 1)}\n`);
// Example 2: A date in the year (e.g., 14 Tir 2010 AM)
const am = 2018;
const month = 5; // Tir
const day = 14;
console.log(`2. Date: ${(0, ethCal_1.formatDate)(am, month, day)} (14 Tir ${am} AM)`);
const totalDays = (0, ethCal_1.totalDaysSinceEpoch)(am, month, day);
console.log(`   Total days since epoch: ${totalDays}`);
const convertedBack = (0, ethCal_1.dateFromTotalDays)(totalDays);
console.log(`   Converted back: ${(0, ethCal_1.formatDate)(convertedBack.am, convertedBack.month, convertedBack.day)}`);
console.log(`   Day of week: ${(0, ethCal_1.dayOfWeek)(am, month, day)}\n`);
// Example 3: Leap year check
console.log('3. Leap years:');
console.log(`   AM 2010 is leap: ${(0, ethCal_1.isLeapYear)(2010)}`);
console.log(`   AM 2012 is leap: ${(0, ethCal_1.isLeapYear)(2012)}`);
console.log(`   Days in Pagume AM 2010: ${(0, ethCal_1.daysInMonth)(13, 2010)}`);
console.log(`   Days in Pagume AM 2012: ${(0, ethCal_1.daysInMonth)(13, 2012)}\n`);
// Example 4: Date arithmetic
console.log('4. Date arithmetic:');
const startDate = { am: 2010, month: 5, day: 14 };
console.log(`   Starting date: ${(0, ethCal_1.formatDate)(startDate.am, startDate.month, startDate.day)}`);
const added = (0, ethCal_1.addDays)(startDate.am, startDate.month, startDate.day, 30);
console.log(`   +30 days: ${(0, ethCal_1.formatDate)(added.am, added.month, added.day)}`);
const subtracted = (0, ethCal_1.subtractDays)(startDate.am, startDate.month, startDate.day, 10);
console.log(`   -10 days: ${(0, ethCal_1.formatDate)(subtracted.am, subtracted.month, subtracted.day)}\n`);
// Example 5: Round trip conversion
console.log('5. Round trip: Total days -> Date -> Total days');
const testTotalDays = 123456; // arbitrary
const date = (0, ethCal_1.dateFromTotalDays)(testTotalDays);
const backToDays = (0, ethCal_1.totalDaysSinceEpoch)(date.am, date.month, date.day);
console.log(`   ${testTotalDays} days -> ${(0, ethCal_1.formatDate)(date.am, date.month, date.day)} -> ${backToDays} days`);
console.log(`   Match: ${testTotalDays === backToDays}\n`);
// Phase 2: Gregorian Bridge Layer
console.log('=== Phase 2: Gregorian ↔ Ethiopian Bridge ===\n');
// Example 6: Bridge epoch
console.log('6. Bridge epoch:');
const bridgeEth = (0, ethCal_1.gregorianToEthiopian)(1970, 1, 1);
console.log(`   Gregorian 1970-01-01 -> Ethiopian ${(0, ethCal_1.formatEthiopianDate)(bridgeEth)}`);
console.log(`   Expected: Tahsas 23, AM 1962\n`);
// Example 7: Today's date
console.log('7. Today\'s date:');
const today = (0, ethCal_1.getTodayEthiopian)();
console.log(`   Ethiopian today: ${(0, ethCal_1.formatEthiopianDate)(today)}\n`);
// Example 8: Specific Gregorian dates
console.log('8. Gregorian to Ethiopian conversions:');
const gregDates = [
    { year: 2023, month: 1, day: 1 },
    { year: 2000, month: 2, day: 29 }, // Leap day
    { year: 2026, month: 1, day: 22 }
];
for (const gd of gregDates) {
    const eth = (0, ethCal_1.gregorianToEthiopian)(gd.year, gd.month, gd.day);
    console.log(`   Gregorian ${gd.year}-${gd.month}-${gd.day} -> ${(0, ethCal_1.formatEthiopianDate)(eth)}`);
}
// Phase 3: Ethiopian Cycles & Movable Feasts
console.log('\n=== Phase 3: Ethiopian Cycles & Movable Feasts ===\n');
// Example 9: Era conversion
console.log('9. Era conversion:');
console.log(`   AM 2018 -> AA ${(0, ethCal_1.amToAA)(2018)}`);
console.log(`   AA 7518 -> AM ${(0, ethCal_1.fromAmeteAlem)(7518)}\n`);
// Example 10: Wenber calculation
console.log('10. Wenber calculation:');
const testAms = [2018, 2019, 2020];
for (const am of testAms) {
    const wenber = (0, ethCal_1.calculateWenber)(am);
    const abekti = (0, ethCal_1.calculateAbekti)(wenber);
    const metq = (0, ethCal_1.calculateMetq)(wenber);
    console.log(`   AM ${am}: Wenber=${wenber}, Abekti=${abekti}, Metq=${metq}`);
}
console.log();
// Example 11: Movable feasts for current year
console.log('11. Movable feasts for AM 2018:');
try {
    const feasts = (0, ethCal_1.calculateMovableFeasts)(2018);
    for (const [name, date] of Object.entries(feasts)) {
        console.log(`   ${name}: ${(0, ethCal_1.formatEthiopianDate)(date)}`);
    }
}
catch (e) {
    console.error('   Error:', e.message);
}
console.log();
// Example 12: Feast month resolution
console.log('12. Feast month resolution:');
console.log(`   Metq 10 -> Month ${(0, ethCal_1.resolveFeastMonth)(10)} (Tikimt)`);
console.log(`   Metq 20 -> Month ${(0, ethCal_1.resolveFeastMonth)(20)} (Meskerem)\n`);
// Example 13: Mewaja Hamer calculation
console.log('13. Mewaja Hamer for AM 2018:');
const metq2018 = (0, ethCal_1.calculateMetq)((0, ethCal_1.calculateWenber)(2018));
const mewajaHamer = (0, ethCal_1.calculateMewajaHamer)(2018, metq2018);
console.log(`   Metq=${metq2018}, Mewaja Hamer=${mewajaHamer}\n`);
// Example 14: Historical feasts
console.log('14. Historical feasts (AM 2010):');
try {
    const histFeasts = (0, ethCal_1.calculateMovableFeasts)(2010);
    console.log(`   Hosanna: ${(0, ethCal_1.formatEthiopianDate)(histFeasts["ሆሣዕና"])}`);
    console.log(`   Tinseae: ${(0, ethCal_1.formatEthiopianDate)(histFeasts["ትንሣኤ"])}`);
}
catch (e) {
    console.error('   Error:', e.message);
}
// Phase 4: Localization, Fixed Holidays, Chronology & Public API
console.log('\n=== Phase 4: Localization, Fixed Holidays, Chronology & Public API ===\n');
// Example 15: Localization
console.log('15. Localized formatting:');
const sampleDate = { am: 2018, month: 5, day: 14 };
console.log(`   Default (Amharic): ${(0, ethCal_1.formatEthiopianDateLocalized)(sampleDate)}`);
console.log(`   Same as: ${(0, ethCal_1.formatEthiopianDateLocalized)(sampleDate, ethCal_1.AMHARIC_LOCALE)}\n`);
// Example 16: Fixed holidays
console.log('16. Fixed holidays for AM 2018:');
const fixedHolidays = (0, ethCal_1.getFixedHolidays)(2018);
fixedHolidays.forEach(holiday => {
    console.log(`   ${(0, ethCal_1.formatEthiopianDate)(holiday)}`);
});
console.log();
// Example 17: Year information
console.log('17. Year information:');
const yearInfo = (0, ethCal_1.getYearInfo)(2018);
console.log(`   AM ${yearInfo.am}: Leap=${yearInfo.isLeap}, Evangelist=${yearInfo.evangelist}\n`);
// Example 18: Evangelist cycle
console.log('18. Evangelist cycle:');
const evangelists = [2018, 2019, 2020, 2021].map(am => ({ am, evangelist: (0, ethCal_1.getEvangelist)(am) }));
evangelists.forEach(info => {
    console.log(`   AM ${info.am}: ${info.evangelist}`);
});
console.log();
// Example 19: All holidays for a year
console.log('19. All holidays for AM 2018:');
const allHolidays = (0, ethCal_1.getAllHolidays)(2018);
allHolidays.forEach(holiday => {
    console.log(`   ${holiday.name} (${holiday.type}): ${(0, ethCal_1.formatEthiopianDate)(holiday.date)}`);
});
console.log();
// Example 20: Public API usage
console.log('20. Public API usage:');
console.log(`   Today: ${ethCal_1.EthiopianCalendar.format(ethCal_1.EthiopianCalendar.today())}`);
const gregDate = { year: 2023, month: 1, day: 1 };
const ethDate = ethCal_1.EthiopianCalendar.fromGregorian(gregDate.year, gregDate.month, gregDate.day);
console.log(`   Gregorian ${gregDate.year}-${gregDate.month}-${gregDate.day} -> ${ethCal_1.EthiopianCalendar.format(ethDate)}`);
const yearInfoAPI = ethCal_1.EthiopianCalendar.getYearInfo(2018);
console.log(`   Year 2018 info: Leap=${yearInfoAPI.isLeap}, Evangelist=${yearInfoAPI.evangelist}`);
const allHolidaysAPI = ethCal_1.EthiopianCalendar.getAllHolidays(2018);
console.log(`   Total holidays in 2018: ${allHolidaysAPI.length}`);
