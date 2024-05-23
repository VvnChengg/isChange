// api.js

const hostname = process.env.REACT_APP_API_HOSTNAME;

export async function deleteChat(cid, token) {
  
  try {
    const response = await fetch(`${hostname}/chat/delete/${cid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete chat');
    }
  } catch (error) {
    console.error('Error deleting chat:', error);
    throw error;
  }
}
