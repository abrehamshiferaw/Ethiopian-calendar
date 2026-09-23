# Ethiopian Calendar Engine

An open-source **Ethiopian calendar engine** for Ethiopian–Gregorian date conversion, Amharic localization, Ethiopic numerals, Ethiopian holidays, ecclesiastical calculations, and JavaScript/TypeScript applications.

[![npm version](https://badge.fury.io/js/ethiopian-calendar-engine.svg)](https://www.npmjs.com/package/ethiopian-calendar-engine) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<p><a href="https://github.com/sponsors/abrehamshiferaw">💖 Sponsor Ethiopian Calendar</a></p>

## Why support this project?

Sponsorship helps fund accurate calendar rules, test coverage, documentation, localization, release maintenance, and accessible Ethiopian cultural technology for developers, educators, institutions, and the Ethiopian diaspora.

## Features

- Ethiopian date arithmetic and Gregorian ↔ Ethiopian conversion
- Amharic localization and Ethiopic numeral formatting
- Fixed holidays and movable ecclesiastical feasts
- Ethiopian year metadata and leap-year calculations
- TypeScript API for web, mobile, backend, and calendar integrations
- Auditable, versioned open-source calendar mathematics

## Installation

```bash
npm install ethiopian-calendar-engine
```

## Quick start

```typescript
import { EthiopianCalendar } from 'ethiopian-calendar-engine';

const today = EthiopianCalendar.today();
console.log(EthiopianCalendar.format(today));

const date = EthiopianCalendar.fromGregorian(2023, 1, 1);
console.log(EthiopianCalendar.format(date));

const holidays = EthiopianCalendar.getAllHolidays(2018);
const feasts = EthiopianCalendar.getMovableFeasts(2018);
```

## API

- `today()` — current Ethiopian date (UTC)
- `fromGregorian(year, month, day)` — convert a Gregorian date
- `format(date)` — format with localization
- `getYearInfo(year)` — return Ethiopian year metadata
- `getAllHolidays(year)` — return holidays for a year
- `getMovableFeasts(year)` — calculate movable feasts
- `isLeapYear(year)` — check leap-year status

## Contributing and sponsorship

Contributions from calendar researchers, Ethiopian language specialists, developers, educators, and institutions are welcome. Please open an issue or pull request, and [sponsor the Ethiopian Calendar project](https://github.com/sponsors/abrehamshiferaw) to support long-term maintenance.

## License

MIT License. The core calendar mathematics are open source.
