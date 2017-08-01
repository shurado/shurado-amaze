import fetch from 'isomorphic-fetch';

export const fetchTimelineFeeds = () => {
  return fetch('/api/feeds', {
      method: 'GET',
      credentials: 'include'
    });
}

export const fetchFeedById = (id) => {
  return fetch(`/feeds/${id}`, {
    method: 'GET',
    credentials: 'include'
  });
}

export const fetchFeedCommentsById = (id) => {
  return fetch(`/feeds/${id}/comments`, {
    method: 'GET'
  });
}

export const addCommentToFeed = (id) => {
  return fetch(`/feeds/${id}/comments`, {
    method: 'POST',
    credentials: 'include'
  })
}
