import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.adminUser.upsert({
    where: { email: 'admin@kpci.edu.in' },
    update: {},
    create: {
      email: 'admin@kpci.edu.in',
      password: hashedPassword,
      name: 'Admin User',
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✓ Admin user created: admin@kpci.edu.in / admin123')

  // Create courses
  const courses = [
    { name: 'DCA (Diploma in Computer Applications)', slug: 'dca', category: 'Computer Diploma', duration: '6 Months', fees: 4500, description: 'Comprehensive computer diploma covering MS Office, Internet, and basic programming.', eligibility: '10th Pass', syllabus: 'Computer Fundamentals\nMS Word\nMS Excel\nMS PowerPoint\nInternet & Email\nTally Basics' },
    { name: 'ADCA (Advanced Diploma in Computer Applications)', slug: 'adca', category: 'Computer Diploma', duration: '12 Months', fees: 8000, description: 'Advanced diploma covering programming, web design, and accounting software.', eligibility: '12th Pass', syllabus: 'Computer Fundamentals\nAdvanced MS Office\nTally with GST\nHTML & CSS\nBasic Programming\nProject Work' },
    { name: 'Tally with GST', slug: 'tally-with-gst', category: 'Accounting', duration: '3 Months', fees: 3000, description: 'Complete Tally ERP with GST filing and accounting management.', eligibility: '10th Pass', syllabus: 'Tally ERP 9 Basics\nGST Fundamentals\nInventory Management\nPayroll Management\nReports & Filing' },
    { name: 'MS Office Expert', slug: 'ms-office-expert', category: 'Computer Basics', duration: '2 Months', fees: 2000, description: 'Master Microsoft Office suite including Word, Excel, and PowerPoint.', eligibility: 'Any', syllabus: 'MS Word Advanced\nMS Excel with Formulas\nMS PowerPoint\nMS Access Basics' },
    { name: 'Web Design & Development', slug: 'web-design', category: 'Programming', duration: '6 Months', fees: 7000, description: 'Learn HTML, CSS, JavaScript and build modern websites.', eligibility: '12th Pass', syllabus: 'HTML5\nCSS3\nJavaScript\nResponsive Design\nBootstrap\nProject Work' },
    { name: 'Graphic Design', slug: 'graphic-design', category: 'Design', duration: '4 Months', fees: 5000, description: 'Learn Photoshop, Corel Draw and graphic design principles.', eligibility: '10th Pass', syllabus: 'Corel Draw\nAdobe Photoshop\nIllustrator Basics\nPrint & Digital Design\nPortfolio Project' },
    { name: 'Computer Hardware & Networking', slug: 'hardware-networking', category: 'Technical', duration: '6 Months', fees: 6000, description: 'Learn computer hardware assembly, troubleshooting and networking.', eligibility: '10th Pass', syllabus: 'Computer Hardware\nAssembly & Disassembly\nOS Installation\nNetworking Basics\nTroubleshooting' },
    { name: 'Basic Computer Course', slug: 'basic-computer', category: 'Computer Basics', duration: '1 Month', fees: 1000, description: 'Introduction to computers for absolute beginners.', eligibility: 'Any', syllabus: 'Computer Basics\nMS Paint\nWordpad\nInternet Basics\nEmail' },
  ]

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: course,
    })
  }
  console.log(`✓ ${courses.length} courses created`)

  // Create batches
  const dcaCourse = await prisma.course.findUnique({ where: { slug: 'dca' } })
  const adcaCourse = await prisma.course.findUnique({ where: { slug: 'adca' } })

  if (dcaCourse) {
    await prisma.batch.upsert({
      where: { id: 'batch-dca-morning' },
      update: {},
      create: {
        id: 'batch-dca-morning',
        courseId: dcaCourse.id,
        name: 'DCA Morning Batch (Jan 2024)',
        timing: '8:00 AM - 10:00 AM',
        capacity: 20,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-07-15'),
      },
    })
  }

  if (adcaCourse) {
    await prisma.batch.upsert({
      where: { id: 'batch-adca-evening' },
      update: {},
      create: {
        id: 'batch-adca-evening',
        courseId: adcaCourse.id,
        name: 'ADCA Evening Batch (Jan 2024)',
        timing: '5:00 PM - 7:00 PM',
        capacity: 15,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2025-01-15'),
      },
    })
  }
  console.log('✓ Batches created')

  // Create testimonials
  const testimonials = [
    { studentName: 'Rajesh Kumar', course: 'DCA', message: 'KPCI changed my life! I got a job as a data entry operator within a month of completing the DCA course. The teachers are very supportive and the practical training is excellent.' },
    { studentName: 'Priya Sharma', course: 'Tally with GST', message: 'The Tally with GST course was very practical and job-oriented. I can now handle all accounting work confidently. Thank you KPCI!' },
    { studentName: 'Amit Verma', course: 'ADCA', message: 'Best computer institute in the area. The faculty is experienced and always available for doubt clearing. The certificate is recognized everywhere.' },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t }).catch(() => {})
  }
  console.log('✓ Testimonials created')

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
