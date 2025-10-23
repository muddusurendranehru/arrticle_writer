# 📚 Topic-Based Research System - User Guide

## 🎯 What Is This?

A powerful research organization system where you can:

1. **Create Topics** - Organize research by subject (e.g., "Heart Disease Research", "AI in Medicine")
2. **Add Entries** - Insert research data anytime, line by line
3. **View Data** - See all saved entries for each topic
4. **Get Human-Like Rewrites** - Make AI text sound natural
5. **Future Ready** - Built for ResearchPal, PaperPal integration

---

## 🗄️ Step 1: Run Database Migration

First, add the new tables to your database:

### Option A: Using PostgreSQL Command (Recommended)

```powershell
# Connect to your Neon database and run the schema
psql "postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require" -f database/schema_topics.sql
```

### Option B: Copy-Paste in Neon Console

1. Go to: https://console.neon.tech
2. Select your `article_writer` database
3. Open SQL Editor
4. Copy contents from `database/schema_topics.sql`
5. Run the SQL
6. Verify tables created:
   ```sql
   SELECT * FROM topics LIMIT 1;
   SELECT * FROM research_entries LIMIT 1;
   ```

---

## 🎨 How It Works

### Workflow:

```
1. Create Topic (e.g., "Cancer Research")
   ↓
2. Click "Add Entry" button
   ↓
3. Insert research text (right side)
   ↓
4. Click "Rewrite" to make it human-like (left side)
   ↓
5. Save entry
   ↓
6. Click "View Data" to see all entries for this topic
   ↓
7. Add more entries anytime you're free
```

---

## 📋 Database Structure

### Topics Table:
- **id**: Unique identifier
- **user_id**: Owner of the topic
- **name**: Topic name (e.g., "Heart Disease Research")
- **description**: Optional details
- **status**: active, archived, or completed

### Research Entries Table:
- **id**: Unique identifier
- **topic_id**: Which topic this belongs to
- **original_text**: Your input (right side)
- **rewritten_text**: Human-like output (left side)
- **source**: Where you got this (optional)
- **notes**: Your personal notes
- **is_processed**: Whether it's been rewritten

---

## 🔌 API Endpoints Created

### Topics:
```
POST   /api/topics              - Create new topic
GET    /api/topics              - Get all your topics
GET    /api/topics/:id          - Get specific topic
PUT    /api/topics/:id          - Update topic
DELETE /api/topics/:id          - Delete topic
```

### Research Entries:
```
POST   /api/topics/:topicId/entries     - Add entry to topic
GET    /api/topics/:topicId/entries     - Get all entries for topic
GET    /api/topics/entries/:id          - Get specific entry
PUT    /api/topics/entries/:id          - Update entry
DELETE /api/topics/entries/:id          - Delete entry
```

---

## 💡 Example Usage

### Create a Topic:
```javascript
POST /api/topics
{
  "name": "Heart Disease Research",
  "description": "Research on cardiovascular diseases"
}
```

### Add Research Entry:
```javascript
POST /api/topics/{topicId}/entries
{
  "originalText": "Studies show that exercise reduces heart disease risk by 30%...",
  "source": "PubMed Article #12345",
  "notes": "Important for introduction section"
}
```

### Get All Entries:
```javascript
GET /api/topics/{topicId}/entries

Response:
{
  "success": true,
  "data": {
    "entries": [
      {
        "id": "uuid",
        "original_text": "Studies show...",
        "rewritten_text": "Research indicates...",
        "source": "PubMed #12345",
        "is_processed": true,
        "created_at": "2025-10-23..."
      }
    ]
  }
}
```

---

## 🎨 UI Flow (To Be Built)

### Topics Page (`/topics`):
```
┌──────────────────────────────────────────┐
│  My Research Topics                       │
├──────────────────────────────────────────┤
│  [+ New Topic]                            │
│                                            │
│  📚 Heart Disease Research         [View] │
│     12 entries • Last updated 2 hrs ago   │
│                                            │
│  📚 AI in Medicine                  [View] │
│     8 entries • Last updated 1 day ago    │
│                                            │
│  📚 Cancer Treatment Studies        [View] │
│     5 entries • Last updated 3 days ago   │
└──────────────────────────────────────────┘
```

### Topic Detail Page (`/topics/{id}`):
```
┌──────────────────────────────────────────────────────────┐
│  Topic: Heart Disease Research                            │
│  [+ Add Entry] [View All Data] [Archive]                  │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  Right Side (Input)        │  Left Side (Output)          │
│  ─────────────────────     │  ─────────────────────       │
│  [Type/paste research]     │  [Human-like rewrite]        │
│                             │                              │
│                             │  [✍️ Rewrite]                │
│                             │  [💾 Save Entry]             │
│                                                            │
├──────────────────────────────────────────────────────────┤
│  Recent Entries:                                           │
│  • Study on exercise... (2 hours ago)                     │
│  • Meta-analysis of diet... (1 day ago)                   │
│  • Clinical trial results... (3 days ago)                 │
└──────────────────────────────────────────────────────────┘
```

### View All Data Modal:
```
┌──────────────────────────────────────────┐
│  All Entries - Heart Disease Research    │
│  [Export] [Filter] [Search]       [Close]│
├──────────────────────────────────────────┤
│                                            │
│  Entry #1 - Oct 23, 2025                  │
│  Original: Studies show exercise...       │
│  Rewritten: Research indicates...         │
│  Source: PubMed #12345                    │
│  [Edit] [Delete] [Copy]                   │
│  ─────────────────────────────────────    │
│                                            │
│  Entry #2 - Oct 22, 2025                  │
│  Original: Meta-analysis reveals...       │
│  Rewritten: A comprehensive review...     │
│  Source: JAMA 2024                        │
│  [Edit] [Delete] [Copy]                   │
│                                            │
└──────────────────────────────────────────┘
```

---

## 🔮 Future Features

### Phase 1 (Current):
- ✅ Create topics
- ✅ Add research entries
- ✅ View all data
- ✅ Human-like rewriting

### Phase 2 (Coming Soon):
- 🔄 ResearchPal integration (find papers)
- 🔄 PaperPal integration (paper analysis)
- 🔄 SciHub integration (paper access)
- 🔄 PubMed API (medical research)
- 🔄 Semantic Scholar (CS research)

### Phase 3 (Future):
- 📊 Statistics dashboard
- 🔍 Search across all topics
- 📁 Export to PDF/DOCX by topic
- 👥 Share topics with collaborators
- 🏷️ Tags and categories
- 📌 Pin important entries

---

## 🚀 Next Steps

1. **Run database migration** (see Step 1 above)
2. **Restart backend server** to load new routes
3. **Test API** using browser or Postman
4. **Build frontend UI** (Topics page + Entry interface)
5. **Integrate with existing rewrite functionality**

---

## ✅ Benefits

### For Customers:
- ✅ **Organized**: All research in one place, by topic
- ✅ **Flexible**: Add entries anytime you're free
- ✅ **Human-like**: AI rewrites that don't look like AI
- ✅ **Searchable**: Find any entry quickly
- ✅ **Scalable**: Unlimited topics and entries

### For Development:
- ✅ **Modular**: Easy to add new features
- ✅ **API-Ready**: Built for ResearchPal/PaperPal
- ✅ **Secure**: User-specific data with authentication
- ✅ **Fast**: Indexed database queries
- ✅ **Extensible**: Ready for future integrations

---

## 🎯 Summary

**What you can do NOW (after migration):**
1. Create research topics
2. Add entries to each topic
3. Rewrite entries to sound human-like
4. View all data for any topic
5. Edit/delete entries
6. Archive completed topics

**What's coming NEXT:**
- ResearchPal integration (find research papers)
- PaperPal integration (analyze papers)
- Beautiful UI for topics management
- Export functionality
- Advanced search

---

**Backend Ready!** ✅  
**Database Schema Ready!** ✅  
**API Endpoints Ready!** ✅  
**Frontend UI:** Next step

---

_Built for researchers who need organization, flexibility, and human-like outputs!_ 🚀

