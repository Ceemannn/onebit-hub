/**
 * Generates and downloads the Forex Trading Course Syllabus PDF
 * Uses jsPDF library for PDF generation
 */

interface PdfSection {
  title: string
  content: string[]
}

interface WeekContent {
  week: string
  title: string
  days: {
    day: string
    title: string
    topics: string[]
  }[]
  activity?: string
}

const weeklyContent: WeekContent[] = [
  {
    week: 'Week 1',
    title: 'Foundation & Market Structure',
    days: [
      {
        day: 'Day 1-2',
        title: 'Welcome to Forex Trading',
        topics: [
          'What is Forex and why trade it?',
          'Understanding currency pairs (majors, minors, exotics)',
          'How the Forex market operates (24-hour market, sessions)',
          'Key players: banks, institutions, retail traders',
          'Pips, lot size, Spread, Leverage',
          'Activity: Set up a demo trading account',
        ],
      },
      {
        day: 'Day 3-4',
        title: 'Introduction to Market Structure',
        topics: [
          'Understanding price action basics',
          'What are highs and lows?',
          'Market structure: uptrends, downtrends, and ranging markets',
          'The concept of "break of structure" (BOS)',
          'Activity: Identify market structure on 5 charts',
        ],
      },
      {
        day: 'Day 5-7',
        title: 'Reading the Charts',
        topics: [
          'Candlestick patterns and what they tell us',
          'Timeframe analysis (1-minute to monthly charts)',
          'Support and resistance basics',
          'Introduction to trend lines (drawing and validation)',
          'Practice: Draw trend lines on 10 different charts',
        ],
      },
    ],
    activity: 'Weekend Review: Quiz on Week 1 concepts',
  },
  {
    week: 'Week 2',
    title: 'ICT Fundamentals - Liquidity & Order Blocks',
    days: [
      {
        day: 'Day 1-2',
        title: 'Understanding Liquidity',
        topics: [
          'What is liquidity in trading?',
          'Buy-side liquidity vs sell-side liquidity',
          'Stop loss hunting by institutions',
          'Identifying liquidity pools on charts',
          'Real-world example: Analyzing recent market sweeps',
        ],
      },
      {
        day: 'Day 3-4',
        title: 'Order Blocks (The ICT Edge)',
        topics: [
          'What are order blocks?',
          'Bullish vs bearish order blocks',
          'How institutions place orders',
          'Identifying valid order blocks on your charts',
          'Activity: Mark 20 order blocks across different pairs',
        ],
      },
      {
        day: 'Day 5-7',
        title: 'Fair Value Gaps (FVG)',
        topics: [
          'Understanding imbalances in price',
          'What creates a fair value gap?',
          'Trading fair value gap fills',
          'Combining FVGs with order blocks',
          'Practice: Find and mark FVGs on charts',
        ],
      },
    ],
    activity: 'Weekend Project: Create a chart analysis presentation',
  },
  {
    week: 'Week 3',
    title: 'ICT Core Concepts - Smart Money',
    days: [
      {
        day: 'Day 1-2',
        title: 'Smart Money Concepts (SMC)',
        topics: [
          'Retail vs institutional trading',
          'How banks and institutions move the market',
          'Market maker models',
          'The manipulation phase vs distribution phase',
          "Case Study: Analyze a major news event's price action",
        ],
      },
      {
        day: 'Day 3-4',
        title: 'Inducement & Stop Hunts',
        topics: [
          'What is inducement?',
          'How smart money creates traps',
          'Identifying false breakouts',
          'Waiting for the real move',
          'Activity: Spot 10 inducement examples in historical data',
        ],
      },
      {
        day: 'Day 5-7',
        title: 'Optimal Trade Entry (OTE)',
        topics: [
          'The Fibonacci retracement tool',
          '0.62 to 0.79 retracement zones',
          'Combining OTE with order blocks',
          'Entry timing and patience',
          'Practice: Paper trade 5 OTE setups',
        ],
      },
    ],
    activity: 'Weekend Review: Mid-course assessment',
  },
  {
    week: 'Week 4',
    title: 'Advanced ICT & Risk Management',
    days: [
      {
        day: 'Day 1-2',
        title: 'Breaker Blocks & Mitigation Blocks',
        topics: [
          'What happens when order blocks fail?',
          'Understanding breaker blocks',
          'Mitigation blocks in trend continuation',
          'Activity: Identify breakers vs order blocks',
        ],
      },
      {
        day: 'Day 3-4',
        title: 'Killzones & Session Trading',
        topics: [
          'London killzone (2:00-5:00 AM EST)',
          'New York killzone (8:00-11:00 AM EST)',
          'Asian session characteristics',
          'Which sessions to focus on as a beginner',
          'Practice: Observe live price action during killzones',
        ],
      },
      {
        day: 'Day 5-7',
        title: 'Risk Management Essentials',
        topics: [
          'The 1% rule (never risk more than 1% per trade)',
          'Position sizing calculator',
          'Setting stop losses intelligently',
          'Risk-to-reward ratios (minimum 1:2)',
          'Activity: Calculate position sizes for 10 different scenarios',
        ],
      },
    ],
    activity: 'Weekend Assignment: Create your trading plan draft',
  },
  {
    week: 'Week 5',
    title: 'Additional Strategies & Trade Execution',
    days: [
      {
        day: 'Day 1-2',
        title: 'Trend Line Strategy (Non-ICT Approach)',
        topics: [
          'Drawing proper trend lines',
          'Trend line bounces and breaks',
          'Combining trend lines with support/resistance',
          'When trend lines work best',
          'Activity: Compare trend line strategy vs ICT concepts',
        ],
      },
      {
        day: 'Day 3-4',
        title: 'Putting It All Together',
        topics: [
          'Creating a complete trade setup checklist',
          'Top-down analysis (higher timeframe to lower timeframe)',
          'Confluence: combining multiple signals',
          'Example Trade Walkthrough: Step-by-step setup',
        ],
      },
      {
        day: 'Day 5-7',
        title: 'Trade Execution & Psychology',
        topics: [
          'Entering trades with confidence',
          'Managing trades (when to hold, when to exit)',
          'Dealing with losses emotionally',
          'The importance of journaling every trade',
          'Practice: Execute 3 full demo trades with complete documentation',
        ],
      },
    ],
    activity: 'Weekend Project: Review and journal all your demo trades',
  },
  {
    week: 'Week 6',
    title: 'Real Trading Preparation & Final Review',
    days: [
      {
        day: 'Day 1-2',
        title: 'Common Beginner Mistakes',
        topics: [
          'Overtrading and revenge trading',
          'Ignoring risk management',
          'Trading without a plan',
          'Chasing price',
          'Discussion: Share experiences from demo trading',
        ],
      },
      {
        day: 'Day 3-4',
        title: 'Building Your Trading Routine',
        topics: [
          'Daily/weekly market analysis structure',
          'Pre-market preparation checklist',
          'Trade review process',
          'Continuous learning mindset',
          'Activity: Design your personal trading schedule',
        ],
      },
      {
        day: 'Day 5-7',
        title: 'Final Assessment & Next Steps',
        topics: [
          'Complete trading scenario test',
          'Present your best trade setup to peers',
          'Review of all ICT concepts (liquidity, order blocks, FVGs, OTE, killzones)',
          'Transitioning from demo to live (with small capital)',
          'Resources for continued learning',
          'Graduation: Certificate of completion & trading plan approval',
        ],
      },
    ],
  },
]

const additionalSections: PdfSection[] = [
  {
    title: 'Daily Habits for Success',
    content: [
      'Throughout the 6 weeks, commit to:',
      '• 30-60 minutes of chart time daily',
      '• Journaling at least 3 observations per day',
      "• Reviewing one previous day's price action",
      '• Asking questions in your learning community',
      '• Avoiding live trading until Week 6 completion',
    ],
  },
  {
    title: "Tools You'll Need",
    content: [
      '• Trading Platform: MetaTrader 4/5 or TradingView',
      '• Demo Account: Start with $10,000 virtual money',
      '• Trading Journal: Spreadsheet or dedicated app',
      '• Economic Calendar: ForexFactory or similar',
      '• Learning Mindset: Patience and discipline',
    ],
  },
  {
    title: 'Success Metrics',
    content: [
      'By the end of 6 weeks, you should be able to:',
      '• Identify market structure confidently',
      '• Spot order blocks and fair value gaps',
      '• Understand liquidity concepts',
      '• Execute trades with proper risk management',
      '• Maintain a 1:2 minimum risk-reward ratio',
      '• Complete top-down analysis independently',
    ],
  },
]

export async function generateForexSyllabusPdf(): Promise<void> {
  // Dynamically import jsPDF to avoid SSR issues
  const { jsPDF } = await import('jspdf')

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = margin

  // Colors
  const primaryColor: [number, number, number] = [50, 154, 146] // #329A92
  const darkColor: [number, number, number] = [52, 56, 68] // #343844
  const grayColor: [number, number, number] = [100, 100, 100]

  // Helper function to add new page if needed
  const checkNewPage = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage()
      y = margin
      addHeader()
    }
  }

  // Helper function to add header
  const addHeader = () => {
    // Header bar
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, pageWidth, 12, 'F')

    // Logo text
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('ONEBIT HUB', margin, 8)

    // Tagline
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('Build • Learn • Bridge', pageWidth - margin, 8, { align: 'right' })

    y = 20
  }

  // Helper function to add footer
  const addFooter = () => {
    const footerY = pageHeight - 10
    doc.setFontSize(7)
    doc.setTextColor(...grayColor)
    doc.text('© 2024 Onebit Hub. All rights reserved.', margin, footerY)
    doc.text('www.onebit.io | hello@onebit.io', pageWidth - margin, footerY, { align: 'right' })
  }

  // Add header to first page
  addHeader()

  // Title
  doc.setTextColor(...darkColor)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('6-Week Forex Trading', margin, y + 10)
  y += 18
  doc.text('Curriculum for Beginners', margin, y)
  y += 12

  // Subtitle
  doc.setFontSize(12)
  doc.setTextColor(...primaryColor)
  doc.setFont('helvetica', 'italic')
  doc.text('Master ICT Concepts & Essential Trading Strategies', margin, y)
  y += 15

  // Divider
  doc.setDrawColor(...primaryColor)
  doc.setLineWidth(0.5)
  doc.line(margin, y, pageWidth - margin, y)
  y += 10

  // Course info box
  doc.setFillColor(245, 247, 250)
  doc.roundedRect(margin, y, contentWidth, 25, 3, 3, 'F')

  doc.setFontSize(9)
  doc.setTextColor(...darkColor)
  doc.setFont('helvetica', 'bold')
  doc.text('Duration: 6 Weeks', margin + 5, y + 8)
  doc.text('Format: Live Trading Sessions + Theory', margin + 5, y + 15)
  doc.text('Instructor: Chosen Uzodinma', margin + 80, y + 8)
  doc.text('Certification: Onebit Certified Trader', margin + 80, y + 15)
  y += 35

  // Weekly content
  for (const week of weeklyContent) {
    checkNewPage(40)

    // Week header
    doc.setFillColor(...primaryColor)
    doc.roundedRect(margin, y, contentWidth, 10, 2, 2, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(`${week.week}: ${week.title}`, margin + 5, y + 7)
    y += 15

    // Days content
    for (const day of week.days) {
      checkNewPage(30)

      // Day title
      doc.setTextColor(...darkColor)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text(`${day.day}: ${day.title}`, margin + 3, y)
      y += 6

      // Topics
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...grayColor)

      for (const topic of day.topics) {
        checkNewPage(6)
        const lines = doc.splitTextToSize(`• ${topic}`, contentWidth - 10)
        doc.text(lines, margin + 8, y)
        y += lines.length * 4
      }
      y += 3
    }

    // Weekend activity
    if (week.activity) {
      checkNewPage(10)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bolditalic')
      doc.setTextColor(...primaryColor)
      doc.text(week.activity, margin + 3, y)
      y += 8
    }

    y += 5
  }

  // Additional sections
  for (const section of additionalSections) {
    checkNewPage(30)

    // Section title
    doc.setFillColor(245, 247, 250)
    doc.roundedRect(margin, y, contentWidth, 8, 2, 2, 'F')
    doc.setTextColor(...darkColor)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(section.title, margin + 5, y + 5.5)
    y += 12

    // Section content
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...grayColor)

    for (const line of section.content) {
      checkNewPage(6)
      const lines = doc.splitTextToSize(line, contentWidth - 5)
      doc.text(lines, margin + 3, y)
      y += lines.length * 4
    }
    y += 5
  }

  // Final note
  checkNewPage(30)
  doc.setFillColor(255, 251, 235) // Light amber
  doc.roundedRect(margin, y, contentWidth, 20, 3, 3, 'F')
  doc.setTextColor(...darkColor)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  const reminderText =
    'Remember: Forex trading is a skill that takes time to master. These 6 weeks are just the beginning of your journey. Stay patient, stay disciplined, and never stop learning!'
  const reminderLines = doc.splitTextToSize(reminderText, contentWidth - 10)
  doc.text(reminderLines, margin + 5, y + 6)
  y += 25

  // Disclaimer
  checkNewPage(20)
  doc.setFontSize(7)
  doc.setTextColor(150, 150, 150)
  doc.setFont('helvetica', 'normal')
  const disclaimerText =
    'Disclaimer: Trading involves risk. Never trade with money you cannot afford to lose. Always start with a demo account and only transition to live trading when consistently profitable over at least 3 months.'
  const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth)
  doc.text(disclaimerLines, margin, y)

  // Add footer to all pages
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    addFooter()
    // Page number
    doc.setFontSize(8)
    doc.setTextColor(...grayColor)
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' })
  }

  // Download the PDF
  doc.save('Onebit-Forex-Trading-Syllabus.pdf')
}
