// api.js

const hostname = process.env.REACT_APP_API_HOSTNAME;

export async function createChat(userId, token) {
  const requestBody = {
    user_id: userId
  };

  try {
    const response = await fetch(`${hostname}/chat/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Failed to create chat');
    }

    const responseData = await response.json();
    return responseData.new_chat_id;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
}

