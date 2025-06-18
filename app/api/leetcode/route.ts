import { NextRequest, NextResponse } from 'next/server';

const LEETCODE_USERNAME = 'yashs33244';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint parameter required' }, { status: 400 });
  }

  try {
    let query = '';
    
    switch (endpoint) {
      case 'user':
        query = `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                realName
                ranking
                reputation
                userAvatar
                aboutMe
                school
                websites
                countryName
                company
                jobTitle
                skillTags
                postViewCount
                postViewCountDiff
                reputation
                reputationDiff
                solutionCount
                solutionCountDiff
                categoryDiscussCount
                categoryDiscussCountDiff
              }
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
          }
        `;
        break;
      case 'calendar':
        query = `
          query userProfileCalendar($username: String!, $year: Int) {
            matchedUser(username: $username) {
              userCalendar(year: $year) {
                activeYears
                streak
                totalActiveDays
                dccBadges {
                  timestamp
                  badge {
                    name
                    icon
                  }
                }
                submissionCalendar
              }
            }
          }
        `;
        break;
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME, year: new Date().getFullYear() }
      })
    });

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`LeetCode GraphQL error: ${data.errors[0]?.message || 'Unknown error'}`);
    }

    return NextResponse.json(data.data);

  } catch (error) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 