export const displayPrice = (price) => (price === 0 ? 'Free' : `$${price}`);

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
  const formattedInstitution =
    institution === 'Other' || institution === null
      ? ''
      : institution.replace(/_/g, ' ');

  return formattedInstitution;
};

export const getCurrentMonthDateRange = () => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { firstDayOfMonth, lastDayOfMonth };
};

export const countEventsBySchool = (events) => {
  return events.reduce((acc, event) => {
    const uni = event.name_of_inst || 'Other';
    acc[uni] = (acc[uni] || 0) + 1;
    return acc;
  }, {});
};
