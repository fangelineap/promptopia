"use client";

import Form from "@components/Form";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        // to prevent auto reload
        e.preventDefault();

        setSubmit(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                }),
            });

            if(response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
            throw new Error("Error submitting prompt");
        } finally {
            setSubmit(false);
        }
    }

    return <Form
        type="Create"
        post={post}
        setPost={setPost}
        submit={submit}
        handleSubmit={createPrompt}
    />;
};

export default CreatePrompt;
