const STORAGE_KEY = "astroQuizResults";

// Get all saved quiz results.
export const getAllQuizResults = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Failed to read quiz results:", error);

    return {};
  }
};

// Get the result for one specific quiz.
export const getQuizResult = (quizId) => {
  const results = getAllQuizResults();

  return results[String(quizId)] ?? null;
};

// Save or replace the latest result for a quiz.
export const saveQuizResult = (quizId, score, total) => {
    const results = getAllQuizResults();

    // Get the previous result, if it exists.
    const previousResult = results[String(quizId)];

    const newResult = {
      score,
      total,

      // Increase attempts by one, or start at one.
      tries: (previousResult?.tries ?? 0) + 1,

      completedAt: new Date().toISOString(),
    };

    // Replace the previous result for this quiz.
    results[String(quizId)] = newResult;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(results)
    );

    return newResult;
  };

// Delete all saved quiz results.
export const clearAllQuizResults = () => {
  localStorage.removeItem(STORAGE_KEY);
};
