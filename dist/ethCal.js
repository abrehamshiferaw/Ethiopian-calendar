"use strict";
// Ethiopian Calendar Engine
// Standalone implementation without Gregorian dependencies
Object.defineProperty(exports, "__esModule", { value: true });
exports.moonPhases = exports.EthiopianCalendar = exports.FIXED_HOLIDAYS = exports.AMHARIC_LOCALE = exports.FEASTS = exports.DAY_TEWSAK = exports.ethNumbers = exports.daysOfWeek = exports.months = void 0;
exports.toEthiopicNumeral = toEthiopicNumeral;
exports.isLeapYear = isLeapYear;
exports.daysInMonth = daysInMonth;
exports.totalDaysSinceEpoch = totalDaysSinceEpoch;
exports.dateFromTotalDays = dateFromTotalDays;
exports.dayOfWeek = dayOfWeek;
exports.formatDate = formatDate;
exports.addDays = addDays;
exports.subtractDays = subtractDays;
exports.toAmeteAlem = toAmeteAlem;
exports.fromAmeteAlem = fromAmeteAlem;
exports.isLeapYearGregorian = isLeapYearGregorian;
exports.gregorianToDayCount = gregorianToDayCount;
exports.gregorianToEthiopian = gregorianToEthiopian;
exports.getTodayEthiopian = getTodayEthiopian;
exports.formatEthiopianDate = formatEthiopianDate;
exports.amToAA = amToAA;
exports.calculateWenber = calculateWenber;
exports.calculateAbekti = calculateAbekti;
exports.calculateMetq = calculateMetq;
exports.resolveFeastMonth = resolveFeastMonth;
exports.calculateMewajaHamer = calculateMewajaHamer;
exports.calculateMovableFeasts = calculateMovableFeasts;
exports.formatEthiopianDateLocalized = formatEthiopianDateLocalized;
exports.getFixedHolidays = getFixedHolidays;
exports.getEvangelist = getEvangelist;
exports.getYearInfo = getYearInfo;
exports.getAllHolidays = getAllHolidays;
exports.getMoonPhase = getMoonPhase;
exports.isLeapYearMetonic = isLeapYearMetonic;
// Locale data
exports.months = [
    'መስከረም', // Meskerem
    'ጥቅምት', // Tikimt
    'ኅዳር', // Hidar
    'ታህሳስ', // Tahsas
    'ጥር', // Tir
    'የካቲት', // Yekatit
    'መጋቢት', // Megabit
    'ሚያዝያ', // Miazia
    'ግንቦት', // Ginbot
    'ሰኔ', // Sene
    'ሐምሌ', // Hamle
    'ነሐሴ', // Nehase
    'ጳጉሜ' // Pagume
];
exports.daysOfWeek = [
    'ሰኞ', // Monday
    'ማክሰኞ', // Tuesday
    'ረቡዕ', // Wednesday
    'ሐሙስ', // Thursday
    'አርብ', // Friday
    'ቅዳሜ', // Saturday
    'እሁድ' // Sunday
];
// Ethiopic numerals (1 to 30)
exports.ethNumbers = [
    '', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱',
    '፲', '፲፩', '፲፪', '፲፫', '፲፬', '፲፭', '፲፮', '፲፯', '፲፰', '፲፱',
    '፳', '፳፩', '፳፪', '፳፫', '፳፬', '፳፭', '፳፮', '፳፯', '፳፰', '፳፱'
];
// Utility function to convert number to Ethiopic numeral
function toEthiopicNumeral(n) {
    if (n < 1 || n > 30)
        return n.toString(); // fallback
    return exports.ethNumbers[n];
}
// Leap year: every 4 years (AM divisible by 4)
function isLeapYear(am) {
    return am % 4 === 0;
}
// Days in month: 30 for months 1-12, 5 or 6 for Pagume (13)
function daysInMonth(month, am) {
    if (month === 13) {
        return isLeapYear(am) ? 6 : 5;
    }
    return 30;
}
// Total days since epoch (Meskerem 1, AM 1)
function totalDaysSinceEpoch(am, month, day) {
    let total = 0;
    // Days from previous years (AM 1 to AM-1)
    for (let y = 1; y < am; y++) {
        total += 12 * 30 + (isLeapYear(y) ? 6 : 5);
    }
    // Days in current year up to previous month
    for (let m = 1; m < month; m++) {
        total += daysInMonth(m, am);
    }
    // Add days in current month (day 1 = 0 additional)
    total += day - 1;
    return total;
}
// Convert total days to Ethiopian date
function dateFromTotalDays(totalDays) {
    let am = 1;
    // Find the year
    while (true) {
        const daysInYear = 12 * 30 + (isLeapYear(am) ? 6 : 5);
        if (totalDays < daysInYear)
            break;
        totalDays -= daysInYear;
        am++;
    }
    // Find the month
    let month = 1;
    while (true) {
        const dim = daysInMonth(month, am);
        if (totalDays < dim)
            break;
        totalDays -= dim;
        month++;
    }
    // Day is remaining + 1
    const day = totalDays + 1;
    return { am, month, day };
}
// Day of week for given date
function dayOfWeek(am, month, day) {
    const totalDays = totalDaysSinceEpoch(am, month, day);
    const dow = totalDays % 7;
    return exports.daysOfWeek[dow];
}
// Format date as string with Amharic and Ethiopic numerals
function formatDate(am, month, day) {
    return `${toEthiopicNumeral(day)} ${exports.months[month - 1]} ${toEthiopicNumeral(am)}`;
}
// Utility for date arithmetic: add days
function addDays(am, month, day, daysToAdd) {
    const totalDays = totalDaysSinceEpoch(am, month, day) + daysToAdd;
    return dateFromTotalDays(totalDays);
}
// Subtract days
function subtractDays(am, month, day, daysToSubtract) {
    return addDays(am, month, day, -daysToSubtract);
}
// Era Conversion: Convert Amete Mihret (AM) to Amete Alem (AA)
function toAmeteAlem(ameteMihret) {
    return ameteMihret + 5500;
}
// Convert Amete Alem to Amete Mihret
function fromAmeteAlem(ameteAlem) {
    return ameteAlem - 5500;
}
// Gregorian leap year
function isLeapYearGregorian(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
// Days in Gregorian month
function daysInMonthGregorian(month, year) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isLeapYearGregorian(year))
        return 29;
    return days[month - 1];
}
// Gregorian to day count since 1970-01-01
function gregorianToDayCount(year, month, day) {
    let total = 0;
    // Days from 1970 to year-1
    for (let y = 1970; y < year; y++) {
        total += isLeapYearGregorian(y) ? 366 : 365;
    }
    // Days in current year up to month-1
    for (let m = 1; m < month; m++) {
        total += daysInMonthGregorian(m, year);
    }
    // Days in month
    total += day - 1;
    return total;
}
// Bridge epoch: Gregorian 1970-01-01 = Ethiopian AM 1962, month 4, day 23
const BRIDGE_ETH_OFFSET = totalDaysSinceEpoch(1962, 4, 23);
// Gregorian to Ethiopian
function gregorianToEthiopian(year, month, day) {
    const gregDayCount = gregorianToDayCount(year, month, day);
    const dayOffset = gregDayCount + BRIDGE_ETH_OFFSET;
    const eth = dateFromTotalDays(dayOffset);
    return { am: eth.am, month: eth.month, day: eth.day };
}
// Get today's Ethiopian date
function getTodayEthiopian() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1; // 0-based
    const day = now.getUTCDate();
    return gregorianToEthiopian(year, month, day);
}
// toGeezNumber is toEthiopicNumeral
// Format Ethiopian date
function formatEthiopianDate(date) {
    return `${toEthiopicNumeral(date.day)} ${exports.months[date.month - 1]} ${toEthiopicNumeral(date.am)}`;
}
// Phase 3: Ethiopian Cycles & Movable Feasts
// A.M. to A.A. conversion
function amToAA(am) {
    return am + 5500;
}
// Wenber calculation (Chair of the Year)
function calculateWenber(am) {
    let aa = amToAA(am);
    aa = aa % 19;
    let wenber = aa - 1;
    if (wenber === 0)
        wenber = 18;
    return wenber;
}
// Abekti calculation
function calculateAbekti(wenber) {
    return (wenber * 11) % 30;
}
// Metq calculation
function calculateMetq(wenber) {
    return (wenber * 19) % 30;
}
// Validate Abekti + Metq = 30
function validateAbektiMetq(abekti, metq) {
    if (abekti + metq !== 30) {
        throw new Error(`Abekti + Metq must equal 30, got ${abekti} + ${metq} = ${abekti + metq}`);
    }
}
// Day Tewsak table (0 = Sunday)
exports.DAY_TEWSAK = {
    0: 7, // Sunday
    1: 6, // Monday
    2: 5, // Tuesday
    3: 4, // Wednesday
    4: 3, // Thursday
    5: 2, // Friday
    6: 8 // Saturday
};
// Get day of week as number (0 = Monday, 6 = Sunday)
function getDayOfWeekNumber(am, month, day) {
    const totalDays = totalDaysSinceEpoch(am, month, day);
    return totalDays % 7;
}
// Map internal dow (0=Mon) to standard (0=Sun)
function mapToSundayZero(dow) {
    return dow === 6 ? 0 : dow + 1;
}
// Feast month resolution
function resolveFeastMonth(metq) {
    return metq > 14 ? 1 : 2; // Meskerem or Tikimt
}
// Mewaja Hamer calculation
function calculateMewajaHamer(am, metq) {
    const feastMonth = resolveFeastMonth(metq);
    const metqDay = metq + 1; // Metq 0-29 -> day 1-30
    const dowNum = getDayOfWeekNumber(am, feastMonth, metqDay);
    const mappedDow = mapToSundayZero(dowNum);
    const tewsakValue = exports.DAY_TEWSAK[mappedDow];
    return (metq + tewsakValue) % 30;
}
// Movable feasts table
exports.FEASTS = [
    { name: "ነነዌ", tewsak: 0 }, // Nenewe
    { name: "ዐቢይ ጾም", tewsak: 14 }, // Abiy Tsom
    { name: "ሆሣዕና", tewsak: 2 }, // Hosanna
    { name: "ትንሣኤ", tewsak: 9 }, // Tinseae
    { name: "ዕርገት", tewsak: 18 } // Erget
];
// Calculate movable feasts for a given AM
function calculateMovableFeasts(am) {
    const wenber = calculateWenber(am);
    const abekti = calculateAbekti(wenber);
    const metq = calculateMetq(wenber);
    validateAbektiMetq(abekti, metq);
    const mewajaHamer = calculateMewajaHamer(am, metq);
    const feastMonth = resolveFeastMonth(metq);
    const baseDate = { am, month: feastMonth, day: mewajaHamer + 1 }; // Mewaja Hamer 0-29 -> day 1-30
    const feasts = {};
    for (const feast of exports.FEASTS) {
        const feastDate = addDays(baseDate.am, baseDate.month, baseDate.day, feast.tewsak);
        feasts[feast.name] = { am: feastDate.am, month: feastDate.month, day: feastDate.day };
    }
    // Validate Tinseae is Sunday (log warning if not)
    const tinseae = feasts["ትንሣኤ"];
    const dow = dayOfWeek(tinseae.am, tinseae.month, tinseae.day);
    if (dow !== 'እሁድ') { // Sunday
        console.warn(`Tinseae should be Sunday, got ${dow} for ${formatEthiopianDate(tinseae)}`);
    }
    return feasts;
}
// Phase 4: Localization, Fixed Holidays, Chronology & Public API
// Amharic Locale (Default)
exports.AMHARIC_LOCALE = {
    months: [
        "መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ",
        "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ",
        "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"
    ],
    weekdays: [
        "እሑድ", "ሰኞ", "ማክሰኞ",
        "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"
    ],
    numerals: toEthiopicNumeral
};
// Localized formatter
function formatEthiopianDateLocalized(date, locale = exports.AMHARIC_LOCALE) {
    return `${locale.numerals(date.day)} ${locale.months[date.month - 1]} ${locale.numerals(date.am)}`;
}
// Fixed Ethiopian Holidays
exports.FIXED_HOLIDAYS = [
    { name: "እንቁጣጣሽ", month: 1, day: 1 }, // Enkutatash
    { name: "መስቀል", month: 1, day: 17 }, // Meskel
    { name: "ገና", month: 4, day: 29 }, // Gena
    { name: "ጥምቀት", month: 5, day: 11 }, // Timket
    { name: "አድዋ", month: 6, day: 23 }, // Adwa
    { name: "የሰራተኞች ቀን", month: 8, day: 23 } // Workers' Day
];
// Get fixed holidays for a year
function getFixedHolidays(am) {
    return exports.FIXED_HOLIDAYS.map(holiday => ({
        am,
        month: holiday.month,
        day: holiday.day
    }));
}
// Evangelist Calculation (28-Year Cycle)
function getEvangelist(am) {
    const cycle = (am - 1) % 4; // 0-based
    const evangelists = ["Matthew", "Mark", "Luke", "John"];
    return evangelists[cycle];
}
// Full year context
function getYearInfo(am) {
    return {
        am,
        isLeap: isLeapYear(am),
        evangelist: getEvangelist(am)
    };
}
// Unified holiday resolver
function getAllHolidays(am) {
    const fixedHolidays = getFixedHolidays(am).map(date => ({
        name: exports.FIXED_HOLIDAYS.find(h => h.month === date.month && h.day === date.day)?.name || "",
        date,
        type: "fixed"
    }));
    const movableFeasts = calculateMovableFeasts(am);
    const movableHolidays = Object.entries(movableFeasts).map(([name, date]) => ({
        name,
        date,
        type: "movable"
    }));
    return [...fixedHolidays, ...movableHolidays];
}
// Public API Surface
exports.EthiopianCalendar = {
    today: getTodayEthiopian,
    fromGregorian: gregorianToEthiopian,
    toGregorian: (eth) => {
        // Reverse conversion (simplified, not implemented)
        throw new Error("toGregorian not implemented in this phase");
    },
    format: formatEthiopianDateLocalized,
    getYearInfo,
    getAllHolidays,
    getMovableFeasts: calculateMovableFeasts,
    isLeapYear
};
// Lunar Calculations: Basic moon phase (simplified, Ethiopian calendar traditionally uses astronomical observations)
// Moon phase names in Amharic
exports.moonPhases = [
    'አዲስ ያልተለመደ', // New Moon
    'እንግዳ', // Waxing Crescent
    'እንግዳ ገጠል', // First Quarter
    'እንግዳ ተሞላ', // Waxing Gibbous
    'ተሞላ ያልተለመደ', // Full Moon
    'እንግዳ እየለመደች', // Waning Gibbous
    'እንግዳ እየለመደች ገጠል', // Last Quarter
    'እንግዳ እየለመደች ተሞላ' // Waning Crescent
];
// Approximate moon phase (29.5 day cycle, starting from new moon at epoch)
function getMoonPhase(am, month, day) {
    const totalDays = totalDaysSinceEpoch(am, month, day);
    const lunarCycle = 29.530588; // Average lunar month in days
    const phaseIndex = Math.floor((totalDays % lunarCycle) / (lunarCycle / 8)) % 8;
    return exports.moonPhases[phaseIndex];
}
// Calendar Cycles: 19-year Metonic cycle for leap years
function isLeapYearMetonic(am) {
    // Traditional Ethiopian leap year: every 4 years, but with 19-year adjustment
    // Simplified: same as before, but could be extended
    return am % 4 === 0;
}
// Sample validation tests for Phase 2
// Bridge epoch test: Gregorian 1970-01-01 should be Ethiopian AM 1962, Tahsas 23
const bridgeTest = gregorianToEthiopian(1970, 1, 1);
if (bridgeTest.am !== 1962 || bridgeTest.month !== 4 || bridgeTest.day !== 23) {
    throw new Error(`Bridge epoch test failed: got ${bridgeTest.am}-${bridgeTest.month}-${bridgeTest.day}`);
}
// Leap year test: Gregorian 2000-02-29 (leap day)
const leapTest = gregorianToEthiopian(2000, 2, 29);
// Should not throw error
// Known date test: Gregorian 2023-01-01 ≈ Ethiopian AM 2015, Tir 23
const knownTest = gregorianToEthiopian(2023, 1, 1);
console.log(`Gregorian 2023-01-01 -> Ethiopian ${knownTest.am}-${knownTest.month}-${knownTest.day}`);
// Today's date test
const todayEth = getTodayEthiopian();
console.log(`Today's Ethiopian date: ${formatEthiopianDate(todayEth)}`);
// Sample validation tests for Phase 3
// Test Wenber, Abekti, Metq for AM 2018 (current year)
const wenber2018 = calculateWenber(2018);
const abekti2018 = calculateAbekti(wenber2018);
const metq2018 = calculateMetq(wenber2018);
console.log(`AM 2018: Wenber=${wenber2018}, Abekti=${abekti2018}, Metq=${metq2018}, Sum=${abekti2018 + metq2018}`);
// Test movable feasts for AM 2018
try {
    const feasts2018 = calculateMovableFeasts(2018);
    console.log('AM 2018 Movable Feasts:');
    for (const [name, date] of Object.entries(feasts2018)) {
        console.log(`  ${name}: ${formatEthiopianDate(date)}`);
    }
}
catch (e) {
    console.error('Error calculating feasts for AM 2018:', e);
}
// Test edge case: Wenber = 18
// Find AM where Wenber=18
let testAm = 2000;
while (calculateWenber(testAm) !== 18 && testAm < 2100)
    testAm++;
console.log(`Wenber=18 at AM ${testAm}`);
// Test cross-month rollover
// For AM where feast day >30
try {
    const feastsTest = calculateMovableFeasts(testAm);
    const erget = feastsTest["ዕርገት"];
    console.log(`Erget at AM ${testAm}: ${formatEthiopianDate(erget)}`);
}
catch (e) {
    console.error('Error in cross-month test:', e);
}
