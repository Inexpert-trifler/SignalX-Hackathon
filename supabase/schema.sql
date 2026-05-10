-- SignalX AI Database Schema
-- Run this in the Supabase SQL Editor

-- Table for storing intelligence analyses
CREATE TABLE IF NOT EXISTS public.analyses (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Optional but recommended)
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (adjust as needed for production)
CREATE POLICY "Allow public read access" ON public.analyses
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated inserts" ON public.analyses
    FOR INSERT WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_analyses_url ON public.analyses(url);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON public.analyses(created_at DESC);
