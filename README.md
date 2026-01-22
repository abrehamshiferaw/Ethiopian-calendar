# Ethiopian Calendar Engine

[![npm version](https://badge.fury.io/js/ethiopian-calendar-engine.svg)](https://badge.fury.io/js/ethiopian-calendar-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Complete Ethiopian calendar engine with ecclesiastical feast calculations, localization, and Gregorian bridge.

## ✨ Features

- **Phase 1**: Pure Ethiopian date arithmetic and conversions
- **Phase 2**: Gregorian ↔ Ethiopian bridge layer
- **Phase 3**: Ecclesiastical cycles (Wenber, Abekti, Metq) and movable feasts
- **Phase 4**: Localization, fixed holidays, chronology, and public API
- **Phase 5**: SaaS platform, monetization, governance & trust layer

## 📦 Installation

```bash
npm install ethiopian-calendar-engine
```

## 🚀 Quick Start

```typescript
import { EthiopianCalendar } from 'ethiopian-calendar-engine';

// Get today's Ethiopian date
const today = EthiopianCalendar.today();
console.log(EthiopianCalendar.format(today));
// Output: ፲፬ ጥር 2018

// Convert Gregorian to Ethiopian
const ethDate = EthiopianCalendar.fromGregorian(2023, 1, 1);
console.log(EthiopianCalendar.format(ethDate));
// Output: ፳፫ ታኅሣሥ 2015

// Get all holidays for a year
const holidays = EthiopianCalendar.getAllHolidays(2018);
console.log(`Total holidays in 2018: ${holidays.length}`);

// Calculate movable feasts
const feasts = EthiopianCalendar.getMovableFeasts(2018);
console.log(feasts);
// Output: { ነነዌ: {...}, ዐቢይ ጾም: {...}, ... }
```

## 📚 API Reference

### Core Functions

- `EthiopianCalendar.today()`: Get current Ethiopian date (UTC)
- `EthiopianCalendar.fromGregorian(year, month, day)`: Convert Gregorian to Ethiopian
- `EthiopianCalendar.format(date)`: Format date with Amharic localization
- `EthiopianCalendar.getYearInfo(am)`: Get year metadata (leap, evangelist)
- `EthiopianCalendar.getAllHolidays(am)`: Get all holidays for year
- `EthiopianCalendar.getMovableFeasts(am)`: Calculate ecclesiastical feasts
- `EthiopianCalendar.isLeapYear(am)`: Check if leap year

### Localization

Default Amharic locale with Ethiopic numerals. Extensible for other languages.

### Ecclesiastical Features

- Wenber calculation (19-year Metonic cycle)
- Abekti/Metq lunar phase approximation
- Movable feasts: Nenewe, Abiy Tsom, Hosanna, Tinseae (Easter), Erget
- Evangelist cycle (28-year rotation)

## 🏛️ Governance & Trust

### Calendar Advisory Board

- **Ethiopian Orthodox Church** scholars
- **Astronomers** and **mathematicians**
- **Software engineers** specializing in calendrical calculations

### Transparency

- All core mathematics are **open-source** and auditable
- Versioned releases with immutable calendar rules
- Comprehensive documentation of ecclesiastical rules

### Verification

```typescript
// Get calculation proof for transparency
const proof = {
  wenber: calculateWenber(2018),    // 12
  abekti: calculateAbekti(12),      // 12
  metq: calculateMetq(12),          // 18
  sum: 12 + 18                      // 30 (always)
};
```

## 💎 Premium SaaS (algoraz.com)

For high-volume applications, government systems, and institutional use:

- **High-volume API access** (REST endpoints)
- **Historical validation tables** (canonical Easter dates)
- **Multi-calendar synchronization**
- **Official certification endpoints**
- **Government-grade SLAs**

### API Endpoints

```
GET /api/v1/today
GET /api/v1/convert/gregorian?year=2023&month=1&day=1
GET /api/v1/holidays/2018
GET /api/v1/verify/2018-05-14
```

### Pricing Tiers

| Tier       | Requests/Day | SLA | Support |
|------------|-------------|-----|---------|
| Free       | 1,000      | -   | Community |
| Pro        | 100,000    | 99.9% | Email |
| Enterprise | Unlimited  | 99.99% | Phone + On-site |

## 📜 License

**MIT License** - Core mathematics are open-source.

For commercial licensing of premium features, contact [ethcal@algoraz.com](mailto:ethcal@algoraz.com).

## 🎓 Academic & Institutional Use

### References

- Ethiopian Orthodox Church liturgical calendar
- 19-year Metonic cycle mathematics
- Astronomical approximations for lunar phases

### Citation

```
Algoraz. (2024). Ethiopian Calendar Engine [Computer software].
https://github.com/algoraz/ethiopian-calendar-engine
```

## 🌍 Cultural Impact

This engine serves as a **digital public good** for:

- **Government calendars** in Ethiopia
- **Church administration** worldwide
- **Educational institutions** teaching Ethiopian history
- **Cultural preservation** of traditional timekeeping

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Submit pull request
4. Join the Calendar Advisory Board for rule changes

### Development

```bash
git clone https://github.com/algoraz/ethiopian-calendar-engine
cd ethiopian-calendar-engine
npm install
npm run demo  # Run demonstration
```

## 📞 Contact

- **Website**: [algoraz.com/ethiopian-calendar](https://algoraz.com/ethiopian-calendar)
- **Email**: [ethcal@algoraz.com](mailto:ethcal@algoraz.com)
- **GitHub**: [github.com/algoraz/ethiopian-calendar-engine](https://github.com/algoraz/ethiopian-calendar-engine)

---

**Built with ❤️ for the Ethiopian diaspora and global scholarly community.**
