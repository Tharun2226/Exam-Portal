
import React from 'react';
import { Mic, Square, RotateCcw, Play, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { evaluatePracticeResponse } from '../services/geminiService';
import { EvaluationResult } from '../types';

interface PracticeEngineProps {
  type: string;
  onComplete?: (result: EvaluationResult) => void;
}

const PracticeEngine: React.FC<PracticeEngineProps> = ({ type }) => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [timer, setTimer] = React.useState(40);
  const [response, setResponse] = React.useState('');
  const [evaluating, setEvaluating] = React.useState(false);
  const [result, setResult] = React.useState<EvaluationResult | null>(null);

  const mockQuestion = "The development of sustainable cities is becoming a global priority. Urban planners are focusing on green transportation, energy-efficient buildings, and smart waste management systems to reduce the ecological footprint of growing populations.";

  React.useEffect(() => {
    let interval: any;
    if (isRecording && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsRecording(false);
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  const handleStart = () => {
    setIsRecording(true);
    setTimer(40);
  };

  const handleStop = async () => {
    setIsRecording(false);
    setEvaluating(true);
    
    try {
      // For demo purposes, we simulate the "response" as the transcription.
      // In a real app, we'd use a Speech-to-Text service or send the audio.
      const evalResult = await evaluatePracticeResponse(
        type, 
        mockQuestion, 
        response || "The development of sustainable cities is a priority. Planners focus on green transit and energy buildings."
      );
      setResult(evalResult);
    } catch (err) {
      alert("Evaluation failed. Please try again.");
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-800 text-white px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center font-bold">1</span>
            <h2 className="font-bold">PTE Speaking: Read Aloud</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Time Remaining</span>
              <span className="bg-slate-700 px-3 py-1 rounded font-mono text-sky-400">00:{timer < 10 ? `0${timer}` : timer}</span>
            </div>
            <button className="text-slate-400 hover:text-white"><Info className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Practice Question</h3>
              <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">ID: 10425</span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-xl leading-relaxed text-slate-700 font-medium">
              {mockQuestion}
            </div>
          </div>

          {!result ? (
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="relative">
                {isRecording && (
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                )}
                <button
                  onClick={isRecording ? handleStop : handleStart}
                  disabled={evaluating}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl ${
                    isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-600 hover:bg-sky-700'
                  } text-white disabled:bg-slate-300`}
                >
                  {evaluating ? (
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : isRecording ? (
                    <Square className="w-10 h-10 fill-white" />
                  ) : (
                    <Mic className="w-10 h-10" />
                  )}
                </button>
              </div>
              <p className="text-slate-500 font-medium">
                {evaluating ? 'Analyzing your response...' : isRecording ? 'Recording in progress...' : 'Click the microphone to start reading'}
              </p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-8 border border-sky-100 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                      <circle 
                        cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={364} strokeDashoffset={364 - (364 * result.score) / 90}
                        className="text-sky-600" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-slate-800">{result.score}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Overall</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">AI Evaluation Complete</h4>
                    <p className="text-sm text-slate-500 max-w-sm">{result.feedback}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setResult(null)}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Grammar', value: result.grammar, max: 90 },
                  { label: 'Vocabulary', value: result.vocabulary, max: 90 },
                  { label: 'Fluency', value: result.breakdown.coherence * 10, max: 90 },
                ].map(stat => (
                  <div key={stat.label} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <div className="flex items-end gap-1 mt-1">
                      <span className="text-xl font-bold text-slate-800">{stat.value}</span>
                      <span className="text-[10px] text-slate-400 mb-1">/{stat.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800">
            <ChevronRight className="w-4 h-4 rotate-180" /> Previous
          </button>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className={`w-2 h-2 rounded-full ${n === 1 ? 'bg-sky-600' : 'bg-slate-300'}`}></div>
            ))}
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700">
            Next Question <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeEngine;
