import fetch from 'isomorphic-fetch';

export const fetchTimelineFeeds = () => fetch('/api/feeds', {
  method: 'GET',
  credentials: 'include'
})

export const fetchFeedById = id => fetch(`/feeds/${id}`, {
  method: 'GET',
  credentials: 'include'
})

export const fetchFeedCommentsById = id => fetch(`/feeds/${id}/comments`, {
  method: 'GET'
})

export const addCommentToFeed = id => fetch(`/feeds/${id}/comments`, {
  method: 'POST',
  credentials: 'include'
})
