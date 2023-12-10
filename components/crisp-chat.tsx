"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("e3843a1f-157a-41e8-ae0a-505432252f16")
    }, []);
     return null;
}