import { NextRequest, NextResponse } from 'next/server';

const GITHUB_USERNAME = 'yashs33244';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional: add to .env for higher rate limits

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

function setCachedData(key: string, data: any, ttlMinutes: number = 15) {
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
  const cacheKey = `github-${endpoint}-${searchParams.get('repo') || ''}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    let url = '';
    let cacheTTL = 15; // Default cache time in minutes
    
    switch (endpoint) {
      case 'user':
        url = `https://api.github.com/users/${GITHUB_USERNAME}`;
        cacheTTL = 60; // Cache user data for 1 hour
        break;
      case 'repos':
        url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
        cacheTTL = 30; // Cache repos for 30 minutes
        break;
      case 'languages':
        const repoName = searchParams.get('repo');
        if (!repoName) {
          return NextResponse.json({ error: 'Repo parameter required for languages' }, { status: 400 });
        }
        url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`;
        cacheTTL = 120; // Cache language data for 2 hours
        break;
      case 'events':
        url = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=50`;
        cacheTTL = 10; // Cache events for 10 minutes
        break;
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      // Handle rate limiting gracefully
      if (response.status === 403) {
        const rateLimitReset = response.headers.get('x-ratelimit-reset');
        const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : new Date(Date.now() + 3600000);
        
        console.warn(`GitHub API rate limit exceeded. Resets at: ${resetTime}`);
        
        // Return cached data if available, even if expired
        const expiredCache = cache.get(cacheKey);
        if (expiredCache) {
          console.log('Returning expired cache due to rate limit');
          return NextResponse.json(expiredCache.data);
        }
        
        // Return appropriate fallback data
        return NextResponse.json(
          getFallbackData(endpoint), 
          { 
            status: 200,
            headers: {
              'X-Cache-Status': 'fallback-rate-limited',
              'X-Rate-Limit-Reset': resetTime.toISOString()
            }
          }
        );
      }
      
      if (response.status === 404) {
        // Handle not found gracefully
        return NextResponse.json(getFallbackData(endpoint));
      }
      
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache the successful response
    setCachedData(cacheKey, data, cacheTTL);
    
    return NextResponse.json(data, {
      headers: {
        'X-Cache-Status': 'fresh',
        'Cache-Control': `public, max-age=${cacheTTL * 60}, stale-while-revalidate=${cacheTTL * 120}`
      }
    });

  } catch (error) {
    console.error('GitHub API Error:', error);
    
    // Try to return cached data even if expired
    const expiredCache = cache.get(cacheKey);
    if (expiredCache) {
      console.log('Returning expired cache due to error');
      return NextResponse.json(expiredCache.data, {
        headers: { 'X-Cache-Status': 'expired-fallback' }
      });
    }
    
    // Return fallback data if no cache available
    return NextResponse.json(
      getFallbackData(endpoint),
      { 
        status: 200,
        headers: { 'X-Cache-Status': 'fallback-error' }
      }
    );
  }
}

function getFallbackData(endpoint: string) {
  switch (endpoint) {
    case 'user':
      return {
        login: GITHUB_USERNAME,
        name: 'User',
        public_repos: 0,
        followers: 0,
        following: 0,
        created_at: new Date().toISOString(),
        avatar_url: `https://github.com/${GITHUB_USERNAME}.png`,
        bio: null,
        location: null,
        company: null
      };
    case 'repos':
      return [];
    case 'languages':
      return {};
    case 'events':
      return [];
    default:
      return {};
  }
} 