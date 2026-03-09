// ============================================================
//  FITTRACK — CONFIG
//  Replace the values below with your own credentials
// ============================================================

// 1. Get from: supabase.com → Your Project → Settings → API
const SUPABASE_URL     = 'https://aoapoxpuwczvixlpszaa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYXBveHB1d2N6dml4bHBzemFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMzQ3MTgsImV4cCI6MjA4ODYxMDcxOH0.rP49yOmwROb8M4aZcpJzz73vMDjuKh7-dAiR7DsFE-s';


// 3. Your weight in lbs — used for AI calorie estimates
const USER_WEIGHT_LBS = 260;

// ============================================================
//  DO NOT EDIT BELOW THIS LINE
// ============================================================
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
//  SUPABASE DATABASE SETUP — Run this SQL once in your
//  Supabase Dashboard → SQL Editor
// ============================================================
//
// CREATE TABLE user_settings (
//   user_id     uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
//   goal_mode   text DEFAULT 'auto',
//   manual_goal int,
//   updated_at  timestamptz DEFAULT now()
// );
//
// ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "own settings" ON user_settings FOR ALL USING (auth.uid() = user_id);
//
// CREATE TABLE food_log (
//   id         uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
//   user_id    uuid    REFERENCES auth.users(id) ON DELETE CASCADE,
//   food_name  text    NOT NULL,
//   calories   int     NOT NULL,
//   meal_type  text    DEFAULT 'snack',
//   logged_at  date    DEFAULT CURRENT_DATE,
//   created_at timestamptz DEFAULT now()
// );
//
// CREATE TABLE cardio_log (
//   id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   user_id        uuid REFERENCES auth.users(id) ON DELETE CASCADE,
//   machine        text NOT NULL,
//   duration_mins  int  NOT NULL,
//   calories_burned int NOT NULL,
//   logged_at      date DEFAULT CURRENT_DATE,
//   created_at     timestamptz DEFAULT now()
// );
//
// CREATE TABLE weight_log (
//   id         uuid          DEFAULT gen_random_uuid() PRIMARY KEY,
//   user_id    uuid          REFERENCES auth.users(id) ON DELETE CASCADE,
//   weight_lbs numeric(5,1)  NOT NULL,
//   note       text,
//   logged_at  date          DEFAULT CURRENT_DATE,
//   created_at timestamptz   DEFAULT now()
// );
//
// ALTER TABLE food_log   ENABLE ROW LEVEL SECURITY;
// ALTER TABLE cardio_log ENABLE ROW LEVEL SECURITY;
// ALTER TABLE weight_log ENABLE ROW LEVEL SECURITY;
//
// CREATE POLICY "own food"   ON food_log   FOR ALL USING (auth.uid() = user_id);
// CREATE POLICY "own cardio" ON cardio_log FOR ALL USING (auth.uid() = user_id);
// CREATE POLICY "own weight" ON weight_log FOR ALL USING (auth.uid() = user_id);
