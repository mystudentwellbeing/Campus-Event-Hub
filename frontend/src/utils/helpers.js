export const displayPrice = (price) => (price === 0 ? 'Free' : '$');

export const formatEventDate = (date) => {
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const [year, month, day] = date.split('-');
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    'en-US',
    dateOptions
  );
  return formattedDate;
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedTime = `${formattedHour}:${minutes} ${period}`;

  return formattedTime;
};

export const formatInstitutionName = (institution) => {
  const formattedInstitution = institution.replace(/_/g, ' ');

  return formattedInstitution;
};
