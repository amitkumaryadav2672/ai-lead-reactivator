import './globals.css';

export const metadata = {
  title: 'AI Lead Reactivator — Wake Up Dormant Leads Autonomously',
  description: 'Supercharge your sales pipeline. AI agents autonomously follow up, nurture, and reactivate dormant leads into qualified sales meetings.',
  keywords: 'ai leads, lead reactivation, automated outreach, pipeline recovery, crm sync'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
        {children}
      </body>
    </html>
  );
}
