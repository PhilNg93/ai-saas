"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        name:"Antonio",
        avatar: "A",
        title: "SWE",
        description: "This is the best application I have used"
    },
    {
        name:"Phil",
        avatar: "P",
        title: "Social Media Marketer",
        description: "My work flow increased a lot thanks to it"
    },
    {
        name:"Charlie",
        avatar: "C",
        title: "Fine Food Connoisseur",
        description: "The chat bot helps me with my blogging speed"
    },
    {
        name:"Astrid",
        avatar: "A",
        title: "Admin",
        description: "I can write more professional emails. Thanks Appolo"
    },
    {
        name:"Charlotte",
        avatar: "C",
        title: "Musician",
        description: "I used the music AI to lights up new ideas for future songs."
    },
]
export const LandingContent =() => {
    return(
        <div className="px-10 pb-20">
         <h2 className="text-center text-4xl text-white font-extrabold mb-10">
            Testimonials
         </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((item)=>(
                <Card key={item.description} className="bg-[#192339] border-none text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-x-2">
                            <div>
                                <p className="text-lg">
                                    {item.name}
                                </p>
                                <p className="text-zinc-400 text-sm">
                                    {item.title}
                                </p>
                            </div>
                        </CardTitle>
                        <CardContent className="pt-4 px-0">
                            {item.description}
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
         </div>
        </div>
    )
}