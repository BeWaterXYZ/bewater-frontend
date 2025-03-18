"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Bot, ArrowLeft, Github, Loader2, BookOpen, GitCompare, BrainCircuit, XCircle, CheckCircle2, AlertTriangle, Star, Sparkles } from "lucide-react";
import { useAIAnalysisData, getAnalysisForRepo, extractProjectName } from "@/services/ai-analyze.query";
// @ts-ignore - React-markdown has type issues but works fine
import ReactMarkdown from "react-markdown";

interface AIAnalyzeProps {
  ecosystem: string;
  sector: string;
  subEcosystem?: string | undefined;
  lng: string;
  projectName?: string;
  onBack?: () => void;
}

// 函数用于增强并格式化Markdown文本
function enhanceMarkdown(text: string): string {
  // 替换emoji为更统一的符号
  let enhanced = text
    .replace(/➡️/g, '→')
    .replace(/✅/g, '✓')
    .replace(/❌/g, '✗');
  
  // 将评分行格式化为特殊样式
  enhanced = enhanced.replace(
    /\*\*Score:?\s*([\w\s]+)\s*\((\d+)\/(\d+)\)\*\*/g, 
    '**Rating:** <span class="rating">$1 <span class="score">$2/$3</span></span>'
  );

  // "Overall Project Rating"格式化
  enhanced = enhanced.replace(
    /\*\*Overall Project Rating:\s*(\d+)\/(\d+)\*\*/g,
    '**<span class="highlight">Overall Project Rating:</span>** <span class="overall-score">$1/$2</span>'
  );
  
  // 高亮"Final Summary"部分
  enhanced = enhanced.replace(
    /\*\*(?:Final |Overall |)Summary\*\*/g,
    '**<span class="highlight">Summary</span>**'
  );
  
  // 高亮"Strengths"和"Areas for Improvement"部分
  enhanced = enhanced.replace(
    /\*\*(Strengths|Areas for Improvement|Recommendation|Next Steps|Improvements Needed|Final Verdict|Key Findings|Suggested Improvements)\*\*/g,
    '**<span class="section-highlight">$1</span>**'
  );
  
  // 美化✅/❌/⚠️ 的条目
  enhanced = enhanced.replace(
    /(^|\\n)([✓✅]) /gm, 
    '$1<span class="success-item">$2</span> '
  );
  
  enhanced = enhanced.replace(
    /(^|\\n)([✗❌]) /gm, 
    '$1<span class="error-item">$2</span> '
  );
  
  enhanced = enhanced.replace(
    /(^|\\n)([⚠]) /gm, 
    '$1<span class="warning-item">$2</span> '
  );
  
  // 格式化 3 Snippets 标题
  enhanced = enhanced.replace(
    /\*\*3 Snippets(?:\s*\([^)]*\))?\*\*/g, 
    '**<span class="code-highlight">Code Analysis</span>**'
  );
  
  return enhanced;
}

export default function AIAnalyze({ ecosystem, sector, subEcosystem, lng, projectName, onBack }: AIAnalyzeProps) {
  const { t } = useTranslation(lng, "translation");
  const [owner, repo] = (projectName || "").split("/");
  
  // Fetch AI analysis data
  const { data: analysisData, isLoading, error } = useAIAnalysisData();
  
  // Get the analysis for the current project
  const analysis = projectName ? getAnalysisForRepo(analysisData, projectName) : null;
  
  // Extract the project name from the prompt
  const projectTitle = analysis ? extractProjectName(analysis.prompt) : null;

  return (
    <div className="w-full py-10">
      <div className="bg-[#1E293B] rounded-lg p-6 overflow-hidden relative">
        {/* Decorative Elements */}
        {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#334155] via-[#00FFFF] to-[#334155] opacity-50"></div> */}
        {/* <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#00FFFF] to-transparent opacity-20"></div> */}

        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack} 
            className="flex items-center gap-1 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to projects</span>
          </button>
          <div className="flex items-center gap-2">
            <Bot size={24} className="text-[#00FFFF]" />
            <h2 className="text-xl text-[#F8FAFC]">AI Project Analysis</h2>
          </div>
          <div className="w-[100px]"></div> {/* Empty div for balance */}
        </div>

        {!projectName ? (
          <div className="text-center py-10">
            <Github size={40} className="text-[#475569] mx-auto mb-4" />
            <p className="text-[#94A3B8] mb-2">
              No project selected
            </p>
            <p className="text-xs text-[#64748B]">
              Please select a project from the Projects tab to analyze
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#00FFFF] animate-spin" />
            <p className="mt-4 text-[#94A3B8]">Loading AI analysis...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <XCircle size={40} className="text-red-500 mx-auto mb-4" />
            <p className="text-[#94A3B8] mb-2">
              Error loading analysis
            </p>
            <p className="text-xs text-[#64748B]">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        ) : !analysis ? (
          <div className="text-center py-10">
            <BookOpen size={40} className="text-[#475569] mx-auto mb-4" />
            <p className="text-[#94A3B8] mb-2">
              No analysis available for this project
            </p>
            <p className="text-xs text-[#64748B]">
              This project hasn&apos;t been analyzed yet
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border border-[#334155] rounded-lg p-4 bg-gradient-to-br from-[#1E293B] to-[#0F172A] shadow-xl">
              <h3 className="text-[#F8FAFC] font-bold mb-2 flex items-center gap-2">
                <Github size={16} />
                <span>{projectTitle || repo}</span>
              </h3>
              
              <div className="flex items-center gap-2 text-[#94A3B8] text-xs mb-4">
                <a 
                  href={`https://github.com/${projectName}`}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hover:text-[#00FFFF] transition-colors flex items-center gap-1"
                >
                  <Github size={12} />
                  {projectName}
                </a>
              </div>
              
              {analysis.solution === "lack of readme" || 
               analysis.solution === "lack of intro video" || 
               analysis.solution === "lack of intro text" || 
               analysis.solution === "too little code" || 
               analysis.solution === "lack of spec repo" || 
               analysis.solution === "lack of readme of the project itself" ||
               analysis.solution.length < 100 ? (
                <div className="bg-[#0F172A] rounded-lg p-4 text-[#94A3B8] mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={16} className="text-yellow-500" />
                    <p className="font-medium">Analysis could not be completed</p>
                  </div>
                  <p className="text-sm">
                    {analysis.solution}
                  </p>
                </div>
              ) : (
                <div className="mt-4 prose prose-invert prose-sm max-w-none custom-markdown">
                  <style jsx global>{`
                    .custom-markdown .rating {
                      display: inline-flex;
                      align-items: center;
                      gap: 8px;
                    }
                    .custom-markdown .score,
                    .custom-markdown .overall-score {
                      background: #334155;
                      padding: 2px 8px;
                      border-radius: 12px;
                      font-size: 0.9em;
                      color: #00FFFF;
                    }
                    .custom-markdown .overall-score {
                      background: #1E293B;
                      border: 1px solid #00FFFF;
                      font-weight: bold;
                    }
                    .custom-markdown .highlight {
                      color: #00FFFF;
                      font-size: 1.1em;
                    }
                    .custom-markdown .code-highlight {
                      color: #10B981;
                      font-size: 1.1em;
                    }
                    .custom-markdown .section-highlight {
                      color: #FFA500;
                    }
                    .custom-markdown ul li {
                      position: relative;
                      margin-bottom: 0.5em;
                    }
                    .custom-markdown .success-item {
                      color: #10B981;
                      font-weight: bold;
                    }
                    .custom-markdown .error-item {
                      color: #EF4444;
                      font-weight: bold;
                    }
                    .custom-markdown .warning-item {
                      color: #F59E0B;
                      font-weight: bold;
                    }
                    .custom-markdown table {
                      width: 100%;
                      border-collapse: collapse;
                    }
                    .custom-markdown h3 + ul {
                      border-left: 2px solid #334155;
                      padding-left: 1rem;
                      margin-left: 0.5rem;
                    }
                    .custom-markdown hr {
                      margin: 1.5rem 0;
                      border-color: #334155;
                      opacity: 0.5;
                    }
                    .custom-markdown blockquote {
                      border-image: linear-gradient(to bottom, #00FFFF, transparent) 1 100%;
                    }
                    .custom-markdown pre {
                      position: relative;
                    }
                    .custom-markdown pre:before {
                      content: "code";
                      position: absolute;
                      top: 0;
                      right: 0;
                      background: #1E293B;
                      color: #64748B;
                      font-size: 0.7rem;
                      padding: 0.1rem 0.5rem;
                      border-bottom-left-radius: 0.25rem;
                    }
                    .custom-markdown a {
                      position: relative;
                      display: inline-block;
                    }
                    .custom-markdown a::after {
                      content: '';
                      position: absolute;
                      width: 100%;
                      height: 1px;
                      bottom: 0;
                      left: 0;
                      background-color: #00FFFF;
                      transform: scaleX(0);
                      transform-origin: bottom right;
                      transition: transform 0.3s;
                    }
                    .custom-markdown a:hover::after {
                      transform: scaleX(1);
                      transform-origin: bottom left;
                    }
                  `}</style>
                  <ReactMarkdown components={{
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-white mb-4 mt-6 border-b border-gray-700 pb-2" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-white mb-3 mt-5 border-b border-gray-800 pb-1" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-[#00FFFF] mb-2 mt-4" {...props} />,
                    p: ({ node, ...props }) => <p className="text-[#94A3B8] mb-3 leading-relaxed" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-none pl-4 mb-4 text-[#94A3B8] space-y-2" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 text-[#94A3B8]" {...props} />,
                    li: ({ node, ...props }) => <li className="mb-1 leading-relaxed" {...props} />,
                    a: ({ node, ...props }) => <a className="text-[#00FFFF] hover:underline" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-[#334155] pl-4 italic text-gray-400 my-3" {...props} />,
                    code: ({ node, ...props }) => <code className="bg-[#0F172A] px-1.5 py-0.5 rounded text-[#E2E8F0] font-mono text-sm" {...props} />,
                    pre: ({ node, ...props }) => <pre className="bg-[#0F172A] p-3 rounded-lg overflow-x-auto mb-4 text-[#E2E8F0] border border-[#1E293B]" {...props} />,
                    em: ({ node, ...props }) => <em className="text-gray-300 italic" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                    table: ({ node, ...props }) => <div className="overflow-x-auto mb-4"><table className="min-w-full border-collapse border border-[#1E293B]" {...props} /></div>,
                    th: ({ node, ...props }) => <th className="border border-[#1E293B] bg-[#0F172A] px-4 py-2 text-left text-[#00FFFF]" {...props} />,
                    td: ({ node, ...props }) => <td className="border border-[#1E293B] px-4 py-2 text-[#94A3B8]" {...props} />,
                    tr: ({ node, ...props }) => <tr className="hover:bg-[#1E293B]" {...props} />,
                    hr: ({ node, ...props }) => <hr className="border-t border-[#334155] my-6" {...props} />,
                  }}>
                    {enhanceMarkdown(analysis.solution)}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            <div className="bg-[#0F172A] rounded-lg p-4 text-[#94A3B8] text-sm border border-[#334155] border-opacity-50">
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit size={16} className="text-[#00FFFF]" />
                <p className="font-medium">About AI Analysis</p>
              </div>
              <p className="text-xs">
                This analysis was generated by an AI to evaluate the project based on its GitHub repository, README, code quality, and introduction.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 