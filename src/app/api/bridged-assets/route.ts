/**
 * API route for fetching bridged assets data
 * 
 * This endpoint fetches data from the Verus services API and formats
 * it to provide BTC and ETH balances for the dashboard.
 */

import { NextResponse } from 'next/server';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cache: {
  data: {
    btc: string;
    eth: string;
    updated_at: string;
  };
  timestamp: number;
} | null = null;

// Target API URL
const API_URL = 'https://marketapi.verus.services/gettvl';

// BTC address to look for in the response
const BTC_ADDRESS = '0x18084fbA666a33d37592fA2633fD49a74DD93a88';

/**
 * Fetch and extract bridged assets data
 */
async function fetchBridgedAssets() {
  try {
    // Fetch data from the API
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes on server side
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const responseData = await response.json();
    
    // Access the correct nested data structure
    const data = responseData.data?.result;
    
    if (!data) {
      console.error('Unexpected API response format:', responseData);
      throw new Error('API response missing expected data structure');
    }
    
    // Extract the BTC balance
    let btcBalance = "0";
    if (data[BTC_ADDRESS] && data[BTC_ADDRESS].balance) {
      btcBalance = parseFloat(data[BTC_ADDRESS].balance).toFixed(0); // Round to whole number
    }
    
    // Extract the ETH balance
    let ethBalance = "0";
    if (data.ETH_Balance) {
      ethBalance = parseFloat(data.ETH_Balance).toFixed(0); // Round to whole number
    }

    console.log('Extracted balances:', { btcBalance, ethBalance });

    return {
      btc: btcBalance,
      eth: ethBalance,
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching bridged assets:', error);
    throw error;
  }
}

/**
 * Get data with caching
 */
async function getDataWithCache() {
  const now = Date.now();
  
  // Return cached data if valid
  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }
  
  // Fetch fresh data
  const data = await fetchBridgedAssets();
  
  // Update cache
  cache = {
    data,
    timestamp: now
  };
  
  return data;
}

/**
 * API route handler
 */
export async function GET() {
  try {
    const data = await getDataWithCache();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bridged assets data' },
      { status: 500 }
    );
  }
} 