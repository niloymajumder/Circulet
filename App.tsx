
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResultCard } from './components/AnalysisResultCard';
import { analyzeWasteImage } from './services/geminiService';
import { WasteAnalysis, UploaderMode } from './types';
import { LeafIcon } from './components/icons/LeafIcon';
import { SpinnerIcon } from './components/icons/SpinnerIcon';

export default function App(): React.ReactNode {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showLocationError, setShowLocationError] = useState<boolean>(false);
  const [mode, setMode] = useState<UploaderMode>('upload');

  const handleAnalyze = useCallback(async () => {
    if (!image) {
      setError('Please provide an image first.');
      return;
    }
    if (!location.trim()) {
      setShowLocationError(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setShowLocationError(false);

    try {
      // Convert data URL to base64
      const base64Data = image.split(',')[1];
      const result = await analyzeWasteImage(base64Data, location);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze image. The AI model might be busy or the item could not be identified. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [image, location]);

  const handleReset = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
    setMode('upload');
  };

  return (
    <div className="min-h-screen bg-eco-light font-sans text-eco-dark flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-4xl mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <LeafIcon className="w-10 h-10 text-eco-green" />
          <h1 className="text-4xl sm:text-5xl font-bold text-eco-green-dark">EcoScan</h1>
        </div>
        <p className="text-lg text-eco-gray">Your AI-powered guide to responsible waste disposal.</p>
      </header>

      <main className="w-full max-w-4xl flex-grow">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-500">
          {!analysis && !isLoading && (
            <div>
              <ImageUploader onImageReady={setImage} image={image} mode={mode} onModeChange={setMode} />
              {image && (
                <div className="mt-6">
                   <div className="relative">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        if(e.target.value.trim()) setShowLocationError(false);
                      }}
                      placeholder="Enter your City, State, or Zip Code"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-eco-green ${showLocationError ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {showLocationError && <p className="text-red-500 text-sm mt-1">Please enter a location for accurate results.</p>}
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={!image || !location.trim()}
                    className="w-full mt-4 bg-eco-green text-white font-bold py-3 px-4 rounded-lg hover:bg-eco-green-dark transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Analyze Waste
                  </button>
                </div>
              )}
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <SpinnerIcon className="w-16 h-16 text-eco-green" />
              <p className="mt-4 text-xl font-semibold text-eco-gray">Analyzing your item...</p>
              <p className="text-eco-gray">Our AI is determining the best disposal method.</p>
            </div>
          )}

          {error && (
             <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-xl font-bold text-hazard-red">Analysis Failed</h3>
                <p className="text-eco-gray mt-2">{error}</p>
                 <button onClick={handleReset} className="mt-4 bg-eco-green text-white font-bold py-2 px-6 rounded-lg hover:bg-eco-green-dark transition-colors">
                    Try Again
                </button>
            </div>
          )}

          {analysis && !isLoading && (
            <div>
              <AnalysisResultCard result={analysis} image={image!} />
              <button
                onClick={handleReset}
                className="w-full mt-6 bg-eco-green text-white font-bold py-3 px-4 rounded-lg hover:bg-eco-green-dark transition-colors"
              >
                Scan Another Item
              </button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="w-full max-w-4xl mt-8 text-center text-eco-gray text-sm">
        <p>&copy; {new Date().getFullYear()} EcoScan. Helping you make a greener choice, one scan at a time.</p>
      </footer>
    </div>
  );
}
