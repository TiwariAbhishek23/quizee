export async function getBackendData() {
    const user = auth.currentUser;
    if (!user) return null;
  
    const idToken = await user.getIdToken();
  
    const response = await fetch("http://localhost:8000/protected-route", {
      headers: { Authorization: idToken },
    });

    return response.json();
  }
