import { getSeries } from "@/app/actions/series";
import SeriesClientPage from "./client-page";

export default async function AdminSeriesPage() {
  const seriesList = await getSeries();
  
  return <SeriesClientPage initialSeries={seriesList} />;
}
