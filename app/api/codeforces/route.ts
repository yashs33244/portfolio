import { NextRequest, NextResponse } from 'next/server';

const CODEFORCES_USERNAME = 'yashs33244';

// Simple in-memory cache to reduce API calls
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function setCachedData(key: string, data: any, ttlMinutes: number = 30) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: ttlMinutes * 60 * 1000
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint parameter required' }, { status: 400 });
  }

  // Check cache first
  const cacheKey = `codeforces-${endpoint}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { 'X-Cache-Status': 'cached' }
    });
  }

  try {
    let url = '';
    let cacheTTL = 30; // Default cache time in minutes
    
    switch (endpoint) {
      case 'user':
        url = `https://codeforces.com/api/user.info?handles=${CODEFORCES_USERNAME}`;
        cacheTTL = 60; // Cache user data for 1 hour
        break;
      case 'submissions':
        url = `https://codeforces.com/api/user.status?handle=${CODEFORCES_USERNAME}&from=1&count=1000`;
        cacheTTL = 15; // Cache submissions for 15 minutes
        break;
      case 'rating':
        url = `https://codeforces.com/api/user.rating?handle=${CODEFORCES_USERNAME}`;
        cacheTTL = 60; // Cache rating history for 1 hour
        break;
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Portfolio-App'
      }
    });

    if (!response.ok) {
      console.warn(`Codeforces API HTTP error: ${response.status} ${response.statusText}`);
      
      // Try to return cached data even if expired
      const expiredCache = cache.get(cacheKey);
      if (expiredCache) {
        console.log('Returning expired cache due to HTTP error');
        return NextResponse.json(expiredCache.data, {
          headers: { 'X-Cache-Status': 'expired-fallback' }
        });
      }
      
      // Return appropriate fallback data
      return NextResponse.json(
        getFallbackData(endpoint),
        { 
          status: 200,
          headers: { 'X-Cache-Status': 'fallback-http-error' }
        }
      );
    }

    const data = await response.json();
    
    // Handle Codeforces API specific errors
    if (data.status !== 'OK') {
      console.warn(`Codeforces API error: ${data.comment || 'Unknown error'}`);
      
      // Handle user not found gracefully
      if (data.comment && (data.comment.includes('not found') || data.comment.includes('handle not found'))) {
        const fallbackData = getFallbackData(endpoint);
        setCachedData(cacheKey, fallbackData, cacheTTL);
        return NextResponse.json(fallbackData, {
          headers: { 'X-Cache-Status': 'user-not-found' }
        });
      }
      
      // Try to return cached data for other API errors
      const expiredCache = cache.get(cacheKey);
      if (expiredCache) {
        console.log('Returning expired cache due to API error');
        return NextResponse.json(expiredCache.data, {
          headers: { 'X-Cache-Status': 'expired-fallback' }
        });
      }
      
      // Return fallback data
      return NextResponse.json(
        getFallbackData(endpoint),
        { 
          status: 200,
          headers: { 'X-Cache-Status': 'fallback-api-error' }
        }
      );
    }

    // Cache successful response
    setCachedData(cacheKey, data.result, cacheTTL);
    
    return NextResponse.json(data.result, {
      headers: {
        'X-Cache-Status': 'fresh',
        'Cache-Control': `public, max-age=${cacheTTL * 60}, stale-while-revalidate=${cacheTTL * 120}`
      }
    });

  } catch (error) {
    console.error('Codeforces API Error:', error);
    
    // Try to return cached data even if expired
    const expiredCache = cache.get(cacheKey);
    if (expiredCache) {
      console.log('Returning expired cache due to network error');
      return NextResponse.json(expiredCache.data, {
        headers: { 'X-Cache-Status': 'expired-fallback' }
      });
    }
    
    // Return fallback data
    return NextResponse.json(
      getFallbackData(endpoint),
      { 
        status: 200,
        headers: { 'X-Cache-Status': 'fallback-network-error' }
      }
    );
  }
}

function getFallbackData(endpoint: string) {
  switch (endpoint) {
    case 'user':
      return [{
        handle: CODEFORCES_USERNAME,
        firstName: 'User',
        lastName: '',
        country: '',
        city: '',
        organization: '',
        contribution: 0,
        rank: 'unrated',
        maxRank: 'unrated',
        rating: 0,
        maxRating: 0,
        lastOnlineTimeSeconds: Date.now() / 1000,
        registrationTimeSeconds: Date.now() / 1000,
        friendOfCount: 0,
        avatar: `https://userpic.codeforces.org/no-avatar.jpg`,
        titlePhoto: ''
      }];
    case 'submissions':
      return [];
    case 'rating':
      return [];
    default:
      return [];
  }
} 