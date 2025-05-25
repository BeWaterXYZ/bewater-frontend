import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const projectOwner = searchParams.get('projectOwner');
    const projectName = searchParams.get('projectName');
    const fromAddress = searchParams.get('fromAddress');
    const toAddress = searchParams.get('toAddress');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    // 构建查询条件
    const where: any = {};

    // 如果提供了项目信息，则按项目查询
    if (projectOwner && projectName) {
      where.projectOwner = projectOwner;
      where.projectName = projectName;
    }

    // 如果提供了地址，则按地址查询
    if (fromAddress) {
      where.fromAddress = fromAddress;
    }
    if (toAddress) {
      where.toAddress = toAddress;
    }

    // 如果没有提供任何查询条件，返回错误
    if (!projectOwner && !projectName && !fromAddress && !toAddress) {
      return NextResponse.json(
        { error: 'At least one query parameter is required' },
        { status: 400 }
      );
    }

    // 获取总记录数
    const total = await prisma.sponsorTransaction.count({ where });

    // 获取分页数据
    const transactions = await prisma.sponsorTransaction.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({
      transactions,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('Error fetching sponsor transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sponsor transactions' },
      { status: 500 }
    );
  }
} 