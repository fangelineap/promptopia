"use client";

import Form from "@components/Form";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

const EditPrompt = () => {
    const router = useRouter();
    const search = useSearchParams();
    const promptId = search.get('id');

    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }

        if(promptId) getDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        // to prevent auto reload
        e.preventDefault();

        setSubmit(true);

        if(!promptId) return alert("Prompt ID not found :(");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
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
        type="Edit"
        post={post}
        setPost={setPost}
        submit={submit}
        handleSubmit={updatePrompt}
    />;
};

export default EditPrompt;
