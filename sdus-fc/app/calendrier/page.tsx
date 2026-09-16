import CalendarContent from '@/components/CalendarContent';

type CalendarPageProps = {
  searchParams: Promise<{ view?: string }>;
};

export default async function CalendrierPage({ searchParams }: CalendarPageProps) {
  const { view } = await searchParams;
  const initialView = view === 'matches' ? 'matches' : 'planning';

  return <CalendarContent key={initialView} initialView={initialView} />;
}
