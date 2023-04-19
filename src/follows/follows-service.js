import axios from "axios";

const FOLLOWS_API = 'http://localhost:4000/api/follows';

const api = axios.create({withCredentials: true});

export const followUser = async (followedUserID) => {
    const response = await api.post(`${FOLLOWS_API}/${followedUserID}`);
    return response.data;
}

export const unfollowUser = async (unfollowedUserID) => {
    const response = await api.delete(`${FOLLOWS_API}/${unfollowedUserID}`);
    return response.data;
}

export const findFollower = async (userID) => {
    const response = await api.post(`${FOLLOWS_API}/follower/${userID}`);
    return response.data;
}

export const findFollowed = async (userID) => {
    const response = await api.post(`${FOLLOWS_API}/followed/${userID}`);
    return response.data;
}

