'use client';

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { saveDoodle, getDoodles } from "../actions";

const PALETTE_COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "Red", hex: "#ef4444" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Green", hex: "#22c55e" },
  { name: "Purple", hex: "#a855f7" },
  { name: "Orange", hex: "#f97316" },
];

const CANVAS_SIZE = 500;
const MAX_HISTORY = 50;

export default function ConnectPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [currentColor, setCurrentColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);

  // Mobile: draw mode toggle — disabled by default so page scrolling works first
  const [drawMode, setDrawMode] = useState(false);

  // Undo / Redo history stacks
  const undoStackRef = useRef<ImageData[]>([]);
  const redoStackRef = useRef<ImageData[]>([]);

  // Fetch existing doodles on page load
  useEffect(() => {
    async function loadInitialData() {
      try {
        const data = await getDoodles();
        setSubmissions(data);
      } catch (err) {
        console.error("Failed to load guestbook items:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // Sync canvas brush context whenever tool parameters change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = isEraser ? "#ffffff" : currentColor;
    ctx.lineWidth = isEraser ? 24 : 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [currentColor, isEraser]);

  // ---- History helpers ----

  const saveSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    undoStackRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (undoStackRef.current.length > MAX_HISTORY) {
      undoStackRef.current.shift();
    }
    // Clear redo stack on new stroke
    redoStackRef.current = [];
  }, []);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (undoStackRef.current.length === 0) return;

    const snapshot = undoStackRef.current.pop()!;
    // Save current state to redo stack
    redoStackRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(snapshot, 0, 0);
  }, []);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (redoStackRef.current.length === 0) return;

    const snapshot = redoStackRef.current.pop()!;
    // Save current state to undo stack
    undoStackRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(snapshot, 0, 0);
  }, []);

  // ---- Drawing logic ----

  // Get correct coordinates accounting for canvas display vs internal size
  const getCoordinates = (e: any, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const isTouchEvent = (e: any): boolean => 'touches' in e;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // On mobile, only draw when drawMode is active
    if (isTouchEvent(e) && !drawMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    const { x, y } = getCoordinates(e, canvas);
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // On mobile, only draw when drawMode is active
    if (isTouchEvent(e) && !drawMode) return;

    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    // Save a snapshot after each completed stroke (undo/redo)
    saveSnapshot();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Save current state for undo before clearing
    saveSnapshot();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Clear redo stack since we've moved to a new state
    redoStackRef.current = [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    setSubmitting(true);

    try {
      const doodleDataUrl = canvas.toDataURL("image/png");
      const payload = {
        name: name.trim() || "Anonymous",
        comment: comment.trim(),
        doodle_data: doodleDataUrl,
      };

      const result = await saveDoodle(payload);

      if (result.success) {
        const updatedData = await getDoodles();
        setSubmissions(updatedData);
        setComment("");
        setName("");
        clearCanvas();
        // Clear history stacks after submit
        undoStackRef.current = [];
        redoStackRef.current = [];
      } else {
        alert("Oops! Could not save your doodle: " + result.error);
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col bg-white px-6 sm:px-10 md:px-10 pt-6 sm:pt-16 md:pt-20 pb-22 sm:pb-8 min-h-screen">
      <div className="flex flex-col">
        <Link href="/" className="group mb-6 underline decoration-2 underline-offset-6 flex items-center text-sm font-bold text-black hover:opacity-70 transition-opacity w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 transition-transform group-hover:-translate-x-1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold text-black">Connect</h1>
        <p className="mt-1 text-base sm:text-lg text-gray-600">feel free to leave anything</p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Your Name / Alias (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            className="w-full sm:w-1/3 border-[3px] border-black rounded-xl p-3 text-sm placeholder-gray-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-shadow disabled:opacity-50"
          />
          <input 
            type="text" 
            placeholder="Leave a short comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            disabled={submitting}
            className="w-full sm:w-2/3 border-[3px] border-black rounded-xl p-3 text-sm placeholder-gray-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-shadow disabled:opacity-50"
          />
        </div>

        {/* Canvas Dashboard Panel */}
        <div className="flex flex-col border-[3px] border-black rounded-xl overflow-hidden relative">
          
          {/* Custom Paint Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-black bg-gray-50 px-4 py-2 text-xs font-bold">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-500 uppercase tracking-tight">Color:</span>
              <div className="flex items-center gap-1.5">
                {PALETTE_COLORS.map((col) => (
                  <button
                    key={col.hex}
                    type="button"
                    title={col.name}
                    onClick={() => {
                      setCurrentColor(col.hex);
                      setIsEraser(false);
                    }}
                    style={{ backgroundColor: col.hex }}
                    className={`h-6 w-6 rounded-full border-[3px] border-black transition-transform active:scale-95 ${
                      currentColor === col.hex && !isEraser 
                        ? 'scale-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
                {/* Custom color picker */}
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => {
                    setCurrentColor(e.target.value);
                    setIsEraser(false);
                  }}
                  title="Pick custom color"
                  className="h-6 w-6 rounded-sm border-[3px] border-black cursor-pointer p-0.5"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Draw Mode Toggle */}
              <button
                type="button"
                onClick={() => setDrawMode((prev) => !prev)}
                className={`border-[3px] border-black rounded-xl px-3 py-1 text-xs uppercase transition-colors tracking-tight sm:hidden ${
                  drawMode ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {drawMode ? '✏️ Draw' : 'Scroll'}
              </button>
              <button
                type="button"
                onClick={() => setIsEraser(true)}
                className={`border-[3px] border-black rounded-xl px-3 py-1 text-xs uppercase transition-colors tracking-tight ${
                  isEraser ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                Eraser
              </button>
              <button
                type="button"
                onClick={() => setIsEraser(false)}
                className={`border-[3px] border-black rounded-xl px-3 py-1 text-xs uppercase transition-colors tracking-tight ${
                  !isEraser ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                Brush
              </button>
            </div>
          </div>

          {/* Square Canvas — perfect for mobile doodling */}
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className={`w-full aspect-square bg-white cursor-crosshair ${
              drawMode ? 'touch-none' : ''
            }`}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          {/* Control Footer */}
          <div className="flex justify-between items-center border-t-[3px] border-black p-2 bg-white">
            <div className="flex items-center gap-2">
              {/* Undo / Redo */}
              <button 
                type="button" 
                onClick={undo}
                disabled={submitting || undoStackRef.current.length === 0}
                className="border-[3px] border-black rounded-xl px-3 py-1 text-xs font-bold uppercase tracking-tight bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Undo"
              >
                ↩
              </button>
              <button 
                type="button" 
                onClick={redo}
                disabled={submitting || redoStackRef.current.length === 0}
                className="border-[3px] border-black rounded-xl px-3 py-1 text-xs font-bold uppercase tracking-tight bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Redo"
              >
                ↪
              </button>
              <button 
                type="button" 
                onClick={clearCanvas}
                disabled={submitting}
                className="text-xs font-bold uppercase underline hover:text-red-600 transition-colors px-2 py-1 disabled:opacity-50"
              >
                Clear
              </button>
            </div>
            <button 
              type="submit" 
              disabled={submitting}
              className="bg-black text-white px-5 py-2 rounded-xl font-bold text-sm tracking-wide hover:bg-gray-800 transition-colors shadow-[3px_3px_0px_0px_rgba(150,150,150,0.5)] active:translate-y-0.5 disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Submit Post"}
            </button>
          </div>
        </div>
      </form>

      {/* Guestbook Dynamic Feed Area */}
      <div className="mt-12 flex flex-col gap-6">
        <h2 className="text-xl underline decoration-2 underline-offset-5 sm:text-2xl font-bold">Submissions</h2>
        
        {loading ? (
          <p className="text-xs italic text-gray-400 animate-pulse">Loading amazing doodles...</p>
        ) : submissions.length === 0 ? (
          <p className="text-xs italic text-gray-400">No doodles left yet. Be the first!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {submissions.map((sub) => (
              <div key={sub.id} className="border-[3px] border-black bg-white p-4 flex flex-col gap-3 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-col">
                  <span className="font-bold text-sm">{sub.name}</span>
                  <p className="text-gray-700 text-xs mt-1">{sub.comment}</p>
                </div>
                {sub.doodle_data && (
                  <div className="border border-black bg-gray-50 overflow-hidden select-none pointer-events-none">
                    <img src={sub.doodle_data} alt="User doodle" className="w-full h-auto max-h-[140px] object-contain bg-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}