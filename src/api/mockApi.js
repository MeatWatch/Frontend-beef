const BASE_URL = "http://localhost:3001";

// Temporary user data storage
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

// Enhanced meat classification mocks with more variations
const meatClassificationMocks = {
  beef: [
    {
      analysis: {
        result: "Fresh",
        confidence: 0.95,
        message:
          "Daging sapi terlihat sangat segar dengan warna merah cerah dan tekstur yang baik.",
      },
      spoilageLevel: 1, // 1-5 scale (1 = very fresh, 5 = spoiled)
    },
    {
      analysis: {
        result: "Not Fresh",
        confidence: 0.85,
        message:
          "Daging sapi mulai tidak segar: warna agak pucat dan tekstur sedikit lembek.",
      },
      spoilageLevel: 3,
    },
  ],
  chicken: [
    {
      analysis: {
        result: "Fresh",
        confidence: 0.9,
        message:
          "Daging ayam dalam kondisi segar dengan warna pink dan bau normal.",
      },
      spoilageLevel: 1,
    },
    {
      analysis: {
        result: "Spoiled",
        confidence: 0.92,
        message:
          "Daging ayam sudah tidak segar: warna kehijauan dan bau tidak sedap.",
      },
      spoilageLevel: 5,
    },
  ],
  fish: [
    {
      analysis: {
        result: "Fresh",
        confidence: 0.88,
        message: "Ikan masih segar dengan mata jernih dan insang merah.",
      },
      spoilageLevel: 1,
    },
    {
      analysis: {
        result: "Not Fresh",
        confidence: 0.78,
        message: "Ikan mulai tidak segar: mata keruh dan bau amis kuat.",
      },
      spoilageLevel: 4,
    },
  ],
  lamb: [
    {
      analysis: {
        result: "Fresh",
        confidence: 0.93,
        message: "Daging kambing masih segar dengan warna merah tua yang baik.",
      },
      spoilageLevel: 1,
    },
  ],
};

export const mockApi = {
  // ... existing auth functions (login, register, getUser) ...

  classifyMeat: async (formData) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const meatType = formData.get("meat_type") || "beef";
    const userId = formData.get("user_id") || 1;

    // Get available mock results for this meat type
    const availableResults =
      meatClassificationMocks[meatType] || meatClassificationMocks.beef;

    // For testing purposes, you can force specific results:
    // 1. Always return not fresh for testing
    // const forcedResult = availableResults.find(r => r.analysis.result !== "Fresh");

    // 2. Random selection for varied testing
    const randomIndex = Math.floor(Math.random() * availableResults.length);
    const selectedResult = availableResults[randomIndex];

    // 3. Or use the first result (usually fresh)
    // const selectedResult = availableResults[0];

    return {
      analysis: selectedResult.analysis,
      imagePath:
        selectedResult.analysis.result === "Fresh"
          ? "/images/fresh-meat.jpg"
          : "/images/spoiled-meat.jpg",
      user_id: userId,
      meat_type: meatType,
      analysis_date: new Date().toISOString(),
      spoilage_level: selectedResult.spoilageLevel,
      storage_advice: getStorageAdvice(
        selectedResult.analysis.result,
        meatType
      ),
    };
  },

  getUserClassifications: async (userId) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate history with mixed results
    return [
      createHistoryItem(1, "beef", "Fresh", 0.95),
      createHistoryItem(2, "chicken", "Not Fresh", 0.65),
      createHistoryItem(3, "fish", "fresh", 0.92),
    ];
  },
};

// Helper functions
function getStorageAdvice(result, meatType) {
  if (result !== "Fresh") {
    return "Segera buang atau olah dengan pemanasan tinggi";
  }

  const advice = {
    beef: "Simpan di chiller maksimal 3 hari",
    chicken: "Simpan di freezer untuk penyimpanan lebih lama",
    fish: "Konsumsi dalam 1-2 hari",
    lamb: "Simpan di chiller maksimal 4 hari",
  };

  return advice[meatType] || "Simpan di tempat dingin";
}

function createHistoryItem(id, meatType, result, confidence) {
  const types = {
    beef: "Daging Sapi",
    chicken: "Daging Ayam",
    fish: "Daging Ikan",
    lamb: "Daging Kambing",
  };

  return {
    id,
    meat_type: types[meatType],
    result,
    confidence,
    analyzed_at: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    image_url:
      result === "Fresh"
        ? "/mock-images/beef-(4).jpg"
        : "/mock-images/beef-2.jpg",
    details: generateDetails(meatType, result),
  };
}

function generateDetails(meatType, result) {
  const baseDetails = {
    beef: { color: "Merah", texture: "Padat", smell: "Netral" },
    chicken: { color: "Pink", texture: "Kenyal", smell: "Ringan" },
    fish: { color: "Cerah", texture: "Elastis", smell: "Amis segar" },
  };

  if (result === "Fresh") {
    return baseDetails[meatType];
  }

  // Spoiled details
  const spoiledChanges = {
    color: ["Pucat", "Keabuan", "Kehijauan"],
    texture: ["Lembek", "Berkair", "Lengket"],
    smell: ["Bau asam", "Bau busuk", "Bau tidak sedap"],
  };

  return {
    color:
      spoiledChanges.color[
        Math.floor(Math.random() * spoiledChanges.color.length)
      ],
    texture:
      spoiledChanges.texture[
        Math.floor(Math.random() * spoiledChanges.texture.length)
      ],
    smell:
      spoiledChanges.smell[
        Math.floor(Math.random() * spoiledChanges.smell.length)
      ],
    warning: "Tidak disarankan untuk dikonsumsi",
  };
}
