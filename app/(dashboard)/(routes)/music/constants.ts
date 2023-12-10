import * as z from "zod";

export const formSchema = z.object({
    prompt: z.string().min(1,{
        message: "Prompt is required",
    }),
})

// import * as z from "zod";: This imports the entire Zod library and binds it to the variable z.

// export const formSchema = z.object({ ... });: This defines a constant named formSchema which represents a Zod schema for validating an object. The object is expected to have a property called prompt with a string value.

// z.string().min(1, { message: "Prompt is required" }): This is a Zod string schema with a validation constraint. It specifies that the prompt property should be a string with a minimum length of 1 character. If the validation fails, a custom error message "Prompt is required" will be associated with the validation error.

// So, essentially, the formSchema constant represents a Zod schema that can be used to validate an object with a prompt property that should be a non-empty string.
//If the validation fails, it will produce an error message indicating that the prompt is required.