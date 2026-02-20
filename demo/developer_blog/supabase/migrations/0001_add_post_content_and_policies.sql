-- Add content column to store markdown
ALTER TABLE posts ADD COLUMN IF NOT EXISTS content TEXT DEFAULT '';

-- Add user_id column to associate posts with authenticated users
ALTER TABLE posts ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Policy to allow authenticated users to insert a new post
CREATE POLICY "Authenticated users can insert posts" ON posts 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Policy to allow users to update only their own posts
CREATE POLICY "Users can update their own posts" ON posts 
FOR UPDATE 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);
