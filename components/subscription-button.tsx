"use client"
import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios"; //library required to make http request
import toast from "react-hot-toast";

interface SubscriptionButtonProps { //define TypeScript interface for the props
    isPro: boolean
}

export const SubscriptionButton = ({isPro = false}:SubscriptionButtonProps) => { //functional component with isPro default valueof false
    //{isPro = false} is a form of destructuring assignment. the function expects an object as an argument and will extract the isPro property from the object. if the property is not present in the passed object, it will default to false.
    // :SubscriptionButtonProps is a type annotation. This part specifies the type of argument that the function expect and the parameter being destructured should conform to SubButton interface. 
    // TS syntax helps with type checking and provide better tooling support.
    const [loading, setLoading] = useState(false);
    //loading stated is used with the button to that trigger an API request. While the request is being made, the loading state is set to "true" and the button is disabled.
    //prevent user from clicking the button multiple times and provides visual feedback that something is happening in the background.
    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe")
            window.location.href = response.data.url; //modifies the current browser window's location, effectively redirect the user to a new page.
            //The window.location.href is being assigned the value of response.data.url, effectively changing the current page's URL to the one provided by the server.
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button variant = {isPro ? "default" : "premium"} onClick = {onClick} disabled={loading}>
            {isPro ? "Mange Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}

