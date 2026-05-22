-- Allow authenticated users to create their own profile (OAuth / email signup fallback)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
