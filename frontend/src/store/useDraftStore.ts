import { create } from 'zustand';

interface Draft {
  id: string;
  userId: string;
  title: string | null;
  originalContent: string;
  rewrittenContent: string | null;
  citations: any[] | null;
  metadata: any | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface DraftState {
  drafts: Draft[];
  currentDraft: Draft | null;
  setDrafts: (drafts: Draft[]) => void;
  setCurrentDraft: (draft: Draft | null) => void;
  addDraft: (draft: Draft) => void;
  updateDraft: (id: string, updates: Partial<Draft>) => void;
  removeDraft: (id: string) => void;
}

export const useDraftStore = create<DraftState>((set) => ({
  drafts: [],
  currentDraft: null,

  setDrafts: (drafts) => set({ drafts }),

  setCurrentDraft: (draft) => set({ currentDraft: draft }),

  addDraft: (draft) =>
    set((state) => ({ drafts: [draft, ...state.drafts] })),

  updateDraft: (id, updates) =>
    set((state) => ({
      drafts: state.drafts.map((draft) =>
        draft.id === id ? { ...draft, ...updates } : draft
      ),
      currentDraft:
        state.currentDraft?.id === id
          ? { ...state.currentDraft, ...updates }
          : state.currentDraft,
    })),

  removeDraft: (id) =>
    set((state) => ({
      drafts: state.drafts.filter((draft) => draft.id !== id),
      currentDraft: state.currentDraft?.id === id ? null : state.currentDraft,
    })),
}));

