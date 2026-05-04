import { NextRequest, NextResponse } from 'next/server';
import { wcFetch } from '@/lib/api/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'products';

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    if (type === 'products') {
      // Use wcFetch (v3 API) for better search results on the server side
      const data = await wcFetch(`products?search=${encodeURIComponent(query)}&per_page=30&status=publish`);
      
      // Strict Title Filter: Ensure the search term is actually in the product name
      // This prevents unrelated products (where the term might be in the description) from appearing
      const filtered = Array.isArray(data) 
        ? data.filter((p: any) => p.name.toLowerCase().includes(query.toLowerCase()))
        : [];

      return NextResponse.json(filtered.slice(0, 15));
    } else {
      // Articles search (WP Posts)
      const storeUrl = process.env.NEXT_PUBLIC_WC_STORE_URL;
      const res = await fetch(`${storeUrl}/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&per_page=10&_embed`);
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('API Search Error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
