# Frontend - Scientific Article Writing Agent

Next.js 14 frontend application with TypeScript and Tailwind CSS.

## Features

- ✅ User authentication (Sign Up, Login, Logout)
- ✅ Dual-panel editor (Input/Output)
- ✅ AI text rewriting
- ✅ Grammar checking
- ✅ AI detection
- ✅ Vancouver-style citations
- ✅ PDF/DOCX export
- ✅ Draft management
- ✅ Protected routes
- ✅ Responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Export**: react-pdf, docx, file-saver

## Installation

```bash
npm install
```

## Environment Variables

The frontend automatically connects to `http://localhost:5000` for development.

To change the API URL, create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Development

```bash
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Landing page
│   ├── signup/page.tsx    # Sign up page
│   ├── login/page.tsx     # Login page
│   ├── dashboard/page.tsx # Main dashboard
│   ├── drafts/page.tsx    # Drafts list
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── DashboardLayout.tsx   # Dashboard wrapper
│   ├── DualPanelEditor.tsx   # Main editor
│   ├── LeftPanel.tsx         # Input panel
│   ├── RightPanel.tsx        # Output panel
│   ├── ToolPanel.tsx         # Action buttons
│   └── ProtectedRoute.tsx    # Auth guard
├── lib/
│   ├── api.ts             # API client
│   └── export.ts          # Export utilities
└── store/
    ├── useAuthStore.ts    # Auth state
    └── useDraftStore.ts   # Draft state
```

## Pages

### Public Pages
- `/` - Landing page
- `/signup` - User registration
- `/login` - User login

### Protected Pages (require authentication)
- `/dashboard` - Main dual-panel editor
- `/drafts` - Saved drafts list

## Components

### DualPanelEditor
Main component that orchestrates the entire editing experience:
- Manages left/right panel content
- Handles AI rewriting
- Grammar checking
- AI detection
- Draft saving

### LeftPanel
Input panel for pasting research content:
- Textarea for original content
- Character and word count
- Auto-resize

### RightPanel
Output panel for rewritten content:
- Displays AI-generated text
- Shows citations
- Shows grammar errors
- Editable content

### ToolPanel
Action buttons for all operations:
- Rewrite button
- Grammar check
- AI detection
- Save draft
- Export (PDF/DOCX)
- AI score display

## State Management

### useAuthStore
```typescript
{
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login(user, token)
  logout()
  initAuth()
}
```

### useDraftStore
```typescript
{
  drafts: Draft[]
  currentDraft: Draft | null
  setDrafts(drafts)
  setCurrentDraft(draft)
  addDraft(draft)
  updateDraft(id, updates)
  removeDraft(id)
}
```

## API Integration

All API calls use the `api.ts` client with automatic token injection:

```typescript
import { authApi, draftsApi, toolsApi } from '@/lib/api'

// Auth
await authApi.signup({ email, password, confirmPassword })
await authApi.login({ email, password })

// Drafts
await draftsApi.create(data)
await draftsApi.getAll()

// Tools
await toolsApi.rewrite({ text })
await toolsApi.checkGrammar({ text })
await toolsApi.detectAI({ text })
```

## Styling

Uses Tailwind CSS with custom components defined in `globals.css`:

- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.btn-danger` - Danger/delete button
- `.input-field` - Form input field
- `.card` - Card container
- `.editor-panel` - Editor panel container
- `.custom-scrollbar` - Styled scrollbar

## Export Functionality

### PDF Export
Uses browser print dialog to save as PDF.

### DOCX Export
Generates Word document using `docx` library with:
- Title heading
- Formatted paragraphs
- Proper spacing

## Responsive Design

- Mobile-first approach
- Dual panels stack vertically on mobile
- Touch-friendly buttons
- Optimized for tablets and desktops

## Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Deploy via Vercel dashboard
# Set NEXT_PUBLIC_API_URL to production backend URL
```

### Netlify
```bash
# Build command: npm run build
# Publish directory: .next
# Set environment variable: NEXT_PUBLIC_API_URL
```

## License

MIT

