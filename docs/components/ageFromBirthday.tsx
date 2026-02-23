import type { JSX } from "react";

export type AgeFromBirthdayProps = {
  birthday: string;
};

const AgeFromBirthday = ({
  birthday: birthdayStr,
}: AgeFromBirthdayProps): JSX.Element => {
  const birthday = new Date(birthdayStr);
  const today = new Date();
  const thisYearsBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
  );
  let age = today.getFullYear() - birthday.getFullYear();
  if (today < thisYearsBirthday) {
    age--;
  }

  return <>{age}歳</>;
};

export default AgeFromBirthday;
