import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { createErrorResponse, createSuccessResponse } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    // 验证用户是否已登录
    // const { userId } = await auth();
    // if (!userId) {
    //   return createErrorResponse("Unauthorized", 401);
    // }

    // 获取请求体
    const body = await req.json();
    const { repoUrl, tags } = body;

    // 验证必要参数
    if (!repoUrl) {
      return createErrorResponse("Repository URL is required", 400, { url: req.url });
    }

    // 验证 URL 格式
    const match = repoUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);
    if (!match) {
      return createErrorResponse("Invalid GitHub repository URL format", 400, { url: req.url });
    }

    const [, owner, repo] = match;
    const repoName = `${owner}/${repo}`;

    // 检查项目是否已存在
    const existingProject = await prisma.importedGithubProject.findUnique({
      where: { repoUrl },
    });

    if (existingProject) {
      return createErrorResponse("This GitHub repository has already been imported", 400, { url: req.url });
    }

    // 创建新的导入项目记录
    const importedProject = await prisma.importedGithubProject.create({
      data: {
        repoUrl,
        repoName,
        status: "PENDING",
        tags: tags || null,
      },
    });

    return createSuccessResponse({
      message: "GitHub repository has been queued for import",
      project: importedProject
    }, { url: req.url });
  } catch (error: any) {
    console.error("Error importing GitHub project:", error);
    return createErrorResponse("Failed to import GitHub project", 500, { url: req.url });
  }
} 