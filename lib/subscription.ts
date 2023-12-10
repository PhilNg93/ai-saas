import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000; //1 day
export const checkSubscription = async () => {
    const { userId } = auth();
    if (!userId) { //no user ID => subscription check fails
        return false;
    }
    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId //check prismadb to find the match userId
        },
        select: {
            stripeSubscriptionId: true, //find if user is subscribed based on subID, end period, customerId and the price they paid
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        }
    });

    if (!userSubscription) { //after checking in prismadb, if user is actively subscribed,  subscription check fails
        return false;
    }

    const isValid =
    //check if subscription is valid and not expired if user already has data in prismadb based on price they paid and the remaining time in subscription + 1 day grace period (end date plus 1, must be later than the current date.)
    userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !! isValid; //ensure return value is always a boolean
    //!isValid: The first ! (logical NOT) operator is used to negate the truthiness of isValid. If isValid is truthy, !isValid becomes false. If isValid is falsy, !isValid becomes true.

    //!!isValid: The second ! operator is again applied to the result of !isValid. This is a common idiom in JavaScript to ensure that the final result is a boolean. The double negation !! essentially coerces any truthy or falsy value to its corresponding boolean value. If isValid is truthy, !!isValid becomes true. If isValid is falsy, !!isValid becomes false.

    //So, the purpose of return !!isValid; is to ensure that the function always returns a boolean value, regardless of the original truthiness or falsiness of isValid. This can be useful in scenarios where you want a consistent boolean result, and the isValid variable might have a truthy or falsy value.
}