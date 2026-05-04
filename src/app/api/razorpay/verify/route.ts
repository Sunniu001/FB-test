import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const WC_API = process.env.NEXT_PUBLIC_WC_API_URL || 'https://sunniy.com/wp-json/wc/v3';
const WC_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_SECRET = process.env.WC_CONSUMER_SECRET || '';

function basicAuth() {
  return 'Basic ' + Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
}

export async function POST(req: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      wc_order_id 
    } = await req.json();

    // 1. Verify Signature
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json({ message: 'Invalid payment signature' }, { status: 400 });
    }

    // 2. Update WooCommerce Order
    // We update the order to 'processing' and add the payment ID as a note
    const updateRes = await fetch(`${WC_API}/orders/${wc_order_id}`, {
      method: 'PUT',
      headers: {
        'Authorization': basicAuth(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'processing',
        set_paid: true,
        transaction_id: razorpay_payment_id,
        payment_method: 'razorpay',
        payment_method_title: 'Razorpay',
        customer_note: `Paid via Razorpay. Payment ID: ${razorpay_payment_id}. Order ID: ${razorpay_order_id}`,
      }),
    });

    if (!updateRes.ok) {
      const errorData = await updateRes.json();
      console.error('WC Order Update Error:', errorData);
      return NextResponse.json({ message: 'Payment verified but failed to update WooCommerce order' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Payment verified and order updated' });
  } catch (error: any) {
    console.error('Razorpay Verification Error:', error);
    return NextResponse.json(
      { message: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
