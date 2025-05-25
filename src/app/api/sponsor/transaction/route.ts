import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 验证必要字段
    const requiredFields = [
      'txHash',
      'fromAddress',
      'toAddress',
      'amount',
      'currency',
      'decimals',
      'chain',
      'projectOwner',
      'projectName'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `缺少必要字段: ${field}` },
          { status: 400 }
        );
      }
    }

    // 检查交易哈希是否已存在
    const existingTransaction = await prisma.sponsorTransaction.findUnique({
      where: {
        txHash: body.txHash
      }
    });

    if (existingTransaction) {
      return NextResponse.json(
        { error: '该交易记录已存在' },
        { status: 400 }
      );
    }

    // 创建新交易记录
    const transaction = await prisma.sponsorTransaction.create({
      data: {
        txHash: body.txHash,
        fromAddress: body.fromAddress,
        toAddress: body.toAddress,
        amount: body.amount,
        currency: body.currency,
        decimals: body.decimals,
        chain: body.chain,
        projectOwner: body.projectOwner,
        projectName: body.projectName,
        status: body.status || 'PENDING'
      }
    });

    return NextResponse.json({
      success: true,
      data: transaction
    });

  } catch (error) {
    console.error('创建赞助交易记录失败:', error);
    return NextResponse.json(
      { error: '创建赞助交易记录失败' },
      { status: 500 }
    );
  }
} 