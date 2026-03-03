-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT PRIMARY KEY,
    rating INTEGER,
    title TEXT,
    content TEXT,
    author TEXT,
    date DATE,
    helpful_votes INTEGER,
    verified_purchase TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON reviews
    FOR SELECT
    USING (true);

-- Create policy to allow public insert (for indexing demo)
CREATE POLICY "Allow public insert" ON reviews
    FOR INSERT
    WITH CHECK (true);
