import React, { useState } from "react";
import { DatePickerIOS, View, Text, StyleSheet } from "react-native";

interface Props {
  initDate: Date;
  onDateSelected?: Function;
  disabled?: boolean;
}

const DatePicker: React.FC<Props> = props => {
  const { initDate, onDateSelected, disabled } = props;
  const [date, setDate] = useState(initDate || new Date())
  return (
    <View pointerEvents={disabled ? "none" : "auto"}>
      <View style={{ transform: [{ scale: 1, }], }}>
      <DatePickerIOS
        date={date}
        onDateChange={(date) => {
          if (onDateSelected) onDateSelected(date)
          setDate(date)
        }}
        mode={'date'}
        {...props}
      />
      </View>
      <View
          style={styles.indicatorDefaultStyle}>
              <View
                style={{
                  zIndex: 100,
                  flex: 1.04,
                  alignItems: 'flex-end',
                  marginLeft: 16,
                }}>
                <Text
                  style={{
                    paddingLeft: 6.89,
                    color: '#575756',
                    marginTop: 4
                  }}>
                  hours
                </Text>
              </View>
              <View
                style={{
                  zIndex: 100,
                  flex: 1, 
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#575756',
                    marginLeft: 38,
                    marginTop: 4
                  }}>
                  min
                </Text>
              </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorDefaultStyle: {
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    opacity: 0.8,
    backgroundColor: "#EAF4FF",
    height: 34,
    width: 330,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'transparent',
    top: 91,
    left: 8,
  }
})

export default DatePicker;
