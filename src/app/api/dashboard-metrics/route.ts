/**
 * API route for scraping dashboard metrics from cryptodashboard.faldt.net
 * 
 * This endpoint scrapes metrics from specific IDs on the dashboard and
 * caches the data for 5 minutes to reduce load on the target site.
 */

import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import PQueue from 'p-queue';

// Define type for scraped data
interface ScrapedData {
  metrics: Record<string, string>;
  scraped_at: string;
}

// Cache and rate limit configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const queue = new PQueue({ concurrency: 1 }); // Ensure only one scrape job runs at a time
let cache: {
  data: ScrapedData;
  timestamp: number;
} | null = null;

// Target URL to scrape
const TARGET_URL = 'https://cryptodashboard.faldt.net';

// IDs of elements to scrape
const METRIC_IDS = [
  'vrsc-in-baskets',
  'total-basket-reserve',
  'total-volume-24h',
  'total-volume-7d',
  'total-volume-30d'
];

/**
 * Scrape the dashboard and extract metrics
 */
async function scrapeDashboard() {
  try {
    // Fetch the HTML content
    const response = await fetch(TARGET_URL, {
      headers: {
        'User-Agent': 'Conference Dashboard Metrics Collector/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract data from each specified ID
    const metrics: Record<string, string> = {};
    
    METRIC_IDS.forEach(id => {
      const element = $(`#${id}`);
      metrics[id] = element.text().trim();
    });

    // Add timestamp for freshness indication
    return {
      metrics,
      scraped_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Scraping error:', error);
    throw error;
  }
}

/**
 * Get metrics with caching
 */
async function getMetricsWithCache() {
  const now = Date.now();
  
  // Check if cache is valid
  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }
  
  // Queue the scrape job to prevent concurrent scraping
  const data = await queue.add(async () => {
    // Double check cache again inside the queue to prevent race conditions
    if (cache && now - cache.timestamp < CACHE_DURATION) {
      return cache.data;
    }
    
    // Scrape fresh data
    const freshData = await scrapeDashboard();
    
    // Update cache
    cache = {
      data: freshData,
      timestamp: now
    };
    
    return freshData;
  });
  
  return data;
}

/**
 * API route handler
 */
export async function GET() {
  try {
    const data = await getMetricsWithCache();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard metrics' },
      { status: 500 }
    );
  }
} 