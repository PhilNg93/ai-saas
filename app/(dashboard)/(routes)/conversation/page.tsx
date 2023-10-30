"use client";
import axios from "axios";
import { ChatCompletionRequestMessage } from "openai";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import {Loader} from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    const form= useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values: z.infer<typeof formSchema>) => { //z.infer<typeof formSchema>: Here, z.infer is a utility provided by the Zod library that extracts the inferred type from a Zod schema. It's like saying "give me the TypeScript type that corresponds to this Zod schema."
    //<typeof formSchema>: This part specifies a TypeScript type, which in this case is the type of the formSchema object. typeof formSchema gets the TypeScript type of the formSchema object.
    //<z.infer<typeof formSchema>>: Wrapping z.infer<typeof formSchema> in angle brackets indicates that you want to use type inference (from Zod) and parameterize it with the type of formSchema. This helps TypeScript understand the expected shape of the values parameter based on the schema.
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            }
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/conversation", {
                messages: newMessages
            });

            setMessages((current) => [...current, userMessage, response.data])

            form.reset();
        } catch (error: any) {
            //TODO: Open Pro Modal
        } finally {
            router.refresh();
        }
    };

    //The code you've provided is a TypeScript function named `onSubmit` that takes a single argument `values`.
    //The type of the `values` argument is inferred using the `z.infer` function applied to the `formSchema` that you defined earlier.
    //This means that the `values` argument should match the shape of the schema defined by `formSchema`.

    //Here's a breakdown of the code:

    //1. `const onSubmit = async(values: z.infer<typeof formSchema>) => {`: This defines an asynchronous function named `onSubmit` that takes an argument named `values`. The type of `values` is inferred using `z.infer<typeof formSchema>`. In this context, it means that `values` should have the same structure as the object schema defined by `formSchema`.

    //2. `console.log(values)`: Inside the `onSubmit` function, you're logging the `values` to the console. This will print out the content of the `values` object, which should correspond to the structure defined by `formSchema`.

    //     The angle brackets < > syntax you see around z.infer<typeof formSchema> is used for type inference and generics in TypeScript. Let's break down why they are used in this context:

    // Type Inference: TypeScript's type inference allows the compiler to automatically determine the types of variables and expressions based on the context. However, in some cases, you might need to explicitly specify a type, especially when the inference isn't able to capture the exact type you want. This is where type annotations come in.

    // Generics: Generics in TypeScript provide a way to create reusable components that can work with different types while maintaining type safety. They allow you to parameterize types and functions to work with various data types.
    return (
        <div>
            <Heading
            title="Conversation"
            description="Our most advanced conversation model"
            icon={MessagesSquare}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10" />
            <div className="px-4 lg: px-8">
                <div>
                    <Form {...form}>
                        <form
                        onSubmit ={form.handleSubmit(onSubmit)}
                        className ="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2
                        ">
                            <FormField
                                name="prompt"
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                            className="border-0 outline-none focus-visible: ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="How do I calculate the radius of a circle?"
                                            {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                    Generate
                                </Button>
                        </form>
                    </Form>
                 </div>
                 <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <div>
                            <Empty label="No Conversation Started" />
                        </div>
                    )}
                    <div className="flex flex-col gap-y-4">
                        {messages.map((message) => (
                            <div
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
                            key={message.content}>
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">
                                {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </div>
);
}

export default ConversationPage;