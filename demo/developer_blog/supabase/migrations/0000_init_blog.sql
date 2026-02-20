-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  read_time INTEGER NOT NULL, -- in minutes
  image_url TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_avatar_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create Policies (Public Read, No Write for anonymous)
CREATE POLICY "Public categories are viewable by everyone." ON categories FOR SELECT USING (true);
CREATE POLICY "Public posts are viewable by everyone." ON posts FOR SELECT USING (true);

-- Seed Data
INSERT INTO categories (id, name, slug) VALUES
  ('11111111-1111-1111-1111-111111111111', '프론트엔드', 'frontend'),
  ('22222222-2222-2222-2222-222222222222', '백엔드', 'backend'),
  ('33333333-3333-3333-3333-333333333333', '데브옵스', 'devops'),
  ('44444444-4444-4444-4444-444444444444', '시스템 설계', 'system-design'),
  ('55555555-5555-5555-5555-555555555555', '리액트', 'react'),
  ('66666666-6666-6666-6666-666666666666', '보안', 'security'),
  ('77777777-7777-7777-7777-777777777777', '데이터베이스', 'database')
ON CONFLICT (id) DO NOTHING;

INSERT INTO posts (title, excerpt, category_id, read_time, image_url, author_name, author_avatar_url, created_at) VALUES
  ('The Evolution of React Server Components: A 2024 Perspective', 'Understanding how RSCs are reshaping the data fetching paradigm and what it means for the future of Next.js applications.', '55555555-5555-5555-5555-555555555555', 8, 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5wVKHC6eWP9OOCPzjQXUfv0e_PGixsZzfPW0r27k1q3aYgKXcYCmwiDKnqqu2c3c-MppBEAgHp5krBJBEW8XRATMhJI7EDQ1iZ9u6weVeiU6MQvMVz-_nPXT3hdQkPHE9T2BCLsIpcmDZHjFGcGj01KIBV8KlO0I7mnyb-pEB5LrzaO9otUDrQfYovJZibmFmvSqki-eGKb4fFfKbCT0Bv1UfWj1MRoSC8MF61v5Evqhqg2vzyZOXHfoRzJu56juU2ZXxVMv6DOU', 'Alex Chen', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiCyv6k1Yv7H394mPgh8BPnfdS65r2H1bJNMhVujnLUUcEFqtPzfep1BoPZ2krfI2CbheDyWQ_4IW7436xRoqAS47FFei4ADEro2-LlmZuSqg7FN75pfX-i_GyMG6YPBG42u3HurxEVa0I8QrVgS5EoWvBkyOdTMw34hiPYDN3f8cIh2uXwNLPLRlKYKCduL18Q_lj1hMYvPSylm9DTi2JvnbmtkmxGjnRbL3uKhkEPBTkye5BJqNnGTwoobhyaFuDQGaspw7E6Gw', '2023-10-24T00:00:00Z'),
  ('Scaling Microservices with Kubernetes', 'Best practices for managing cluster resources, configuring auto-scaling, and ensuring high availability in production environments.', '44444444-4444-4444-4444-444444444444', 12, 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4leZi2wQTQdHCcwye35PJAZG2WNG5fQAF-ek9u1M9-YHLQU20g9SCGVsf2ocx700BrZ6wIANymy1nBZEIJ8dQYS2Ki9MkgqzGhtHEy9xJCvJJ33arQCnGtmrpqfxXkMbOmRXbZZln4Bhu3CAbA21Vrtdptp9-BJjvzmgaDIoCkNJCeBTnxQFMSjc2pKnqLrVXrYG-qUqIhknSxNiqf_1dYMLHAQgENxtU18KAYm25NbQzns-psxHSvInfCajIDHRFZkc9-hgwOSI', 'Alex Chen', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiCyv6k1Yv7H394mPgh8BPnfdS65r2H1bJNMhVujnLUUcEFqtPzfep1BoPZ2krfI2CbheDyWQ_4IW7436xRoqAS47FFei4ADEro2-LlmZuSqg7FN75pfX-i_GyMG6YPBG42u3HurxEVa0I8QrVgS5EoWvBkyOdTMw34hiPYDN3f8cIh2uXwNLPLRlKYKCduL18Q_lj1hMYvPSylm9DTi2JvnbmtkmxGjnRbL3uKhkEPBTkye5BJqNnGTwoobhyaFuDQGaspw7E6Gw', '2023-10-20T00:00:00Z'),
  ('CSS Container Queries are Finally Here', 'Move over Media Queries. Learn how to build truly responsive components that adapt to their container size, not just the viewport.', '11111111-1111-1111-1111-111111111111', 5, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhtGllEse-1XoY662bZkFJRxvptNFxlQFfHjstzbA4p0Y0WZcAFwLrdtKyZ0EhZfukXa9OJM7GDWqvTHe34clSfZB-v0LcBO8CgqdZzIo6S2PLW6nDAto805TlPc4wuZnKeXrvw1HGaOF1Whlw2us82fM2E47qVnrL0ABekXtBDFr49bgg3UtWQj2rAqy2XpY9N3rQ64rUkHFeBIjes9ffw2ScEW7jf4hoyniNP34WQMKHj8bUe09c2bDm3KyEc1doRvDHo5aQCjY', 'Alex Chen', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiCyv6k1Yv7H394mPgh8BPnfdS65r2H1bJNMhVujnLUUcEFqtPzfep1BoPZ2krfI2CbheDyWQ_4IW7436xRoqAS47FFei4ADEro2-LlmZuSqg7FN75pfX-i_GyMG6YPBG42u3HurxEVa0I8QrVgS5EoWvBkyOdTMw34hiPYDN3f8cIh2uXwNLPLRlKYKCduL18Q_lj1hMYvPSylm9DTi2JvnbmtkmxGjnRbL3uKhkEPBTkye5BJqNnGTwoobhyaFuDQGaspw7E6Gw', '2023-10-18T00:00:00Z'),
  ('Automating Deployments with GitHub Actions', 'A step-by-step guide to setting up CI/CD pipelines for your Node.js applications using GitHub''s native automation tool.', '33333333-3333-3333-3333-333333333333', 8, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGfmC4S2CFXTcO2NPy6sUHRp8VKuX51Aeuqrp7oym7R4AWNrzKU7z0iCq8OuHBGjxbXuhNDUACe1iAvqqUnnusoHD7Zj9NkuPD_H5dyLcS_XNDl5yIQibcUKRa4IbcAeMc1uoo0Bwk-XcDrKGm2yqNcBIKnSj0a6QGNNXA-hH1FMsTDkv0EQh-bhlI7Li_SX0CsFlSPcPAf7BSEhSFbUDP2WNxJZFAGJvEZDdfLcYWzuqetXEivD_b-kubzHOeeHJAXd9PVSL6XSk', 'Alex Chen', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiCyv6k1Yv7H394mPgh8BPnfdS65r2H1bJNMhVujnLUUcEFqtPzfep1BoPZ2krfI2CbheDyWQ_4IW7436xRoqAS47FFei4ADEro2-LlmZuSqg7FN75pfX-i_GyMG6YPBG42u3HurxEVa0I8QrVgS5EoWvBkyOdTMw34hiPYDN3f8cIh2uXwNLPLRlKYKCduL18Q_lj1hMYvPSylm9DTi2JvnbmtkmxGjnRbL3uKhkEPBTkye5BJqNnGTwoobhyaFuDQGaspw7E6Gw', '2023-10-15T00:00:00Z'),
  ('Mastering useEffect and Its Pitfalls', 'Stop writing buggy React code. We explore the dependency array, cleanup functions, and common mistakes developers make.', '55555555-5555-5555-5555-555555555555', 6, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUbaAWVA_Amg13miTpj0AEBL_kd9Wbz0xMDfXkJosWJ4FOIF73xWvwboN_tAurNqpzAiAqABv3ZgGqkwcR62hrqLU8DAGhwvPSQl-sDvKN5Jgis_FIu72PvBX5yILo65zU8HQwvgZAH_ut4PEeHVhetBIDOjWs4YDIvZ3_UhAUkkprY8A62cAS7onxJUmLhldvGGduavu3tM73BqWVQ2x58VDKCE8MSR6qGBvUwiBxQIrB4tfFIm-w_AnKdVH3vqIg_iysXSeFCMU', 'Alex Chen', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiCyv6k1Yv7H394mPgh8BPnfdS65r2H1bJNMhVujnLUUcEFqtPzfep1BoPZ2krfI2CbheDyWQ_4IW7436xRoqAS47FFei4ADEro2-LlmZuSqg7FN75pfX-i_GyMG6YPBG42u3HurxEVa0I8QrVgS5EoWvBkyOdTMw34hiPYDN3f8cIh2uXwNLPLRlKYKCduL18Q_lj1hMYvPSylm9DTi2JvnbmtkmxGjnRbL3uKhkEPBTkye5BJqNnGTwoobhyaFuDQGaspw7E6Gw', '2023-10-12T00:00:00Z'),
  ('OWASP Top 10: 2024 Edition', 'Security isn''t an afterthought. Review the most critical web application security risks and how to mitigate them effectively.', '66666666-6666-6666-6666-666666666666', 15, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHPXCYRXwAoi8Op7t7nOYgSDMgQ-i3JsKtqQaE_-rFCYejR2WMZaHdWLYIXF-WpqQdIfDthkzixanx15vdlVfj1xUcwELf4kMWQuPNN93JLHbMd9F--RqdCSXkFwrtK1kIrFSeGIcPZu_wgnilQs-NW0wZFQoEVTaAN9-zzaRjeh7Y8oy99s3yDHJJPPnj3PJf7Pc0eYsVi2KNeDWbpZKGrtto8hLSxJZ7AmhpZXoqoDmM7hgxmSyxS5KBAddpdf-sCwqR5VXxOJQ', 'Alex Chen', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiCyv6k1Yv7H394mPgh8BPnfdS65r2H1bJNMhVujnLUUcEFqtPzfep1BoPZ2krfI2CbheDyWQ_4IW7436xRoqAS47FFei4ADEro2-LlmZuSqg7FN75pfX-i_GyMG6YPBG42u3HurxEVa0I8QrVgS5EoWvBkyOdTMw34hiPYDN3f8cIh2uXwNLPLRlKYKCduL18Q_lj1hMYvPSylm9DTi2JvnbmtkmxGjnRbL3uKhkEPBTkye5BJqNnGTwoobhyaFuDQGaspw7E6Gw', '2023-10-10T00:00:00Z'),
  ('Choosing the Right Database for Your Project', 'SQL vs NoSQL? Postgres vs Mongo? We break down the trade-offs to help you make the best architectural decision.', '77777777-7777-7777-7777-777777777777', 9, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWL0SwuxFZ0-uI8uEVQO2MrJICxHDGqqwtIwWcuya1TEdDqLT-HxXvHMi3CoyyxyZo3vqX3rPnVe3B86wv6-hXrYPe9rgQo6jPxKjRZmWugelkUZAtPMedxaYVrTm7gzeDLp9aT0Wr2PZjD4i6EePBsS6mzUugZZQOfHmHvjemb15H9tXUJSJ8KzGFxI0EgWsPA5i2QYmMPc7Po_EguQnFstXAOsgJyf8_ZgRCAf-G3339SPdLikv3jrQZEqhhrexKGFH1iAmPWOw', 'Alex Chen', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiCyv6k1Yv7H394mPgh8BPnfdS65r2H1bJNMhVujnLUUcEFqtPzfep1BoPZ2krfI2CbheDyWQ_4IW7436xRoqAS47FFei4ADEro2-LlmZuSqg7FN75pfX-i_GyMG6YPBG42u3HurxEVa0I8QrVgS5EoWvBkyOdTMw34hiPYDN3f8cIh2uXwNLPLRlKYKCduL18Q_lj1hMYvPSylm9DTi2JvnbmtkmxGjnRbL3uKhkEPBTkye5BJqNnGTwoobhyaFuDQGaspw7E6Gw', '2023-10-08T00:00:00Z')
ON CONFLICT DO NOTHING;
