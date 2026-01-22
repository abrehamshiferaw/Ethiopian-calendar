export declare const months: string[];
export declare const daysOfWeek: string[];
export declare const ethNumbers: string[];
export interface GregorianDate {
    year: number;
    month: number;
    day: number;
}
export interface EthiopianDate {
    am: number;
    month: number;
    day: number;
}
export interface MovableFeast {
    name: string;
    tewsak: number;
}
export interface EthiopianLocale {
    months: string[];
    weekdays: string[];
    numerals: (value: number) => string;
}
export interface FixedHoliday {
    name: string;
    month: number;
    day: number;
}
export interface EthiopianYearInfo {
    am: number;
    isLeap: boolean;
    evangelist: "Matthew" | "Mark" | "Luke" | "John";
}
export interface EthiopianHoliday {
    name: string;
    date: EthiopianDate;
    type: "fixed" | "movable";
}
export declare function toEthiopicNumeral(n: number): string;
export declare function isLeapYear(am: number): boolean;
export declare function daysInMonth(month: number, am: number): number;
export declare function totalDaysSinceEpoch(am: number, month: number, day: number): number;
export declare function dateFromTotalDays(totalDays: number): {
    am: number;
    month: number;
    day: number;
};
export declare function dayOfWeek(am: number, month: number, day: number): string;
export declare function formatDate(am: number, month: number, day: number): string;
export declare function addDays(am: number, month: number, day: number, daysToAdd: number): {
    am: number;
    month: number;
    day: number;
};
export declare function subtractDays(am: number, month: number, day: number, daysToSubtract: number): {
    am: number;
    month: number;
    day: number;
};
export declare function toAmeteAlem(ameteMihret: number): number;
export declare function fromAmeteAlem(ameteAlem: number): number;
export declare function isLeapYearGregorian(year: number): boolean;
export declare function gregorianToDayCount(year: number, month: number, day: number): number;
export declare function gregorianToEthiopian(year: number, month: number, day: number): EthiopianDate;
export declare function getTodayEthiopian(): EthiopianDate;
export declare function formatEthiopianDate(date: EthiopianDate): string;
export declare function amToAA(am: number): number;
export declare function calculateWenber(am: number): number;
export declare function calculateAbekti(wenber: number): number;
export declare function calculateMetq(wenber: number): number;
export declare const DAY_TEWSAK: Record<number, number>;
export declare function resolveFeastMonth(metq: number): number;
export declare function calculateMewajaHamer(am: number, metq: number): number;
export declare const FEASTS: MovableFeast[];
export declare function calculateMovableFeasts(am: number): Record<string, EthiopianDate>;
export declare const AMHARIC_LOCALE: EthiopianLocale;
export declare function formatEthiopianDateLocalized(date: EthiopianDate, locale?: EthiopianLocale): string;
export declare const FIXED_HOLIDAYS: FixedHoliday[];
export declare function getFixedHolidays(am: number): EthiopianDate[];
export declare function getEvangelist(am: number): EthiopianYearInfo["evangelist"];
export declare function getYearInfo(am: number): EthiopianYearInfo;
export declare function getAllHolidays(am: number): EthiopianHoliday[];
export declare const EthiopianCalendar: {
    today: typeof getTodayEthiopian;
    fromGregorian: typeof gregorianToEthiopian;
    toGregorian: (eth: EthiopianDate) => GregorianDate;
    format: typeof formatEthiopianDateLocalized;
    getYearInfo: typeof getYearInfo;
    getAllHolidays: typeof getAllHolidays;
    getMovableFeasts: typeof calculateMovableFeasts;
    isLeapYear: typeof isLeapYear;
};
export declare const moonPhases: string[];
export declare function getMoonPhase(am: number, month: number, day: number): string;
export declare function isLeapYearMetonic(am: number): boolean;
