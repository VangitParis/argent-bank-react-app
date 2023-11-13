// http://localhost:3001/api/v1/user/login   method : POST
// http://localhost:3001/api/v1/user/signup  method : POST
// const urlProfile = 'http://localhost:3001/api/v1/user/profile ';
// http://localhost:3001/api/v1/user/profile method : PUT

// apiCall.js

export async function callApi(url, method, data, authToken = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const requestOptions = {
    method,
    headers,
  };
  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
