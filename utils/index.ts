import moment from 'moment';

export const getTutorYearExperience = (startDate: Date): number => {
  const begin = moment(startDate);
  return moment().diff(begin, 'years');
};
