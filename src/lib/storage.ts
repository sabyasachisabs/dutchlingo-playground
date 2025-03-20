interface AssessmentResult {
  id: string;
  imageUrl: string;
  timestamp: string;
  text?: string;
  grammarScore?: number;
  recommendations?: string[];
}

const STORAGE_KEYS = {
  ASSESSMENTS: 'handwriting_assessments'
};

export const storage = {
  saveAssessment: (imageUrl: string, text?: string, grammarScore?: number, recommendations?: string[]): AssessmentResult => {
    const assessment: AssessmentResult = {
      id: crypto.randomUUID(),
      imageUrl,
      timestamp: new Date().toISOString(),
      text,
      grammarScore,
      recommendations
    };

    const existingAssessments = storage.getAssessments();
    existingAssessments.push(assessment);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(existingAssessments));

    return assessment;
  },

  getAssessments: (): AssessmentResult[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    return stored ? JSON.parse(stored) : [];
  },

  getAssessment: (id: string): AssessmentResult | undefined => {
    const assessments = storage.getAssessments();
    return assessments.find(a => a.id === id);
  },

  deleteAssessment: (id: string): void => {
    const assessments = storage.getAssessments();
    const filtered = assessments.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(filtered));
  }
}; 