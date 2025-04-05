/**
 * mockData.ts
 * 
 * This file contains mock data for the conference dashboard screens.
 * Includes TVL, volume metrics, multi-timeframe volume, bridged assets,
 * chains in ecosystem screens.
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
    subtitle: 'Total Value Locked',
    displayTime: 15, // 15 seconds
  },
  // Screen 2: All-time on-chain DeFi volume
  {
    id: 'all-time-volume',
    title: 'All-time on-chain DeFi volume',
    value: 'all-time-volume',
    subtitle: 'Processed through the protocol',
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
    title: 'Trading Volume',
    value: 'volume-metrics',
    displayTime: 15,
  },
  // Screen 5: Chains in ecosystem
  {
    id: 'chains-ecosystem',
    title: 'Chains in the ecosystem',
    value: 'chains-ecosystem',
    displayTime: 15,
  },
];

// All-time on-chain DeFi volume metrics
export const allTimeVolumeMetrics = {
  title: "All-time on-chain DeFi volume",
  value: "$500M+",
  subtitle: "Processed through the protocol"
};

// Volume metrics across different time periods
export const volumeMetrics = {
  title: "Trading Volume",
  volume24h: "$12.5M",
  volume7d: "$76.3M",
  volume30d: "$328.4M"
};

// Bridged assets metrics
export const bridgedAssets = {
  title: "Assets Bridged to Network",
  btcAmount: "176",
  ethAmount: "3,791"
};

// Chains in ecosystem metrics
export const chainsMetrics = {
  title: "Chains in the ecosystem",
  count: "4"
}; 