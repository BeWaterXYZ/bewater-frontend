import { useQuery } from "@tanstack/react-query";

interface AIAnalysisItem {
  id: number;
  user: string;
  prompt: string;
  task_type: string;
  solution: string;
  solver: string;
  fee: number;
  fee_unit: string;
  tx: string;
  created_at: string;
  solved_at: string;
  signature: string | null;
  unique_id: string;
  solver_type: string[];
}

export interface AIAnalysisData {
  items: AIAnalysisItem[];
  error?: string;
}

// Extract GitHub repo URL from the prompt
export function extractGithubUrl(prompt: string): string | null {
  const match = prompt.match(/github link: (https:\/\/github\.com\/[^\s,\n]+)/);
  return match ? match[1] : null;
}

// Extract project name from the prompt
export function extractProjectName(prompt: string): string | null {
  const match = prompt.match(/project name: ([^\n]+)/);
  return match ? match[1] : null;
}

// Fetch AI analysis data
export function useAIAnalysisData() {
  return useQuery<AIAnalysisItem[]>({
    queryKey: ["ai-analysis"],
    queryFn: async () => {
      const response = await fetch(
        "https://ai-saas.deno.dev/my_task?addr=0x519c59663d7dcbe4f8fde79e3ee171f2dd2682b41ee9e8889dfbf42b2b232c95"
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch AI analysis data");
      }
      
      const data = await response.json();
      return data;
    },
    staleTime: Infinity, // Data won't become stale
    cacheTime: Infinity, // Keep the data in cache indefinitely
    refetchOnWindowFocus: false, // Don't refetch when window focus changes
    refetchOnMount: false, // Don't refetch when component mounts
    refetchOnReconnect: false, // Don't refetch when reconnecting
  });
}

// Get AI analysis for a specific GitHub repo
export function getAnalysisForRepo(data: AIAnalysisItem[] | undefined, repoUrl: string): AIAnalysisItem | null {
  if (!data || !repoUrl) return null;

  // Normalize the repo URL (handle formats like owner/repo or full URL)
  const normalizedRepoUrl = repoUrl.includes("https://github.com/") 
    ? repoUrl 
    : `https://github.com/${repoUrl}`;

  // Find the analysis item that matches the repo URL
  const item = data.find(item => {
    const itemGithubUrl = extractGithubUrl(item.prompt);
    if (!itemGithubUrl) return false;
    
    return itemGithubUrl === normalizedRepoUrl || 
           normalizedRepoUrl.includes(itemGithubUrl) || 
           itemGithubUrl.includes(normalizedRepoUrl);
  });

  return item || null;
} 