import { useAuth } from "../context/AuthContext";

const ProfilPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <img
          src="https://ui-avatars.com/api/?name=User&background=FF0000&color=fff&size=100"
          alt="Avatar"
          className="w-24 h-24 mx-auto rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold mb-2 text-red-600">
          Informasi Pengguna
        </h1>
        {user ? (
          <div className="text-left mt-4 space-y-2">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Data pengguna tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilPage;
