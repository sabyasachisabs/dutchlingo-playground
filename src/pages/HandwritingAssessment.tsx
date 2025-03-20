import { useState, useEffect } from 'react';
import { HandwritingCapture } from '../components/HandwritingCapture';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { storage } from '../lib/storage';
import { grammar } from '../lib/grammar';
import { Trash2 } from 'lucide-react';

interface AssessmentResult {
  id: string;
  imageUrl: string;
  timestamp: string;
  text?: string;
  grammarScore?: number;
  recommendations?: string[];
}

export function HandwritingAssessment() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);

  useEffect(() => {
    // Load saved assessments on component mount
    setAssessments(storage.getAssessments());
  }, []);

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
  };

  const handleAnalyze = async () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    try {
      // In a real application, you would:
      // 1. Send the image to a handwriting recognition API
      // 2. Get the recognized text
      // 3. Send the text to a grammar checking API
      const recognizedText = "Dit is een voorbeeld tekst."; // Placeholder text
      const result = await grammar.checkText(recognizedText);
      
      // Save the assessment result
      const assessment = storage.saveAssessment(
        capturedImage,
        result.text,
        result.score,
        result.recommendations
      );
      
      setAssessments(prev => [...prev, assessment]);
      setCapturedImage(null);
    } catch (error) {
      console.error('Error analyzing handwriting:', error);
      alert('Error analyzing handwriting. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDelete = (id: string) => {
    storage.deleteAssessment(id);
    setAssessments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>A2 Writing Skills Assessment</CardTitle>
          <CardDescription>
            Capture your handwriting to assess your A2 level writing skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HandwritingCapture onCapture={handleCapture} />
          
          {capturedImage && (
            <div className="mt-8 space-y-4">
              <div className="relative aspect-video w-full max-w-2xl mx-auto">
                <img
                  src={capturedImage}
                  alt="Captured handwriting"
                  className="rounded-lg border"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Handwriting'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {assessments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Previous Assessments</CardTitle>
            <CardDescription>
              View your past handwriting assessments and feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(assessment.timestamp).toLocaleString()}
                      </p>
                      {assessment.grammarScore !== undefined && (
                        <p className="text-lg font-semibold">
                          Score: {assessment.grammarScore.toFixed(1)}%
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(assessment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="relative aspect-video w-full max-w-xl">
                    <img
                      src={assessment.imageUrl}
                      alt="Handwriting sample"
                      className="rounded-lg"
                    />
                  </div>

                  {assessment.text && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Recognized Text:</h4>
                      <p className="text-gray-700">{assessment.text}</p>
                    </div>
                  )}

                  {assessment.recommendations && assessment.recommendations.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Recommendations:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {assessment.recommendations.map((rec, index) => (
                          <li key={index} className="text-gray-700">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 