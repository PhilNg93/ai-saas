"use client";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { useState, useEffect } from "react";

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (


        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
     );
}

export default MobileSidebar;


// Now, let's break down how the useState and useEffect hooks are used to prevent hydration errors and ensure that the sidebar renders correctly:

// Initial Server-Side Render:

// When the page loads, the MobileSidebar component is initially rendered on the server side.
// At this point, the isMounted state is set to false because that's the initial value you provided using useState.
// useEffect Execution:

// After the initial server-side render, the useEffect hook runs on the client side. The dependency array [] ensures that the effect runs only once after the initial render.
// Inside the useEffect, you set the isMounted state to true.
// Conditional Rendering:

// Following the useEffect, you have a conditional check: if (!isMounted) { return null; }.
// Since the useEffect has run and changed the value of isMounted to true, the condition is no longer met, and the conditional check passes.
// Client-Side Re-rendering:

// Due to the conditional rendering check passing, the MobileSidebar component re-renders on the client side.
// At this point, the JSX content within the component, including the Sheet, SheetTrigger, and SheetContent components, as well as the Sidebar component, is rendered.
// Sidebar Rendering:

// The rendering of the Sidebar component now takes place after the client-side re-render.
// Since the isMounted state has been set to true by the useEffect, the Sidebar component renders as intended.
// In summary, the combination of the useState and useEffect hooks, along with the conditional rendering, ensures that the MobileSidebar component renders correctly on the client side after the initial server-side render.
//This approach helps avoid hydration errors and ensures that the sidebar renders as expected, providing a smooth and consistent user experience.