-- CreateEnum
CREATE TYPE "InvitatonStatus" AS ENUM ('WaitingToJoin', 'Joined', 'Error');

-- CreateEnum
CREATE TYPE "OrgMemberStatus" AS ENUM ('JOINED', 'DELETED');

-- CreateEnum
CREATE TYPE "OrgStatus" AS ENUM ('ACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "OrgMemberRole" AS ENUM ('Admin', 'Member');

-- CreateEnum
CREATE TYPE "OrgInvitationStatus" AS ENUM ('Accepted', 'Pending', 'Revoked');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKING', 'DELETED');

-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('DRAFT', 'INREVIEW', 'ACTIVE', 'COMPLETED', 'CANCELED', 'PAUSED', 'DELETED', 'REFUSED');

-- CreateEnum
CREATE TYPE "ChallengeLocation" AS ENUM ('ONLINE', 'OFFLINE', 'MIXED', 'OTHERS');

-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('CHALLENGE', 'WORKSHOP', 'OTHERS');

-- CreateEnum
CREATE TYPE "TeamStatus" AS ENUM ('ACTIVE', 'DISMISSED');

-- CreateEnum
CREATE TYPE "GroupingRequestType" AS ENUM ('APPLICATION', 'INVITATION');

-- CreateEnum
CREATE TYPE "GroupingRequestStatus" AS ENUM ('PENDING', 'DECLINED', 'ACCEPTED', 'REVOKED', 'INVALID');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('INITIATED', 'SELECTED', 'REJECTED', 'TERMINATED');

-- CreateEnum
CREATE TYPE "SocialAuthStatus" AS ENUM ('PENDING', 'AUTHORIZED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('MEMBER_REMOVED', 'MEMBER_JOINED', 'MEMBER_LEFT', 'MEMBER_ROLE_UPDATED', 'TEAM_DISMISSED', 'TEAM_INFO_UPDATED', 'PROJECT_UPDATED', 'CHALLENGE_UPDATED');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'READ');

-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('SBT', 'NFT');

-- CreateEnum
CREATE TYPE "HostStyle" AS ENUM ('PERSON', 'CO', 'FUND', 'DEF');

-- CreateEnum
CREATE TYPE "HostStatus" AS ENUM ('ACTIVE', 'PENDING', 'BLOCKING', 'DELETED');

-- CreateEnum
CREATE TYPE "RankingTagType" AS ENUM ('ECOSYSTEM', 'SECTOR');

-- CreateEnum
CREATE TYPE "ImportedGithubProjectStatus" AS ENUM ('PENDING', 'PROCESSING', 'PROCESSED', 'FAILED', 'INVALID');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER');

-- CreateTable
CREATE TABLE "whitelist" (
    "id" BIGSERIAL NOT NULL,
    "walletAddress" TEXT NOT NULL,

    CONSTRAINT "whitelist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userAuth" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT,
    "walletAddress" TEXT,
    "nonce" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userProfile" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "userAuthId" BIGINT,
    "walletAddress" TEXT,
    "email" TEXT DEFAULT '',
    "userName" TEXT DEFAULT '',
    "platformId" BIGINT,
    "fullName" TEXT DEFAULT '',
    "bio" TEXT DEFAULT '',
    "roles" JSONB,
    "skills" JSONB,
    "githubRepo" JSONB,
    "avatarURI" VARCHAR(356),
    "clerkId" TEXT NOT NULL,
    "telegramLink" TEXT DEFAULT '',
    "websiteLink" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT DEFAULT '',
    "lastName" TEXT DEFAULT '',
    "visitAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "aboutMe" VARCHAR(4096),
    "aspectaLink" TEXT,
    "discordLink" TEXT,
    "githubLink" TEXT,
    "twitterLink" TEXT,
    "externalNa" TEXT,
    "showChallenges" BOOLEAN NOT NULL DEFAULT false,
    "showTeamwork" BOOLEAN NOT NULL DEFAULT false,
    "showStats" BOOLEAN NOT NULL DEFAULT false,
    "links" JSONB,
    "showAdditionalInfo" BOOLEAN NOT NULL DEFAULT false,
    "additionalInfo" TEXT,
    "showPinnedLinks" BOOLEAN NOT NULL DEFAULT false,
    "showPinnedProjects" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emailVerification" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT,
    "userAuthId" BIGINT,
    "verficationCode" TEXT,
    "emailAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expireAt" TIMESTAMP(3),

    CONSTRAINT "emailVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "hostName" TEXT,
    "requirements" TEXT,
    "reviewDimension" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "totalAward" INTEGER,
    "awardCurrency" TEXT,
    "status" "ChallengeStatus" NOT NULL DEFAULT 'DRAFT',
    "bannerUrl" TEXT,
    "location" "ChallengeLocation" NOT NULL DEFAULT 'ONLINE',
    "milestones" JSONB,
    "awardAssorts" JSONB,
    "agenda" JSONB,
    "city" TEXT,
    "createdBy" TEXT NOT NULL,
    "discordLink" TEXT,
    "hostIcon" TEXT,
    "metadata" JSONB,
    "telegramLink" TEXT,
    "twitterLink" TEXT,
    "type" "ChallengeType" NOT NULL DEFAULT 'OTHERS',
    "wechatURL" TEXT,
    "joinLink" TEXT,
    "yotadata" JSONB,
    "ownerId" BIGINT NOT NULL,
    "track" JSONB,
    "otherInfo" JSONB,
    "challengeTags" JSONB,
    "linkText" TEXT,
    "result" JSONB,
    "trackPanel" JSONB,
    "scoreDimension" JSONB,
    "organizationId" BIGINT,
    "shortlist" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeZone" INTEGER NOT NULL DEFAULT 8,

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challengeJudge" (
    "id" BIGSERIAL NOT NULL,
    "challengeId" BIGINT NOT NULL,
    "judgeId" BIGINT NOT NULL,

    CONSTRAINT "challengeJudge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "judge" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "organization" TEXT,
    "avatarURI" TEXT,
    "order" INTEGER NOT NULL,
    "description" TEXT,
    "twitterLink" TEXT,
    "email" TEXT,

    CONSTRAINT "judge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keySponsor" (
    "id" BIGSERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "challengeId" BIGINT NOT NULL,

    CONSTRAINT "keySponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "norSponsor" (
    "id" BIGSERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "challengeId" BIGINT NOT NULL,

    CONSTRAINT "norSponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsorship" (
    "id" BIGSERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "challengeId" BIGINT NOT NULL,
    "sponsorId" BIGINT,

    CONSTRAINT "sponsorship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsor" (
    "id" BIGINT NOT NULL,
    "sponsorName" TEXT NOT NULL,
    "logoURI" TEXT,

    CONSTRAINT "sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TeamStatus" NOT NULL DEFAULT 'ACTIVE',
    "challengeId" BIGINT NOT NULL,
    "openingRoles" JSONB NOT NULL,
    "skills" JSONB NOT NULL,
    "nation" TEXT,
    "description" VARCHAR(4096),

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teamMember" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "teamId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "teamRole" TEXT NOT NULL,
    "isLeader" BOOLEAN NOT NULL,

    CONSTRAINT "teamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groupingRequest" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "type" "GroupingRequestType" NOT NULL,
    "status" "GroupingRequestStatus" NOT NULL,
    "senderId" BIGINT NOT NULL,
    "recipientId" BIGINT NOT NULL,
    "teamId" BIGINT NOT NULL,
    "teamRole" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groupingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(4096) NOT NULL,
    "tags" JSONB NOT NULL,
    "githubTags" JSONB,
    "filterTags" JSONB,
    "bountyTrack" JSONB NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "demoURI" VARCHAR(384),
    "videoURI" VARCHAR(384),
    "deckURI" VARCHAR(384),
    "githubURI" VARCHAR(384),
    "teamId" BIGINT,
    "userId" BIGINT,
    "mediaURLs" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vCount" INTEGER NOT NULL DEFAULT 1,
    "experience" INTEGER,
    "pastGrant" VARCHAR(1000),
    "builtDate" TIMESTAMP(3),
    "siteURI" VARCHAR(384),
    "contact" VARCHAR(384),
    "recommendedFrom" VARCHAR(384),
    "membersCount" INTEGER,
    "offlineDemoDay" INTEGER,
    "onSiteDays" VARCHAR(191),
    "creditsInterested" INTEGER,
    "customSelect1" VARCHAR(384),
    "customSelect2" VARCHAR(384),
    "customSelect3" VARCHAR(384),
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "githubStars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialAuth" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "redirectURI" TEXT NOT NULL,
    "authStatus" "SocialAuthStatus" NOT NULL,
    "scope" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "tokenExpiration" TIMESTAMP(3),
    "handle" TEXT,
    "userId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "socialAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificationMessage" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "messageBody" TEXT,
    "targetUserId" BIGINT NOT NULL,
    "teamId" BIGINT NOT NULL,
    "challengeId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notificationMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "recipentId" BIGINT NOT NULL,
    "notificationMessageId" BIGINT NOT NULL,
    "status" "NotificationStatus" NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badge" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "holderId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BadgeType" NOT NULL,
    "claimed" BOOLEAN NOT NULL,
    "badgeURI" TEXT,
    "collection" TEXT,
    "baseURI" TEXT,
    "tokenId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "counters" (
    "id" BIGSERIAL NOT NULL,
    "kind" TEXT NOT NULL,
    "seqValue" BIGINT NOT NULL,

    CONSTRAINT "counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hostUser" (
    "id" BIGSERIAL NOT NULL,
    "externalId" TEXT,
    "userId" TEXT NOT NULL,
    "email" TEXT,
    "walletAddress" JSONB,
    "name" TEXT,
    "avatar" VARCHAR(356),
    "description" TEXT,
    "style" "HostStyle" NOT NULL DEFAULT 'DEF',
    "status" "HostStatus" NOT NULL DEFAULT 'PENDING',
    "credential" JSONB,
    "city" TEXT,
    "preference" JSONB,
    "mediaURI" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "github" TEXT,
    "twitter" TEXT,
    "visitAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weibo" TEXT,

    CONSTRAINT "hostUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectRank" (
    "id" BIGSERIAL NOT NULL,
    "projectId" BIGINT NOT NULL,
    "judgeId" BIGINT NOT NULL,
    "mark" JSONB,

    CONSTRAINT "projectRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preLaunch" (
    "id" BIGSERIAL NOT NULL,
    "challengeId" BIGINT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preLaunch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id" BIGSERIAL NOT NULL,
    "challengeId" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" BIGINT,
    "status" "InvitatonStatus" NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" BIGSERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "bio" TEXT,
    "website" TEXT,
    "status" "OrgStatus" NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizationMember" (
    "id" BIGSERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "userId" BIGINT,
    "organizationId" BIGINT,
    "role" "OrgMemberRole" NOT NULL,
    "status" "OrgMemberStatus" NOT NULL,
    "orgClerkId" TEXT,
    "userClerkId" TEXT,

    CONSTRAINT "organizationMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizationInvitation" (
    "id" BIGSERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "organizationId" BIGINT,
    "email" TEXT NOT NULL,
    "role" "OrgMemberRole" NOT NULL,
    "status" "OrgInvitationStatus" NOT NULL,
    "orgClerkId" TEXT,

    CONSTRAINT "organizationInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challengeReviewer" (
    "id" BIGSERIAL NOT NULL,
    "challengeId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "challengeReviewer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectScore" (
    "id" BIGSERIAL NOT NULL,
    "projectId" BIGINT NOT NULL,
    "reviewerId" BIGINT NOT NULL,
    "mark" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projectScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "future" (
    "id" BIGSERIAL NOT NULL,
    "challengeId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" TIMESTAMP(3),
    "announceShortlist" TIMESTAMP(3),
    "announceResult" TIMESTAMP(3),

    CONSTRAINT "future_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operation" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "organizationId" BIGINT,
    "type" INTEGER NOT NULL,
    "description" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" BIGINT NOT NULL,

    CONSTRAINT "operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit" (
    "id" BIGSERIAL NOT NULL,
    "challengeId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "device" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gaReport" (
    "id" BIGSERIAL NOT NULL,
    "challengeId" BIGINT NOT NULL,
    "weeklyPV" JSONB,
    "visitors" JSONB,
    "pvUpdatedAt" TIMESTAMP(3),
    "visitorsUpdatedAt" TIMESTAMP(3),
    "browsers" JSONB,
    "locations" JSONB,
    "topReferrers" JSONB,

    CONSTRAINT "gaReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "githubRepos" (
    "id" BIGSERIAL NOT NULL,
    "allow_forking" BOOLEAN,
    "contributors" JSONB,
    "default_branch" TEXT,
    "description" TEXT,
    "fork" BOOLEAN,
    "forks_count" INTEGER NOT NULL DEFAULT 0,
    "language" TEXT,
    "languages" JSONB,
    "name" TEXT,
    "network_count" INTEGER NOT NULL DEFAULT 0,
    "open_issues_count" INTEGER NOT NULL DEFAULT 0,
    "owner" JSONB,
    "private" BOOLEAN,
    "repoName" TEXT NOT NULL,
    "stargazers_count" INTEGER NOT NULL DEFAULT 0,
    "subscribers_count" INTEGER NOT NULL DEFAULT 0,
    "topics" JSONB,
    "totalCommits" INTEGER NOT NULL DEFAULT 0,
    "totalPullRequests" INTEGER NOT NULL DEFAULT 0,
    "visibility" TEXT,
    "watchers_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "developerId" BIGINT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "githubRepos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developers" (
    "id" BIGSERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "company" TEXT,
    "email" TEXT,
    "location" TEXT,
    "twitter_username" TEXT,
    "hireable" BOOLEAN,
    "languageSum" JSONB,
    "projectArr" JSONB,
    "followers" INTEGER NOT NULL DEFAULT 0,
    "totalForksCount" INTEGER NOT NULL DEFAULT 0,
    "totalOwnProjects" INTEGER NOT NULL DEFAULT 0,
    "totalProjects" INTEGER NOT NULL DEFAULT 0,
    "totalStars" INTEGER NOT NULL DEFAULT 0,
    "totalWatchersCount" INTEGER NOT NULL DEFAULT 0,
    "memberLength" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar_url" TEXT,
    "languageArr" JSONB,
    "repos" JSONB,

    CONSTRAINT "developers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "githubRepoUrl" (
    "id" BIGSERIAL NOT NULL,
    "repoUrl" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "githubRepoUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "githubWeb3Repos" (
    "id" BIGSERIAL NOT NULL,
    "allow_forking" BOOLEAN,
    "contributors" JSONB,
    "default_branch" TEXT,
    "description" TEXT,
    "fork" BOOLEAN,
    "forks_count" INTEGER NOT NULL DEFAULT 0,
    "language" TEXT,
    "languages" JSONB,
    "name" TEXT,
    "network_count" INTEGER NOT NULL DEFAULT 0,
    "open_issues_count" INTEGER NOT NULL DEFAULT 0,
    "owner" JSONB,
    "private" BOOLEAN,
    "repoName" TEXT NOT NULL,
    "stargazers_count" INTEGER NOT NULL DEFAULT 0,
    "subscribers_count" INTEGER NOT NULL DEFAULT 0,
    "topics" JSONB,
    "totalCommits" INTEGER NOT NULL DEFAULT 0,
    "totalPullRequests" INTEGER NOT NULL DEFAULT 0,
    "visibility" TEXT,
    "watchers_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "developerId" BIGINT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "githubWeb3Repos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "web3Developers" (
    "id" BIGSERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "company" TEXT,
    "email" TEXT,
    "location" TEXT,
    "twitter_username" TEXT,
    "avatar_url" TEXT,
    "hireable" BOOLEAN,
    "languageSum" JSONB,
    "projectArr" JSONB,
    "followers" INTEGER NOT NULL DEFAULT 0,
    "totalForksCount" INTEGER NOT NULL DEFAULT 0,
    "totalOwnProjects" INTEGER NOT NULL DEFAULT 0,
    "totalProjects" INTEGER NOT NULL DEFAULT 0,
    "totalStars" INTEGER NOT NULL DEFAULT 0,
    "totalWatchersCount" INTEGER NOT NULL DEFAULT 0,
    "memberLength" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageArr" JSONB,
    "repos" JSONB,
    "repoLanguageArr" JSONB,

    CONSTRAINT "web3Developers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "githubWeb3RepoUrl" (
    "id" BIGSERIAL NOT NULL,
    "repoUrl" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "githubWeb3RepoUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crawlResult" (
    "id" BIGSERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "repo" INTEGER NOT NULL DEFAULT 0,
    "developer" INTEGER NOT NULL DEFAULT 0,
    "upDevelop" INTEGER NOT NULL DEFAULT 0,
    "upRepo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crawlResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "githubCrawl" (
    "id" BIGSERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "result" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "githubCrawl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userTeamProjectRelation" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "teamId" BIGINT NOT NULL,
    "projectId" BIGINT,
    "challengeId" BIGINT NOT NULL,
    "role" TEXT NOT NULL,
    "isLeader" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userTeamProjectRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operationProject" (
    "id" SERIAL NOT NULL,
    "repoUrl" TEXT NOT NULL,
    "repoName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "languages" JSONB,
    "stargazers_count" INTEGER DEFAULT 0,
    "forks_count" INTEGER DEFAULT 0,
    "topics" JSONB,
    "contributors" JSONB,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3),
    "ecosystems" JSONB,
    "sectors" JSONB,
    "is_fork" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "ai_report_url" TEXT,
    "tags" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "operationProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operationDeveloper" (
    "id" SERIAL NOT NULL,
    "html_url" TEXT NOT NULL,
    "avatar_url" TEXT,
    "login" TEXT,
    "name" TEXT,
    "bio" TEXT,
    "company" TEXT,
    "location" TEXT,
    "email" TEXT,
    "twitter_username" TEXT,
    "followers" INTEGER,
    "following" INTEGER,
    "public_repos" INTEGER,
    "total_stars" INTEGER DEFAULT 0,
    "popular_repo" JSONB,
    "repos" JSONB,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "ecosystems" JSONB,
    "sectors" JSONB,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "delete_reason" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "is_org" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "operationDeveloper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operationProjectContributor" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "developerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operationProjectContributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rankingTags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RankingTagType" NOT NULL,
    "description" TEXT,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rankingTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operationCrawlRecord" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "isRunning" BOOLEAN NOT NULL DEFAULT false,
    "currentType" TEXT,
    "startTime" TIMESTAMP(3),
    "currentProgress" JSONB,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operationCrawlRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "importedGithubProject" (
    "id" SERIAL NOT NULL,
    "repoUrl" TEXT NOT NULL,
    "repoName" TEXT NOT NULL,
    "status" "ImportedGithubProjectStatus" NOT NULL DEFAULT 'PENDING',
    "processedAt" TIMESTAMP(3),
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" JSONB,

    CONSTRAINT "importedGithubProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_accounts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'EDITOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "admin_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userAuth_externalId_key" ON "userAuth"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_externalId_key" ON "userProfile"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_clerkId_key" ON "userProfile"("clerkId");

-- CreateIndex
CREATE INDEX "userProfile_walletAddress_idx" ON "userProfile"("walletAddress");

-- CreateIndex
CREATE INDEX "email_fkey" ON "userProfile"("email");

-- CreateIndex
CREATE INDEX "username_fkey" ON "userProfile"("userName");

-- CreateIndex
CREATE INDEX "userProfile_externalNa_idx" ON "userProfile"("externalNa");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_externalId_key" ON "challenge"("externalId");

-- CreateIndex
CREATE INDEX "challenge_startTime_idx" ON "challenge"("startTime");

-- CreateIndex
CREATE INDEX "challenge_endTime_idx" ON "challenge"("endTime");

-- CreateIndex
CREATE INDEX "challenge_organizationId_idx" ON "challenge"("organizationId");

-- CreateIndex
CREATE INDEX "challenge_ownerId_idx" ON "challenge"("ownerId");

-- CreateIndex
CREATE INDEX "challengeJudge_challengeId_idx" ON "challengeJudge"("challengeId");

-- CreateIndex
CREATE INDEX "challengeJudge_judgeId_idx" ON "challengeJudge"("judgeId");

-- CreateIndex
CREATE UNIQUE INDEX "keySponsor_challengeId_key" ON "keySponsor"("challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "norSponsor_challengeId_key" ON "norSponsor"("challengeId");

-- CreateIndex
CREATE INDEX "sponsorship_challengeId_idx" ON "sponsorship"("challengeId");

-- CreateIndex
CREATE INDEX "sponsorship_sponsorId_idx" ON "sponsorship"("sponsorId");

-- CreateIndex
CREATE UNIQUE INDEX "team_externalId_key" ON "team"("externalId");

-- CreateIndex
CREATE INDEX "team_challengeId_idx" ON "team"("challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "teamMember_externalId_key" ON "teamMember"("externalId");

-- CreateIndex
CREATE INDEX "teamMember_teamId_idx" ON "teamMember"("teamId");

-- CreateIndex
CREATE INDEX "teamMember_userId_idx" ON "teamMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "groupingRequest_externalId_key" ON "groupingRequest"("externalId");

-- CreateIndex
CREATE INDEX "groupingRequest_recipientId_idx" ON "groupingRequest"("recipientId");

-- CreateIndex
CREATE INDEX "groupingRequest_senderId_idx" ON "groupingRequest"("senderId");

-- CreateIndex
CREATE INDEX "groupingRequest_teamId_idx" ON "groupingRequest"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "project_externalId_key" ON "project"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "project_teamId_key" ON "project"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "socialAuth_externalId_key" ON "socialAuth"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "socialAuth_userId_platform_key" ON "socialAuth"("userId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "notificationMessage_externalId_key" ON "notificationMessage"("externalId");

-- CreateIndex
CREATE INDEX "notificationMessage_challengeId_idx" ON "notificationMessage"("challengeId");

-- CreateIndex
CREATE INDEX "notificationMessage_targetUserId_idx" ON "notificationMessage"("targetUserId");

-- CreateIndex
CREATE INDEX "notificationMessage_teamId_idx" ON "notificationMessage"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "notification_externalId_key" ON "notification"("externalId");

-- CreateIndex
CREATE INDEX "notification_notificationMessageId_idx" ON "notification"("notificationMessageId");

-- CreateIndex
CREATE INDEX "notification_recipentId_idx" ON "notification"("recipentId");

-- CreateIndex
CREATE UNIQUE INDEX "badge_externalId_key" ON "badge"("externalId");

-- CreateIndex
CREATE INDEX "badge_holderId_idx" ON "badge"("holderId");

-- CreateIndex
CREATE UNIQUE INDEX "counters_kind_key" ON "counters"("kind");

-- CreateIndex
CREATE UNIQUE INDEX "hostUser_userId_key" ON "hostUser"("userId");

-- CreateIndex
CREATE INDEX "projectRank_judgeId_idx" ON "projectRank"("judgeId");

-- CreateIndex
CREATE INDEX "projectRank_projectId_idx" ON "projectRank"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "projectRank_projectId_judgeId_key" ON "projectRank"("projectId", "judgeId");

-- CreateIndex
CREATE UNIQUE INDEX "preLaunch_challengeId_key" ON "preLaunch"("challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_challengeId_email_key" ON "invitation"("challengeId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "organization_clerkId_key" ON "organization"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "organizationMember_clerkId_key" ON "organizationMember"("clerkId");

-- CreateIndex
CREATE INDEX "organizationMember_userId_idx" ON "organizationMember"("userId");

-- CreateIndex
CREATE INDEX "organizationMember_organizationId_idx" ON "organizationMember"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "organizationMember_userId_organizationId_key" ON "organizationMember"("userId", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "organizationInvitation_clerkId_key" ON "organizationInvitation"("clerkId");

-- CreateIndex
CREATE INDEX "organizationInvitation_organizationId_idx" ON "organizationInvitation"("organizationId");

-- CreateIndex
CREATE INDEX "challengeReviewer_challengeId_idx" ON "challengeReviewer"("challengeId");

-- CreateIndex
CREATE INDEX "challengeReviewer_userId_idx" ON "challengeReviewer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "challengeReviewer_challengeId_userId_key" ON "challengeReviewer"("challengeId", "userId");

-- CreateIndex
CREATE INDEX "projectScore_projectId_idx" ON "projectScore"("projectId");

-- CreateIndex
CREATE INDEX "projectScore_reviewerId_idx" ON "projectScore"("reviewerId");

-- CreateIndex
CREATE UNIQUE INDEX "projectScore_projectId_reviewerId_key" ON "projectScore"("projectId", "reviewerId");

-- CreateIndex
CREATE UNIQUE INDEX "future_challengeId_key" ON "future"("challengeId");

-- CreateIndex
CREATE INDEX "operation_userId_idx" ON "operation"("userId");

-- CreateIndex
CREATE INDEX "operation_ownerId_idx" ON "operation"("ownerId");

-- CreateIndex
CREATE INDEX "operation_organizationId_idx" ON "operation"("organizationId");

-- CreateIndex
CREATE INDEX "visit_challengeId_idx" ON "visit"("challengeId");

-- CreateIndex
CREATE INDEX "visit_userId_idx" ON "visit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "visit_challengeId_userId_key" ON "visit"("challengeId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "gaReport_challengeId_key" ON "gaReport"("challengeId");

-- CreateIndex
CREATE INDEX "githubRepos_developerId_idx" ON "githubRepos"("developerId");

-- CreateIndex
CREATE INDEX "githubRepos_repoName_idx" ON "githubRepos"("repoName");

-- CreateIndex
CREATE INDEX "developers_login_idx" ON "developers"("login");

-- CreateIndex
CREATE INDEX "developers_followers_idx" ON "developers"("followers");

-- CreateIndex
CREATE INDEX "developers_totalStars_idx" ON "developers"("totalStars");

-- CreateIndex
CREATE INDEX "developers_updated_at_idx" ON "developers"("updated_at");

-- CreateIndex
CREATE INDEX "developers_updatedAt_idx" ON "developers"("updatedAt");

-- CreateIndex
CREATE INDEX "githubRepoUrl_repoUrl_idx" ON "githubRepoUrl"("repoUrl");

-- CreateIndex
CREATE INDEX "githubRepoUrl_createdAt_idx" ON "githubRepoUrl"("createdAt");

-- CreateIndex
CREATE INDEX "githubWeb3Repos_developerId_idx" ON "githubWeb3Repos"("developerId");

-- CreateIndex
CREATE INDEX "githubWeb3Repos_repoName_idx" ON "githubWeb3Repos"("repoName");

-- CreateIndex
CREATE INDEX "web3Developers_login_idx" ON "web3Developers"("login");

-- CreateIndex
CREATE INDEX "web3Developers_followers_idx" ON "web3Developers"("followers");

-- CreateIndex
CREATE INDEX "web3Developers_totalStars_idx" ON "web3Developers"("totalStars");

-- CreateIndex
CREATE INDEX "web3Developers_updated_at_idx" ON "web3Developers"("updated_at");

-- CreateIndex
CREATE INDEX "web3Developers_updatedAt_idx" ON "web3Developers"("updatedAt");

-- CreateIndex
CREATE INDEX "githubWeb3RepoUrl_repoUrl_idx" ON "githubWeb3RepoUrl"("repoUrl");

-- CreateIndex
CREATE INDEX "githubWeb3RepoUrl_createdAt_idx" ON "githubWeb3RepoUrl"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "crawlResult_day_key" ON "crawlResult"("day");

-- CreateIndex
CREATE UNIQUE INDEX "githubCrawl_day_key" ON "githubCrawl"("day");

-- CreateIndex
CREATE INDEX "userTeamProjectRelation_userId_idx" ON "userTeamProjectRelation"("userId");

-- CreateIndex
CREATE INDEX "userTeamProjectRelation_teamId_idx" ON "userTeamProjectRelation"("teamId");

-- CreateIndex
CREATE INDEX "userTeamProjectRelation_projectId_idx" ON "userTeamProjectRelation"("projectId");

-- CreateIndex
CREATE INDEX "userTeamProjectRelation_challengeId_idx" ON "userTeamProjectRelation"("challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "userTeamProjectRelation_userId_teamId_key" ON "userTeamProjectRelation"("userId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "operationProject_repoUrl_key" ON "operationProject"("repoUrl");

-- CreateIndex
CREATE UNIQUE INDEX "operationProject_repoName_key" ON "operationProject"("repoName");

-- CreateIndex
CREATE UNIQUE INDEX "operationDeveloper_html_url_key" ON "operationDeveloper"("html_url");

-- CreateIndex
CREATE UNIQUE INDEX "operationDeveloper_login_key" ON "operationDeveloper"("login");

-- CreateIndex
CREATE INDEX "operationProjectContributor_projectId_idx" ON "operationProjectContributor"("projectId");

-- CreateIndex
CREATE INDEX "operationProjectContributor_developerId_idx" ON "operationProjectContributor"("developerId");

-- CreateIndex
CREATE UNIQUE INDEX "operationProjectContributor_projectId_developerId_key" ON "operationProjectContributor"("projectId", "developerId");

-- CreateIndex
CREATE INDEX "rankingTags_parentId_idx" ON "rankingTags"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "rankingTags_name_type_key" ON "rankingTags"("name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "operationCrawlRecord_day_key" ON "operationCrawlRecord"("day");

-- CreateIndex
CREATE UNIQUE INDEX "importedGithubProject_repoUrl_key" ON "importedGithubProject"("repoUrl");

-- CreateIndex
CREATE INDEX "importedGithubProject_status_idx" ON "importedGithubProject"("status");

-- CreateIndex
CREATE INDEX "importedGithubProject_createdAt_idx" ON "importedGithubProject"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "admin_accounts_email_key" ON "admin_accounts"("email");

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challengeJudge" ADD CONSTRAINT "challengeJudge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challengeJudge" ADD CONSTRAINT "challengeJudge_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "judge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keySponsor" ADD CONSTRAINT "keySponsor_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "norSponsor" ADD CONSTRAINT "norSponsor_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorship" ADD CONSTRAINT "sponsorship_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "sponsor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamMember" ADD CONSTRAINT "teamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamMember" ADD CONSTRAINT "teamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupingRequest" ADD CONSTRAINT "groupingRequest_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupingRequest" ADD CONSTRAINT "groupingRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupingRequest" ADD CONSTRAINT "groupingRequest_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socialAuth" ADD CONSTRAINT "socialAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationMessage" ADD CONSTRAINT "notificationMessage_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationMessage" ADD CONSTRAINT "notificationMessage_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationMessage" ADD CONSTRAINT "notificationMessage_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_notificationMessageId_fkey" FOREIGN KEY ("notificationMessageId") REFERENCES "notificationMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_recipentId_fkey" FOREIGN KEY ("recipentId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badge" ADD CONSTRAINT "badge_holderId_fkey" FOREIGN KEY ("holderId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectRank" ADD CONSTRAINT "projectRank_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "judge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectRank" ADD CONSTRAINT "projectRank_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationMember" ADD CONSTRAINT "organizationMember_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationMember" ADD CONSTRAINT "organizationMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationInvitation" ADD CONSTRAINT "organizationInvitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challengeReviewer" ADD CONSTRAINT "challengeReviewer_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challengeReviewer" ADD CONSTRAINT "challengeReviewer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectScore" ADD CONSTRAINT "projectScore_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectScore" ADD CONSTRAINT "projectScore_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "challengeReviewer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "future" ADD CONSTRAINT "future_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation" ADD CONSTRAINT "operation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation" ADD CONSTRAINT "operation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gaReport" ADD CONSTRAINT "gaReport_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "githubRepos" ADD CONSTRAINT "githubRepos_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "developers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "githubWeb3Repos" ADD CONSTRAINT "githubWeb3Repos_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "web3Developers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTeamProjectRelation" ADD CONSTRAINT "userTeamProjectRelation_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTeamProjectRelation" ADD CONSTRAINT "userTeamProjectRelation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTeamProjectRelation" ADD CONSTRAINT "userTeamProjectRelation_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTeamProjectRelation" ADD CONSTRAINT "userTeamProjectRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operationProjectContributor" ADD CONSTRAINT "operationProjectContributor_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "operationDeveloper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operationProjectContributor" ADD CONSTRAINT "operationProjectContributor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "operationProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankingTags" ADD CONSTRAINT "rankingTags_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "rankingTags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

