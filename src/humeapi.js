import axios from 'axios';

const humeAPIEndpoint = 'https://api.hume.ai/v1/voice';

export const fetchProductSuggestions = async (userQuery) => {
  try {
    const response = await axios.post(humeAPIEndpoint, {
      query: userQuery,
    }, {
      headers: {
        'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching from Hume API:', error);
    return null;
  }
};
