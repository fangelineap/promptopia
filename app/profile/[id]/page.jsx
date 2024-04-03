"use client"

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserProfile = ({ params }) => {
    const search = useSearchParams();
    const uname = search.get('name');

    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();

            setUserPosts(data);
        }

        if(params?.id) fetchPosts();
    }, [params?.id]);

  return (
    <Profile
    name={`${uname}'s`}
    desc={`Welcome to ${uname}'s profile page.  Enjoy your stay here by exploring their prompts!`}
    data={userPosts}
    />
  )
}

export default UserProfile