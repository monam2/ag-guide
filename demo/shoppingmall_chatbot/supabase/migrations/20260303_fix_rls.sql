-- Add UPDATE policy for reviews table to support upsert
CREATE POLICY "Allow public update" ON reviews
    FOR UPDATE
    USING (true)
    WITH CHECK (true);
