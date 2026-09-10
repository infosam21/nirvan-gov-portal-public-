const BASE_URL = "http://localhost:5000/api";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: "Bearer " + token } : {})
  };
}

export const api = {
  async login(email, password) {
    const res = await fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    localStorage.setItem("token", data.token);
    return data;
  },

  async getCourses() {
    const res = await fetch(BASE_URL + "/igot/courses", { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to fetch courses");
    return res.json();
  },

  async getSkills() {
    const res = await fetch(BASE_URL + "/skills/progress", { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to fetch skills");
    return res.json();
  },

  async getAiPlan() {
    const res = await fetch(BASE_URL + "/ai/recommend", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({})
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to generate plan");
    return data.plan;
  },

  async chat(message) {
    const res = await fetch(BASE_URL + "/ai/chat", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Chat failed");
    return data.reply;
  }
};
