"use strict";
// Ethiopian Calendar Engine - Public API
// Phase 5: SaaS Platform, Monetization, Governance & Trust Layer
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthiopianCalendar = void 0;
__exportStar(require("./ethCal"), exports);
// Re-export main API surface
var ethCal_1 = require("./ethCal");
Object.defineProperty(exports, "EthiopianCalendar", { enumerable: true, get: function () { return ethCal_1.EthiopianCalendar; } });
// Open-source core includes:
// - Date arithmetic (Phase 1)
// - Gregorian bridge (Phase 2)
// - Cycles & feasts (Phase 3)
// - Localization & holidays (Phase 4)
// Premium features (algoraz.com):
// - High-volume API access
// - Historical validation tables
// - Multi-calendar synchronization
// - Official certification endpoints
// - Government-grade SLAs
// Governance: Calendar Advisory Board
// - Ethiopian Orthodox scholars
// - Astronomers, Mathematicians, Software Engineers
// - Transparent methodology and versioned changes
// License: MIT (core math open-source)
// For premium services: https://algoraz.com/ethiopian-calendar
