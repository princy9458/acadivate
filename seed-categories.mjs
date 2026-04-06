const CATEGORIES = [
  {
    title: 'Excellence in Research',
    desc: 'Original, high-impact research that advances human knowledge and addresses pressing global challenges through rigorous, evidence-based inquiry.',
    tags: 'Sciences, Humanities, Technology, Social Sciences',
    count: '12 sub-categories',
    color: 'gold'
  },
  {
    title: 'Innovation Leadership',
    desc: 'Academics and institutions who push disciplinary boundaries through creative, interdisciplinary, and transformative approaches to knowledge-creation.',
    tags: 'EdTech, AI Research, Policy',
    count: '8 sub-categories',
    color: 'teal'
  },
  {
    title: 'Lifetime Achievement',
    desc: 'The highest Acadivate honour — bestowed upon scholars whose decades of work have fundamentally shaped their field and left an enduring global legacy.',
    tags: 'Cross-Discipline, Peer-Nominated',
    count: 'Jury Nominated',
    color: 'wine'
  },
  {
    title: 'Young Researcher Award',
    desc: 'Recognising emerging academic talent — scholars under 35 who are already making significant, peer-acknowledged contributions to their disciplines.',
    tags: 'Early Career, PhD Scholars, Postdoc',
    count: 'Under 35',
    color: 'navy'
  },
  {
    title: 'Best Paper Award',
    desc: 'Awarded at each Acadivate conference to the paper demonstrating the highest quality of original research, methodological rigor, and scholarly impact.',
    tags: 'ICASD 2026, ICGSD, GCSD',
    count: '5 sub-categories',
    color: 'navy'
  },
  {
    title: 'Institutional Excellence',
    desc: 'Honouring universities, research institutes, and academic bodies that have demonstrated exceptional commitment to research quality and global engagement.',
    tags: 'Universities, Research Institutes',
    count: '6 sub-categories',
    color: 'primary'
  }
];

async function seed() {
  for (const cat of CATEGORIES) {
    try {
      const response = await fetch('http://localhost:3000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat)
      });
      const data = await response.json();
      console.log(`Seeded: ${cat.title} - Success: ${data.success}`);
    } catch (error) {
      console.error(`Failed to seed ${cat.title}:`, error.message);
    }
  }
}

seed();
