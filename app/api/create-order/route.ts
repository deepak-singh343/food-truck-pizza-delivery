import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { amount } = body;
    const order = await razorpay.orders.create({
      amount: amount * 100, //Amount in paise
      currency: "INR",
      payment_capture: true,
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });
    return NextResponse.json({ orderId: order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
};
