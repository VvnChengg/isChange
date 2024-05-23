// api.js

const hostname = process.env.REACT_APP_API_HOSTNAME;



export async function acceptChat(cid, token) {
  
  try {
    const response = await fetch(`${hostname}/chat/accept/${cid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to accept chat');
    }
  } catch (error) {
    console.error('Error accepting chat:', error);
    throw error;
  }
}