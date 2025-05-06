const BASE_URL = "http://localhost:3001";
// simpan data user sementara
let users = [
  {
    user_id: 1,
    username: "user1",
    email: "user1@example.com",
    password: "password1",
    profil_picture: "/profile/user1.jpg",
    full_name: "User Pertama",
    notification_enabled: true,
  },
];

export const mockApi = {
  // Login
  login: async (credentials) => {
    const { username, password } = credentials;
    const user = user.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      throw new Error("Invalid username or password");
    }

    return {
      token: "mock.jwt.token.here ",
      user: {
        user_id: user.user_id,
        username: user.username,
        profil_picture: user.profil_picture,
      },
    };
  },

  // Regsiter
  register: async (userData) => {
    const { username, email } = userData;
    const exist = users.some(
      (u) => u.username === username || u.email === email
    );

    if (exist) {
      throw new Error("Username or email already exists");
    }

    const newUser = {
      user_id: users.length + 1,
      ...userData,
      profile_picture: null,
      notification_enabled: false,
      created_at: new Date().toISOString(),
    };

    users.push(newUser);
    return {
      user_id: newUser.user_id,
      username: newUser.username,
      email: newUser.email,
    };
  },

  // GET USER BY ID
  getUser: async (userId) => {
    const user = user.find((u) => u.user_id === userId);

    if (!user) {
      throw new Error("User not Found");
    }
    return user;
  },
};
