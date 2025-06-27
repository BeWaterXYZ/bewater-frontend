import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createErrorResponse, createSuccessResponse } from "@/lib/api-response";

interface BuilderboardContributor {
  login: string;
  avatar_url: string;
}

interface BuilderboardHackathon {
  name: string;
  url: string;
  host: string;
}

interface BuilderboardProject {
  repoName: string; // 仓库全名 (owner/repo)
  name: string; // 仓库名称
  description: string; // 仓库描述
  languages: string[]; // 主要编程语言
  stargazers_count: number; // star 数量
  forks_count: number; // fork 数量
  topics: string[]; // 项目标签
  updated_at: string; // 最后更新时间
  contributors: BuilderboardContributor[]; // 贡献者列表
  tags: string[]; // 标签
  hackathons: BuilderboardHackathon[]; // 参与过的黑客松列表
}

function formatProjectResponse(project: any): BuilderboardProject {
  // Process hackathons to ensure they have the host field
  const processedHackathons = (project.hackathons || []).map((hackathon: any) => ({
    name: hackathon.name || '',
    url: hackathon.url || '',
    host: hackathon.host || 'Unknown Host', // Provide default value for existing data
  }));

  return {
    repoName: project.repoName,
    name: project.name,
    description: project.description || '',
    languages: project.languages || [],
    stargazers_count: project.stargazers_count || 0,
    forks_count: project.forks_count || 0,
    topics: project.topics || [],
    updated_at: project.updated_at?.toISOString() || new Date().toISOString(),
    contributors: project.contributors || [],
    tags: project.tags || [],
    hackathons: processedHackathons,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // 获取查询参数
    const limit = parseInt(searchParams.get('limit') || '200');
    const ecosystem = searchParams.get('ecosystem') || undefined;
    const subEcosystem = searchParams.get('subEcosystem') || undefined;
    const sector = searchParams.get('sector') || undefined;

    // 验证和限制 limit 参数
    const limitNum = Math.min(Math.max(1, limit), 400);

    // 构建 where 条件
    const where: any = {
      is_fork: false,
    };

    if (ecosystem) {
      if (subEcosystem) {
        // 如果有子标签，使用完整路径匹配
        where.ecosystems = {
          array_contains: `${ecosystem}.${subEcosystem}`,
        };
      } else {
        // 如果只有主标签，匹配所有以该标签开头的路径
        where.ecosystems = {
          array_contains: ecosystem,
        };
      }
    }

    if (sector) {
      where.sectors = {
        array_contains: sector,
      };
    }

    // 查询数据库
    const list = await prisma.operationProject.findMany({
      where,
      orderBy: {
        stargazers_count: 'desc',
      },
      take: limitNum,
      select: {
        repoName: true,
        name: true,
        description: true,
        languages: true,
        stargazers_count: true,
        forks_count: true,
        topics: true,
        updated_at: true,
        contributors: true,
        tags: true,
        hackathons: true,
      },
    });

    // 格式化响应数据
    const formattedList = list.map(formatProjectResponse);

    return createSuccessResponse(formattedList, { url: req.url });
  } catch (error: any) {
    console.error("Error fetching operation project list:", error);
    return createErrorResponse("Failed to fetch operation project list", 500, { url: req.url });
  }
} 