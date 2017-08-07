import fetch from 'isomorphic-fetch';
import { ajax } from 'rxjs/observable/dom/ajax';

export const fetchTimelineFeeds = () => fetch('/api/feeds', {
  method: 'GET',
  credentials: 'include'
})

export const fetchFeedById = id => fetch(`/feeds/${id}`, {
  method: 'GET',
  credentials: 'include'
})

export const fetchFeedCommentsById = id => fetch(`/api/feeds/${id}/comments`, {
  method: 'GET'
})

export const addCommentToFeed = id => fetch(`/api/feeds/${id}/comments`, {
  method: 'POST',
  credentials: 'include'
})

export const addNewFeed = (body) => {
  return ajax({
    url: '/api/feeds',
    method: 'POST',
    credentials: 'include',
    body
  })
}
