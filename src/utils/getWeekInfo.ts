import { format, getISOWeek, startOfISOWeek, endOfISOWeek } from 'date-fns';
import { es } from 'date-fns/locale';

export const getWeekInfo = ({
  date,
}: {
  date: Date;
}): {
  week: string;
  startDate: Date;
} => {
  const weekNumber = getISOWeek(date);
  const startDate = startOfISOWeek(date);
  const endDate = endOfISOWeek(date);
  const formattedStartDate = format(startDate, 'dd MMMM', { locale: es });
  const formattedEndDate = format(endDate, 'dd MMMM yyyy', { locale: es });

  return {
    week: `Semana ${weekNumber} // ${formattedStartDate} al ${formattedEndDate}`,
    startDate,
  };
};
