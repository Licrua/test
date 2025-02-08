export const convertDateFormat = (dateString: string, forEdit: boolean) => {
  if (dateString) {
    if (forEdit) {
      const parts = dateString.split(".");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
      }
    } else {
      const parts = dateString.split("-");
      if (parts.length === 3) {
        const [year, month, day] = parts;
        return `${day}.${month}.${year}`;
      }
    }
  }

  return dateString;
};
