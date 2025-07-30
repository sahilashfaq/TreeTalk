// services/auth.service.ts

class Auth {
  async login(payload: { email: string; password: string }) {
    const response = await fetch("http://localhost:3002/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return response.json(); // contains token and user
  }

  async register(payload: { email: string; password: string }) {
    const response = await fetch("http://localhost:3002/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return response.json(); // contains token and user
  }
}

const AuthService = new Auth();
export default AuthService;
