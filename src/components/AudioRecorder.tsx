/**
 * AudioRecorder Component
 * 
 * A comprehensive audio recording component for interview responses
 * Integrates with Speech-to-Text and provides real-time feedback
 */

import React, { useState, useRef, useEffect } from 'react'
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  RotateCcw, 
  Upload,
  Volume2,
  VolumeX,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react'
import { speechToTextService, type TranscriptionResult } from '../services/speechToTextService'
import { geminiAnalysisService, type AnswerAnalysis, type InterviewQuestion } from '../services/geminiAnalysisService'
// Alternative: import { openAIAnalysisService, type AnswerAnalysis, type InterviewQuestion } from '../services/openAIAnalysisService'

// AI provider selection is available via env when needed; currently we import services directly where used.

interface AudioRecorderProps {
  question: InterviewQuestion
  onAnalysisComplete?: (analysis: AnswerAnalysis) => void
  onTranscriptionComplete?: (result: TranscriptionResult) => void
  maxDuration?: number // in seconds, default 300 (5 minutes)
  autoStop?: boolean // auto-stop when max duration reached
  className?: string
  showTranscription?: boolean // whether to display the transcription text (default: true)
}

type RecordingState = 'idle' | 'recording' | 'paused' | 'stopped' | 'processing' | 'completed'

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  question,
  onAnalysisComplete,
  onTranscriptionComplete,
  maxDuration = 300,
  autoStop = true,
  className = '',
  showTranscription = true
}) => {
  // Recording state management
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [duration, setDuration] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  
  // Analysis state
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  // Audio visualization
  const [audioLevel, setAudioLevel] = useState(0)
  
  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording()
      if (timerRef.current) clearInterval(timerRef.current)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (audioURL) URL.revokeObjectURL(audioURL)
    }
  }, [audioURL])

  /**
   * Initialize audio recording with optimal settings
   */
  const initializeRecording = async (): Promise<MediaStream | null> => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Audio recording not supported in this browser')
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 48000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      })

      mediaStreamRef.current = stream

      // Set up audio visualization
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)
      
      analyserRef.current.fftSize = 256
      startAudioVisualization()

      return stream
    } catch (error) {
      console.error('Failed to initialize recording:', error)
      return null
    }
  }

  /**
   * Start audio level visualization
   */
  const startAudioVisualization = () => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    
    const updateAudioLevel = () => {
      if (analyserRef.current && recordingState === 'recording') {
        analyserRef.current.getByteFrequencyData(dataArray)
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length
        setAudioLevel(Math.min(average / 128, 1))
        animationRef.current = requestAnimationFrame(updateAudioLevel)
      }
    }

    updateAudioLevel()
  }

  /**
   * Start recording audio
   */
  const startRecording = async () => {
    const stream = await initializeRecording()
    if (!stream) return

    try {
      // Check supported MIME types and choose the best one
      let mimeType = 'audio/webm;codecs=opus'
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        console.warn('WEBM with Opus not supported, trying alternatives...')
        if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm'
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4'
        } else {
          mimeType = '' // Let browser choose
        }
      }
      
      console.log('🎙️ Using MIME type:', mimeType)

      const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)

      const audioChunks: Blob[] = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: mimeType || 'audio/webm' })
        console.log('🎵 Audio blob created:', {
          size: blob.size,
          type: blob.type,
          duration: duration
        })
        setAudioBlob(blob)
        setAudioURL(URL.createObjectURL(blob))
        setRecordingState('stopped')
        
        // Clean up stream
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      mediaRecorderRef.current = mediaRecorder
      
      setRecordingState('recording')
      setDuration(0)
      
      // Start timer
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          const newDuration = prev + 1
          
          // Auto-stop if max duration reached
          if (autoStop && newDuration >= maxDuration) {
            stopRecording()
            return maxDuration
          }
          
          return newDuration
        })
      }, 1000)

    } catch (error) {
      console.error('Failed to start recording:', error)
      stream.getTracks().forEach(track => track.stop())
    }
  }

  /**
   * Pause/resume recording
   */
  const togglePauseRecording = () => {
    if (!mediaRecorderRef.current) return

    if (recordingState === 'recording') {
      mediaRecorderRef.current.pause()
      setRecordingState('paused')
      if (timerRef.current) clearInterval(timerRef.current)
    } else if (recordingState === 'paused') {
      mediaRecorderRef.current.resume()
      setRecordingState('recording')
      
      // Resume timer
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          const newDuration = prev + 1
          if (autoStop && newDuration >= maxDuration) {
            stopRecording()
            return maxDuration
          }
          return newDuration
        })
      }, 1000)
    }
  }

  /**
   * Stop recording
   */
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    setAudioLevel(0)
  }

  /**
   * Reset recording session
   */
  const resetRecording = () => {
    stopRecording()
    
    if (audioURL) {
      URL.revokeObjectURL(audioURL)
    }
    
    setRecordingState('idle')
    setDuration(0)
    setAudioBlob(null)
    setAudioURL(null)
    setTranscriptionResult(null)
    setIsAnalyzing(false)
    setAudioLevel(0)
  }

  /**
   * Process the recorded audio (transcription + analysis)
   */
  const processAudio = async () => {
    if (!audioBlob) {
      console.error('❌ No audio blob available for processing')
      return
    }

    console.log('🎯 Starting audio processing pipeline...', {
      audioBlobSize: audioBlob.size,
      audioBlobType: audioBlob.type,
      duration: duration
    })

    setRecordingState('processing')
    setIsAnalyzing(true)

    try {
      // Step 1: Transcribe audio
      console.log('🎤 Starting transcription...')
      const transcription = await speechToTextService.transcribeAudio(audioBlob)
      console.log('📝 Transcription result:', transcription)
      
      setTranscriptionResult(transcription)
      onTranscriptionComplete?.(transcription)

      if (!transcription.success || !transcription.transcript) {
        console.error('❌ Transcription failed:', transcription.error)
        throw new Error(transcription.error || 'Transcription failed')
      }

      console.log('✅ Transcription successful:', transcription.transcript)

      // Step 2: Analyze transcription with AI (Gemini or OpenAI based on env)
      const analysis = await geminiAnalysisService.analyzeAnswer({
        transcript: transcription.transcript,
        question: question,
        audioDuration: duration,
        transcriptionConfidence: transcription.confidence
      })

      onAnalysisComplete?.(analysis)
      setRecordingState('completed')

      console.log('✅ Audio processing completed successfully')

    } catch (error) {
      console.error('❌ Audio processing failed:', error)
      setRecordingState('stopped')
      
      // Determine error type and provide specific feedback
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      const isApiRestrictionError = errorMessage.includes('403') || errorMessage.includes('access denied')
      
      // Show error feedback
      const errorAnalysis: AnswerAnalysis = {
        overallScore: 0,
        transcript: transcriptionResult?.transcript || '',
        feedback: {
          strengths: [],
          weaknesses: ['Processing failed'],
          suggestions: isApiRestrictionError 
            ? ['Please configure API key restrictions in Google Cloud Console to allow localhost'] 
            : ['Please try recording again'],
          detailedFeedback: isApiRestrictionError 
            ? 'Speech-to-text failed due to API restrictions. Please add localhost to your Google Cloud API key restrictions.'
            : 'We encountered an issue processing your response. Please try again.'
        },
        scores: { clarity: 0, relevance: 0, structure: 0, completeness: 0, confidence: 0 },
        keyPoints: { covered: [], missed: [] },
        timeManagement: { duration, efficiency: 'poor', pacing: 'Unable to analyze' },
        processingTime: 0
      }
      
      onAnalysisComplete?.(errorAnalysis)
    } finally {
      setIsAnalyzing(false)
    }
  }

  /**
   * Format duration display
   */
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  /**
   * Get recording state color
   */
  const getStateColor = (): string => {
    switch (recordingState) {
      case 'recording': return 'text-red-600'
      case 'paused': return 'text-yellow-600'
      case 'stopped': return 'text-blue-600'
      case 'processing': return 'text-purple-600'
      case 'completed': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Record Your Answer</h3>
        <div className={`flex items-center space-x-2 ${getStateColor()}`}>
          <Clock className="w-4 h-4" />
          <span className="font-mono text-sm">{formatDuration(duration)}</span>
          <span className="text-xs capitalize">({recordingState})</span>
        </div>
      </div>

      {/* Audio Level Visualization */}
      {recordingState === 'recording' && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            {audioLevel > 0.1 ? (
              <Volume2 className="w-4 h-4 text-green-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm text-gray-600">Audio Level</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-100"
              style={{ width: `${audioLevel * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Recording Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {recordingState === 'idle' && (
          <button
            onClick={startRecording}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Mic className="w-5 h-5" />
            <span>Start Recording</span>
          </button>
        )}

        {(recordingState === 'recording' || recordingState === 'paused') && (
          <>
            <button
              onClick={togglePauseRecording}
              className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              {recordingState === 'recording' ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
            
            <button
              onClick={stopRecording}
              className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Square className="w-5 h-5" />
              <span>Stop</span>
            </button>
          </>
        )}

        {recordingState === 'stopped' && (
          <>
            <button
              onClick={processAudio}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAnalyzing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              <span>{isAnalyzing ? 'Processing...' : 'Analyze Answer'}</span>
            </button>
            
            <button
              onClick={resetRecording}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </>
        )}

        {recordingState === 'processing' && (
          <div className="flex items-center space-x-3">
            <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
            <span className="text-gray-700">
              {!transcriptionResult ? 'Transcribing audio...' : 'Analyzing response...'}
            </span>
          </div>
        )}

        {recordingState === 'completed' && (
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="text-green-700 font-medium">Analysis Complete!</span>
            <button
              onClick={resetRecording}
              className="ml-4 flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Record Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Audio Playback */}
      {audioURL && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Your Recording</h4>
          <audio controls className="w-full" src={audioURL} />
        </div>
      )}

      {/* Transcription Display - Non-editable (only shown if showTranscription is true) */}
      {showTranscription && transcriptionResult && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-gray-700">Your Answer Transcription</h4>
              {transcriptionResult.success ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>Confidence: {Math.round(transcriptionResult.confidence * 100)}%</span>
              <span>•</span>
              <span>Words: {transcriptionResult.transcript.split(' ').length}</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">T</span>
                </div>
              </div>
              <div className="flex-1">
                {transcriptionResult.success ? (
                  <>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Transcribed Text</h5>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 max-h-32 overflow-y-auto">
                      <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap select-text">
                        {transcriptionResult.transcript}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">
                      {recordingState === 'completed' 
                        ? '✅ This transcription has been analyzed. It will remain visible until you proceed to the next question.' 
                        : 'This transcription will be sent to AI for analysis. It cannot be edited.'}
                    </p>
                  </>
                ) : (
                  <div className="text-red-600 text-sm">
                    <h5 className="font-medium mb-1">Transcription Error</h5>
                    <p>{transcriptionResult.error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Information */}
      <div className="text-xs text-gray-500 text-center">
        Maximum recording duration: {formatDuration(maxDuration)} • 
        Question type: {question.type} • 
        Expected duration: {formatDuration(Math.min(question.expectedDuration, maxDuration))}
      </div>
    </div>
  )
}

export default AudioRecorder