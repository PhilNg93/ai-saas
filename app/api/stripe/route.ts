import {auth, currentUser} from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();
        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        })
        //update or cancel the subscription
        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            })

            return new NextResponse(JSON.stringify({ url:stripeSession.url}));
        }
        //subscribed for the first time
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types:["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [{
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "Apolo Pro",
                        description: "Unlimited AI Generations",
                    },
                    unit_amount: 2000,
                    recurring: {
                        interval: "month"
                    }
                },
                quantity: 1,
            }],
            metadata: { userId } //very important!!! as the code above only open the checkout page.
                                //After user successfully purchase it, we create a webhook to catch that info and read the metadata and read the userId to make sure the purchase belong to the correct user.
        })
        return new NextResponse(JSON.stringify({ url: stripeSession.url}));
    } catch (error) {
        console.log("[STRIPE_ERROR", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}