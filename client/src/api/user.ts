const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export async function getMe(token: string) {
  const res = await fetch(`${API_BASE}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function updateAccount(
  data: { name?: string; password?: string },
  token: string
) {
  const res = await fetch(`${API_BASE}/account`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update account");
  return res.json();
}
