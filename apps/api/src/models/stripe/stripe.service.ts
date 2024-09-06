import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'
import { CreateStripeDto } from './dto/create-stripe-session.dto'

@Injectable()
export default class StripeService {
  public stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })
  }

  async createStripeSession({ totalPrice, uid, bookingData }: CreateStripeDto) {
    // Ensure totalPrice is greater than 0
    if (totalPrice <= 0) {
      throw new Error('Invalid total price')
    }

    // Create a Stripe Checkout session with a single line item
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            product_data: {
              name: 'Booking Payment', // You can customize this name as needed
            },
            currency: 'usd',
            unit_amount: totalPrice * 100, // Stripe expects the amount in cents
          },
        },
      ],
      mode: 'payment',
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      metadata: {
        uid,
        bookingData: JSON.stringify(bookingData),
      },
    })

    return { sessionId: session.id }
  }
}
