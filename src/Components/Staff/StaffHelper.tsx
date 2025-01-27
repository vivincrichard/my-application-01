export enum shiftEnumType {
  DayShift = 1,
  NightShift = 2
}

const ShiftType = ({ p }: { p: shiftEnumType }) => {
  switch (p) {
    case shiftEnumType.DayShift:
      return <span>Day Shift</span>;
    case shiftEnumType.NightShift:
      return <span>Night Shift</span>;
    default:
      return <span>Unknown</span>;
  }
};

export default ShiftType;
