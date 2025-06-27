const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addSampleHackathonData() {
  try {
    // Sample hackathon data
    const sampleHackathons = [
      {
        name: "ETH Global Tokyo 2024",
        url: "https://ethglobal.com/events/tokyo",
        host: "ETH Global"
      },
      {
        name: "Devcon Bogotá 2024",
        url: "https://devcon.org/",
        host: "Ethereum Foundation"
      },
      {
        name: "ETHPrague 2024",
        url: "https://ethprague.com/",
        host: "ETHPrague Team"
      }
    ];

    // Update a few projects with sample hackathon data
    const projectsToUpdate = await prisma.operationProject.findMany({
      take: 5,
      where: {
        hackathons: null // Only update projects that don't have hackathon data
      }
    });

    console.log(`Found ${projectsToUpdate.length} projects to update`);

    for (const project of projectsToUpdate) {
      // Randomly assign 1-3 hackathons to each project
      const numHackathons = Math.floor(Math.random() * 3) + 1;
      const selectedHackathons = sampleHackathons
        .sort(() => 0.5 - Math.random())
        .slice(0, numHackathons);

      await prisma.operationProject.update({
        where: { id: project.id },
        data: {
          hackathons: selectedHackathons
        }
      });

      console.log(`Updated project ${project.repoName} with ${numHackathons} hackathons`);
    }

    console.log('Sample hackathon data added successfully!');
  } catch (error) {
    console.error('Error adding sample hackathon data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
addSampleHackathonData(); 