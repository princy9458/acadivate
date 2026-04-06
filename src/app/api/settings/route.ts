import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/src/lib/mongodb';

async function getDb() {
  const client = await clientPromise;
  return client.db('kalp_tenant_acadivate');
}

async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const settings = await db.collection('site_settings').findOne({ id: 'global' });
    
    return NextResponse.json({ 
      success: true, 
      settings: settings || {
        logo: '/assets/logo.png',
        favicon: '/favicon.ico',
        siteName: 'Acadivate'
      }
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const payload = await req.json();
    const { type, ...data } = payload;

    if (type === 'site_branding') {
      const result = await db.collection('site_settings').updateOne(
        { id: 'global' },
        { $set: { ...data, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
      return NextResponse.json({ success: true, message: 'Branding updated successfully' });
    }

    if (type === 'account_profile') {
      const { userName, password, role } = data;
      // Note: In a real app, hash the password. Here we follow existing patterns.
      const result = await db.collection('users').updateOne(
        { userName },
        { $set: { password, role, updatedAt: new Date().toISOString() } }
      );
      return NextResponse.json({ success: true, message: 'Profile updated successfully' });
    }

    return NextResponse.json({ success: false, error: 'Invalid update type' }, { status: 400 });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}

export { GET, POST };
