const dummyRiwayat = [
  { id: 1, tanggal: "2025-05-01", hasil: "Daging Sapi - Grade A" },
  { id: 2, tanggal: "2025-04-25", hasil: "Daging Ayam - Grade B" },
];

const RiwayatPage = () => {
  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
          Riwayat Scan
        </h1>
        {dummyRiwayat.length > 0 ? (
          <ul className="space-y-4">
            {dummyRiwayat.map((item) => (
              <li
                key={item.id}
                className="border p-4 rounded-lg flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium">{item.hasil}</p>
                  <p className="text-sm text-gray-500">{item.tanggal}</p>
                </div>
                <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  ID #{item.id}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">Belum ada riwayat scan.</p>
        )}
      </div>
    </div>
  );
};

export default RiwayatPage;
