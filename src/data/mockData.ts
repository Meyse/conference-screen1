/**
 * mockData.ts
 * 
 * This file contains mock data for the conference dashboard screens.
 * Includes TVL, volume metrics, multi-timeframe volume, bridged assets,
 * chains in ecosystem screens, and promotional event screens.
 */

export interface MetricScreen {
  id: string;
  title: string;
  value: string;
  subtitle?: string;
  displayTime: number; // time in seconds to display this screen
}

// Define screens for dashboard rotation in the specified order
export const screens: MetricScreen[] = [
  // Screen 1: TVL
  {
    id: 'tvl',
    title: 'TVL',
    value: 'tvl-metric',
    subtitle: 'Total Value of Liquidity',
    displayTime: 15, // 15 seconds
  },
  // Screen 2: All-time on-chain DeFi volume
  {
    id: 'all-time-volume',
    title: 'All-time on-chain DeFi volume',
    value: 'all-time-volume',
    subtitle: 'MEV-free',
    displayTime: 15,
  },
  // Screen 3: Bridged Assets
  {
    id: 'bridged-assets',
    title: 'Assets Bridged to Network',
    value: 'bridged-assets',
    displayTime: 15,
  },
  // Screen 4: Volume Metrics (Trading Volume)
  {
    id: 'volume-metrics',
    title: 'DeFi Volume',
    value: 'volume-metrics',
    displayTime: 15,
  },
  // Screen 5: Chains in ecosystem
  {
    id: 'chains-ecosystem',
    title: 'Chains & Currencies',
    value: 'chains-ecosystem',
    displayTime: 15,
  },
  // Screen 6: Promotional Event
  {
    id: 'promo-event',
    title: 'SPECIAL EVENT',
    value: 'promo-event',
    displayTime: 20, // Give a little more time (20 seconds) for this screen
  },
];

// All-time on-chain DeFi volume metrics
export const allTimeVolumeMetrics = {
  title: "All-time on-chain DeFi volume",
  value: "$500M+",
  subtitle: "MEV-free"
};

// Volume metrics across different time periods
export const volumeMetrics = {
  title: "DeFi Volume",
  volume24h: "$12.5M",
  volume7d: "$76.3M",
  volume30d: "$328.4M"
};

// Chains in ecosystem metrics
export const chainsMetrics = {
  title: "Chains & currencies",
  count: "4",
  additionalText: "60+ currencies, liquidity pools & tokens"
};

// Promotional event screen data
export const promoScreenData = {
  title: "SPECIAL EVENT",
  day: "Wednesday",
  time: "15:00h",
  description: "Come to our booth and spin the wheel to win limited edition Verus goodies!"
}; 