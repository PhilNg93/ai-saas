"use client";
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { VideoIcon } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const VideoPage = () => {
    const router = useRouter();
    const proModal = useProModal();
    const [video, setVideo] = useState<string>();
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
            setVideo(undefined);
            const response = await axios.post("/api/video", values)
            setVideo(response.data[0]);
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) { //add ? (optional chaining) to ensure the error caught is 403 to open proModal
                proModal.onOpen();
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            router.refresh();
        }
    };
    return (
        <div>
            <Heading
            title="Video Generation"
            description="Turn your prompt into video"
            icon={VideoIcon}
            iconColor="text-orange-700"
            bgColor="bg-orange-700/10" />
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
                                            placeholder="Clown fish swimming around a coral reef"
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
                    {!video && !isLoading && (
                        <div>
                            <Empty label="No Video Generated" />
                        </div>
                    )}
                {video && (
                    <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
                        <source src={video} />
                    </video>
                )}
                 </div>
            </div>
        </div>
);
}

export default VideoPage;