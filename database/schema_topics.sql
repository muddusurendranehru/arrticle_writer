-- Research Topics & Entries System
-- Extension to existing schema for topic-based research organization

-- Table: Topics (Research subjects/projects)
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active', -- active, archived, completed
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: Research Entries (Data added to topics)
CREATE TABLE research_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Input and output
    original_text TEXT NOT NULL,
    rewritten_text TEXT,
    
    -- Metadata
    entry_type VARCHAR(50) DEFAULT 'manual', -- manual, imported, api_fetched
    source VARCHAR(255), -- Where this came from (if applicable)
    notes TEXT,
    
    -- Status
    is_processed BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_topics_user_id ON topics(user_id);
CREATE INDEX idx_topics_status ON topics(status);
CREATE INDEX idx_research_entries_topic_id ON research_entries(topic_id);
CREATE INDEX idx_research_entries_user_id ON research_entries(user_id);
CREATE INDEX idx_research_entries_created_at ON research_entries(created_at DESC);

-- Add updated_at triggers
CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON topics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_entries_updated_at BEFORE UPDATE ON research_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample view: Topic with entry counts
CREATE VIEW topics_with_counts AS
SELECT 
    t.id,
    t.user_id,
    t.name,
    t.description,
    t.status,
    t.created_at,
    t.updated_at,
    COUNT(re.id) as total_entries,
    COUNT(CASE WHEN re.is_processed = true THEN 1 END) as processed_entries,
    COUNT(CASE WHEN re.is_processed = false THEN 1 END) as pending_entries
FROM topics t
LEFT JOIN research_entries re ON t.id = re.topic_id
GROUP BY t.id, t.user_id, t.name, t.description, t.status, t.created_at, t.updated_at;


