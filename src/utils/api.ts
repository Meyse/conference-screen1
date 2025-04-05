/**
 * api.ts
 * 
 * Utility functions for fetching data from our API endpoints.
 */

/**
 * Interface for the dashboard metrics API response
 */
export interface DashboardMetricsResponse {
  metrics: {
    'vrsc-in-baskets': string;
    'total-basket-reserve': string;
    'total-volume-24h': string;
    'total-volume-7d': string;
    'total-volume-30d': string;
    [key: string]: string;
  };
  scraped_at: string;
}

/**
 * Fetch dashboard metrics from our API
 */
export async function fetchDashboardMetrics(): Promise<DashboardMetricsResponse> {
  try {
    // Use relative URL to ensure it works in both development and production
    const response = await fetch('/api/dashboard-metrics');
    
    if (!response.ok) {
      throw new Error(`API returned error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    // Return empty data structure when an error occurs
    return {
      metrics: {
        'vrsc-in-baskets': 'N/A',
        'total-basket-reserve': 'N/A',
        'total-volume-24h': 'N/A',
        'total-volume-7d': 'N/A',
        'total-volume-30d': 'N/A'
      },
      scraped_at: new Date().toISOString()
    };
  }
} 