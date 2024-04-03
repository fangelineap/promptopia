"use client";

import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
            ))}
        </div>
    );
};

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchResult, setSearchResult] = useState([]);

    const promptFilter = (keyword) => {
        // case insensitive
        const regex = new RegExp(keyword, "i");

        /* check if the pattern exists within
        username, tag, or prompt */
        return posts.filter((p) => regex.test(p.creator.username) || regex.test(p.tag) || regex.test(p.prompt));
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce
        setSearchTimeout(
            setTimeout(() => {
                const searchRes = promptFilter(searchText);
                setSearchResult(searchRes);
            }, 250)
        );
    };

    const handleTagClick = (tag) => {
        setSearchText(tag);
        const result = promptFilter(tag);
        setSearchResult(result);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();

            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            {searchText ? (
                <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
            ) : (
                <PromptCardList data={posts} handleTagClick={handleTagClick} />
            )}
        </section>
    );
};

export default Feed;
