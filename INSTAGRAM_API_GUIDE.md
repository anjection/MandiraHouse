# Instagram API Integration Guide for Mandira

This guide explains how to replace the Elfsight widget with a custom integration using the **Instagram Basic Display API**. This gives you full control over the design and removes monthly subscription fees for widgets, but requires some technical setup.

## Overview
1.  **Meta Developer App**: required to get access to Instagram data.
2.  **Access Token**: A secure key that allows your website to fetch your photos.
3.  **Next.js API Route**: A server-side endpoint to securely fetch data and handle caching.
4.  **Frontend Component**: Displays the photos in your custom grid.

---

## Step 1: Set up Meta Developer App
1.  Go to [developers.facebook.com](https://developers.facebook.com/) and log in with your Facebook account.
2.  **Top Right Menu**:
    *   If you see **My Apps**, click it.
    *   If you see **Get Started**, click it to register as a Meta Developer first. Then click **Create App**.
3.  Select **Other** and click **Next**.
4.  Select **Consumer** and click **Next**.
5.  Enter an **App Display Name** and click **Create App**.
6.  In the left sidebar, click **Add Product**, find **Instagram Basic Display**, and click **Set Up**.
7.  Scroll to the bottom of the page and click **Create New App**.
8.  Add your Instagram account (`mandira.ig`) as a Tester.
9.  Log into your Instagram account (web) -> Settings -> Apps and Websites -> Tester Invites -> Accept.

## Step 2: Generate Access Token
1.  Go back to the Developer Dashboard > Instagram Basic Display > Basic Display.
2.  In the **User Token Generator** section, click **Generate Token** next to your account.
3.  Copy the **Long-Lived Access Token**.
    *   *Note: This token is valid for 60 days. You need to automate refreshing it (covered in Step 3).*

## Step 3: Create Environment Variables
Create or update your `.env.local` file in the project root:

```env
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token_here
```

## Step 4: Create the API Route
Create a new file at `app/api/instagram/route.ts`. This secure backend route will fetch photos from Instagram so your token is never exposed to the public.

```typescript
import { NextResponse } from 'next/server';

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';

export async function GET() {
  if (!INSTAGRAM_TOKEN) {
    return NextResponse.json({ error: 'Missing Access Token' }, { status: 500 });
  }

  try {
    // 1. Fetch recent media
    const url = `https://graph.instagram.com/me/media?fields=${FIELDS}&access_token=${INSTAGRAM_TOKEN}&limit=6`;
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Instagram');
    }

    const data = await response.json();

    // 2. (Optional) Refresh Token if needed
    // You can implement a separate cron job or logic here to hit the refresh endpoint
    // https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token...

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
```

## Step 5: Create the Frontend Component
Replace the widget section in `app/page.tsx` with a component that fetches from your new API.

```typescript
// app/components/InstagramFeed.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/instagram');
        const data = await res.json();
        if (data.data) setPosts(data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center p-12">Loading feed...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {posts.map((post: any, i) => (
        <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer"
        >
          <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <img
              src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
              alt={post.caption || 'Instagram Post'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay effects... */}
          </a>
        </motion.div>
      ))}
    </div>
  );
}
```

## Comparison: Widget vs API

| Feature | Elfsight Widget | Custom API Integration |
| :--- | :--- | :--- |
| **Setup Difficulty** | Very Easy (No code) | High (Requires Developer App, Token) |
| **Maintenance** | None | Token must be refreshed every 60 days |
| **Customization** | Limited by widget plan | Unlimited (It's your code) |
| **Cost** | Monthly Fee (for premium features) | Free |
| **Performance** | Loads external script | Faster (Native Next.js Image) |
